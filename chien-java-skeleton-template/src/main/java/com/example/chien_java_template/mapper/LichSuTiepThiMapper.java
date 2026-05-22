package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.UpdateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.LichSuTiepThiDTO;
import com.example.chien_java_template.model.LichSuTiepThi;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LichSuTiepThiMapper {
    LichSuTiepThiDTO toDTO(LichSuTiepThi lichSuTiepThi);

    LichSuTiepThi toEntity(LichSuTiepThiDTO lichSuTiepThiDTO);

    LichSuTiepThi toEntityFromCreateDTO(CreateLichSuTiepThiDTO createLichSuTiepThiDTO);

    void updateEntityFromDTO(UpdateLichSuTiepThiDTO updateLichSuTiepThiDTO, @MappingTarget LichSuTiepThi lichSuTiepThi);
}

