/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter,Link } from 'react-router-dom';
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          {/*<a href="/login">Signin</a>*/}
          <Link to={'/login'}>Signin</Link>
        </Menu.Item>

        <Menu.Item key="app">

            <Link to={'/register'}>Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
          <Menu.Item key="upload">

              <Link to={'/video/upload'}>Upload</Link>
          </Menu.Item>

          <SubMenu title={<span>Profile</span>}>
                  <Menu.Item key="setting:1">{user.userData?user.userData.name:'userName'}</Menu.Item>
                 <Menu.Item key="logout">
                  <Link onClick={logoutHandler}>Logout</Link>
                </Menu.Item>
          </SubMenu>

      </Menu>
    )
  }
}

export default withRouter(RightMenu);

