import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';

const balanceSlice = createSlice({
  name: 'balance', // balance/get..
  initialState: {
    TokenWallet: '0', // wei转换
    TokenExchange: '0',
    EtherWallet: '0', // wei转换
    EtherExchange: '0',
  },
  reducers: {
    setTokenWallet(state, action) {
      state.TokenWallet = action.payload;
    },
    setTokenExchange(state, action) {
      state.TokenExchange = action.payload;
    },
    setEtherWallet(state, action) {
      state.EtherWallet = action.payload;
    },
    setEtherExchange(state, action) {
      state.EtherExchange = action.payload;
    },
  },
});
export const { setTokenWallet, setTokenExchange, setEtherWallet, setEtherExchange } =
  balanceSlice.actions;
export default balanceSlice.reducer;

export const loadBalanceData = createAsyncThunk(
  'balance/fetchBalanceData',
  async (data, { dispatch }) => {
    // console.log('data', data);
    const { web3, account, token, exchange } = data;
    // 获取钱包本账户的token
    const tokenWallet = await token.methods.balanceOf(account).call();
    // console.log('tokenWallet', tokenWallet);
    dispatch(setTokenWallet(tokenWallet));
    // 获取交易所的token
    const tokenExchange = await exchange.methods.balanceOf(token.options.address, account).call();
    // console.log('tokenExchange', tokenExchange);
    dispatch(setTokenExchange(tokenExchange));

    // 获取钱包的ether
    const etherWallet = await web3.eth.getBalance(account);
    // console.log('etherWallet', etherWallet);
    dispatch(setEtherWallet(etherWallet));

    // 获取交易所的ether
    const etherExchange = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call();
    // console.log('etherExchange', etherExchange);
    dispatch(setEtherExchange(etherExchange));
  },
);
