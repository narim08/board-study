document.getElementById('submit-btn').addEventListener("click", function () {
    const title = document.getElementById('title').value;
    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    if (!title || !username || !content) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    // 새로운 게시글에 id 추가
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // id 자동 증가 함수
    const getNextId = () => {
        const maxId = posts.reduce((max, post) => post.id > max ? post.id : max, 0);
        return maxId + 1;
    };

    const post = {
        id: getNextId(),  // 자동 증가 id 부여
        title: title,
        username: username,
        content: content,
        date: new Date().toLocaleDateString()
    };

    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('title').value = '';
    document.getElementById('username').value = '';
    document.getElementById('content').value = '';

    alert("게시글이 작성되었습니다.");

    window.location.href = 'index.html';
});

const cancelButton = document.getElementById('cancel-btn');
cancelButton.addEventListener("click", function () {
    window.location.href = 'index.html';
});

