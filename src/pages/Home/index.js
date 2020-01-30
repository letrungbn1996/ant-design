import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RootComponent from '@/components/RootComponent/index';
import SideBar from '@/components/SideBar/index';
import ManagerDirectory from '@/components/ManagerDirectory/index';
import ManagerAccount from '@/components/ManagerAccount/index';
import ManagerMenu from '@/components/ManagerMenu/index';
import ManagerPost from '@/components/ManagerPost/index';
import ManagerCategory from '@/components/ManagerCategory/index';
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

  static getDerivedStateFromProps(props, state) {
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
    })
  }



  render() {
    const { currentTab } = this.state;
    const { location } = this.props;
    console.log(currentTab)
    return (
      <>
        <div className={styles['header']}>
          <SlackOutlined /> AWING
        </div>
        <div className={styles['content']}>
          <SideBar
            location={location}
            changeTab={this.changeTab}
            className={styles['sidebar']}
          />
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

