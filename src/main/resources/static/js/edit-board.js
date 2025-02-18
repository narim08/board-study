window.onload = function () {
    // URL에서 게시글 ID를 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); // 게시글 ID를 URL에서 가져옵니다

    if (!postId) {
        alert("게시글 ID가 없습니다.");
        return;
    }

    // 로컬 저장소에서 해당 게시글을 가져옵니다
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(post => post.id == postId); // 해당 ID에 맞는 게시글 찾기

    if (post) {
        // 게시글 제목과 내용을 입력란에 표시
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
    } else {
        alert("해당 게시글을 찾을 수 없습니다.");
    }
}

document.getElementById('edit-btn').addEventListener('click', function () {
    const postId = new URLSearchParams(window.location.search).get('id'); // 게시글 ID 가져오기
    const newTitle = document.getElementById('title').value;
    const newContent = document.getElementById('content').value;

    // 제목이나 내용이 비어있는지 확인
    if (newTitle.trim() === "" || newContent.trim() === "") {
        alert("제목과 내용은 필수로 입력해야 합니다.");
        return;
    }

    // 로컬 저장소에서 게시글 데이터를 업데이트
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(post => post.id == postId); // 해당 게시글 인덱스 찾기

    if (postIndex !== -1) {
        // 수정된 데이터를 로컬 저장소에 저장
        posts[postIndex].title = newTitle;
        posts[postIndex].content = newContent;
        localStorage.setItem('posts', JSON.stringify(posts));

        // 수정 완료 후 알림
        alert("게시글이 수정되었습니다.");
        window.location.href = `board-detail.html?id=${postId}`; // 게시글 상세 페이지로 이동 (ID 포함)
    } else {
        alert("게시글을 찾을 수 없습니다.");
    }
});


// 취소 버튼 클릭 시
document.getElementById('cancel-btn').addEventListener('click', function () {
    window.location.href = 'board-detail.html'; // 취소 시 게시글 목록 페이지로 이동
});

