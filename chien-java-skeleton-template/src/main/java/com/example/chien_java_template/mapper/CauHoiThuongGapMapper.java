package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateCauHoiThuongGapDTO;
import com.example.chien_java_template.dto.UpdateCauHoiThuongGapDTO;
import com.example.chien_java_template.dto.CauHoiThuongGapDTO;
import com.example.chien_java_template.model.CauHoiThuongGap;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CauHoiThuongGapMapper {
    CauHoiThuongGapDTO toDTO(CauHoiThuongGap cauHoiThuongGap);

    CauHoiThuongGap toEntity(CauHoiThuongGapDTO cauHoiThuongGapDTO);

    CauHoiThuongGap toEntityFromCreateDTO(CreateCauHoiThuongGapDTO createCauHoiThuongGapDTO);

    void updateEntityFromDTO(UpdateCauHoiThuongGapDTO updateCauHoiThuongGapDTO, @MappingTarget CauHoiThuongGap cauHoiThuongGap);
}

