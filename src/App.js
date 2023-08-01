import { useEffect } from 'react';
import './App.css';
import tokenJSON from './build/Qtum.json';
import exchangeJSON from './build/Exchange.json';

import Content from './views/Content';
import useWeb3 from './hooks/useWeb3';
// import Web3 from 'web3';

// console.log('token', token);
function App() {
  const { web3 } = useWeb3();
  const initWeb = async () => {
    const accounts = await web3.eth.requestAccounts();
    console.log('accounts: ', accounts);
    // 获取networkid
    const networkId = await web3.eth.net.getId();
    console.log('networkId', networkId);

    const token = await new web3.eth.Contract(tokenJSON.abi, tokenJSON.networks[networkId].address);
    const exchange = await new web3.eth.Contract(
      exchangeJSON.abi,
      exchangeJSON.networks[networkId].address,
    );

    console.log('token', token);
    console.log('exchange', exchange);
  };
  const start = async () => {
    // 1. 获取连接后的合约
    await initWeb();
    // 2. 获取资产信息
    // 3. 获取订单信息
  };
  useEffect(() => {
    start();
  }, []);
  return (
    <div className='App'>
      <Content></Content>
    </div>
  );
}

export default App;
