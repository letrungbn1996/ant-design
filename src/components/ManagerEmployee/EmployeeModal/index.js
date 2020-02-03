import React, { Component } from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import { Modal, Form, Button, Input, notification, Select } from 'antd';
import styles from '@/components/ManagerEmployee/index.less';
import { createEmployee, updateEmployee } from '@/services/employee';

const { Option } = Select;
const shortid = require('shortid');

export class EmployeeModal extends Component {
  componentDidMount() {
    const { loadEmployeeList } = this.props;
    loadEmployeeList();
  }

  onFinish = async fieldsValue => {
    const { closeEmployeeModal, loadEmployeeList, currentEmployee } = this.props;
    if (!currentEmployee.name) {
      fieldsValue.id = shortid.generate();
      const response = await createEmployee(fieldsValue);
      if (response.status === 201) {
        notification.success({
          message: 'Created',
          description: 'Create Employee Successfully',
        });
        loadEmployeeList();
        closeEmployeeModal();
      }
    } else {
      const response = await updateEmployee(currentEmployee.id, fieldsValue);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Update Employee Successfully',
        });
        loadEmployeeList();
        closeEmployeeModal();
      }
    }
  };

  render() {
    const { openEmployeeModal, closeEmployeeModal, currentEmployee } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <div>
        <Modal
          title={currentEmployee.name ? 'Update Employee' : 'Create Employee'}
          visible={openEmployeeModal}
          onOk={this.onFinish}
          onCancel={closeEmployeeModal}
          footer={null}
        >
          <Form
            name="form-employee"
            className={styles['form-employee']}
            onFinish={this.onFinish}
            {...formItemLayout}
            initialValues={{
              name: currentEmployee.name,
              gender: currentEmployee.gender,
              phone: currentEmployee.phone,
              email: currentEmployee.email,
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'Please input your Gender!',
                },
              ]}
            >
              <Select defaultValue="" style={{ width: 120 }}>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Wrong email format',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <div style={{ textAlign: 'end' }}>
              <Button style={{ marginRight: 15 }} onClick={closeEmployeeModal}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(({ employees }) => ({
  employeeList: employees.employees,
}))(EmployeeModal);
