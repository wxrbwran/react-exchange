import './App.css';

import Content from './views/Content';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Web3 from 'web3';

// console.log('token', token);
function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Content></Content>
      </div>
    </Provider>
  );
}

export default App;
