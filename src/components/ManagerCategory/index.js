import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RootComponent from '@/components/RootComponent/index';
import SideBar from '@/components/SideBar/index';

export class ManagerCategory extends Component {

  render() {
    const { location } = this.props;
    return (
     <h1 style={{ padding : 20}}>ManagerCategory</h1>
    );
  }
}

export default ManagerCategory;

