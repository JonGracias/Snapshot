


import React, { useState, useContext, useEffect } from 'react';
import './layout_main.css';
import Browse from './SideBar/Browse'
import Navigation from './Navigation/Navigation'
import Pipeline from './Pipeline/Pipeline'
import SnapSearch from './SideBar/SnapSearch'
import SnapSave from './SideBar/SnapSave'
import AppContext from './Context/Context'
import {
  BorderBottomOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Button} from 'antd';

const { Header, Sider, Content } = Layout;

function Layout_Main() {

  const {
    collapsed,
    setCollapsed,
    snapDisplay
  } = useContext(AppContext);

  const [currentComponent, setCurrentComponent] = useState(null);

  function renderSwitch(param) {
    console.log(param)
    switch (param) {
      case 'Search':
        return <SnapSearch />;
      
      case 'Save':
        return <SnapSave />;
  
      default:
        return (
          <>
            <Navigation />
            <div className="divider"></div>
            <Pipeline />
          </>
        );
    }
  }
  
  useEffect(() => {
    setCurrentComponent(renderSwitch(snapDisplay));
  }, [snapDisplay]);
return (
    <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>

            <Browse/>

        </Sider>
        <Layout>
          <Header style={{ padding: 0, borderBottom:'1px solid white'}}>
              <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                  borderBottom:'1px solid white'
              }}
              />
              <div className='snapshot'>
                <h1>Snapshot</h1>
              </div>
          </Header>

        <div className='workContainer'>
          {currentComponent}
        </div>
        </Layout>
    </Layout>
  );
}

export default Layout_Main;