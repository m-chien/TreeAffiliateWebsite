package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "anh")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Anh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tieude", nullable = false)
    private String tieuDe;

    @Column(name = "linkanh", columnDefinition = "NVARCHAR(MAX)")
    private String linkAnh;

    @ManyToMany(mappedBy = "anhList")
    private List<BaiViet> baiViets;
}

