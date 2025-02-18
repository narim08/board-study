package studypj.boardpj.controller;

import studypj.boardpj.dto.BoardRequestDTO;
import studypj.boardpj.dto.BoardResponseDTO;
import studypj.boardpj.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    /** Create: 게시글 작성 */
    @PostMapping
    public ResponseEntity<BoardResponseDTO> createBoard(@RequestBody BoardRequestDTO requestDTO) {
        return ResponseEntity
                .status(201) // HttpStatus.CREATED 직접 사용 대신 숫자 코드 사용
                .body(boardService.createBoard(requestDTO));
    }

    /** Read: 게시글 조회 */
    // 게시글 전체 목록 조회
    @GetMapping
    public ResponseEntity<Page<BoardResponseDTO>> getAllBoards(
            @PageableDefault(size = 5, sort = "createTime") Pageable pageable) {
        return ResponseEntity.ok(boardService.getAllBoards(pageable));
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponseDTO> getBoardById(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.getBoardById(id));
    }

    // 게시글 검색 조회 (제목)
    @GetMapping("/search")
    public ResponseEntity<Page<BoardResponseDTO>> searchBoards(
            @RequestParam(value = "title", required = false) String title,
            @PageableDefault(size = 5, sort = "createTime") Pageable pageable) {
        return ResponseEntity.ok(boardService.searchBoardsByTitle(title, pageable));
    }

    /** Update: 게시글 수정 */
    @PutMapping("/{id}")
    public ResponseEntity<BoardResponseDTO> updateBoard(
            @PathVariable Long id, @RequestBody BoardRequestDTO requestDTO) {
        return ResponseEntity.ok(boardService.updateBoard(id, requestDTO)); // 변수 제거 후 바로 반환
    }

    /** Delete: 게시글 삭제 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
}
