import { createContext, useState, useEffect } from "react";
  
const AppContext = createContext({});
  
  
export const AppContextProvider = ({ children }) => {
    const [ int_dict, setIntDict] = useState([])
    const [ int_dates, setIntDates] = useState([])
    const [ number_of_tables, setNumberOfTables] = useState([])
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ selectedButtons, setSelectedButtons ] = useState([]);
    const [ resultsList, setResultsList ] = useState([]);
    const [ title, setTitle ] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        setIntDates(['05/2020','05/2021'])

      }, []);
    
    return (
        <AppContext.Provider value={{
            currentIndex   , setCurrentIndex,
            selectedButtons, setSelectedButtons,
            resultsList    , setResultsList,
            title, setTitle,
            int_dict, setIntDict,
            int_dates, setIntDates,
            number_of_tables, setNumberOfTables,
        }}>
            {children}
        </AppContext.Provider>
    )
}
  
export default AppContext;
