import styled, { css } from 'styled-components';
import { LargeElevation } from '@assets/styles/elevations';
import TextInput from '@components/molecules/TextInput';
import { White, Black, GreyC4, GreyCF, Grey400 } from '@assets/styles/colors';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import { DEFAULT_FONT } from '@assets/styles/theme';
import Btn from '@components/molecules/Btn';
import { smscreen } from '@assets/styles/medias';
import { LabelSmall } from '@assets/styles/typography';

export const CreateTaskFormWrapper = styled.div`
  ${({ editing }) => !editing && LargeElevation}
  ${({ editing }) => !editing && 'height: 513px;'}
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: ${({ editing }) =>
    !editing ? '1.5rem 1rem' : '0 1rem 1.25rem 1rem'};
  border-radius: 10px;

  width: 400px;

  @media ${smscreen} {
    width: 100%;
  }
`;

export const TasksTextareaWrapper = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  position: relative;
  @media ${smscreen} {
    .NdEditorPopOver {
      > div {
        margin-top: 40px;
      }
    }
  }
`;

export const TasksFormTextareaInput = styled(TextInput)`
  max-height: 165px;
  margin-bottom: 20px;
  &::placeholder {
    font-size: 14px;
    color: ${Grey400};
  }
`;

export const TasksFormTextInput = styled(TextInput)`
  border: 0;
  font-weight: 600;
  padding: 0 0.5rem;
  font-size: 18px;
  margin-bottom: 8px;

  &::placeholder {
    font-size: 18px;
  }

  ${({ editing }) =>
    editing &&
    css`
    ${LabelSmall}
    color: ${Black};
    position: absolute;
    top: -33px;
    left: 20px;
    width: 85%;
    height: 30px;
    margin-bottom: 0;
  `}
`;

export const CreateTaskFormTextInputWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px ${GreyC4} solid;
  border-radius: 10px;
  height: 2.25rem;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 80%;
  min-width: 255px;
  @media (max-width: 480px) {
    &.targetDateCalendar {
      .react-datepicker-popper {
        left: -37px !important;
      }
    }
  }
`;

export const CreateTaskCustomDatePicker = styled(CustomDatePicker)`
  width: 100%;
  padding: 0.5rem;
  border: 0;
  border-radius: 10px;
  font-family: ${DEFAULT_FONT};
  font-size: 1rem;
  color: ${Black};
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &.trackedJobFormTextInput {
    cursor: pointer;
  }

  ${props =>
    props.disabled &&
    css`
      background-color: ${White};
    `}

  &::placeholder {
    font-family: ${DEFAULT_FONT};
    font-size: 1rem;
    color: ${GreyCF};
  }
`;

export const CreateTaskFormTextInputIconWrapper = styled.div`
  padding: 0.5rem;
`;

export const CreateTaskModalActionButton = styled(Btn)`
  padding: 0.625rem 1.5rem;
`;

export const CreateTaskGroupText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CreateTaskFormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateTaskActions = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 44px;
`;

export const CreateTaskFormCurrentDate = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  border: 1px ${GreyCF} solid;

  div {
    position: initial;
  }
`;
