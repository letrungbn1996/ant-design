import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { data } from '@/data/data';
import { Menu, Button, Icon } from 'antd';
import { SettingOutlined, CalendarOutlined } from '@ant-design/icons';
import { router } from 'umi';
import styles from '@/components/SideBar/index.less';

const { SubMenu } = Menu;

export class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMenu: '',
      tab: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { location } = props;
    const { query } = location;
    const { menuActive, tab } = query;
    return {
      currentMenu: menuActive,
      tab,
    };
  }


  changeUrl = item => {
    const { location, changeTab } = this.props;
    router.push(`?menuActive=${item.path}&&tab=${item.parentMenuId}`)
    this.setState({
      currentMenu: item.path,
    })
    changeTab(item.path);
  }

  renderMenu = () => {
    const data2 = data.filter(item => item.parentMenuId === '4');
    const result = data2.map(item => (
      <SubMenu
        key={item.menuId}
        title={
          <span>
            { item.menuId === "1003" ? <SettingOutlined /> : <CalendarOutlined  /> }
            <span>{item.name}</span>
          </span>
        }
      >
        { data.filter(i => i.parentMenuId === item.menuId).map(r => (
          <Menu.Item key={r.path} onClick={() => this.changeUrl(r)}>{r.name}</Menu.Item>
        ))}
      </SubMenu>
    ))
    return result;
  }

  render() {
    const { currentMenu, tab } = this.state;
    return (
        <>
            <Menu
              mode="inline"
              theme="dark"
              className={styles['sidebar']}
              onOpenChange={this.onOpenChange}
              defaultSelectedKeys={[currentMenu]}
              defaultOpenKeys={[tab]}
            >
              {this.renderMenu()}
            </Menu>
        </>
      );
  }
}

export default SideBar;

