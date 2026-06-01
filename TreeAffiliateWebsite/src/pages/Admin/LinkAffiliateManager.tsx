import React, { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Plus,
  Trash2,
  Save,
  Check,
  ShoppingBag,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import styles from "./LinkAffiliateManager.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlantOption {
  id: number;
  name: string;
}

interface LinkAffiliateDTO {
  id: number | string; // string dùng cho ID tạm thời của link mới thêm ở frontend
  cayCanhId: number | null;
  nhaCungCap: string;
  nenTang: string;
  linkAffiliate: string;
  linkAnh: string;
  giaGoc: number | "";
  moTa: string;
  trangThai: string;
  phanTramHoaHong: null;
  luotClick: null;
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

// Hàm hỗ trợ bóc tách mảng an toàn
const extractArray = <T,>(data: unknown): T[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data as T[];
  const parsed = data as { result?: T[] | { content?: T[] }; content?: T[] };
  if (parsed.result) {
    if (Array.isArray(parsed.result)) return parsed.result;
    if (parsed.result.content && Array.isArray(parsed.result.content)) {
      return parsed.result.content;
    }
  }
  if (parsed.content && Array.isArray(parsed.content)) return parsed.content;
  return [];
};

// ─── Component ────────────────────────────────────────────────────────────────

const LinkAffiliateManager: React.FC = () => {
  const [plantOptions, setPlantOptions] = useState<PlantOption[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [selectedPlantId, setSelectedPlantId] = useState<string>("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [links, setLinks] = useState<LinkAffiliateDTO[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  // ── 1. Load danh sách cây ───────────────────────────────────────────────────
  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoadingList(true);
      try {
        const res = await fetch(`${BASE_URL}/cay-canh?page=0&size=200`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error("Lỗi tải danh sách cây");
        const data = await res.json();
        const content = extractArray<{ id: number; tenCay: string }>(data);
        setPlantOptions(content.map((c) => ({ id: c.id, name: c.tenCay })));
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setIsLoadingList(false);
      }
    };
    fetchPlants();
  }, []);

  // ── 2. Load Link Affiliate theo cây ─────────────────────────────────────────
  useEffect(() => {
    if (!selectedPlantId) {
      setLinks([]);
      setDeletedIds([]);
      return;
    }

    const fetchLinks = async () => {
      setIsLoadingDetail(true);
      try {
        const res = await fetch(
          `${BASE_URL}/link-affiliate/cay-canh/${selectedPlantId}?page=0&size=100`,
          { headers: authHeaders() },
        );
        if (!res.ok) throw new Error("Lỗi tải link affiliate");
        const data = await res.json();

        const rawLinks = extractArray<LinkAffiliateDTO>(data);
        setLinks(
          rawLinks.map((link) => ({
            ...link,
            giaGoc: link.giaGoc || "",
            // Ép sẵn null cho 2 thuộc tính theo yêu cầu
            phanTramHoaHong: null,
            luotClick: null,
          })),
        );
        setDeletedIds([]);
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setIsLoadingDetail(false);
      }
    };
    fetchLinks();
  }, [selectedPlantId]);

  // ── 3. Handlers ─────────────────────────────────────────────────────────────
  const handleAddLink = () => {
    setLinks([
      ...links,
      {
        id: `TEMP_${Date.now()}`, // ID tạm bằng string để phân biệt với DB (number)
        cayCanhId: Number(selectedPlantId),
        nhaCungCap: "",
        nenTang: "",
        linkAffiliate: "",
        linkAnh: "",
        giaGoc: "",
        moTa: "",
        trangThai: "ACTIVE",
        phanTramHoaHong: null,
        luotClick: null,
      },
    ]);
  };

  const handleRemoveLink = (idToRemove: number | string) => {
    // Nếu là ID từ DB (number), đưa vào danh sách chờ xóa
    if (typeof idToRemove === "number") {
      setDeletedIds([...deletedIds, idToRemove]);
    }
    setLinks(links.filter((link) => link.id !== idToRemove));
  };

  const handleChange = (
    id: number | string,
    field: keyof LinkAffiliateDTO,
    value: string | number,
  ) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    );
  };

  // ── 4. Save (Create / Update / Delete) ──────────────────────────────────────
  const handleSave = async () => {
    if (!selectedPlantId) return;

    try {
      const apiCalls: Promise<any>[] = [];

      // 1. Xử lý các link bị xóa (DELETE)
      deletedIds.forEach((id) => {
        apiCalls.push(
          fetch(`${BASE_URL}/link-affiliate/${id}`, {
            method: "DELETE",
            headers: authHeaders(),
          }),
        );
      });

      // 2. Xử lý thêm mới (POST) và cập nhật (PUT)
      links.forEach((link) => {
        const payload = {
          cayCanhId: Number(selectedPlantId),
          nhaCungCap: link.nhaCungCap,
          nenTang: link.nenTang,
          linkAffiliate: link.linkAffiliate,
          linkAnh: link.linkAnh,
          giaGoc: link.giaGoc ? Number(link.giaGoc) : 0,
          moTa: link.moTa,
          trangThai: link.trangThai,
          phanTramHoaHong: null, // Bắt buộc null
          luotClick: null, // Bắt buộc null
        };

        if (typeof link.id === "string" && link.id.startsWith("TEMP_")) {
          // Là link mới -> POST
          apiCalls.push(
            fetch(`${BASE_URL}/link-affiliate`, {
              method: "POST",
              headers: authHeaders(),
              body: JSON.stringify(payload),
            }),
          );
        } else if (typeof link.id === "number") {
          // Là link cũ -> PUT
          apiCalls.push(
            fetch(`${BASE_URL}/link-affiliate/${link.id}`, {
              method: "PUT",
              headers: authHeaders(),
              body: JSON.stringify(payload),
            }),
          );
        }
      });

      // Chạy tất cả các API đồng thời
      await Promise.all(apiCalls);

      setIsSaved(true);
      setDeletedIds([]);
      setTimeout(() => setIsSaved(false), 3000);

      // (Tùy chọn) Reload lại dữ liệu để lấy ID thật từ DB cho các item vừa tạo
      // const reloadRes = await fetch(`${BASE_URL}/link-affiliate/cay-canh/${selectedPlantId}?page=0&size=100`, { headers: authHeaders() });
      // const reloadData = await reloadRes.json();
      // setLinks(extractArray<LinkAffiliateDTO>(reloadData));
    } catch (err) {
      console.error("Lỗi khi lưu dữ liệu:", err);
      alert("Đã xảy ra lỗi trong quá trình lưu dữ liệu.");
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý Link Affiliate</h1>
        <p className={styles.subtitle}>
          Thêm, sửa, xóa các đường dẫn liên kết bán hàng theo từng loại cây cảnh
        </p>
      </div>

      <div className={styles.selectCard}>
        <div className={styles.selectGroup}>
          <label>Chọn cây cảnh</label>
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
                {plant.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoadingDetail && (
        <div className={styles.loadingWrapper}>
          <Loader2 size={20} className={styles.spinner} />
          <span>Đang tải link liên kết...</span>
        </div>
      )}

      {selectedPlantId && !isLoadingDetail && (
        <div className={styles.formsWrapper}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <LinkIcon size={20} color="#f97316" /> Danh sách Liên kết Mua
                sắm
              </h2>
              <button className={styles.addBtn} onClick={handleAddLink}>
                <Plus size={18} /> Thêm Link Affiliate
              </button>
            </div>

            <div className={styles.linksList}>
              {links.length === 0 ? (
                <div className={styles.emptyState}>
                  Chưa có link affiliate nào cho cây này.
                </div>
              ) : (
                links.map((link, index) => (
                  <div key={link.id} className={styles.linkItem}>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveLink(link.id)}
                      title="Xóa link này"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Nhà Cung Cấp</label>
                        <div className={styles.inputIconWrapper}>
                          <ShoppingBag size={16} className={styles.inputIcon} />
                          <input
                            type="text"
                            className={styles.input}
                            placeholder="VD: Shopee, Tiki..."
                            value={link.nhaCungCap}
                            onChange={(e) =>
                              handleChange(
                                link.id,
                                "nhaCungCap",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Nền Tảng</label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="VD: Shopee, Lazada..."
                          value={link.nenTang}
                          onChange={(e) =>
                            handleChange(link.id, "nenTang", e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Link Affiliate (URL)</label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="https://shopee.vn/..."
                          value={link.linkAffiliate}
                          onChange={(e) =>
                            handleChange(
                              link.id,
                              "linkAffiliate",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Link Ảnh Banner/Sản phẩm</label>
                        <div className={styles.inputIconWrapper}>
                          <ImageIcon size={16} className={styles.inputIcon} />
                          <input
                            type="text"
                            className={styles.input}
                            placeholder="URL ảnh..."
                            value={link.linkAnh}
                            onChange={(e) =>
                              handleChange(link.id, "linkAnh", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Giá Gốc (VND)</label>
                        <input
                          type="number"
                          className={styles.input}
                          placeholder="230000"
                          value={link.giaGoc}
                          onChange={(e) =>
                            handleChange(
                              link.id,
                              "giaGoc",
                              e.target.value ? Number(e.target.value) : "",
                            )
                          }
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Trạng Thái</label>
                        <select
                          className={styles.input}
                          value={link.trangThai}
                          onChange={(e) =>
                            handleChange(link.id, "trangThai", e.target.value)
                          }
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>

                      <div
                        className={styles.formGroup}
                        style={{ gridColumn: "1 / -1" }}
                      >
                        <label>Mô Tả Sản Phẩm</label>
                        <textarea
                          className={styles.textarea}
                          placeholder="Nhập mô tả ngắn gọn..."
                          value={link.moTa}
                          onChange={(e) =>
                            handleChange(link.id, "moTa", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Save Area */}
          <div className={styles.saveWrapper}>
            <button className={styles.saveBtn} onClick={handleSave}>
              {isSaved ? (
                <>
                  <Check size={20} /> Đã lưu đồng bộ
                </>
              ) : (
                <>
                  <Save size={20} /> Lưu tất cả thay đổi
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkAffiliateManager;
