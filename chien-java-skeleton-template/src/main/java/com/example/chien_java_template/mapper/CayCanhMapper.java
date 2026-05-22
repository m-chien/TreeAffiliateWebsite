package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateCayCanhDTO;
import com.example.chien_java_template.dto.UpdateCayCanhDTO;
import com.example.chien_java_template.dto.CayCanhDTO;
import com.example.chien_java_template.model.CayCanh;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CayCanhMapper {
    CayCanhDTO toDTO(CayCanh cayCanh);

    CayCanh toEntity(CayCanhDTO cayCanhDTO);

    CayCanh toEntityFromCreateDTO(CreateCayCanhDTO createCayCanhDTO);

    void updateEntityFromDTO(UpdateCayCanhDTO updateCayCanhDTO, @MappingTarget CayCanh cayCanh);
}

