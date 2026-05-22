package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateDanhMucCayCanhDTO;
import com.example.chien_java_template.dto.UpdateDanhMucCayCanhDTO;
import com.example.chien_java_template.dto.DanhMucCayCanhDTO;
import com.example.chien_java_template.model.DanhMucCayCanh;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DanhMucCayCanhMapper {
    DanhMucCayCanhDTO toDTO(DanhMucCayCanh danhMucCayCanh);

    DanhMucCayCanh toEntity(DanhMucCayCanhDTO danhMucCayCanhDTO);

    DanhMucCayCanh toEntityFromCreateDTO(CreateDanhMucCayCanhDTO createDanhMucCayCanhDTO);

    void updateEntityFromDTO(UpdateDanhMucCayCanhDTO updateDanhMucCayCanhDTO, @MappingTarget DanhMucCayCanh danhMucCayCanh);
}

