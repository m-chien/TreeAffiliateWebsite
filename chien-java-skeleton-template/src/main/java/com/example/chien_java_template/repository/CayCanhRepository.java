package com.example.chien_java_template.repository;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.model.CayCanh;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CayCanhRepository extends JpaRepository<CayCanh, Integer> {
    Optional<CayCanh> findByTenCay(String tenCay);

    Page<CayCanh> findByTrangThai(Status trangThai, Pageable pageable);

    Page<CayCanh> findByTenCayContainingIgnoreCase(String tenCay, Pageable pageable);

    @Query("SELECT c FROM CayCanh c WHERE c.trangThai = :trangThai ORDER BY c.diemDanhGia DESC")
    List<CayCanh> findTopRatedByStatus(@Param("trangThai") Status trangThai);

    @Query("SELECT c FROM CayCanh c ORDER BY c.luotXem DESC")
    Page<CayCanh> findMostViewed(Pageable pageable);

    Page<CayCanh> findByDoKhoChamSoc(Integer doKho, Pageable pageable);
}

