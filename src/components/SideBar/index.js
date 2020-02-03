import React, { Component } from 'react';
import { data } from '@/data/data';
import { Menu } from 'antd';
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

  static getDerivedStateFromProps(props) {
    const { location, currentTab } = props;
    const { query } = location;
    const { tab } = query;
    return {
      currentMenu: currentTab,
      tab,
    };
  }

  changeUrl = item => {
    const { changeTab } = this.props;
    router.push(`?menuActive=${item.path}&&tab=${item.parentMenuId}`);
    changeTab(item.path);
  };

  renderMenu = () => {
    const data2 = data.filter(item => item.parentMenuId === '4');
    const result = data2.map(item => (
      <SubMenu
        key={item.menuId}
        title={
          <span>
            {item.menuId === '1003' ? <SettingOutlined /> : <CalendarOutlined />}
            <span>{item.name}</span>
          </span>
        }
      >
        {data
          .filter(i => i.parentMenuId === item.menuId)
          .map(r => (
            <Menu.Item key={r.path} onClick={() => this.changeUrl(r)}>
              {r.name}
            </Menu.Item>
          ))}
      </SubMenu>
    ));
    return result;
  };

  render() {
    const { currentMenu, tab } = this.state;
    return (
      <>
        <Menu
          mode="inline"
          theme="dark"
          className={styles['sidebar-tab']}
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
