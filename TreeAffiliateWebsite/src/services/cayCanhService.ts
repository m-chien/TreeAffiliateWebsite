// ==========================================
// API Service - Cây Cảnh & Link Affiliate
// Base URL: http://localhost:8080
// ==========================================

const API_BASE_URL = "http://localhost:8080/api/v1";

// ---------- Types từ Backend ----------

export interface CayCanhDTO {
  id: number;
  tenCay: string;
  tenTiengAnh: string | null;
  gia: number | null;
  moTa: string | null;
  anh: string | null;
  trangThai: "Active" | "Inactive" | string;
  mucTraHoaHong: number | null;
  diemDanhGia: number | null;
  luotXem: number | null;
  ngayTao: string | null;
  giaThamKhao: string | null;
  anToanChoThuCung: boolean | null;
  anhSangCanThiet: string | null;
  locKhongKhi: boolean | null;
  doKhoChamSoc: number | null;
  kichThuoc: string | null;
}

export interface LinkAffiliateDTO {
  id: number;
  cayCanhId: number;
  nhaCungCap: string;
  linkAffiliate: string;
  linkAnh: string | null;
  giaGoc: number | null;
  moTa: string | null;
  ngayTao: string | null;
  trangThai: "Active" | "Inactive" | string;
  nenTang: "Shopee" | "TikTok" | string;
  phanTramHoaHong: number | null;
  luotClick: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

// ---------- Map CayCanhDTO -> Plant (dùng trong ComparisonPage) ----------

export interface PlantForComparison {
  id: string;
  name: string;
  image: string;
  light_requirement: string;
  care_difficulty: number;
  air_purifying: number;
  pet_friendly: boolean;
  price: string;
  affiliate_link: string;
  moTa?: string;
  diemDanhGia?: number;
}

// Chuyển locKhongKhi (boolean) sang thang điểm 1-5 để hiển thị
function mapAirPurifying(locKhongKhi: boolean | null): number {
  return locKhongKhi ? 4 : 1;
}

export function mapCayCanhToPlant(
  cayCanh: CayCanhDTO,
  affiliateLink?: string
): PlantForComparison {
  return {
    id: String(cayCanh.id),
    name: cayCanh.tenCay,
    image: cayCanh.anh || "/images/main-plant.png",
    light_requirement: cayCanh.anhSangCanThiet || "Ánh sáng trung bình",
    care_difficulty: cayCanh.doKhoChamSoc ?? 3,
    air_purifying: mapAirPurifying(cayCanh.locKhongKhi),
    pet_friendly: cayCanh.anToanChoThuCung ?? false,
    price: cayCanh.giaThamKhao || (cayCanh.gia ? `${cayCanh.gia.toLocaleString("vi-VN")}₫` : "Liên hệ"),
    affiliate_link: affiliateLink || "https://shopee.vn",
    moTa: cayCanh.moTa ?? undefined,
    diemDanhGia: cayCanh.diemDanhGia ?? undefined,
  };
}

// ---------- API Functions ----------

/**
 * Lấy danh sách cây cảnh (có phân trang)
 */
export async function fetchAllCayCanh(
  page = 0,
  size = 100
): Promise<CayCanhDTO[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/cay-canh?page=${page}&size=${size}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiResponse<PageResponse<CayCanhDTO>> = await res.json();
    return data.result.content;
  } catch (err) {
    console.error("[cayCanhService] fetchAllCayCanh error:", err);
    return [];
  }
}

/**
 * Lấy một cây cảnh theo ID
 */
export async function fetchCayCanhById(id: number): Promise<CayCanhDTO | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/cay-canh/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiResponse<CayCanhDTO> = await res.json();
    return data.result;
  } catch (err) {
    console.error(`[cayCanhService] fetchCayCanhById(${id}) error:`, err);
    return null;
  }
}

/**
 * Lấy link affiliate của một cây cảnh
 * Trả về link affiliate đầu tiên đang ACTIVE
 */
export async function fetchAffiliateLinkByCayCanhId(
  cayCanhId: number
): Promise<string> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/link-affiliate/cay-canh/${cayCanhId}?page=0&size=10`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiResponse<PageResponse<LinkAffiliateDTO>> = await res.json();
    const activeLinks = data.result.content.filter(
      (l) => l.trangThai === "Active"
    );
    return activeLinks[0]?.linkAffiliate || "https://shopee.vn";
  } catch (err) {
    console.error(
      `[cayCanhService] fetchAffiliateLinkByCayCanhId(${cayCanhId}) error:`,
      err
    );
    return "https://shopee.vn";
  }
}

/**
 * Fetch đầy đủ thông tin cây để dùng ở ComparisonPage
 * (bao gồm thông tin cây + link affiliate)
 */
export async function fetchPlantForComparison(
  cayCanhId: number
): Promise<PlantForComparison | null> {
  const [cayCanh, affiliateLink] = await Promise.all([
    fetchCayCanhById(cayCanhId),
    fetchAffiliateLinkByCayCanhId(cayCanhId),
  ]);
  if (!cayCanh) return null;
  return mapCayCanhToPlant(cayCanh, affiliateLink);
}
