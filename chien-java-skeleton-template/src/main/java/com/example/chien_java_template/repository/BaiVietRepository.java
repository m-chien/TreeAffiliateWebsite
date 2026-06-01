package com.example.chien_java_template.repository;

import com.example.chien_java_template.dto.AdminBaiVietDTO;
import com.example.chien_java_template.model.BaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, Integer> {
    Optional<BaiViet> findByTieuDe(String tieuDe);

    // 1. Dành cho tìm kiếm theo tiêu đề (Có chứa b.tieuDe LIKE...)
    @Query("SELECT b FROM BaiViet b WHERE b.tieuDe LIKE %:tieuDe% AND b.trangThai = 'PUBLISHED' ORDER BY b.ngayTao DESC")
    Page<BaiViet> findByTieuDeContainingIgnoreCase(@Param("tieuDe") String tieuDe, Pageable pageable);

    // 2. Dành cho lọc theo danh mục (Có chứa b.danhMucNoiDung.id = ...)
    @Query("SELECT b FROM BaiViet b WHERE b.danhMucNoiDung.id = :danhMucId AND b.trangThai = 'PUBLISHED' ORDER BY b.ngayTao DESC")
    Page<BaiViet> findByDanhMucNoiDungId(@Param("danhMucId") Integer danhMucId, Pageable pageable);

    Page<BaiViet> findByPlantsUserId(Integer userId, Pageable pageable);

    // 1. Dành cho danh sách bài viết mới nhất
    @Query("SELECT b FROM BaiViet b WHERE b.trangThai = 'PUBLISHED' ORDER BY b.ngayTao DESC")
    Page<BaiViet> findNewest(Pageable pageable);

    // 2. Dành cho danh sách xem nhiều nhất
    @Query("SELECT b FROM BaiViet b WHERE b.trangThai = 'PUBLISHED' ORDER BY b.luotXem DESC")
    Page<BaiViet> findMostViewed(Pageable pageable);

    // 1. Giữ nguyên câu lệnh gốc lấy dữ liệu kèm hàm SUM để hiển thị lên bảng Admin
    @Query(value = "SELECT " +
            "b.ID as id, " +
            "b.TieuDe as tieuDe, " +
            "u.Hoten as tenTacGia, " +
            "b.LuotXem as luotXem, " +
            "COALESCE(SUM(bla.LuotClick), 0) as affiliateClicks, " +
            "b.TrangThai as trangThai, " +
            "b.NgayTao as ngayTao " +
            "FROM BaiViet b " +
            "LEFT JOIN [User] u ON b.IdUser = u.ID " +
            "LEFT JOIN BaiViet_LinkAffiliate bla ON b.ID = bla.IDBaiViet " +
            "GROUP BY b.ID, b.TieuDe, u.Hoten, b.LuotXem, b.TrangThai, b.NgayTao " +
            "ORDER BY b.NgayTao DESC",
            countQuery = "SELECT COUNT(DISTINCT b.ID) FROM BaiViet b",
            nativeQuery = true)
    Page<AdminBaiVietDTO> getAdminBaiVietStats(Pageable pageable);

    // Bổ sung @Transactional vào đây để lệnh ghi dữ liệu được phép thực thi
    @Transactional
    @Modifying
    @Query(value = "UPDATE BaiViet_LinkAffiliate SET LuotClick = LuotClick + 1 WHERE IDBaiViet = :idBai AND IDLinkAffiliate = :idLink", nativeQuery = true)
    int updateAffiliateClickInSubTable(@Param("idBai") Integer idBai, @Param("idLink") Integer idLink);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO BaiViet_LinkAffiliate (IDBaiViet, IDLinkAffiliate, LuotClick) VALUES (:idBai, :idLink, 1)", nativeQuery = true)
    void insertFirstAffiliateClickInSubTable(@Param("idBai") Integer idBai, @Param("idLink") Integer idLink);

    @Query(value = "SELECT COUNT(*) FROM BaiViet_LinkAffiliate WHERE IDBaiViet = :idBai AND IDLinkAffiliate = :idLink", nativeQuery = true)
    int countClicksByCompositeKey(@Param("idBai") Integer idBai, @Param("idLink") Integer idLink);

    // 3. Thêm hàm này để dùng cho trang danh sách tổng hợp (Tất cả bài viết)
    @Query("SELECT b FROM BaiViet b WHERE b.trangThai = 'PUBLISHED'")
    Page<BaiViet> findAllPublished(Pageable pageable);
}

