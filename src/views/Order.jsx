import { Row, Col, Card, Table } from 'antd';
import { useSelector } from 'react-redux';
import { fromWei } from '../utils/tools';
import useWeb3 from '../hooks/useWeb3';

// enum OrderStateEnum{
//   Create, // 0 创建
//   Cancel, // 1 取消
//   Fill // 2 完成
// }
const OrderStateEnum = {
  Create: '0',
  Cancel: '1',
  Fill: '2',
};
const Order = () => {
  const { web3, account } = useWeb3();
  const order = useSelector((s) => s.order);
  const orders = order.orders;
  console.log('orders', orders);
  // const cancelOrders = orders.filter((o) => o.orderState === OrderStateEnum.Cancel);
  const fillOrders = orders.filter((o) => o.orderState === OrderStateEnum.Fill);
  const myOrders = orders.filter(
    (o) => o.orderState === OrderStateEnum.Create && o.user === account,
  );
  const otherOrders = orders.filter(
    (o) => o.orderState === OrderStateEnum.Create && o.user !== account,
  );

  // console.log('cancelOrders', cancelOrders);
  console.log('fillOrders', fillOrders);
  console.log('myOrders', myOrders);
  console.log('otherOrders', otherOrders);

  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      render: (text) => new Date(+text * 1000).toLocaleString(),
      width: 170,
    },
    {
      title: 'QT',
      dataIndex: 'amountGet',
      render: (text) => fromWei(web3, text),
    },
    {
      title: 'ETH',
      dataIndex: 'amountGive',
      render: (text) => fromWei(web3, text),
    },
  ];
  return (
    <div className='mt-[10px]'>
      <Row>
        <Col span={8}>
          <Card
            title='已完成交易'
            bordered={false}
            className='m-[5px]'
          >
            <Table
              rowKey={(record) => record.id}
              dataSource={fillOrders}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='交易中-我的订单'
            className='m-[5px]'
            bordered={false}
          >
            <Table
              rowKey={(record) => record.id}
              dataSource={myOrders}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='交易中-他人订单'
            className='m-[5px]'
            bordered={false}
          >
            <Table
              rowKey={(record) => record.id}
              dataSource={otherOrders}
              columns={columns}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
