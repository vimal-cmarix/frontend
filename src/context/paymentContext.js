import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  paymentSuccessAlert: {
    show: false,
    type: '',
  },
  canceled: false,
  userPlan: undefined,
  isStudentTrial: false,
  isStudent: false,
  isTrialEligible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAYMENT_SUCCESS':
      return {
        ...state,
        paymentSuccessAlert: action.props,
      };

    case 'SET_PAYMENT_DATA':
      return {
        ...state,
        ...action.data,
      };

    case 'SET_PAYMENT_DATA_CUSTOMER':
      return {
        ...state,
        customer: action.data,
      };

    case 'SET_PLAN':
      return {
        ...state,
        userPlan: action.data,
      };

    case 'SET_PLAN_CANCELED':
      return {
        ...state,
        canceled: action.data,
      };

    case 'SET_PLAN_DATA':
      return {
        ...state,
        planData: action.data,
      };

    case 'SET_IS_STUDENT_TRIAL':
      return {
        ...state,
        isStudentTrial: action.data,
      };

    case 'SET_IS_STUDENT':
      return {
        ...state,
        isStudent: action.data,
      };

    case 'SET_IS_TRIAL_ELIGIBLE':
      return {
        ...state,
        isTrialEligible: action.data,
      };

    default:
      return state;
  }
};

const PaymentContext = createContext(initialState);

const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PaymentProvider };
export default PaymentContext;
