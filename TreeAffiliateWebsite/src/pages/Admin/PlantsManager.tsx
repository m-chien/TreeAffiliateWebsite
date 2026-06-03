import React, { useState, useEffect, type ReactNode } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Leaf,
  Hash,
  Power,
  Upload,
  ShieldCheck,
  Wind,
  Sun,
  Maximize,
  X,
} from "lucide-react";
import styles from "./PlantsManager.module.css";
import type { ManagedPlant } from "../../types";

const ADMIN_API_URL = "http://localhost:8080/api/v1/admin/plants-manager";
const UPLOAD_API_URL = "http://localhost:8080/api/v1/admin/files/upload";
const CATEGORY_API_URL = "http://localhost:8080/api/v1/danh-muc-cay-canh";

// -------------------------------------------------------------
// COMPONENT: Custom Modal (Nhúng trực tiếp, không cần file ngoài)
// -------------------------------------------------------------
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeModalBtn}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>{footer}</div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// COMPONENT: Hiển thị độ khó chăm sóc trực quan
// -------------------------------------------------------------
const CareDifficultyIndicator = ({ level = 1 }: { level?: number }) => {
  const maxLevel = 5;
  const getActiveColor = () => {
    if (level <= 2) return "#10b981"; // Dễ
    if (level === 3) return "#f59e0b"; // Vừa
    return "#ef4444"; // Khó
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginTop: "12px",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>
        Độ khó chăm sóc: {level}/{maxLevel}
      </span>
      <div
        style={{
          display: "flex",
          gap: "4px",
          width: "100%",
          maxWidth: "200px",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              height: "6px",
              flex: 1,
              backgroundColor: i <= level ? getActiveColor() : "#e5e7eb",
              borderRadius: "3px",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN COMPONENT: PlantsManager
// -------------------------------------------------------------
const PlantsManager: React.FC = () => {
  const [plants, setPlants] = useState<ManagedPlant[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedPlant, setSelectedPlant] = useState<ManagedPlant | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ManagedPlant>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadPlants = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${ADMIN_API_URL}?page=0&size=1000`);
      const data = await res.json();
      if (data.code === 200 && data.result?.content) {
        setPlants(data.result.content);
      }
    } catch (error) {
      showToast("Lấy dữ liệu cây thất bại", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetch(`${CATEGORY_API_URL}?page=0&size=100`);
      const data = await res.json();

      if (
        data.code === 200 &&
        data.result &&
        Array.isArray(data.result.content)
      ) {
        const catList = data.result.content;
        setCategories(catList);
        if (catList.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: prev.category || catList[0].tenDanhMuc,
          }));
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  useEffect(() => {
    loadPlants();
    loadCategories();
  }, []);

  const totalPlants = plants.length;
  const activePlants = plants.filter((p) => p.status === "Active").length;
  const inactivePlants = totalPlants - activePlants;
  const maxCommission = Math.max(...plants.map((p) => p.commission || 0), 5);

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return "Đang cập nhật";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      tenTiengAnh: "",
      gia: undefined,
      giaThamKhao: "",
      anhSangCanThiet: "",
      kichThuoc: "Trung bình",
      doKhoChamSoc: 3,
      anToanChoThuCung: false,
      locKhongKhi: false,
      moTa: "",
      category: categories.length > 0 ? categories[0].tenDanhMuc : "",
      commission: 10,
      status: "Active",
    } as Partial<ManagedPlant>);
    setSelectedFile(null);
    setImagePreview("");
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (plant: ManagedPlant) => {
    setSelectedPlant(plant);
    setFormData({ ...plant });
    setSelectedFile(null);
    setImagePreview(plant.imageUrl || "");
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (plant: ManagedPlant) => {
    setSelectedPlant(plant);
    setIsDeleteModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageToServer = async (): Promise<string | null> => {
    if (!selectedFile) return null;
    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    try {
      const res = await fetch(UPLOAD_API_URL, {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      return data.code === 200 ? data.result : null;
    } catch {
      showToast("Upload ảnh thất bại", "error");
      return null;
    }
  };

  const handleSaveData = async (method: "POST" | "PUT", url: string) => {
    if (!formData.name) {
      showToast("Tên cây không được để trống", "error");
      return;
    }

    let finalImageUrl = formData.imageUrl;
    if (selectedFile) {
      const uploadedUrl = await uploadImageToServer();
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    const payload = { ...formData, imageUrl: finalImageUrl };

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.code === 201 || data.code === 200) {
        showToast(
          method === "POST" ? "Thêm mới thành công!" : "Cập nhật thành công!",
          "success",
        );
        loadPlants();
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
      } else {
        showToast("Thao tác thất bại: " + data.message, "error");
      }
    } catch (error) {
      showToast("Lỗi kết nối máy chủ", "error");
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedPlant) return;
    try {
      const res = await fetch(`${ADMIN_API_URL}/${selectedPlant.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.code === 200) {
        setPlants(plants.filter((p) => p.id !== selectedPlant.id));
        setIsDeleteModalOpen(false);
        showToast("Xóa cây thành công!", "success");
      }
    } catch {
      showToast("Lỗi khi xóa", "error");
    }
  };

  const renderForm = () => (
    <div className={styles.formContainer}>
      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
        <label>Hình ảnh Thumbnail</label>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <label className={styles.uploadLabel} htmlFor="file-upload">
            <Upload size={16} /> Chọn ảnh từ thiết bị
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.previewImage}
            />
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Tên sản phẩm cây *</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Ví dụ: Cây Kim Tiền..."
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Tên khoa học (Tiếng Anh)</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Zamioculcas zamiifolia..."
          value={formData.tenTiengAnh || ""}
          onChange={(e) =>
            setFormData({ ...formData, tenTiengAnh: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Giá niêm yết định mức (VNĐ)</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Ví dụ: 150000"
          value={formData.gia || ""}
          onChange={(e) =>
            setFormData({ ...formData, gia: Number(e.target.value) })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Giá hiển thị tham khảo</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Ví dụ: 120.000đ - 180.000đ"
          value={formData.giaThamKhao || ""}
          onChange={(e) =>
            setFormData({ ...formData, giaThamKhao: e.target.value })
          }
        />
      </div>

      <fieldset className={styles.bioFieldSet}>
        <legend>Thông số sinh học</legend>
        <div className={styles.bioGrid}>
          <div className={styles.formGroup}>
            <label>Nhu cầu ánh sáng</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ánh sáng tán xạ..."
              value={formData.anhSangCanThiet || ""}
              onChange={(e) =>
                setFormData({ ...formData, anhSangCanThiet: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>Kích thước</label>
            <select
              className={styles.select}
              value={formData.kichThuoc || "Trung bình"}
              onChange={(e) =>
                setFormData({ ...formData, kichThuoc: e.target.value })
              }
            >
              <option value="Lớn">Lớn</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Nhỏ">Nhỏ</option>
              <option value="Mini">Mini</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Độ khó chăm sóc (1 - 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className={styles.input}
              value={formData.doKhoChamSoc || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doKhoChamSoc: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.anToanChoThuCung || false}
              onChange={(e) =>
                setFormData({ ...formData, anToanChoThuCung: e.target.checked })
              }
            />
            An toàn cho thú cưng
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.locKhongKhi || false}
              onChange={(e) =>
                setFormData({ ...formData, locKhongKhi: e.target.checked })
              }
            />
            Có tính năng lọc không khí
          </label>
        </div>
      </fieldset>

      <div className={styles.formGroup}>
        <label>Nhóm danh mục</label>
        <select
          className={styles.select}
          value={formData.category || ""}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.id} value={cat.tenDanhMuc}>
                {cat.tenDanhMuc}
              </option>
            ))
          ) : (
            <option value="">Đang tải danh mục...</option>
          )}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Chiết khấu Affiliate (%)</label>
        <input
          type="number"
          className={styles.input}
          value={formData.commission || ""}
          onChange={(e) =>
            setFormData({ ...formData, commission: Number(e.target.value) })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Trạng thái hiển thị</label>
        <select
          className={styles.select}
          value={formData.status || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "Active" | "Inactive",
            })
          }
        >
          <option value="Active">🟢 Đang hoạt động (Kinh doanh)</option>
          <option value="Inactive">⚫ Tạm ẩn lưu kho (Ngừng bán)</option>
        </select>
      </div>

      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
        <label>Mô tả chi tiết</label>
        <textarea
          className={styles.input}
          rows={3}
          placeholder="Nhập ý nghĩa phong thủy hoặc hướng dẫn sơ bộ..."
          value={formData.moTa || ""}
          onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
        ></textarea>
      </div>
    </div>
  );

  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      {toast && (
        <div
          className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}
        >
          {toast.message}
        </div>
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Kho Cây Cảnh</h1>
        <p className={styles.subtitle}>
          Cập nhật và giám sát dữ liệu chi tiết tất cả các loại cây trong hệ
          thống
        </p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <Leaf size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng số Cây</span>
            <span className={styles.statValue}>
              {isLoading ? "..." : totalPlants}
            </span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <Power size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đang hoạt động</span>
            <span className={styles.statValue}>
              {isLoading ? "..." : activePlants}
            </span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconDark}`}>
            <Power size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Đang ẩn</span>
            <span className={styles.statValue}>
              {isLoading ? "..." : inactivePlants}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.toolbarCard}>
        <div className={styles.filterGroup}>
          <div className={styles.searchBox}>
            <Search size={18} color="#666" />
            <input
              type="text"
              placeholder="Tra cứu theo tên cây..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} /> Thêm Cây mới
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>Danh sách chi tiết cây cảnh</h3>
        </div>
        <div className={styles.tableWrapper}>
          {isLoading ? (
            <div className={styles.emptyState}>
              <h3>Đang tải dữ liệu...</h3>
            </div>
          ) : filteredPlants.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Phân loại & Sinh học</th>
                  <th>Giá & Chiết khấu</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlants.map((plant) => (
                  <tr key={plant.id}>
                    <td>
                      <div className={styles.plantInfo}>
                        <div className={styles.thumbnailWrapper}>
                          {plant.imageUrl ? (
                            <img
                              src={plant.imageUrl}
                              alt={plant.name}
                              className={styles.thumbnail}
                            />
                          ) : (
                            <div className={styles.thumbnailPlaceholder}>
                              <Leaf size={24} color="#aaa" />
                            </div>
                          )}
                        </div>
                        <div className={styles.plantDetails}>
                          <span className={styles.plantName}>{plant.name}</span>
                          {plant.tenTiengAnh && (
                            <span className={styles.sciName}>
                              ({plant.tenTiengAnh})
                            </span>
                          )}
                          <span className={styles.categoryId}>
                            <Hash size={12} /> ID-
                            {String(plant.id).substring(0, 4)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.bioDetails}>
                        <span className={styles.tagCategory}>
                          {plant.category}
                        </span>
                        <div className={styles.featureRow}>
                          {plant.kichThuoc && (
                            <span
                              className={styles.featureBadge}
                              title="Kích thước"
                            >
                              <Maximize size={12} /> {plant.kichThuoc}
                            </span>
                          )}
                          {plant.anhSangCanThiet && (
                            <span
                              className={styles.featureBadge}
                              title="Ánh sáng"
                            >
                              <Sun size={12} /> {plant.anhSangCanThiet}
                            </span>
                          )}
                        </div>
                        <div className={styles.featureRow}>
                          {plant.anToanChoThuCung && (
                            <span
                              className={`${styles.featureBadge} ${styles.petSafe}`}
                            >
                              <ShieldCheck size={12} /> An toàn thú cưng
                            </span>
                          )}
                          {plant.locKhongKhi && (
                            <span
                              className={`${styles.featureBadge} ${styles.airPure}`}
                            >
                              <Wind size={12} /> Lọc khí
                            </span>
                          )}
                        </div>
                        {plant.doKhoChamSoc && (
                          <CareDifficultyIndicator level={plant.doKhoChamSoc} />
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.pricingDetails}>
                        <span className={styles.priceMain}>
                          {formatCurrency(plant.gia)}
                        </span>
                        {plant.giaThamKhao && (
                          <span className={styles.priceRef}>
                            Tham khảo: {plant.giaThamKhao}
                          </span>
                        )}
                        <div className={styles.commissionBox}>
                          <span className={styles.commissionText}>
                            Hoa hồng: {plant.commission}%
                          </span>
                          <div className={styles.komBar}>
                            <div
                              className={styles.komBarFill}
                              style={{
                                width: `${(Number(plant.commission) / maxCommission) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          plant.status === "Active"
                            ? styles.badgeActive
                            : styles.badgeInactive
                        }
                      >
                        {plant.status}
                      </span>
                    </td>
                    <td>
                      <div
                        className={styles.actions}
                        style={{ justifyContent: "flex-end" }}
                      >
                        <button
                          className={styles.actionBtn}
                          onClick={() => openEditModal(plant)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.danger}`}
                          onClick={() => openDeleteModal(plant)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <Leaf size={64} opacity={0.5} />
              <h3>Không có dữ liệu</h3>
            </div>
          )}
        </div>
      </div>

      {/* MODAL THÊM MỚI */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tạo mới Cây Cảnh"
        footer={
          <>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsAddModalOpen(false)}
            >
              Từ chối
            </button>
            <button
              className={styles.confirmBtn}
              onClick={() => handleSaveData("POST", ADMIN_API_URL)}
            >
              Lưu hệ thống
            </button>
          </>
        }
      >
        {renderForm()}
      </CustomModal>

      {/* MODAL CẬP NHẬT */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Chỉnh sửa Cây Cảnh"
        footer={
          <>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsEditModalOpen(false)}
            >
              Hủy
            </button>
            <button
              className={styles.confirmBtn}
              onClick={() =>
                handleSaveData("PUT", `${ADMIN_API_URL}/${selectedPlant?.id}`)
              }
            >
              Lưu cập nhật
            </button>
          </>
        }
      >
        {renderForm()}
      </CustomModal>

      {/* MODAL XÓA */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xóa Cây Cảnh"
        footer={
          <>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Quay lại
            </button>
            <button
              className={`${styles.confirmBtn} ${styles.danger}`}
              onClick={handleConfirmDelete}
            >
              Xác nhận Xóa
            </button>
          </>
        }
      >
        <p>
          Bạn có chắc chắn muốn xóa <strong>{selectedPlant?.name}</strong> khỏi
          hệ thống?
        </p>
      </CustomModal>
    </div>
  );
};

export default PlantsManager;
