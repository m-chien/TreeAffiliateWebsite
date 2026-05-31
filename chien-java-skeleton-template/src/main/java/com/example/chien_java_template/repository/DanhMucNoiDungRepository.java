package com.example.chien_java_template.repository;

import com.example.chien_java_template.dto.DanhMucNoiDungDTO;
import com.example.chien_java_template.model.DanhMucNoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhMucNoiDungRepository extends JpaRepository<DanhMucNoiDung, Integer> {

    // Câu query JOIN 2 bảng và đếm số bài viết (COUNT)
    @Query("SELECT new com.example.chien_java_template.dto.DanhMucNoiDungDTO(d.id, d.tenDanhMuc, COUNT(b.id)) " +
            "FROM DanhMucNoiDung d LEFT JOIN BaiViet b ON b.danhMucNoiDung.id = d.id " +
            "GROUP BY d.id, d.tenDanhMuc " +
            "ORDER BY COUNT(b.id) DESC")
    List<DanhMucNoiDungDTO> findAllWithArticleCount();
}