import { createContext, useState} from "react";
  
const AppContext = createContext({});
  
  
export const AppContextProvider = ({ children }) => {
    const [ tables, setTables] = useState([])
    const [ dates, setDates] = useState([])
    const [ number_of_tables, setNumberOfTables] = useState([])
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ selectedButtons, setSelectedButtons ] = useState([]);
    const [ resultsList, setResultsList ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const [snapDisplay, setDisplay] = useState('');
    const [currentDatIndex, setCurrentDateIndex] = useState(0)


    return (
        <AppContext.Provider value={{
            currentIndex   , setCurrentIndex,
            selectedButtons, setSelectedButtons,
            resultsList    , setResultsList,
            title, setTitle,
            dates, setDates,
            number_of_tables, setNumberOfTables,
            collapsed, setCollapsed,
            snapDisplay, setDisplay,
            tables, setTables
        }}>
            {children}
        </AppContext.Provider>
    )
}
  
export default AppContext;
