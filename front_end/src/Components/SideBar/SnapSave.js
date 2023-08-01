import React, { useContext} from "react";
import { Typography, Form, Input, Button, Upload, message } from 'antd';

import AppContext from "../Context/Context";
import {
    CloseOutlined,
    UploadOutlined 
} from '@ant-design/icons';
import '../layout_main.css';

const { Title } = Typography;

const SnapSave = () => {
  const {
    setDisplay
  } = useContext(AppContext);
  const onFinish = (values) => {
    // Handle form submission here, e.g., upload the file and dateInput values
    console.log('Form values:', values);
    message.success('File uploaded successfully!');
  };

  const onUploadError = (error) => {
    console.error('File upload error:', error);
    message.error('An error occurred while uploading the file.');
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
      <div>
        <Title level={3}>File Upload</Title>
      </div>
      <div>
        <p>Drag and drop a file here</p>
      </div>
      <Form
        name="uploadForm"
        onFinish={onFinish}
        className="file"
        encType="multipart/form-data"
      >
        <Form.Item name="file" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
          <Upload.Dragger
            name="file"
            accept=".csv, .xlsx"
            beforeUpload={() => false}
            onError={onUploadError}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item
          name="dateInput"
          label="Date (MM/YYYY):"
          rules={[
            {
              required: true,
              message: 'Please enter a valid date (MM/YYYY)',
              pattern: /^\d{2}\/\d{4}$/,
            },
          ]}
        >
          <Input className="fileItem" />
        </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="uploadButton">
              Upload
            </Button>
          </Form.Item>
      </Form>
    </>
  );
};

export default SnapSave;
