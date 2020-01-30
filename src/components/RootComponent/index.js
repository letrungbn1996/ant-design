import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { data } from '@/data/data';
import { Menu } from 'antd';

const { SubMenu } = Menu;

export class RootComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    console.log(data)
    return (
      <div>Hello</div>
    );
  }
}

export default RootComponent;

