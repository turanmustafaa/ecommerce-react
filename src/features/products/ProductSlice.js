import { createSlice, createAsyncThunk,createAction } from '@reduxjs/toolkit';
import { getProducts } from '../../api/ProductsApi';

// Asenkron olarak ürünleri almak için thunk oluşturucu
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await getProducts();
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

// Ürünleri filtrelemek için kullanılan eylem oluşturucu
export const updateFilteredProducts = createAction('products/updateFilteredProducts');

// Products slice'ı için başlangıç durumu
const initialState = {
  products: [],
  totalPriceBasket : null,
  filteredProducts: [], // Filtrelenmiş ürünler için boş bir dizi
  status: '',
  error: null,
  cart: {
    items: []
  }
};


// Products slice'ı oluşturucu
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // SortBy türüne göre ürünleri sıralama
    sort(state, action) {
      const { sortByType } = action.payload;
      let sortedProducts = [...state.products];

      switch (sortByType) {
        case 'oldToNew':
          sortedProducts.sort((a, b) => a.createdAt - b.createdAt);
          break;
        case 'newToOld':
          sortedProducts.sort((a, b) => b.createdAt - a.createdAt);
          break;
        case 'priceHighToLow':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'priceLowToHigh':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      state.filteredProducts = sortedProducts;
    },
    totalPrice(state) {
        // Sepetteki her ürünün toplam fiyatını hesapla
        let totalPrice = 0;
        state.cart.items.forEach(item => {
            totalPrice += Number(item.totalPrice);
        });
    
        // Toplam fiyatı state içinde güncelle
        state.totalPriceBasket = totalPrice;
        console.log(state.totalPriceBasket,'totalprice')
        localStorage.setItem('totalPrice' ,state.totalPriceBasket)
    },
    
    addToCart(state, action) {
      const productToAdd = action.payload;

      const existingItem = state.cart.items.find((item) => item.id === productToAdd.id);
        
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price
        localStorage.setItem('carts', JSON.stringify(state.cart.items))

      } else {
        state.cart.items.push({ ...productToAdd, quantity: productToAdd.quantity ? productToAdd.quantity : 1 ,totalPrice : productToAdd.price });
        localStorage.setItem('carts', JSON.stringify(state.cart.items))
      }
    },
    deleteOrDecreaseFromCart(state, action) {
      const productToAdd = action.payload;
      const existingItem = state.cart.items.find((item) => item.id === productToAdd.id);
        
      if (existingItem && existingItem.quantity > 0 && existingItem.quantity < 2) {
        state.cart.items = state.cart.items.filter(item => item.id !== existingItem.id )
        localStorage.setItem('carts', JSON.stringify(state.cart.items))

      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.quantity * existingItem.price
        localStorage.setItem('carts', JSON.stringify(state.cart.items))
      }
    },

    IncreaseFromCart(state, action) {
      const productToAdd = action.payload;
      console.log(productToAdd,'product')
      const existingItem = state.cart.items.find((item) => item.id === productToAdd.id);
        existingItem.quantity++
        existingItem.totalPrice = existingItem.quantity * existingItem.price
        localStorage.setItem('carts', JSON.stringify(state.cart.items))

    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFilteredProducts, (state, action) => {

        state.filteredProducts = action.payload;
      });
  },
});

export const { sort, addToCart,deleteOrDecreaseFromCart,IncreaseFromCart,totalPrice } = productsSlice.actions; // SortBy ve addToCart eylemlerini dışa aktar

export default productsSlice.reducer;
