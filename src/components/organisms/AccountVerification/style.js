import styled, { css } from 'styled-components';
import { Black, Gray415, Blueberry, Grey400 } from '@assets/styles/colors';
import {
  DisplayXMedium,
  HeadingMedium,
  LabelLarge,
  LabelXSmall,
  DisplayXMediumSmall,
  DisplayXSmall,
  HeadingLarge,
  ParagraphMedium,
  LabelMedium,
} from '@assets/styles/typography';
import { lighten, darken } from 'polished';
import { smscreen, xxsscreen, smallestHeight } from '@assets/styles/medias';

export const CodeTitle = styled.h1`
  ${props => (props.small ? DisplayXMediumSmall : DisplayXMedium)}

  @media ${smscreen} {
    padding-top: 32px;
    ${props => (props.small ? HeadingLarge : DisplayXSmall)}
  }
`;

export const CodeWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-top: auto;
  flex-direction: column;
  color: ${Black};
  text-align: center;

  @media ${smscreen} {
    width: ${props => (props.small ? '100%' : '90%')};
  }
`;

export const CodeDescription = styled.h2`
  ${HeadingMedium}
  margin-bottom: 72px;
  max-width: 530px;
  align-self: center;
  text-align: center;

  @media ${smscreen} {
    ${ParagraphMedium}
  }
`;

export const ButtonContainer = styled.div`
  width: 184px;
  height: 42px;

  @media ${smscreen} {
    width: 96px;
  }
`;

export const SkipTrigger = styled.h3`
  ${LabelLarge}
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${lighten(0.12, Black)};
  }

  @media ${smscreen} {
    ${LabelMedium}
  }
`;

export const SkipText = styled.p`
  ${LabelXSmall}

  @media ${smscreen} {
    ${LabelXSmall}
    color: ${Grey400};
  }
`;

export const CodeFooter = styled.div`
  border-top: 1px solid ${Gray415};
  padding-top: 42px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media ${smscreen} {
    padding-top: 24px;
  }
`;

export const SkipContainer = styled.div`
  text-align: left;

  @media ${smscreen} {
    width: 55%;
  }
`;

export const Resend = styled.p`
  ${LabelLarge}
  color: ${Blueberry};
  margin-top: 48px;
  cursor: pointer;
  margin-bottom: 179px;
  transition: all .1s ease-in-out;

  &:hover {
    color: ${darken(0.12, Blueberry)};
  }

  @media ${smscreen} {
    ${LabelMedium}
  }

  @media ${xxsscreen} {
    ${props =>
      props.modal
        ? css`
            margin-bottom: 100px;
          `
        : ''}
  }

  @media ${smallestHeight} {
    margin-bottom: 48px;
  }
`;
