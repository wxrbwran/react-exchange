import { useEffect } from 'react';
import useWeb3 from '../hooks/useWeb3';
import Balance from './Balance';
import { Spin } from 'antd';
import Order from './Order';
import { useDispatch } from 'react-redux';
import { loadBalanceData } from '../redux/slices/balanceSlice';
import { loadOrderData } from '../redux/slices/orderSlice';

const Content = () => {
  const { web3, account, token, exchange } = useWeb3();
  const dispatch = useDispatch();

  const start = async () => {
    // 1. 获取连接后的合约
    dispatch(loadBalanceData({ web3, account, token, exchange }));

    // 2. 获取资产信息
    // 3. 获取订单信息
    dispatch(loadOrderData({ web3, exchange }));
  };
  useEffect(() => {
    if (web3 && exchange && dispatch) {
      start();

      exchange.events.Order({}, (err, event) => {
        dispatch(loadOrderData({ web3, exchange }));
      });
      exchange.events.Cancel({}, (err, event) => {
        dispatch(loadOrderData({ web3, exchange }));
      });
      exchange.events.Fill({}, (err, event) => {
        start();
      });
    }
  }, [web3, exchange, dispatch]);
  useEffect(() => {}, []);
  return web3 ? (
    <div>
      <Balance></Balance>
      <Order></Order>
    </div>
  ) : (
    <Spin></Spin>
  );
};

export default Content;
