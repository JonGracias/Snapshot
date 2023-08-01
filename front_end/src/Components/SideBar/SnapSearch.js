import React, { useContext} from "react";
import { Input, Button } from 'antd';
import AppContext from "../Context/Context";
import {
    CloseOutlined
} from '@ant-design/icons';
import '../layout_main.css';




function SnapSearch() {
    const {
        setDisplay
      } = useContext(AppContext);


  const handleSearch = (value) => {
    // Implement your search logic here
    console.log('Search query:', value);
  };

  function CloseSearch(){
    setDisplay('default')
  }

  return (
    <>
        <div className="closeButton">
            <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={CloseSearch}
            />
        </div>
        <form id="searchForm" onSubmit={(e) => { e.preventDefault(); handleSearch(e.target.searchInput.value); }}>
            <Input id="searchInput" placeholder="Search..." />
            <Button htmlType="submit">Search</Button>
        </form>
    </>
  );
}

export default SnapSearch;
