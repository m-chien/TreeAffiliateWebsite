package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.DanhGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, Integer> {

    Page<DanhGia> findByCayCanh_Id(Integer cayCanhId, Pageable pageable);

    Page<DanhGia> findByPlantsUser_Id(Integer userId, Pageable pageable);

    @Query("SELECT AVG(d.diem) FROM DanhGia d WHERE d.cayCanh.id = :cayCanhId")
    Double findAverageDiemByCayCanhId(@Param("cayCanhId") Integer cayCanhId);
}