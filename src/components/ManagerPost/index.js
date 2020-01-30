import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RootComponent from '@/components/RootComponent/index';
import SideBar from '@/components/SideBar/index';

export class ManagerPost extends Component {

  render() {
    const { location } = this.props;
    return (
     <h1 style={{ padding : 20}}>ManagerPost</h1>
    );
  }
}

export default ManagerPost;

