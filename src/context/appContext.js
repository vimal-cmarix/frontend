import React, { useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  modal: {
    isOpened: false,
    component: null,
  },
  tour: {
    currentStep: 0,
    isOpened: false,
    showTooltip: false,
  },
  eportfolio_tour: {
    currentStep: 0,
    isOpened: false,
    showTooltip: false,
  },
  screenWidth: process.browser ? window.innerWidth : 0,
  paymentSuccessAlert: {
    show: false,
    type: '',
  },
  presentation: {
    saved: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODAL_OPENED':
      return {
        ...state,
        modal: {
          isOpened: true,
          activeEscapeButton: action.activeEscapeButton,
          component: <action.component {...action.props} />,
        },
        tour: {
          ...state.tour,
          isOpened: false,
        },
        eportfolio_tour: {
          ...state.eportfolio_tour,
          isOpened: false,
        },
      };

    case 'SET_MODAL_CLOSED':
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpened: false,
          component: null,
        },
      };

    case 'SHOW_TOUR':
      return {
        ...state,
        tour: {
          ...state.tour,
          isOpened: true,
        },
      };

    case 'CHANGE_TOUR_STEP':
      return {
        ...state,
        tour: {
          ...state.tour,
          currentStep: action.currentStep,
        },
      };

    case 'HIDE_TOUR':
      return {
        ...state,
        tour: {
          ...state.tour,
          isOpened: false,
        },
      };

    case 'ENABLE_TOUR_TOOLTIP':
      return {
        ...state,
        tour: {
          ...state.tour,
          showTooltip: true,
        },
      };

    case 'DISABLE_TOUR_TOOLTIP':
      return {
        ...state,
        tour: {
          ...state.tour,
          showTooltip: false,
        },
      };

    case 'RESET_TOUR':
      return {
        ...state,
        tour: {
          currentStep: 0,
          isOpened: false,
          showTooltip: false,
        },
      };

    case 'SHOW_EPORTFOLIO_TOUR':
      return {
        ...state,
        eportfolio_tour: {
          ...state.eportfolio_tour,
          isOpened: true,
        },
      };

    case 'CHANGE_EPORTFOLIO_TOUR_STEP':
      return {
        ...state,
        eportfolio_tour: {
          ...state.eportfolio_tour,
          currentStep: action.currentStep,
        },
      };

    case 'HIDE_EPORTFOLIO_TOUR':
      return {
        ...state,
        eportfolio_tour: {
          ...state.eportfolio_tour,
          isOpened: false,
        },
      };

    case 'ENABLE_EPORTFOLIO_TOUR_TOOLTIP':
      return {
        ...state,
        eportfolio_tour: {
          ...state.eportfolio_tour,
          showTooltip: true,
        },
      };

    case 'DISABLE_EPORTFOLIO_TOUR_TOOLTIP':
      return {
        ...state,
        eportfolio_tour: {
          ...state.eportfolio_tour,
          showTooltip: false,
        },
      };

    case 'RESET_EPORTFOLIO_TOUR':
      return {
        ...state,
        eportfolio_tour: {
          currentStep: 0,
          isOpened: false,
          showTooltip: false,
        },
      };

    case 'UPDATE_EPORTFOLIO_TOUR':
      return {
        ...state,
        eportfolio_tour: {
          ...state.eportfolio_tour,
          update: true,
        },
      };

    case 'UPDATE_SCREEN_WIDTH':
      return {
        ...state,
        screenWidth: action.width,
      };

    case 'SET_PAYMENT_SUCCESS':
      return {
        ...state,
        paymentSuccessAlert: action.props,
      };

    case 'SET_POSTS_FROM_LIBRARY':
      return {
        ...state,
        presentation: {
          saved: action.saved,
        },
      };

    case 'SHOW_ALERT_BAR':
      return {
        ...state,
        alertBar: action.data,
      };
    default:
      return state;
  }
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (process.browser) {
    useEffect(() => {
      const handleResize = () => {
        dispatch({ type: 'UPDATE_SCREEN_WIDTH', width: window.innerWidth });
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider };
export default AppContext;
