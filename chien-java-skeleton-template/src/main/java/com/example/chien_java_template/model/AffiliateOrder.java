package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Platform;
import com.example.chien_java_template.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "AffiliateOrder")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AffiliateOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idlinkaffiliate", nullable = false)
    private LinkAffiliate linkAffiliate;

    @Column(name = "nentang")
    @Enumerated(EnumType.STRING)
    private Platform nenTang;

    @Column(name = "macode")
    private String maCode;

    @Column(name = "giatridonhang", precision = 18, scale = 2)
    private BigDecimal giaTriDonHang;

    @Column(name = "hoahong", precision = 18, scale = 2)
    private BigDecimal hoaHong;

    @Column(name = "trangthai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;

    @Column(name = "ngaydat")
    private LocalDateTime ngayDat;

    @UpdateTimestamp
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
}

