import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, notification, Popconfirm } from 'antd';
import styles from '@/components/ManagerEmployee/index.less';
import EmployeeModal from '@/components/ManagerEmployee/EmployeeModal/index';
import EmployeeDetail from '@/components/ManagerEmployee/EmployeeDetail/index';
import { deleteEmployee } from '@/services/employee';

export class ManagerUser extends Component {
  state = {
    openEmployeeModal: false,
    currentEmployee: {},
  };

  componentDidMount() {
    this.loadEmployeeList();
  }

  loadEmployeeList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'employees/fetchEmployeeList',
    });
  };

  deleteEmployee = async record => {
    const response = await deleteEmployee(record.id);
    if (response.status === 200) {
      notification.success({
        message: 'Success',
        description: 'Delete Employee Successfully',
      });
      this.loadEmployeeList();
    }
  };

  closeEmployeeModal = () => {
    this.setState({
      openEmployeeModal: false,
    });
  };

  openEmployeeModal = record => {
    this.setState({
      openEmployeeModal: true,
      currentEmployee: record,
    });
  };

  closeEmployeeDetail = () => {
    this.setState({
      openEmployeeDetail: false,
    });
  };

  openEmployeeDetail = record => {
    this.setState({
      openEmployeeDetail: true,
      currentEmployee: record,
    });
  };

  render() {
    const { employeeList } = this.props;
    const { openEmployeeModal, currentEmployee, openEmployeeDetail } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }} onClick={() => this.openEmployeeDetail(record)}>
              View
            </a>
            <a style={{ marginRight: 16 }} onClick={() => this.openEmployeeModal(record)}>
              Edit
            </a>
            <Popconfirm
              title="Are you sure delete this employee?"
              onConfirm={() => this.deleteEmployee(record)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <div className={styles['content-table']}>
        <h1 className={styles['title-table']}>Manager Employee</h1>
        <Button type="primary" style={{ marginBottom: 10 }} onClick={this.openEmployeeModal}>
          Create
        </Button>
        <Table columns={columns} dataSource={employeeList} />

        {openEmployeeModal && (
          <EmployeeModal
            openEmployeeModal={openEmployeeModal}
            closeEmployeeModal={this.closeEmployeeModal}
            loadEmployeeList={this.loadEmployeeList}
            currentEmployee={currentEmployee}
          />
        )}

        {openEmployeeDetail && (
          <EmployeeDetail
            openEmployeeDetail={openEmployeeDetail}
            currentEmployee={currentEmployee}
            closeEmployeeDetail={this.closeEmployeeDetail}
          />
        )}
      </div>
    );
  }
}

export default connect(({ employees }) => ({
  employeeList: employees.employees,
}))(ManagerUser);
