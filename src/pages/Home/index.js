import React, { Component } from 'react';
import SideBar from '@/components/SideBar/index';
import ManagerDirectory from '@/components/ManagerDirectory/index';
import ManagerAccount from '@/components/ManagerAccount/index';
import ManagerMenu from '@/components/ManagerMenu/index';
import ManagerPost from '@/components/ManagerPost/index';
import ManagerCategory from '@/components/ManagerCategory/index';
import ManagerEmployee from '@/components/ManagerEmployee/index';
import UserGroup from '@/components/UserGroup/index';
import { SlackOutlined } from '@ant-design/icons';
import styles from '@/pages/Home/index.less';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: '',
    };
  }

  static getDerivedStateFromProps(props) {
    const { location } = props;
    const { query } = location;
    const { menuActive } = query;
    return {
      currentTab: menuActive,
    };
  }

  changeTab = tabActive => {
    this.setState({
      currentTab: tabActive,
    });
  };

  render() {
    const { currentTab } = this.state;
    const { location } = this.props;
    return (
      <>
        <div className={styles['header-tab']}>
          <SlackOutlined /> AWING
        </div>
        <div className={styles['content-tab']}>
          <SideBar
            location={location}
            changeTab={this.changeTab}
            className={styles['sidebar-tab']}
            currentTab={currentTab}
          />
          {currentTab === 'Employee' && <ManagerEmployee />}
          {currentTab === 'Directory' && <ManagerDirectory />}
          {currentTab === 'User' && <ManagerAccount />}
          {currentTab === 'UserGroup' && <UserGroup />}
          {currentTab === 'Menu' && <ManagerMenu />}
          {currentTab === 'Post' && <ManagerPost />}
          {currentTab === 'Category' && <ManagerCategory />}
        </div>
      </>
    );
  }
}

export default Home;
