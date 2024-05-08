import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getProducts } from "../../api/ProductsApi";
import whenCreatedAt from "../../helpers/createdAt";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateFilteredProducts = createAction(
  "products/updateFilteredProducts"
);

const initialState = {
  products: [],
  totalPriceBasket: 0,
  filteredProducts: [],
  status: "",
  error: null,
  cart: {
    items: [],
  },
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sort(state, action) {
      const { sortByType } = action.payload;
      let sortedProducts = state.filteredProducts
        ? [...state.filteredProducts]
        : [...state.products];

      switch (sortByType) {
        case "oldToNew":
          sortedProducts.sort(
            (a, b) => whenCreatedAt(a.createdAt) - whenCreatedAt(b.createdAt)
          );
          break;
        case "newToOld":
          sortedProducts.sort(
            (a, b) => whenCreatedAt(b.createdAt) - whenCreatedAt(a.createdAt)
          );
          break;
        case "priceHighToLow":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case "priceLowToHigh":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      state.filteredProducts = sortedProducts;
    },
    totalPrice(state) {
      let totalPrice = 0;
      state.cart.items.forEach((item) => {
        console.log(item.totalPrice, "item total");
        totalPrice += Number(item.totalPrice);
      });
      state.totalPriceBasket = totalPrice;
      console.log(state.totalPriceBasket, "totalprice");
      localStorage.setItem("totalPrice", state.totalPriceBasket);
    },
    updateTotalPrice(state, action) {
      let total = action.payload;
      state.totalPriceBasket = total;
    },

    addToCart(state, action) {
      const productToAdd = action.payload;

      const existingItem = state.cart.items.find(
        (item) => item.id === productToAdd.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        localStorage.setItem("carts", JSON.stringify(state.cart.items));
      } else {
        state.cart.items.push({
          ...productToAdd,
          quantity: productToAdd.quantity ? productToAdd.quantity : 1,
          totalPrice: productToAdd.price,
        });
        localStorage.setItem("carts", JSON.stringify(state.cart.items));
      }
    },
    deleteOrDecreaseFromCart(state, action) {
      const productToAdd = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.id === productToAdd.id
      );

      if (
        existingItem &&
        existingItem.quantity > 0 &&
        existingItem.quantity < 2
      ) {
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== existingItem.id
        );
        localStorage.setItem("carts", JSON.stringify(state.cart.items));
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        localStorage.setItem("carts", JSON.stringify(state.cart.items));
      }
    },

    IncreaseFromCart(state, action) {
      const productToAdd = action.payload;
      console.log(productToAdd, "product");
      const existingItem = state.cart.items.find(
        (item) => item.id === productToAdd.id
      );
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      localStorage.setItem("carts", JSON.stringify(state.cart.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateFilteredProducts, (state, action) => {
        state.filteredProducts = action.payload;
      });
  },
});

export const {
  sort,
  addToCart,
  deleteOrDecreaseFromCart,
  IncreaseFromCart,
  totalPrice,
  updateTotalPrice,
  } 
  = productsSlice.actions;

export default productsSlice.reducer;
