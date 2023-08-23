

import {
    DownloadOutlined,
    LeftOutlined,
    MinusOutlined,
    PlusOutlined,
    RightOutlined,
    SearchOutlined as SearchIcon,
    SmileOutlined,
  } from '@ant-design/icons';
  import React, { useState } from 'react';
  import {
    Badge,
    Button,
    Cascader,
    Col,
    ConfigProvider,
    Divider,
    Input,
    InputNumber,
    Modal,
    Pagination,
    Radio,
    Rate,
    Row,
    Select,
    Space,
    Steps,
    Switch,
    Tree,
    TreeSelect,
  } from 'antd';


ConfigProvider.config({
    prefixCls: 'ant',
    iconPrefixCls: 'anticon',
  
    // 5.6.0+
    // Please use hooks version first
    theme: { token: { colorPrimary: 'red' } },
  });