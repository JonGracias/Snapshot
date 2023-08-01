import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/Context';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Table } from 'antd'; // Import the Table component from ANT.design

import './styles/display.css';

function Tables() {
  const { tables } = useContext(AppContext);
  const [formattedTables, setFormattedTables] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Parse the JSON strings into actual objects
    const parsedTables = tables.map((jsonString) => JSON.parse(jsonString));
    setFormattedTables(parsedTables);
  }, [tables]);

  return (
    <>
      {formattedTables.length > 0 ? (
        <div>
          {/* Use the ANT.design Table component to render the JSON data */}
          <Table dataSource={formattedTables[0]} />
        </div>
      ) : (
        <p>No available tables.</p>
      )}
    </>
  );
}

export default Tables;
