package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.HighlightType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "thong_tin_noi_bat")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThongTinNoiBat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idcaycanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "loai")
    @Enumerated(EnumType.STRING)
    private HighlightType loai;

    @Column(name = "noi_dung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;
}

