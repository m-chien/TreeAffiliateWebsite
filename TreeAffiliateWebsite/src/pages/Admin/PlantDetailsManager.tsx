import React, { useState, useEffect } from "react";
import {
  Leaf,
  Info,
  HelpCircle,
  Tag,
  Plus,
  Trash2,
  Save,
  Check,
  Download,
  Loader2,
} from "lucide-react";
import styles from "./PlantDetailsManager.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQ {
  id: string;
  cauHoi: string;
  cauTraLoi: string;
}

/** Khớp với CayCanhDTO của backend */
interface CayCanhDTO {
  id: number;
  tenCay: string;
  tenTiengAnh?: string;
  danhMucList?: string[];
  anhSangCanThiet?: string;
  // Các field khác không dùng ở đây nên bỏ qua
}

/** Item trong danh sách dropdown */
interface PlantOption {
  id: number;
  name: string;
  category: string;
}

// ─── Hằng số ──────────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost:8080/api/v1";

const getToken = () => localStorage.getItem("token") ?? null;

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// ─── Component ────────────────────────────────────────────────────────────────

const PlantDetailsManager: React.FC = () => {
  // Dropdown
  const [plantOptions, setPlantOptions] = useState<PlantOption[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Form state
  const [selectedPlantId, setSelectedPlantId] = useState<string>("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showImportBox, setShowImportBox] = useState(false);
  const [importText, setImportText] = useState("");

  // HuongDanChamSoc
  const [anhSang, setAnhSang] = useState("");
  const [cheDoNuoc, setCheDoNuoc] = useState("");
  const [datVaDinhDuong, setDatVaDinhDuong] = useState("");
  const [doAnToan, setDoAnToan] = useState("");

  // ThongTinNoiBat
  const [uuDiem, setUuDiem] = useState("");
  const [nhuocDiem, setNhuocDiem] = useState("");

  // CauHoiThuongGap
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // KhuyenMai
  const [tenKhuyenMai, setTenKhuyenMai] = useState("");
  const [phanTramGiam, setPhanTramGiam] = useState<number | "">("");

  // ── 1. Load danh sách cây cho dropdown ──────────────────────────────────────
  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoadingList(true);
      try {
        // Lấy trang đầu với size lớn để có đủ cây trong dropdown
        // Nếu dự án có nhiều hơn 200 cây thì cần phân trang thêm
        const res = await fetch(`${BASE_URL}/cay-canh?page=0&size=200`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error("Không tải được danh sách cây");
        const data = await res.json();
        // data.result là Page<CayCanhDTO>, lấy data.result.content
        const content: CayCanhDTO[] = data?.result?.content ?? [];
        setPlantOptions(
          content.map((c) => ({
            id: c.id,
            name: c.tenCay,
            category: c.danhMucList?.[0] ?? "—",
          })),
        );
      } catch (err) {
        console.error("Lỗi tải danh sách cây:", err);
        alert("Không thể tải danh sách cây. Kiểm tra kết nối server.");
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchPlants();
  }, []);

  // ── 2. Load chi tiết cây khi chọn ───────────────────────────────────────────
  useEffect(() => {
    if (!selectedPlantId) {
      // Reset form về trống
      setAnhSang("");
      setCheDoNuoc("");
      setDatVaDinhDuong("");
      setDoAnToan("");
      setUuDiem("");
      setNhuocDiem("");
      setFaqs([]);
      setTenKhuyenMai("");
      setPhanTramGiam("");
      return;
    }

    const fetchDetail = async () => {
      setIsLoadingDetail(true);
      try {
        const res = await fetch(`${BASE_URL}/cay-canh/${selectedPlantId}`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error("Không tải được chi tiết cây");
        const data = await res.json();
        const dto: CayCanhDTO = data?.result;

        // Map những field CayCanhDTO hiện có vào form
        // (Các field details như cheDoNuoc, faqs... chưa có trong DTO
        //  → để trống, chờ backend bổ sung endpoint GET /details)
        setAnhSang(dto.anhSangCanThiet ?? "");
        setCheDoNuoc("");
        setDatVaDinhDuong("");
        setDoAnToan("");
        setUuDiem("");
        setNhuocDiem("");
        setFaqs([{ id: Date.now().toString(), cauHoi: "", cauTraLoi: "" }]);
        setTenKhuyenMai("");
        setPhanTramGiam("");
        setIsSaved(false);
      } catch (err) {
        console.error("Lỗi tải chi tiết cây:", err);
        alert("Không thể tải thông tin cây. Kiểm tra kết nối server.");
      } finally {
        setIsLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [selectedPlantId]);

  // ── FAQ handlers ─────────────────────────────────────────────────────────────

  const handleAddFaq = () => {
    setFaqs([
      ...faqs,
      { id: Date.now().toString(), cauHoi: "", cauTraLoi: "" },
    ]);
  };

  const handleRemoveFaq = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const handleFaqChange = (
    id: string,
    field: "cauHoi" | "cauTraLoi",
    value: string,
  ) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  // ── Save ─────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!selectedPlantId) return;

    const thongTinNoiBat: Array<{ loai: string; noiDung: string }> = [];

    uuDiem.split("\n").forEach((line) => {
      if (line.trim())
        thongTinNoiBat.push({ loai: "Ưu Điểm", noiDung: line.trim() });
    });

    nhuocDiem.split("\n").forEach((line) => {
      if (line.trim())
        thongTinNoiBat.push({ loai: "Nhược Điểm", noiDung: line.trim() });
    });

    const cauHoiThuongGap = faqs
      .filter((faq) => faq.cauHoi.trim() && faq.cauTraLoi.trim())
      .map((faq) => ({
        cauHoi: faq.cauHoi.trim(),
        cauTraLoi: faq.cauTraLoi.trim(),
      }));

    const payload = {
      huongDanChamSoc: { anhSang, cheDoNuoc, datVaDinhDuong, doAnToan },
      thongTinNoiBat,
      cauHoiThuongGap,
    };

    try {
      const res = await fetch(
        `${BASE_URL}/cay-canh/${selectedPlantId}/details`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        const err = await res.json();
        alert(`Lỗi lưu dữ liệu: ${err.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      alert("Không thể kết nối đến server. Vui lòng thử lại sau.");
    }
  };

  // ── Quick Import ──────────────────────────────────────────────────────────────

  const handleQuickImport = () => {
    const lines = importText.split("\n");
    const tmpUuDiem: string[] = [];
    const tmpNhuocDiem: string[] = [];
    const tmpFaqs: FAQ[] = [];

    lines.forEach((line) => {
      const text = line.trim();
      if (!text) return;

      if (text.startsWith("[Sang]"))
        setAnhSang(text.replace("[Sang]", "").trim());
      else if (text.startsWith("[Nuoc]"))
        setCheDoNuoc(text.replace("[Nuoc]", "").trim());
      else if (text.startsWith("[Dat]"))
        setDatVaDinhDuong(text.replace("[Dat]", "").trim());
      else if (text.startsWith("[AnToan]"))
        setDoAnToan(text.replace("[AnToan]", "").trim());
      else if (text.startsWith("[Uu]"))
        tmpUuDiem.push(text.replace("[Uu]", "").trim());
      else if (text.startsWith("[Nhuoc]"))
        tmpNhuocDiem.push(text.replace("[Nhuoc]", "").trim());
      else if (text.startsWith("[FAQ]")) {
        const parts = text.replace("[FAQ]", "").split("|");
        if (parts.length >= 2) {
          tmpFaqs.push({
            id: Date.now().toString() + Math.random(),
            cauHoi: parts[0].trim(),
            cauTraLoi: parts[1].trim(),
          });
        }
      } else if (text.startsWith("[KM]")) {
        const parts = text.replace("[KM]", "").split("|");
        if (parts[0]) setTenKhuyenMai(parts[0].trim());
        if (parts[1]) setPhanTramGiam(Number(parts[1].trim()));
      }
    });

    if (tmpUuDiem.length) setUuDiem(tmpUuDiem.join("\n"));
    if (tmpNhuocDiem.length) setNhuocDiem(tmpNhuocDiem.join("\n"));
    if (tmpFaqs.length) setFaqs(tmpFaqs);

    setShowImportBox(false);
    setImportText("");
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Thông số Cây cảnh</h1>
        <p className={styles.subtitle}>
          Cập nhật hướng dẫn chăm sóc, thông tin nổi bật, giải đáp và khuyến mãi
          tương ứng từng cây
        </p>
      </div>

      {/* ── Chọn cây ── */}
      <div className={styles.selectCard}>
        <div className={styles.selectGroup}>
          <label>Chọn cây cảnh để cấu hình</label>
          <select
            className={styles.select}
            value={selectedPlantId}
            onChange={(e) => setSelectedPlantId(e.target.value)}
            disabled={isLoadingList}
          >
            <option value="">
              {isLoadingList
                ? "Đang tải danh sách..."
                : "-- Vui lòng chọn một cây --"}
            </option>
            {plantOptions.map((plant) => (
              <option key={plant.id} value={String(plant.id)}>
                {plant.name} ({plant.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Loading detail ── */}
      {isLoadingDetail && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "24px 0",
            color: "#64748b",
          }}
        >
          <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
          <span>Đang tải thông tin cây...</span>
        </div>
      )}

      {selectedPlantId && !isLoadingDetail && (
        <div className={styles.formsWrapper}>
          {/* Quick Import toggle */}
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className={styles.addBtn}
              onClick={() => setShowImportBox(!showImportBox)}
              style={{
                backgroundColor: "#e2e8f0",
                color: "#1e293b",
                border: "none",
              }}
            >
              <Download size={18} />
              {showImportBox ? "Đóng hộp nhập nhanh" : "Nhập nhanh từ chuỗi"}
            </button>
          </div>

          {showImportBox && (
            <div
              className={styles.card}
              style={{
                backgroundColor: "#f1f5f9",
                border: "1px dashed #94a3b8",
              }}
            >
              <h3 style={{ marginBottom: "10px", fontSize: "1rem" }}>
                Cú pháp Nhập liệu:
              </h3>
              <ul
                style={{
                  fontSize: "0.85rem",
                  color: "#475569",
                  marginBottom: "16px",
                  lineHeight: "1.6",
                  paddingLeft: "20px",
                }}
              >
                <li>
                  <code>[Sang] Nội dung ánh sáng</code>
                </li>
                <li>
                  <code>[Nuoc] Nội dung chế độ nước</code>
                </li>
                <li>
                  <code>[Dat] Nội dung đất và dinh dưỡng</code>
                </li>
                <li>
                  <code>[AnToan] Nội dung an toàn</code>
                </li>
                <li>
                  <code>[Uu] Nêu 1 ưu điểm (có thể dùng nhiều lần)</code>
                </li>
                <li>
                  <code>[Nhuoc] Nêu 1 nhược điểm (có thể dùng nhiều lần)</code>
                </li>
                <li>
                  <code>
                    [FAQ] Cây có hoa không? | Dạ cây có hoa mọc theo chùm.
                  </code>
                </li>
                <li>
                  <code>[KM] Flash sale 15/4 | 20</code>
                </li>
              </ul>
              <textarea
                className={styles.textarea}
                style={{
                  width: "100%",
                  minHeight: "150px",
                  marginBottom: "16px",
                }}
                placeholder="Dán chuỗi văn bản theo luật vào đây..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
              <button
                className={styles.saveBtn}
                onClick={handleQuickImport}
                style={{ padding: "8px 16px", fontSize: "0.9rem" }}
              >
                Xác nhận Nhập
              </button>
            </div>
          )}

          {/* Hướng Dẫn Chăm Sóc */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Leaf size={20} color="#2e8b57" /> Hướng Dẫn Chăm Sóc
            </h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Ánh Sáng</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Yêu cầu về ánh sáng..."
                  value={anhSang}
                  onChange={(e) => setAnhSang(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Chế Độ Nước</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Lịch tưới và lưu ý..."
                  value={cheDoNuoc}
                  onChange={(e) => setCheDoNuoc(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Đất Và Dinh Dưỡng</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Loại đất phù hợp..."
                  value={datVaDinhDuong}
                  onChange={(e) => setDatVaDinhDuong(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Độ An Toàn</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Lưu ý đối với trẻ em, vật nuôi..."
                  value={doAnToan}
                  onChange={(e) => setDoAnToan(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Thông Tin Nổi Bật */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Info size={20} color="#3b82f6" /> Thông Tin Nổi Bật
            </h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Ưu Điểm (Pros)</label>
                <textarea
                  className={styles.textarea}
                  style={{ minHeight: "120px" }}
                  placeholder="Mỗi dòng 1 ưu điểm..."
                  value={uuDiem}
                  onChange={(e) => setUuDiem(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nhược Điểm (Cons)</label>
                <textarea
                  className={styles.textarea}
                  style={{ minHeight: "120px" }}
                  placeholder="Mỗi dòng 1 nhược điểm..."
                  value={nhuocDiem}
                  onChange={(e) => setNhuocDiem(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <HelpCircle size={20} color="#f59e0b" /> Câu Hỏi Thường Gặp (FAQ)
            </h2>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={faq.id} className={styles.faqItem}>
                  <button
                    className={styles.removeFaqBtn}
                    onClick={() => handleRemoveFaq(faq.id)}
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div
                    className={styles.formGroup}
                    style={{ marginBottom: "12px", paddingRight: "30px" }}
                  >
                    <label>Câu hỏi #{index + 1}</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={faq.cauHoi}
                      onChange={(e) =>
                        handleFaqChange(faq.id, "cauHoi", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Câu trả lời</label>
                    <textarea
                      className={styles.textarea}
                      value={faq.cauTraLoi}
                      onChange={(e) =>
                        handleFaqChange(faq.id, "cauTraLoi", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              <button className={styles.addBtn} onClick={handleAddFaq}>
                <Plus size={18} /> Thêm Cặp Hỏi - Đáp
              </button>
            </div>
          </div>

          {/* Khuyến Mãi */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Tag size={20} color="#ef4444" /> Thông Tin Khuyến Mãi
            </h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Tên Khuyến Mãi</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="VD: Flash Sale Cuối Tuần"
                  value={tenKhuyenMai}
                  onChange={(e) => setTenKhuyenMai(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phần Trăm Giảm (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  className={styles.input}
                  placeholder="VD: 15.5"
                  value={phanTramGiam}
                  onChange={(e) =>
                    setPhanTramGiam(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className={styles.saveWrapper}>
            <button className={styles.saveBtn} onClick={handleSave}>
              {isSaved ? (
                <>
                  <Check size={20} /> Đã lưu thành công
                </>
              ) : (
                <>
                  <Save size={20} /> Lưu tất cả thông số
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* CSS cho spinner */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PlantDetailsManager;
