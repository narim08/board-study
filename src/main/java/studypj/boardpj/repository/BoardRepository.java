package studypj.boardpj.repository;

import studypj.boardpj.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAll(Pageable pageable); //페이징 메서드

    Page<Board> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}