import React, { useContext, useEffect, useState } from 'react';
import { Col, Pagination } from 'antd';
import './styles/count.css'; // Replace with your CSS file that contains the custom styling
import AppContext from '../Context/Context';

const Count = () => {
  const { setCurrentIndex, numberOfTables, setCurrentDateIndex } = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    setTotal(numberOfTables*10);
    setCurrent(numberOfTables);
    setCurrentIndex(numberOfTables-1);
  }, [numberOfTables]);

  const onChange = (page) => {
    setCurrent(page);
    setCurrentIndex(page-1);
    setCurrentDateIndex(0);
  };

  return (
    <>
        <Col  className="counts">
        {numberOfTables > 0 ? (
          <Pagination current={current} onChange={onChange} total={total} />
          ) : (
            <p>No tables available</p>
          )}
        </Col>

    </>
  );
};

export default Count;
