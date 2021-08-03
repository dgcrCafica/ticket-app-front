import React, { useContext, useState } from 'react';

import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { UIContext } from '../context/UIContext';
import { ColaPage } from './ColaPage';
import { IngresarPage } from './IngresarPage';
import { EscritorioPage } from './EscritorioPage';
import { CrearTicketPage } from './CrearTicketPage';

const { Content, Sider } = Layout;

export const RouterPage = () => {

  const { ocultarMenu } = useContext( UIContext )

  const [ isCollapsed, setIsCollapsed ] = useState( false );

  const onCollapse = ( collapsed: boolean ) => {
    setIsCollapsed( collapsed );
  };

  return (
    <Router>
      <Layout style={{  }}>
        <Sider
          collapsible
          collapsed={ isCollapsed }
          onCollapse={ onCollapse }
          breakpoint='md'
          hidden={ ocultarMenu }
          style={{
            height: '100vh'
          }}
          // collapsedWidth='200'
        >
          <div className="logo" />

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to='/ingresar'>
                Ingresar
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to='/cola'>
                Cola
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
              <Link to='/crear'>
                Crear Ticket
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              // minHeight: 280,
            }}
          >
            <Switch>
              <Route path='/ingresar' component={ IngresarPage } />
              <Route path='/cola' component={ ColaPage } />
              <Route path='/crear' component={ CrearTicketPage } />
              <Route path='/escritorio' component={ EscritorioPage } />

              <Redirect to='/ingresar' />
            </Switch>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    </Router>
  )
}
