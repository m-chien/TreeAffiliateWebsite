package com.example.chien_java_template.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "ThongTinNoiBat")
@Data
public class ThongTinNoiBat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh")
    private CayCanh cayCanh;

    @Column(name = "Loai")
    private String loai;

    @Column(name = "NoiDung")
    private String noiDung;
}