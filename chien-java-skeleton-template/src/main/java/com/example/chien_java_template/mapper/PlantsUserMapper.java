package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreatePlantsUserDTO;
import com.example.chien_java_template.dto.UpdatePlantsUserDTO;
import com.example.chien_java_template.dto.PlantsUserDTO;
import com.example.chien_java_template.model.PlantsUser;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PlantsUserMapper {
    @org.mapstruct.Mapping(target = "favoriteCategories", expression = "java(mapFavoriteCategories(plantsUser))")
    @org.mapstruct.Mapping(target = "favoritePlants", expression = "java(mapFavoritePlants(plantsUser))")
    PlantsUserDTO toDTO(PlantsUser plantsUser);

    default java.util.List<String> mapFavoriteCategories(PlantsUser plantsUser) {
        if (plantsUser.getYeThichCayCanhList() == null) return null;
        return plantsUser.getYeThichCayCanhList().stream()
                .flatMap(c -> c.getDanhMucs() != null ? c.getDanhMucs().stream() : java.util.stream.Stream.empty())
                .map(com.example.chien_java_template.model.DanhMucCayCanh::getTenDanhMuc)
                .distinct()
                .collect(java.util.stream.Collectors.toList());
    }

    default java.util.List<String> mapFavoritePlants(PlantsUser plantsUser) {
        if (plantsUser.getYeThichCayCanhList() == null) return null;
        return plantsUser.getYeThichCayCanhList().stream()
                .map(com.example.chien_java_template.model.CayCanh::getTenCay)
                .collect(java.util.stream.Collectors.toList());
    }

    PlantsUser toEntity(PlantsUserDTO plantsUserDTO);

    PlantsUser toEntityFromCreateDTO(CreatePlantsUserDTO createPlantsUserDTO);

    void updateEntityFromDTO(UpdatePlantsUserDTO updatePlantsUserDTO, @MappingTarget PlantsUser plantsUser);
}

