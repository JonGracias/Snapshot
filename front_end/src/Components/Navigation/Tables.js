import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/Context';

import { Empty } from 'antd'; // Import the Table component from ANT.design

import './styles/tables.css';

function Tables() {
  const { tables, currentIndex, currentDateIndex } = useContext(AppContext);
  const [formattedTables, setFormattedTables] = useState([]);

  useEffect(() => {
    //Index 0 here is based on title index
    setFormattedTables(tables[currentIndex]);
  }, [tables,currentIndex]);

  return (
    <>

      {formattedTables ? (
        // Index 0 here is based on date index
        <div className='dataframe' dangerouslySetInnerHTML={{ __html: formattedTables[currentDateIndex] }}/>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={'emptyTable'} /> // Render Empty component when formattedTables is empty
      )}

    </>
  );
}

export default Tables;
