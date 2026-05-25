package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "LinkAffiliate")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkAffiliate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "NhaCungCap", length = 255)
    private String nhaCungCap;

    @Column(name = "LinkAffiliate", columnDefinition = "NVARCHAR(MAX)")
    private String linkAffiliate;

    @Column(name = "linkAnh", columnDefinition = "NVARCHAR(MAX)")
    private String linkAnh;

    @Column(name = "GiaGoc", precision = 18, scale = 2)
    private BigDecimal giaGoc;

    @Column(name = "moTa", length = 500)
    private String moTa;

    @CreationTimestamp
    @Column(name = "NgayTao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai", length = 50)
    private Status trangThai;

    @Column(name = "PhanTramHoaHong", precision = 5, scale = 2)
    private BigDecimal phanTramHoaHong;

    @Column(name = "LuotClick")
    private Integer luotClick;

    // Quan hệ với AffiliateOrder
    @OneToMany(mappedBy = "linkAffiliate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AffiliateOrder> affiliateOrders;

    // Quan hệ ManyToMany với BaiViet
    @ManyToMany(mappedBy = "linkAffiliates")
    private List<BaiViet> baiViets;
}