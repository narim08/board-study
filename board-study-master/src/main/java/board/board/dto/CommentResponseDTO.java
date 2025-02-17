package board.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDTO {
    private Long id;
    private Long boardId;
    private String userName;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
