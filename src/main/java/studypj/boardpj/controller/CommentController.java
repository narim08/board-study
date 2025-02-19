package studypj.boardpj.controller;

import org.springframework.http.ResponseEntity;
import studypj.boardpj.dto.CommentRequestDTO;
import studypj.boardpj.dto.CommentResponseDTO;
import studypj.boardpj.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/board/{boardId}/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponseDTO> createComment(@PathVariable Long boardId, @RequestBody CommentRequestDTO requestDTO) {
        CommentResponseDTO responseDTO = commentService.createComment(boardId, requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getComments(@PathVariable Long boardId) {
        List<CommentResponseDTO> responseDTOs = commentService.getComments(boardId);
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponseDTO> getCommentById(@PathVariable Long boardId, @PathVariable Long commentId) {
        CommentResponseDTO responseDTO = commentService.getCommentById(commentId);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponseDTO> updateComment(@PathVariable Long boardId, @PathVariable Long commentId, @RequestBody CommentRequestDTO requestDTO) {
        CommentResponseDTO responseDTO = commentService.updateComment(commentId, requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long boardId, @PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}