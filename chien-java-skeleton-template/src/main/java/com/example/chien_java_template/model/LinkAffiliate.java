package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Platform;
import com.example.chien_java_template.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "link_affiliate")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkAffiliate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idcaycanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "nhacungcap")
    private String nhaCungCap;

    @Column(name = "link_affiliate", columnDefinition = "NVARCHAR(MAX)")
    private String linkAffiliate;

    @Column(name = "link_anh", columnDefinition = "NVARCHAR(MAX)")
    private String linkAnh;

    @Column(name = "gia_goc", precision = 18, scale = 2)
    private BigDecimal giaGoc;

    @Column(name = "mota")
    private String moTa;

    @CreationTimestamp
    @Column(name = "ngay_tao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "trangthai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;

    @Column(name = "phan_tram_hoa_hong", precision = 5, scale = 2)
    private BigDecimal phanTramHoaHong;

    @Column(name = "luot_click", columnDefinition = "INT DEFAULT 0")
    private Integer luotClick;

    @Column(name = "nentang")
    @Enumerated(EnumType.STRING)
    private Platform nenTang;

    @OneToMany(mappedBy = "linkAffiliate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AffiliateOrder> affiliateOrders;

    @ManyToMany(mappedBy = "linkAffiliates")
    private List<BaiViet> baiViets;
}

