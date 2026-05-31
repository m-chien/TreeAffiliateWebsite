package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateDoiTacDTO;
import com.example.chien_java_template.dto.UpdateDoiTacDTO;
import com.example.chien_java_template.dto.DoiTacDTO;
import com.example.chien_java_template.model.DoiTac;
import com.example.chien_java_template.repository.DoiTacRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoiTacService {
    private final DoiTacRepository doiTacRepository;

    public DoiTacDTO createDoiTac(CreateDoiTacDTO dto) {
        DoiTac doiTac = DoiTac.builder()
                .tenDoiTac(dto.getTenDoiTac())
                .logoUrl(dto.getLogoUrl())
                .website(dto.getWebsite())
                .loaiHinh(dto.getLoaiHinh())
                .trangThai(dto.getTrangThai())
                .ngayBatDau(dto.getNgayBatDau())
                .hoaHong(dto.getHoaHong())
                .build();
        doiTac = doiTacRepository.save(doiTac);
        return mapToDTO(doiTac);
    }

    public DoiTacDTO getDoiTacById(Integer id) {
        DoiTac doiTac = doiTacRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đối tác với id: " + id));
        return mapToDTO(doiTac);
    }

    public Page<DoiTacDTO> getAllDoiTac(Pageable pageable) {
        return doiTacRepository.findAll(pageable).map(this::mapToDTO);
    }

    public DoiTacDTO updateDoiTac(Integer id, UpdateDoiTacDTO dto) {
        DoiTac doiTac = doiTacRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đối tác với id: " + id));

        doiTac.setTenDoiTac(dto.getTenDoiTac());
        doiTac.setLogoUrl(dto.getLogoUrl());
        doiTac.setWebsite(dto.getWebsite());
        doiTac.setLoaiHinh(dto.getLoaiHinh());
        doiTac.setTrangThai(dto.getTrangThai());
        doiTac.setNgayBatDau(dto.getNgayBatDau());
        doiTac.setHoaHong(dto.getHoaHong());

        doiTac = doiTacRepository.save(doiTac);
        return mapToDTO(doiTac);
    }

    public void deleteDoiTac(Integer id) {
        if (!doiTacRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy đối tác với id: " + id);
        }
        doiTacRepository.deleteById(id);
    }

    private DoiTacDTO mapToDTO(DoiTac doiTac) {
        return DoiTacDTO.builder()
                .id(doiTac.getId())
                .tenDoiTac(doiTac.getTenDoiTac())
                .logoUrl(doiTac.getLogoUrl())
                .website(doiTac.getWebsite())
                .loaiHinh(doiTac.getLoaiHinh())
                .trangThai(doiTac.getTrangThai())
                .ngayBatDau(doiTac.getNgayBatDau())
                .hoaHong(doiTac.getHoaHong())
                .build();
    }
}
