package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateBaiVietDTO;
import com.example.chien_java_template.dto.UpdateBaiVietDTO;
import com.example.chien_java_template.dto.BaiVietDTO;
import com.example.chien_java_template.model.BaiViet;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BaiVietMapper {
    BaiVietDTO toDTO(BaiViet baiViet);

    BaiViet toEntity(BaiVietDTO baiVietDTO);

    BaiViet toEntityFromCreateDTO(CreateBaiVietDTO createBaiVietDTO);

    void updateEntityFromDTO(UpdateBaiVietDTO updateBaiVietDTO, @MappingTarget BaiViet baiViet);
}

