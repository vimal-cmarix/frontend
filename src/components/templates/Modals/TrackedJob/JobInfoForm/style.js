import styled, { css } from 'styled-components';

import { DEFAULT_FONT } from '@assets/styles/theme';
import { smscreen } from '@assets/styles/medias';
import { Black, GreyC4, GreyCF } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';

import TextInput from '@components/molecules/TextInput';
import FormBlock from '@components/organisms/FormBlock';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import Btn from '@components/molecules/Btn';

import { NdEditorContainer } from '@components/organisms/NdEditor/style';
import { Actions } from '../../style';

export const TrackedJobFormWrapper = styled.div`
  display: ${props => (props.isShowing ? 'block' : 'none')};
  padding: 0 3rem;
  @media ${smscreen} {
    padding: 0 1rem;
  }
`;

export const TrackedJobFormItemWrapper = styled.div`
  margin-top: 2.5rem;
`;

export const TrackedJobFormBlock = styled(FormBlock)`
  &.doller-sign-icon {
    position: relative;
    &:before {
      content: '$';
      position: absolute;
      left: 10px;
      top: 41px;
      z-index: 1;
      color: #1e1e1f;
    }
    input {
      padding-left: 22px;
    }
  }
`;

export const TrackedJobFormBlockLocation = styled(FormBlock)`
  max-width: 200px;
`;

export const TrackedJobTextareaWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const TrackedJobFormTextInput = styled(TextInput)`
  padding: 0.5rem;
  border: 1px ${GreyC4} solid;
  ${RadiusSmall};
`;

export const TrackedJobTextareaAutosize = styled(TextInput)`
  bottom: 0;
  overflow: auto;

  ${RadiusSmall};
`;

export const TrackedJobFormTextInputWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TrackedJobForDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px ${GreyC4} solid;
  ${RadiusSmall};
  height: 2.25rem;
  position: relative;
  width: 100%;

  > div:first-child {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;

    &,
    .react-datepicker-wrapper,
    .react-datepicker-wrapper .react-datepicker__input-container input {
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
  }
`;

export const TrackedJobFormTextInputWithIcon = styled(TextInput)`
  ${RadiusSmall};
`;

export const TrackedJobFormTextInputIconWrapper = styled.div`
  padding: 0.5rem;
  pointer-events: none;
`;

export const TrackedJobCustomDatePicker = styled(CustomDatePicker)`
  margin-left: 0.5rem;
  border: 0;
  font-family: ${DEFAULT_FONT};
  color: ${Black};
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &.trackedJobFormTextInput {
    cursor: pointer;
  }

  .calendar {
    z-index: 1;
  }

  &:hover,
  &:focus {
    border-color: #fff;
  }

  &::placeholder {
    font-family: ${DEFAULT_FONT};
    font-size: 14px;
    color: ${GreyCF};
  }
`;

export const TrackedJobModalFooterRightButtonWrapper = styled.div`
  display: flex;
  @media ${smscreen} {
    flex-direction: column;
  }
  .trackedJobModalButtonSave {
    margin-left: 2rem;
    @media ${smscreen} {
      margin-left: 0;
    }
  }
`;

export const TrackedJobModalActionButton = styled(Btn)`
  @media ${smscreen} {
    margin-top: 10px;
  }
`;

export const TrackedJobModalActions = styled(Actions)`
  margin-top: 4rem;
  margin-bottom: 2.375rem;
  @media ${smscreen} {
    flex-direction: column;
  }
`;

export const AvatarContainer = styled.div`
  padding: 0 16px;
  position: absolute;
  right: 0;
`;
