import styled, { css } from 'styled-components';
import { LabelMedium } from '@assets/styles/typography';
import { Grey400, Grey61, Grey31 } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';
import { typoTheme } from '@assets/styles/typo';

export const Container = styled.div`
  position: relative;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  &.formFieldCell {
    > div {
      flex-direction: column;
    }
  }

  &.reqlabel {
    > span {
      &:after {
        content: '*';
        color: #ca3f2f;
        margin-left: 2px;
      }
    }
  }
  &.descriptionArea {
    textarea {
      height: 200px !important;
      overflow-y: auto !important;
    }
  }

  &.label {
    display: inline-block;
    &.company-page-main label {
      margin-bottom: 0;
      font: 600 16px 'Mulish';
      color: #485768;
      background: #fff;
    }
  }

  .countryAbout {
    width: 100%;
  }
`;

export const Label = styled.span`
  ${LabelMedium}
  font-size: ${typoTheme.sizes.base};
  font-family: ${DEFAULT_FONT};
  color: ${({ disabled }) => (disabled ? Grey400 : Grey61)};
  margin-bottom: ${SPACING * 3}px;
  display: flex;
  align-items: center;
  font-weight: 400;

  ${props =>
    props.isLabelStrong &&
    css`
      font-weight: 900;
      color: ${Grey31};
    `}
  ${props =>
    props.isLabelMedium &&
    css`
      font-weight: 600;
    `}
  ${props =>
    !props.isLabelMedium &&
    !props.isLabelStrong &&
    css`
      font-weight: 400;
    `}

  ${({ isLabelShowMobile }) =>
    !isLabelShowMobile &&
    css`
      @media ${smscreen} {
        display: none;
      }
    `}
`;

export const HelperTextPositioner = styled.div`
  margin-left: ${SPACING * 2}px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding > div {
    width: 100%;
    padding-bottom: 10px;
  }

  & > :not(:last-child) {
    margin-right: 16px;
  }

  @media ${smscreen} {
    flex-direction: column;
    & > :not(:last-child) {
      margin: 0 0 8px 0;
    }
    & > * {
      width: 100%;
    }
  }
`;
