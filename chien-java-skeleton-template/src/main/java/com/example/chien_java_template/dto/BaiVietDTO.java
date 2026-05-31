package com.example.chien_java_template.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BaiVietDTO {
    private Integer id;
    private Integer danhMucNoiDungId;
    private Integer userId;
    private String tieuDe;
    private String noiDung;
    private Integer luotXem;
    private Integer thoiGianDoc;
    private LocalDateTime ngayTao;
    private String tenDanhMuc;
    private String tenTacGia;
    private String anhDaiDien;
    private java.util.List<LinkAffiliateDTO> linkAffiliates;
}

