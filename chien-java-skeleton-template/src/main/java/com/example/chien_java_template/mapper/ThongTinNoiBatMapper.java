package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateThongTinNoiBatDTO;
import com.example.chien_java_template.dto.UpdateThongTinNoiBatDTO;
import com.example.chien_java_template.dto.ThongTinNoiBatDTO;
import com.example.chien_java_template.model.ThongTinNoiBat;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ThongTinNoiBatMapper {
    ThongTinNoiBatDTO toDTO(ThongTinNoiBat thongTinNoiBat);

    ThongTinNoiBat toEntity(ThongTinNoiBatDTO thongTinNoiBatDTO);

    ThongTinNoiBat toEntityFromCreateDTO(CreateThongTinNoiBatDTO createThongTinNoiBatDTO);

    void updateEntityFromDTO(UpdateThongTinNoiBatDTO updateThongTinNoiBatDTO, @MappingTarget ThongTinNoiBat thongTinNoiBat);
}

