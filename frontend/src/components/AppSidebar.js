import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import logo from '../assets/images/logo.png';
import { AppSidebarNav } from './AppSidebarNav';
import { useNavigate } from 'react-router-dom';
import adminNav from '../navigation/adminNav';
import moderatorNav from '../navigation/moderatorNav';
import studentNav from '../navigation/studentNav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const navigate = useNavigate();

  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('role') || 'guest';

    switch (role) {
      case 'admin':
        setNavigation(adminNav(navigate));
        break;
      case 'moderator':
        setNavigation(moderatorNav(navigate));
        break;
      case 'student':
        setNavigation(studentNav(navigate));
        break;
      default:
        setNavigation([]);
    }
  }, [navigate]);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom p-2">
        <CSidebarBrand to="/" className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
