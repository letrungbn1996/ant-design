import { getEmployeeList, createEmployee } from '@/services/employee';
import _ from 'lodash';

export default {
  namespace: 'employees',
  state: {
    employees: [],
  },
  effects: {
    *fetchEmployeeList({ data }, { call, put }) {
      const response = yield call(getEmployeeList, data);
      yield put({
        type: 'saveEmployeeList',
        data: response.data,
      });
    },
  },
  reducers: {
    saveEmployeeList(state, action) {
      return { ...state, employees: action.data };
    },
  },
};
