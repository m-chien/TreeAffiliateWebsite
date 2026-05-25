package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.UpdateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.HuongDanChamSocDTO;
import com.example.chien_java_template.model.HuongDanChamSoc;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HuongDanChamSocMapper {

    @Mapping(source = "cayCanh.id", target = "cayCanhId")
    HuongDanChamSocDTO toDTO(HuongDanChamSoc huongDanChamSoc);

    @Mapping(source = "cayCanhId", target = "cayCanh.id")
    HuongDanChamSoc toEntity(HuongDanChamSocDTO huongDanChamSocDTO);

    @Mapping(target = "cayCanh", ignore = true)
    HuongDanChamSoc toEntityFromCreateDTO(CreateHuongDanChamSocDTO createHuongDanChamSocDTO);

    @Mapping(target = "cayCanh", ignore = true)
    void updateEntityFromDTO(UpdateHuongDanChamSocDTO updateHuongDanChamSocDTO, @MappingTarget HuongDanChamSoc huongDanChamSoc);
}