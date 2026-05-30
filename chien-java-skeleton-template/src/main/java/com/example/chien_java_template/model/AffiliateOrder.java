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
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDLinkAffiliate", nullable = false)
    private LinkAffiliate linkAffiliate;

    @Column(name = "NenTang")
    @Enumerated(EnumType.STRING)
    private Platform nenTang;

    @Column(name = "MaCode")
    private String maCode;

    @Column(name = "GiaTriDonHang", precision = 18, scale = 2)
    private BigDecimal giaTriDonHang;

    @Column(name = "HoaHong", precision = 18, scale = 2)
    private BigDecimal hoaHong;

    @Column(name = "TrangThai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;

    @Column(name = "NgayDat")
    private LocalDateTime ngayDat;

    @UpdateTimestamp
    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat;
}
