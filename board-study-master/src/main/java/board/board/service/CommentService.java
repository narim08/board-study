package board.board.service;

import board.board.domain.Board;
import board.board.domain.Comment;
import board.board.dto.CommentRequestDTO;
import board.board.dto.CommentResponseDTO;
import board.board.repository.CommentRepository;
import board.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public CommentResponseDTO createComment(Long boardId, CommentRequestDTO requestDTO) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        Comment comment = Comment.builder()
                .board(board)
                .userName(requestDTO.getUserName())
                .content(requestDTO.getContent())
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .build();

        Comment savedComment = commentRepository.save(comment);
        return convertToResponseDTO(savedComment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDTO> getComments(Long boardId) {
        List<Comment> comments = commentRepository.findByBoardId(boardId);
        return comments.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CommentResponseDTO getCommentById(Long Id) {
        Comment comment = commentRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        return convertToResponseDTO(comment);
    }

    @Transactional
    public CommentResponseDTO updateComment(Long commentId, CommentRequestDTO requestDTO) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

        comment.setContent(requestDTO.getContent());
        comment.setUpdateTime(LocalDateTime.now());

        return convertToResponseDTO(comment);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()-> new RuntimeException("댓글을 찾을 수 없습니다."));

        commentRepository.delete(comment);
    }

    private CommentResponseDTO convertToResponseDTO(Comment comment) {
        CommentResponseDTO responseDTO = new CommentResponseDTO();
        responseDTO.setId(comment.getId());
        responseDTO.setBoardId(comment.getBoard().getId());
        responseDTO.setUserName(comment.getUserName());
        responseDTO.setContent(comment.getContent());
        responseDTO.setCreateTime(comment.getCreateTime());
        responseDTO.setUpdateTime(comment.getUpdateTime());

        return responseDTO;
    }
}
