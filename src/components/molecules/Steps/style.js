import styled from 'styled-components';
import { Primary, White, Black, Grey, Grey400 } from '@assets/styles/colors';
import { LabelMedium, LabelSmall } from '@assets/styles/typography';
import { RadiusCircle } from '@assets/styles/radius';
import { smscreen } from '@assets/styles/medias';

const lineProps = {
  active: {
    background: Primary,
  },
  pass: {
    background: Primary,
  },
  waiting: {
    background: Grey400,
  },
};

const numberProps = {
  active: {
    background: Primary,
    color: White,
  },
  pass: {
    border: `solid 1px ${Primary}`,
    color: Primary,
  },
  waiting: {
    border: `solid 1px ${Grey400}`,
    color: Grey400,
  },
};

const numberPropsMob = {
  active: {
    background: Primary,
  },
  pass: {
    background: Primary,
  },
  waiting: {
    background: Grey400,
  },
};

const nameProps = {
  active: {
    color: Black,
  },
  pass: {
    color: Black,
  },
  waiting: {
    color: Grey400,
  },
};

const statusProps = {
  active: {
    color: Grey,
  },
  pass: {
    color: Grey,
  },
  waiting: {
    color: Grey400,
  },
};

export const IconWrapper = styled.div`
  font-size: 22px;

  @media ${smscreen} {
    // display: none;
  }
`;

export const List = styled.ul`
  display: flex;
  padding-bottom: 48px;

  @media ${smscreen} {
    padding-bottom: 16px;
  }
`;

export const ListItem = styled.li`
  width: ${props => `${props.width}%`};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    top: 15px;
    left: calc(-50% + 32px);
    right: calc(50% + 32px);
    ${props => lineProps[props.state]};

    @media ${smscreen} {
      //top: 2px;
      left: calc(-50% + 25px);
      right: calc(50% + 25px);
    }
  }

  &:first-child:before {
    display: none;
  }
`;

export const StepNumber = styled.strong`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  box-sizing: border-box;
  ${RadiusCircle}
  ${LabelMedium}
  margin-bottom: 8px;

  ${props => numberProps[props.state]};

  @media ${smscreen} {
    // text-indent: -999em;
    // width: 6px;
    // height: 6px;
    // min-width: 6px;

    //${props => numberPropsMob[props.state]};
    ${props => numberProps[props.state]};
  }
`;

export const StepName = styled.span`
  display: block;
  ${LabelSmall}
  margin-bottom: 4px;
  white-space: nowrap;

  ${props => nameProps[props.state]};

  @media ${smscreen} {
    // display: none;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const StepState = styled.small`
  display: block;
  ${LabelSmall}

  ${props => statusProps[props.state]};

  @media ${smscreen} {
    // display: none;
    font-size: 12px;
    line-height: 14px;
  }
`;
