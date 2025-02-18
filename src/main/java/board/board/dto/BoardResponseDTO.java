package board.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class BoardResponseDTO {

    private Long id;
    private String title;
    private String userName;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
