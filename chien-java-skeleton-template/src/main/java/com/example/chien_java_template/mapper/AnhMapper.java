package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateAnhDTO;
import com.example.chien_java_template.dto.UpdateAnhDTO;
import com.example.chien_java_template.dto.AnhDTO;
import com.example.chien_java_template.model.Anh;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AnhMapper {
    AnhDTO toDTO(Anh anh);

    Anh toEntity(AnhDTO anhDTO);

    Anh toEntityFromCreateDTO(CreateAnhDTO createAnhDTO);

    void updateEntityFromDTO(UpdateAnhDTO updateAnhDTO, @MappingTarget Anh anh);
}

