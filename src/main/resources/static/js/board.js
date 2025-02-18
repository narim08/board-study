const postsPerPage = 5; // 페이지당 게시글 수
let currentPage = 1; // 기본 페이지 시작 1

window.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('post-list');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    const totalPages = Math.ceil(posts.length / postsPerPage); // 총 페이지 수

    function updatePage() {
        // 페이지에 맞는 게시글만 가져오기
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // 최신 게시글 먼저 표시
        const postsToDisplay = posts.slice().reverse().slice(startIndex, endIndex); // 데이터 뒤집어서 최신순으로 표시

        // 게시글을 화면에 출력
        postList.innerHTML = ''; // 기존 게시글 삭제
        postsToDisplay.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3><a href="board-detail.html?id=${post.id}">${post.title}</a></h3>
                <p>${post.username} ${post.date}</p>
            `;
            postList.appendChild(postElement);
        });

        // 페이지 버튼 추가
        const pageContainer = document.getElementById('page-container');
        pageContainer.innerHTML = ''; // 기존 페이지 버튼 삭제
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('page-btn');

            if (i === currentPage) {
                pageButton.classList.add('active'); // 현재 페이지면 active 클래스 추가
            }

            pageButton.addEventListener('click', function () {
                currentPage = i;
                updatePage(); // 클릭 시 페이지 변경
            });
            pageContainer.appendChild(pageButton);
        }
    }

    updatePage(); // 처음 페이지 로딩 시 호출

    // 게시글 추가 버튼 클릭 시
    document.getElementById('create-btn').addEventListener('click', function () {
        window.location.href = 'create-board.html'; // 게시글 작성 페이지로 이동
    });
});
