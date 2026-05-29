package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CauHoiThuongGap")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CauHoiThuongGap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "CauHoi", columnDefinition = "NVARCHAR(MAX)")
    private String cauHoi;

    @Column(name = "CauTraLoi", columnDefinition = "NVARCHAR(MAX)")
    private String cauTraLoi;
}
