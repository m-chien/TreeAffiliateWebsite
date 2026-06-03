// ==========================================
// API Service - Affiliate Orders
// Base URL: http://localhost:8080
// ==========================================

const API_BASE_URL = "http://localhost:8080/api/v1";

export interface AffiliateOrderDTO {
  id: number;
  linkAffiliateId: number;
  tenSanPham?: string;
  nenTang: 'Shopee' | 'TikTok' | 'OTHER' | string;
  maCode: string;
  giaTriDonHang: number;
  hoaHong: number;
  trangThai: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'CANCELLED' | string;
  ngayDat: string;
  ngayCapNhat: string;
  productName?: string; // Mapped on frontend
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
  trangThai: "ACTIVE" | "INACTIVE" | string;
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

/**
 * Lấy tất cả đơn hàng từ backend
 */
export async function fetchAllAffiliateOrders(page = 0, size = 1000): Promise<AffiliateOrderDTO[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/affiliate-order?page=${page}&size=${size}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiResponse<PageResponse<AffiliateOrderDTO>> = await res.json();
    return data.result.content || [];
  } catch (err) {
    console.error("[affiliateOrderService] fetchAllAffiliateOrders error:", err);
    return [];
  }
}

/**
 * Lấy danh sách link affiliate
 */
export async function fetchAllLinkAffiliates(page = 0, size = 1000): Promise<LinkAffiliateDTO[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/link-affiliate?page=${page}&size=${size}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiResponse<PageResponse<LinkAffiliateDTO>> = await res.json();
    return data.result.content || [];
  } catch (err) {
    console.error("[affiliateOrderService] fetchAllLinkAffiliates error:", err);
    return [];
  }
}

/**
 * Lưu đơn hàng vào database
 */
export async function createAffiliateOrder(order: {
  linkAffiliateId: number;
  nenTang: string; // e.g. "Shopee", "TikTok"
  maCode: string;
  giaTriDonHang: number;
  hoaHong: number;
  trangThai?: string;
  ngayDat?: string;
}): Promise<AffiliateOrderDTO | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/affiliate-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiResponse<AffiliateOrderDTO> = await res.json();
    return data.result;
  } catch (err) {
    console.error("[affiliateOrderService] createAffiliateOrder error:", err);
    return null;
  }
}
