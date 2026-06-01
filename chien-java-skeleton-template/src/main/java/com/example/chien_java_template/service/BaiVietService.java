package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.AdminBaiVietDTO;
import com.example.chien_java_template.dto.CreateBaiVietDTO;
import com.example.chien_java_template.dto.UpdateBaiVietDTO;
import com.example.chien_java_template.dto.BaiVietDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.BaiVietMapper;
import com.example.chien_java_template.model.BaiViet;
import com.example.chien_java_template.model.CayCanh;
import com.example.chien_java_template.model.DanhMucNoiDung;
import com.example.chien_java_template.model.PlantsUser;
import com.example.chien_java_template.repository.BaiVietRepository;
import com.example.chien_java_template.repository.CayCanhRepository;
import com.example.chien_java_template.repository.DanhMucNoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BaiVietService {
    private final BaiVietRepository baiVietRepository;
    private final BaiVietMapper baiVietMapper;
    private final CayCanhRepository cayCanhRepository;
    private final DanhMucNoiDungRepository danhMucNoiDungRepository;

    public BaiVietDTO createBaiViet(CreateBaiVietDTO createDTO) {
        BaiViet baiViet = baiVietMapper.toEntityFromCreateDTO(createDTO);

        // 1. Trạng thái
        if (createDTO.getTrangThai() != null) {
            baiViet.setTrangThai(createDTO.getTrangThai());
        } else {
            baiViet.setTrangThai("PUBLISHED");
        }

        // 2. Các chỉ số mặc định
        baiViet.setNgayTao(java.time.LocalDateTime.now());
        baiViet.setLuotXem(0);
        baiViet.setThoiGianDoc(0);

        // 3. Lấy Danh mục (ĐÃ SỬA LẠI ĐÚNG TÊN GETTER)
        DanhMucNoiDung dm = new DanhMucNoiDung();
        if (createDTO.getDanhMucNoiDungId() != null) {
            dm.setId(createDTO.getDanhMucNoiDungId());
        } else {
            dm.setId(1);
        }
        baiViet.setDanhMucNoiDung(dm);

        // 4. Gán người đăng bài (Lấy ID = 1 từ Frontend gửi lên)
        if (createDTO.getUserId() != null) {
            // Dựa vào file Mapper của bạn, đối tượng liên kết tên là PlantsUser
            PlantsUser admin = new PlantsUser();
            admin.setId(createDTO.getUserId());

            // Hàm setter này dựa theo tên biến "plantsUser" trong file Mapper của bạn
            baiViet.setPlantsUser(admin);
        }

        BaiViet savedBaiViet = baiVietRepository.save(baiViet);
        return baiVietMapper.toDTO(savedBaiViet);
    }

    public BaiVietDTO getBaiVietById(Integer id) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return baiVietMapper.toDTO(baiViet);
    }

    public Page<BaiVietDTO> getAllBaiViet(Pageable pageable) {
        return baiVietRepository.findAllPublished(pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> searchBaiVietByTitle(String tieuDe, Pageable pageable) {
        return baiVietRepository.findByTieuDeContainingIgnoreCase(tieuDe, pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getBaiVietByCategory(Integer categoryId, Pageable pageable) {
        return baiVietRepository.findByDanhMucNoiDungId(categoryId, pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getBaiVietByUser(Integer userId, Pageable pageable) {
        return baiVietRepository.findByPlantsUserId(userId, pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getMostViewedBaiViet(Pageable pageable) {
        return baiVietRepository.findMostViewed(pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getNewestBaiViet(Pageable pageable) {
        return baiVietRepository.findNewest(pageable)
                .map(baiVietMapper::toDTO);
    }

    @Transactional
    public BaiVietDTO updateBaiViet(Integer id, UpdateBaiVietDTO updateBaiVietDTO) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));

        // Chỉ cập nhật những trường được gửi lên (không bị null)
        if (updateBaiVietDTO.getTieuDe() != null) {
            baiViet.setTieuDe(updateBaiVietDTO.getTieuDe());
        }
        if (updateBaiVietDTO.getTrangThai() != null) {
            baiViet.setTrangThai(updateBaiVietDTO.getTrangThai());
        }
        if (updateBaiVietDTO.getNoiDung() != null) {
            baiViet.setNoiDung(updateBaiVietDTO.getNoiDung());
            // Tự động tính thời gian đọc (giả sử 250 từ / phút)
            int wordCount = updateBaiVietDTO.getNoiDung().split("\\s+").length;
            baiViet.setThoiGianDoc(Math.max(1, wordCount / 250));
        }

        // --- ĐOẠN THÊM MỚI ĐỂ XỬ LÝ LƯU DANH MỤC ---
        if (updateBaiVietDTO.getDanhMucNoiDungId() != null) {
            DanhMucNoiDung danhMuc = danhMucNoiDungRepository.findById(updateBaiVietDTO.getDanhMucNoiDungId())
                    .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID)); // Hoặc ErrorCode.CATEGORY_NOT_FOUND nếu bạn có
            baiViet.setDanhMucNoiDung(danhMuc);
        }
        // -------------------------------------------

        BaiViet updatedBaiViet = baiVietRepository.save(baiViet);
        return baiVietMapper.toDTO(updatedBaiViet);
    }

    @Transactional
    public void deleteBaiViet(Integer id) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết")); // Hoặc dùng AppException của bạn

        // 1. Cắt đứt quan hệ với bảng Ảnh
        if (baiViet.getAnhList() != null) {
            baiViet.getAnhList().clear();
        }

        // 2. Cắt đứt quan hệ với bảng Link Affiliate
        if (baiViet.getLinkAffiliates() != null) {
            baiViet.getLinkAffiliates().clear();
        }

        // 3. Cắt đứt quan hệ với Cây Cảnh
        if (baiViet.getCayCanhList() != null) {
            baiViet.getCayCanhList().clear();
        }

        // 4. Cắt đứt quan hệ với User (Lượt yêu thích)
        if (baiViet.getYeThichUsers() != null) {
            baiViet.getYeThichUsers().clear();
        }

        // Sau khi dọn sạch râu ria, giờ có thể xóa bài viết an toàn!
        baiVietRepository.delete(baiViet);
    }

    @Transactional
    public void incrementView(Integer id) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        baiViet.setLuotXem((baiViet.getLuotXem() == null ? 0 : baiViet.getLuotXem()) + 1);
        baiVietRepository.save(baiViet);
    }
    public Page<AdminBaiVietDTO> getAdminBaiVietStats(Pageable pageable) {
        return baiVietRepository.getAdminBaiVietStats(pageable);
    }

    @Transactional
    public void addCayCanhToBaiViet(Integer baiVietId, Integer cayCanhId) {
        BaiViet baiViet = baiVietRepository.findById(baiVietId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết"));

        CayCanh cayCanh = cayCanhRepository.findById(cayCanhId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cây cảnh"));

        // Kiểm tra xem cây này đã được gắn vào bài chưa, nếu chưa thì thêm vào
        if (!baiViet.getCayCanhList().contains(cayCanh)) {
            baiViet.getCayCanhList().add(cayCanh);
            baiVietRepository.save(baiViet);
        }
    }

    @Transactional
    public void incrementAffiliateClick(Integer idBai, Integer idLink) {
        // 1. Thử cập nhật trước. Hàm này trả về số dòng đã được cập nhật (int)
        int updatedRows = baiVietRepository.updateAffiliateClickInSubTable(idBai, idLink);

        // 2. Nếu updatedRows == 0, nghĩa là dòng đó chưa tồn tại trong bảng phụ
        if (updatedRows == 0) {
            try {
                baiVietRepository.insertFirstAffiliateClickInSubTable(idBai, idLink);
            } catch (Exception e) {
                // Trường hợp hy hữu: vừa mới Insert xong thì một request khác cũng Insert
                // Ta có thể bỏ qua hoặc log lại, tùy bạn
            }
        }
    }
}


