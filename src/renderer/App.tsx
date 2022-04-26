import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, MenuProps, Layout } from 'antd';
import {
  SyncOutlined,
  HistoryOutlined,
  ReloadOutlined,
  ProfileOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import './App.css';
import React from 'react';
import { ChangePage } from 'component/ChangePage';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Change', 'menu_change', <SyncOutlined />),
  getItem('Backup', 'menu_backup', <HistoryOutlined />),
  getItem('Restore', 'menu_restore', <ReloadOutlined />),
  getItem('License', 'menu_license', <ProfileOutlined />),
  getItem('Key license', 'menu_key_license', <KeyOutlined />),
];

const MainPage = () => {
  const [currentPage, setCurrentPage] = React.useState('menu_change');
  const onClick: MenuProps['onClick'] = e => {
    const key: string = e.key
    setCurrentPage(key)
  };
  let page: any;
  switch(currentPage) {
    case 'menu_change':
      page = <ChangePage />
      break
  }
  return (
    <Layout>
      <Sider collapsed={true}
        style={{
          backgroundColor: 'white',
          marginTop: '0px',
          marginBottom: '0px'}}>
        <Menu
          defaultSelectedKeys={[currentPage]}
          mode="inline"
          theme="light"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            padding: 24,
            minHeight: 280,
          }}>
          {page}
        </Content>
      </Layout>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
