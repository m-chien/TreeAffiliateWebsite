package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateDanhGiaDTO;
import com.example.chien_java_template.dto.UpdateDanhGiaDTO;
import com.example.chien_java_template.dto.DanhGiaDTO;
import com.example.chien_java_template.model.DanhGia;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DanhGiaMapper {
    DanhGiaDTO toDTO(DanhGia danhGia);

    DanhGia toEntity(DanhGiaDTO danhGiaDTO);

    DanhGia toEntityFromCreateDTO(CreateDanhGiaDTO createDanhGiaDTO);

    void updateEntityFromDTO(UpdateDanhGiaDTO updateDanhGiaDTO, @MappingTarget DanhGia danhGia);
}

