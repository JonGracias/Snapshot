import React, { useContext } from 'react';
import { Col } from 'antd';
import './styles/count.css'; // Replace with your CSS file that contains the custom styling
import AppContext from '../Context/Context';

const Count = () => {
  const { selectedButtons } = useContext(AppContext);
  const numberOfTables = selectedButtons.length;

  return (
    <>
      {Array.from({ length: numberOfTables }).map((_, i) => (
        <Col key={i} className="docCounter">
          <div className={`counts ${i === numberOfTables - 1 ? 'lighter' : ''}`} />
        </Col>
      ))}
    </>
  );
};

export default Count;
