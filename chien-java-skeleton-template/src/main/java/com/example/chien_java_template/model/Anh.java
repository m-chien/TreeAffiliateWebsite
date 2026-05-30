package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Anh")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Anh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "TieuDe", nullable = false)
    private String tieuDe;

    @Column(name = "LinkAnh", columnDefinition = "NVARCHAR(MAX)")
    private String linkAnh;

    @ManyToMany(mappedBy = "anhList")
    private List<BaiViet> baiViets;
}
