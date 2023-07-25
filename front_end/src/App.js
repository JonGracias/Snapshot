import './App.css';
import SideBar from './Components/SideBar/SideBar'
import Navigation from './Components/Navigation/Navigation'
import Pipeline from './Components/Pipeline/Pipeline'
import { AppContextProvider } from './Components/Context/Context';

function App() {
  return (
    <AppContextProvider >
      <div className='hero'>
        <SideBar/>
        <div className='workContainer'>
          <Navigation/>
          <div className="divider"></div>
          <Pipeline/>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
