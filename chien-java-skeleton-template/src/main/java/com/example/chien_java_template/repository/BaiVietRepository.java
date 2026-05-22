package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.BaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, Integer> {
    Optional<BaiViet> findByTieuDe(String tieuDe);

    Page<BaiViet> findByTieuDeContainingIgnoreCase(String tieuDe, Pageable pageable);

    Page<BaiViet> findByDanhMucNoiDungId(Integer danhMucId, Pageable pageable);

    Page<BaiViet> findByPlantsUserId(Integer userId, Pageable pageable);

    @Query("SELECT b FROM BaiViet b ORDER BY b.luotXem DESC")
    Page<BaiViet> findMostViewed(Pageable pageable);

    @Query("SELECT b FROM BaiViet b ORDER BY b.ngayTao DESC")
    Page<BaiViet> findNewest(Pageable pageable);
}

