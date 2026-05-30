package com.example.chien_java_template.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendCampaignDTO {
    private Integer plantId;
    private Integer articleId;
    private List<Integer> recipientIds;
    private String subject;
    private String content;
    private String contentType; // matches ContentType enum name e.g., "BLOG", "GUIDE", "OTHER"
}
