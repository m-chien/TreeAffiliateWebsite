import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteProduct {
  id: number;
  tenCay: string;
  tenTiengAnh: string;
  gia: number;
  anh: string;
  diemDanhGia: number;
  giaThamKhao: string;
  kichThuoc: string;
  danhMucList?: string[];
}

interface FavoritesState {
  products: FavoriteProduct[];
}

const initialState: FavoritesState = {
  products: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavoriteProduct: (state, action: PayloadAction<FavoriteProduct>) => {
      const exists = state.products.some((p) => p.id === action.payload.id);
      if (exists) {
        state.products = state.products.filter((p) => p.id !== action.payload.id);
      } else {
        state.products.push(action.payload);
      }
    },
    removeFavoriteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { toggleFavoriteProduct, removeFavoriteProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;
