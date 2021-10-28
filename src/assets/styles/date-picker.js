import { createGlobalStyle } from 'styled-components';

import { cdn } from '@utils/general';
import { White, PrimaryLight, Primary, Grey31, SizigiGrey } from './colors';
import { DEFAULT_FONT } from './theme';
import { RadiusXSmall } from './radius';

import 'react-datepicker/dist/react-datepicker.css';

const RADIUS = '1rem';

const datePicker = createGlobalStyle`
  .react-datepicker-wrapper {
    display: inline-flex;

    .react-datepicker__input-container input {
      display: block;
    }
  }

  .react-datepicker {
    width: 22.5rem;
    max-width: 95%;
    border-color: #CFCDD6;
    overflow: hidden;
    border-radius: ${RADIUS};
    filter: drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.16));
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: ${RADIUS};
  }

  .react-datepicker__month {
    margin: 1rem;
  }

  .react-datepicker__header {
    border-top-left-radius: ${RADIUS};
    border-bottom-width: 0;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;

    .react-datepicker__day-names,
    .react-datepicker__week {
      border-bottom: 1px solid #CFCDD6;
      margin-top: 0.5rem;
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      line-height: 1.5;
      font-size: 0.75rem;
      font-family: ${DEFAULT_FONT};
      font-weight: 400;
      color: ${SizigiGrey};
    }
  }

  .react-datepicker__month {
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      font-size: 0.75rem;
      font-family: ${DEFAULT_FONT};
      font-weight: 300;
      color: ${SizigiGrey};

      :focus {
        outline: none;
      }
    }
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    font-size: 1rem;
    font-family: ${DEFAULT_FONT};
    font-weight: 400;
    color: ${Grey31};
  }

  .react-datepicker__header {
    background-color: ${White};
    display: flex;
    flex-direction: column;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    margin: 0.125rem;
    padding: 0.166rem;
    width: 1.2rem;
    line-height: 1.2rem;
  }

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 50%;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 50%;
    background-color: ${PrimaryLight};
    box-shadow: 0.5px 0.5px 4px rgba(76, 63, 143, 0.25);
    position: relative;
    font-size: 0.875rem !important;
    font-weight: 400 !important;
    color: ${White} !important;

    ::before {
      content: "";
      width: 0.1875rem;
      height: 0.1875rem;
      border-radius: 50%;
      background-color: ${White};
      position: absolute;
      bottom: 0.1875rem;
      right: 0;
      left: 0;
      margin: 0 auto;
    }
  }

  /* active date hover */
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__month-text--keyboard-selected:hover,
  .react-datepicker__quarter-text--keyboard-selected:hover,
  .react-datepicker__year-text--keyboard-selected:hover {
    background-color: ${Primary};
  }

  .react-datepicker__navigation--next {
    right: 1rem;
    background-image: url('${cdn('/static/img/arrow-right.svg')}');
  }

  .react-datepicker__navigation--previous {
    left: 1rem;
    background-image: url('${cdn('/static/img/arrow-left.svg')}');
  }

  .react-datepicker__navigation {
    ${RadiusXSmall};
    width: 1.5rem;
    height: 1.5rem;
    top: 1rem;
    border: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-origin: content-box;
    padding: 0.3125rem;
    transition: all .2s;
    cursor: pointer;

    :hover {
      background-color: #f3f2f4;
    }

    :focus {
      outline: none;
    }
  }

  /* month */
  .date-picker-month-year {
    width: 23.375rem;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
    border: 0;
    margin-right:10px;

    .react-datepicker__navigation--previous {
      left: 2.75rem;
    }

    .react-datepicker__navigation--next {
      right: 2.75rem;
    }

    .react-datepicker__month-container {
      .react-datepicker__header,
      .react-datepicker__month .react-datepicker__month-text,
      .react-datepicker__month .react-datepicker__quarter-text {
        font-size: 1.125rem;
        font-weight: 900;
        font-family: ${DEFAULT_FONT};
        color: ${SizigiGrey};
      }

      .react-datepicker__month .react-datepicker__month-text,
      .react-datepicker__month .react-datepicker__quarter-text {
        width: 3rem;
        line-height: 3rem;

        :focus {
          outline: none;
        }
      }

      .react-datepicker__month-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .react-datepicker__day--keyboard-selected,
      .react-datepicker__month-text--keyboard-selected,
      .react-datepicker__quarter-text--keyboard-selected,
      .react-datepicker__year-text--keyboard-selected {
        font-weight: 900 !important;
        font-size: 1.125rem !important;

        ::before {
          width: 0.25rem;
          height: 0.25rem;
          bottom: 0.375rem;
        }
      }

      .react-datepicker__month-text.react-datepicker__month--selected:hover,
      .react-datepicker__month-text.react-datepicker__month--in-range:hover,
      .react-datepicker__month-text.react-datepicker__quarter--selected:hover,
      .react-datepicker__month-text.react-datepicker__quarter--in-range:hover,
      .react-datepicker__quarter-text.react-datepicker__month--selected:hover,
      .react-datepicker__quarter-text.react-datepicker__month--in-range:hover,
      .react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,
      .react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {
        background-color: ${Primary}
      }

      .react-datepicker__month {
        margin-left: 2.625rem;
        margin-right: 2.625rem;
      }

      .react-datepicker-year-header {
        position: relative;
        padding-bottom: 1rem;
        padding-left: 2.75rem;
        padding-right: 2.75rem;

        ::before {
          content: "";
          width: calc(100% - 5.5rem);
          height: 1px;
          background-color: #CFCDD6;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0 auto;
        }
      }
    }
  }

`;

export default datePicker;
