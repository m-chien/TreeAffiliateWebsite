package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreatePlantsUserDTO;
import com.example.chien_java_template.dto.UpdatePlantsUserDTO;
import com.example.chien_java_template.dto.PlantsUserDTO;
import com.example.chien_java_template.model.PlantsUser;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PlantsUserMapper {
    PlantsUserDTO toDTO(PlantsUser plantsUser);

    PlantsUser toEntity(PlantsUserDTO plantsUserDTO);

    PlantsUser toEntityFromCreateDTO(CreatePlantsUserDTO createPlantsUserDTO);

    void updateEntityFromDTO(UpdatePlantsUserDTO updatePlantsUserDTO, @MappingTarget PlantsUser plantsUser);
}

