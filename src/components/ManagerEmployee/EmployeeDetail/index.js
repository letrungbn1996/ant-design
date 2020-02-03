import React, { Component } from 'react';
import { connect } from 'dva';
import { Descriptions, Modal } from 'antd';

export class ManagerUser extends Component {
  render() {
    const { openEmployeeDetail, currentEmployee, closeEmployeeDetail } = this.props;
    return (
      <Modal
        title=""
        visible={openEmployeeDetail}
        onOk={this.onFinish}
        onCancel={closeEmployeeDetail}
        footer={null}
      >
        <Descriptions title="User Info">
          <Descriptions.Item label="Name">{currentEmployee.name}</Descriptions.Item>
          <Descriptions.Item label="Gender">{currentEmployee.gender}</Descriptions.Item>
          <Descriptions.Item label="Phone">{currentEmployee.gender}</Descriptions.Item>
          <Descriptions.Item label="Email">{currentEmployee.email}</Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}

export default connect(({ employees }) => ({
  employeeList: employees.employees,
}))(ManagerUser);
