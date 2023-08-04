import { useSelector } from 'react-redux';
import { fromWei } from '../utils/tools';
import useWeb3 from '../hooks/useWeb3';
import { Card, Col, Row, Statistic } from 'antd';

const Balance = () => {
  const state = useSelector((s) => s.balance);
  const { web3 } = useWeb3();
  // console.log('state', state);
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='钱包中eth:'
              value={fromWei(web3, state.EtherWallet)}
              precision={3}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='钱包中token'
              value={fromWei(web3, state.TokenWallet)}
              precision={3}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='交易所中eth'
              value={fromWei(web3, state.EtherExchange)}
              precision={3}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='交易所中token'
              value={fromWei(web3, state.TokenExchange)}
              precision={3}
            />
          </Card>
        </Col>
      </Row>
      {/* <h3>钱包中eth: {fromWei(web3, state.EtherWallet)}</h3>
      <h3>钱包中token: {fromWei(web3, state.TokenWallet)}</h3>
      <h3>交易所中eth: {fromWei(web3, state.EtherExchange)}</h3>
      <h3>交易所中token: {fromWei(web3, state.TokenExchange)}</h3> */}
    </div>
  );
};

export default Balance;
