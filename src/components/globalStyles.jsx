import React from 'react';
import Reset from '@assets/styles/reset';
import { Icons } from '@assets/styles/icons';
import Base from '@assets/styles/base';
import Fonts from '@assets/styles/fonts';
import DatePicker from '@assets/styles/date-picker';

const GlobalStyles = () => (
  <>
    <Reset />
    <Fonts />
    <Icons />
    <Base />
    <DatePicker />
  </>
);

export default GlobalStyles;
