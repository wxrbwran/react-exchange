import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;

export const loadOrderData = createAsyncThunk(
  'order/fetchOrderData',
  async (data, { dispatch }) => {
    console.log('data fetchOrderData', data);
    const { exchange } = data;
    // orders
    // 获取交易所的orders

    const allOrders = await exchange.methods.getAllOrders().call();
    console.log('allOrders', allOrders);
    dispatch(setOrders(allOrders.filter((o) => o.id !== '0')));
    // console.log('tokenExchange', tokenExchange);
  },
);

export default orderSlice.reducer;
