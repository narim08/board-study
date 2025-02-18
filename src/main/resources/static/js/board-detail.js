function formatDate(dateString) {
    if (!dateString) return "날짜 오류";

    // 날짜 형식 변환 (모든 구분자를 '-'로 통일 후 불필요한 공백 제거)
    dateString = dateString.replace(/[.\s/]+/g, '-').replace(/-+$/, '').trim();

    // YYYY-MM-DD 또는 YYYY-MM-DD HH:MM:SS 형식인지 확인
    const dateMatch = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?$/);
    if (!dateMatch) {
        console.error(`유효하지 않은 날짜: ${dateString}`);
        return "날짜 오류";
    }

    // 날짜 및 시간 추출
    const year = dateMatch[1];
    const month = dateMatch[2].padStart(2, '0'); // 1자리 숫자를 2자리로 변환
    const day = dateMatch[3].padStart(2, '0');
    let hours = dateMatch[4] ? Number(dateMatch[4]) : new Date().getHours(); // 없으면 현재 시간
    let minutes = dateMatch[5] ? Number(dateMatch[5]) : new Date().getMinutes(); // 없으면 현재 시간
    const seconds = dateMatch[6] ? Number(dateMatch[6]) : 0;

    // Date 객체 생성 (UTC 변환 방지)
    const date = new Date(`${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
        console.error(`유효하지 않은 날짜: ${year}-${month}-${day}`);
        return "날짜 오류";
    }

    // 한국 시간 기준 변환
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Seoul'
    };

    return new Intl.DateTimeFormat('ko-KR', options).format(date);
}

window.addEventListener('DOMContentLoaded', function () {
    const postId = Number(new URLSearchParams(window.location.search).get('id'));
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);

    if (post) {
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-author').textContent = `작성자: ${post.username}`;

        // 날짜 출력 (수정 시간이 있으면 생성일과 다르게 표시)
        const creationDate = formatDate(post.date);
        const updateDate = post.updatedDate ? formatDate(post.updatedDate) : creationDate;

        document.getElementById('post-date').textContent = `생성일: ${creationDate} | 수정일: ${updateDate}`;
        document.getElementById('post-content').textContent = post.content;

        document.getElementById('edit-btn').addEventListener('click', function () {
            window.location.href = `edit-board.html?id=${postId}`;
        });

        document.getElementById('delete-btn').addEventListener('click', function () {
            const confirmDelete = confirm('정말로 삭제하시겠습니까?');
            if (confirmDelete) {
                const updatedPosts = posts.filter(p => p.id !== postId);
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
                alert('게시글이 삭제되었습니다.');
                window.location.href = 'index.html';
            }
        });
    } else {
        document.getElementById('board-detail').innerHTML = '<p>해당 게시글을 찾을 수 없습니다.</p>';
        document.getElementById('edit-btn').disabled = true;
        document.getElementById('delete-btn').disabled = true;
    }

    document.getElementById('list-btn').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});
