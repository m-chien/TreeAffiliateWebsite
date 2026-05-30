package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.HighlightType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ThongTinNoiBat")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThongTinNoiBat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "Loai")
    @Enumerated(EnumType.STRING)
    private HighlightType loai;

    @Column(name = "NoiDung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;
}
