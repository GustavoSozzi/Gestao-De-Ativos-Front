import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../Header/Header';
import styles from './Layout.module.css'; 
import { LayoutContext } from '../../Hooks/LayoutContext';

const Layout = () => {
  const { pageTitle } = React.useContext(LayoutContext);

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Header title={pageTitle} />
        <div className={styles.pageWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;