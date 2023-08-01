import React, { useContext, useEffect, useRef} from "react";
import axios from "axios";
import AppContext from "../Context/Context";
import {
  FileAddOutlined,
  FileSearchOutlined,
  SearchOutlined,
  SaveOutlined
} from '@ant-design/icons';
import {Menu, Button} from 'antd';
import '../layout_main.css';


const Browse = () => {
  const {
    collapsed,
    setCurrentIndex,
    resultsList,
    setResultsList,
    selectedButtons,
    setSelectedButtons,
    setTitle,
    setDates,
    setDisplay,
    setTables
  } = useContext(AppContext);

  const responseDataRef = useRef([]);
  const previousSelectedButtons = useRef([]);
  const currentIndexRef = useRef(0);

  // Function to fetch data and set state using Axios
  const fetchDataAndSetState = (items) => {
    axios
      .post("http://localhost:5000/navigation", { clickedItems: items })
      .then((response) => {
        const { titles, dates, tables } = response.data;
        setDates(dates);
        setTables(tables)

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Function to fetch data from the backend
    const browseDB = () => {
      axios
        .get("http://localhost:5000/browseDB")
        .then((response) => {
          responseDataRef.current = response.data;
          setResultsList(responseDataRef.current);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    if (responseDataRef.current.length === 0) {
      browseDB();
    } else {
      setResultsList(responseDataRef.current);
    }
  }, []);

  useEffect(() => {
    setCurrentIndex(currentIndexRef.current - 1);
    setTitle(selectedButtons[currentIndexRef.current - 1]);
  }, [currentIndexRef.current, setTitle, selectedButtons, setCurrentIndex, setDates]);

  // Function to handle selecting files
  const selectFiles = (itemName) => {
    previousSelectedButtons.current = selectedButtons.slice();
    if (previousSelectedButtons.current.includes(itemName)) {
      const updatedSelectedButtons = previousSelectedButtons.current.filter((item) => item !== itemName);
      setSelectedButtons(updatedSelectedButtons);
      fetchDataAndSetState(updatedSelectedButtons);
      currentIndexRef.current = currentIndexRef.current - 1;
    } else {
      setSelectedButtons([...previousSelectedButtons.current, itemName]);
      fetchDataAndSetState([...previousSelectedButtons.current, itemName]);
      currentIndexRef.current = currentIndexRef.current + 1;
    }
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      label,
    };
  }
  const search = getItem('Search', 'sub1', <SearchOutlined />);
  const save = getItem('Save', 'sub3',<SaveOutlined />);
  
    const files = resultsList.map((item, index) => ({
      key: index, 
      icon: <FileAddOutlined />, 
      label: item, 
    }));


    function changeDisplay(item){
      console.log(item)
      setDisplay(item)
    }


  
    return (
      <>
        <Menu theme="dark" mode="inline">
          <Menu.Item key={0} icon={search.icon} className={'listStyles'} onClick={() => changeDisplay(search.label)}>
            {search.label}
          </Menu.Item>
          </Menu>
            <Menu theme="dark" mode="inline" className={`flexGrowContainer`}>
              {files.map((item) => (
                <Menu.Item
                key={item.key}
                icon={item.icon}
                className={selectedButtons.includes(item.label) ? "selected" : ""}
                onClick={() => selectFiles(item.label)}
              >
                {item.label}
              </Menu.Item>
              ))}
            </Menu>
          <Menu theme="dark" mode="inline">
          <Menu.Item key={0} icon={save.icon} className={'listStyles'} onClick={() => changeDisplay(save.label)}>
                {save.label} 
          </Menu.Item>
          </Menu>
      </>
    );
  };
  
  export default Browse;
