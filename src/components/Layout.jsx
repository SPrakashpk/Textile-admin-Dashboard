import AppNavbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.scss'; 

function Layout() {
  return (
    <>
      <AppNavbar />
      <div className="layout-container d-flex" style={{ paddingTop: '80px' }}>
        <Sidebar />
        <div  className="main-div">
          <Outlet  />
        </div>
      </div>
    </>
  );
}

export default Layout;
