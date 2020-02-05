import React, { Component } from 'react';
import { data } from '@/data/data';
import { Menu } from 'antd';
import { SettingOutlined, CalendarOutlined } from '@ant-design/icons';
import { router } from 'umi';
import styles from '@/components/SideBar/index.less';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['1003', '4'];

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: '',
      openKeys: ['1003'],
    };
  }

  componentWillMount() {
    const { location, currentTab } = this.props;
    const { query } = location;
    const { tab } = query;
    this.setState({
      currentMenu: currentTab,
      openKeys: tab ? [tab] : ['1003'],
    })
  }

  changeUrl = item => {
    const { changeTab } = this.props;
    router.push(`?menuActive=${item.path}&&tab=${item.parentMenuId}`);
    changeTab(item.path);
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      const currentKeys = openKeys.filter(i => i === latestOpenKey);
      this.setState({ openKeys: currentKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

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
    const { currentMenu } = this.state;
    return (
      <>
        <Menu
          mode="inline"
          theme="dark"
          className={styles['sidebar-tab']}
          onOpenChange={this.onOpenChange}
          defaultSelectedKeys={[currentMenu]}
          openKeys={this.state.openKeys}
        >
          {this.renderMenu()}
        </Menu>
      </>
    );
  }
}

export default SideBar;
