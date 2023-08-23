import React, { useContext } from 'react';
import './App.css';
import Layout_Main from './Components/Layout_Main'
import { AppContextProvider } from './Components/Context/Context';
import { ConfigProvider } from 'antd';

function App() {

  
  return (
    <ConfigProvider direction='ltr'>      
      <AppContextProvider >
          <Layout_Main/>
      </AppContextProvider>
    </ConfigProvider>
  );
}

export default App;
