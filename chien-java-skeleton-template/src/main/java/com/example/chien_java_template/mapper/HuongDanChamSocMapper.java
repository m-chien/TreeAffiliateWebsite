package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.UpdateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.HuongDanChamSocDTO;
import com.example.chien_java_template.model.HuongDanChamSoc;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HuongDanChamSocMapper {
    HuongDanChamSocDTO toDTO(HuongDanChamSoc huongDanChamSoc);

    HuongDanChamSoc toEntity(HuongDanChamSocDTO huongDanChamSocDTO);

    HuongDanChamSoc toEntityFromCreateDTO(CreateHuongDanChamSocDTO createHuongDanChamSocDTO);

    void updateEntityFromDTO(UpdateHuongDanChamSocDTO updateHuongDanChamSocDTO, @MappingTarget HuongDanChamSoc huongDanChamSoc);
}

