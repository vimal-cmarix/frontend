import styled, { css } from 'styled-components';
import { tint } from 'polished';
import { RadiusSmall } from '@assets/styles/radius';
import { Container as cardStyle } from '@components/molecules/FileCard/style';
import {
  Red,
  Black,
  White,
  Grey200,
  Grey,
  Primary,
} from '@assets/styles/colors';
import {
  ParagraphSmall,
  LabelLargeUpper,
  LabelSmall,
  LabelXSmall,
  LabelMedium,
} from '@assets/styles/typography';
import { smscreen, xmscreen } from '@assets/styles/medias';

export const BrainTreeWrapper = styled(cardStyle)`
  cursor: initial;
  display: block;
  padding: 24px;

  &.paymentTitles {
    h2 {
      margin-bottom: 25px;
    }
    ul {
      > li {
        max-width: 50%;
      }
    }
  }

  ${props =>
    props.hide &&
    css`
      display: none;
    `}
`;

export const WrapperTitle = styled.h2`
  ${LabelLargeUpper}
  margin-bottom: 4px;
  color: ${Black};
`;

export const BrainTreeContainer = styled.div`
  margin-top: 24px;

  .braintree-hosted-fields-focused {
    border-color: ${Black};
  }
  .braintree-hosted-fields-invalid {
    border-color: ${Red};
    background-color: ${tint(0.95, Red)};
  }
`;

export const BrainTreeField = styled.div`
  ${ParagraphSmall};
  ${RadiusSmall};
  background: ${White};
  color: ${Black};
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${Grey200};
  box-sizing: border-box;
  outline: none;

  iframe {
    max-height: 40px;
    padding: 9px 11px;
    box-sizing: border-box;

    input {
      ${ParagraphSmall};
    }
  }
`;

export const ErrorMessage = styled.span`
  ${LabelXSmall}
  margin-top: 8px;
  color: ${Red};
`;

export const PersonalInformationContainer = styled.div``;

export const ErrorWrapper = styled.div`
  margin-left: auto;
  margin-bottom: 40px;
  padding: 0 24px;

  @media ${smscreen} {
    margin-top: 24px;
    padding: 0 16px;
  }

  p {
    ${ParagraphSmall}
    color: ${Red};
  }
`;

export const ButtonWrapper = styled.div`
  max-width: 128px;
  margin-left: auto;
  margin-bottom: 40px;

  @media ${smscreen} {
    max-width: unset;
    margin-top: 24px;
  }
`;

export const SelectWrapper = styled.div`
  max-width: 245px;
  min-width: 245px;

  ${props =>
    props.small &&
    css`
      max-width: 90px;
    `}
`;

export const StudentPriceBanner = styled.h4`
  ${LabelMedium}
  color: ${Primary};
  margin-bottom: 20px;
`;

export const PlanTitle = styled.h4`
  ${LabelMedium}
  color: ${Black};
  margin-bottom: 8px;
  margin-top: ${p => (p.margin ? '20px' : '0')};
`;

export const PlanResume = styled.p`
  ${ParagraphSmall}
  color: ${Grey};
  margin-bottom: 8px;
`;

export const PlanPrice = styled.h5`
  ${LabelSmall}
  text-transform: uppercase;
  color: ${Grey};
`;

export const RadiusWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;

  ul {
    flex-wrap: wrap;
    li {
      max-width: 33%;

      &:nth-child(n + 4) {
        margin-top: 8px;
      }
    }
  }

  @media ${smscreen} {
    ul > li {
      margin-top: 16px;
      max-width: unset;

      &:nth-child(n + 4) {
        margin-top: 16px;
      }
    }
  }

  @media ${xmscreen} {
    ul li:first-child {
      margin-top: 0;
    }
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: 24px;

  ${props =>
    props.isPlan &&
    css`
      display: none;
    `}
`;
