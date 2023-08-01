const fromWei = (web3, bn) => {
  return web3.utils.fromWei(bn, 'ether');
};

const toWei = (web3, amount) => {
  return web3.utils.toWei(`${amount}`, 'ether');
};

module.exports = {
  fromWei,
  toWei,
};
