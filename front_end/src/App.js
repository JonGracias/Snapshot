import React, { useContext } from 'react';
import './App.css';
import Layout_Main from './Components/Layout_Main'
import { AppContextProvider } from './Components/Context/Context';

function App() {

  
  return (
    <AppContextProvider >
        <Layout_Main/>
    </AppContextProvider>
  );
}

export default App;
