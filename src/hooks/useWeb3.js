import Web3 from 'web3';
import tokenJSON from '../build/Qtum.json';
import exchangeJSON from '../build/Exchange.json';
import { useEffect, useState } from 'react';

const useWeb3 = () => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
  const [account, setAccount] = useState('');
  const [token, setToken] = useState();
  const [exchange, setExchange] = useState();

  const initWeb = async () => {
    const accounts = await web3.eth.requestAccounts();
    // console.log('accounts: ', accounts);
    setAccount(accounts[0]);
    // 获取networkid
    const networkId = await web3.eth.net.getId();
    // console.log('networkId', networkId);

    const token = await new web3.eth.Contract(tokenJSON.abi, tokenJSON.networks[networkId].address);
    const exchange = await new web3.eth.Contract(
      exchangeJSON.abi,
      exchangeJSON.networks[networkId].address,
    );
    setToken(token);
    setExchange(exchange);
  };
  useEffect(() => {
    // console.log('initWeb11');
    initWeb();
  }, []);
  // console.log('token', token);
  // console.log('exchange', exchange);
  return {
    web3,
    account,
    token,
    exchange,
  };
};

export default useWeb3;
