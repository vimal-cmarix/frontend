import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  GreyAE,
  LavenderBlue,
  Orange,
  Primary,
  White,
} from '@assets/styles/colors';
import { LabelMedium } from '@assets/styles/typography';

const WIDTH = 35;
const HEIGHT = 20;

const IS_PRICING_WIDTH = 90;
const IS_PRICING_HEIGHT = 45;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Label = styled.span`
  ${props =>
    props.isPricingToggle
      ? css`
          color: #000;
          font-size: 18px;
        `
      : LabelMedium}
`;

const Wrapper = styled.div`
  margin: 0 10px;
  width: ${props => (props.isPricingToggle ? IS_PRICING_WIDTH : WIDTH)}px;
  height: ${props => (props.isPricingToggle ? IS_PRICING_HEIGHT : HEIGHT)}px;
  border: ${props => (props.isPricingToggle ? '0' : `1px solid ${Primary}`)};
  border-radius: ${props =>
    props.isPricingToggle ? IS_PRICING_HEIGHT : HEIGHT}px;
  overflow: hidden;
  position: relative;
  background: ${props => (props.isPricingToggle ? GreyAE : White)};
  cursor: pointer;
`;

const Switch = styled.div`
  width: ${props => (props.isPricingToggle ? IS_PRICING_WIDTH : WIDTH)}px;
  height: ${props => (props.isPricingToggle ? IS_PRICING_HEIGHT : HEIGHT)}px;
  position: relative;
  border-radius: ${props =>
    props.isPricingToggle ? IS_PRICING_HEIGHT : HEIGHT}px;
  background: ${props =>
    props.active && props.isPricingToggle ? LavenderBlue : 'transparent'};
  transform: ${p =>
    p.active
      ? `translateX(0px)`
      : `translateX(-${
          p.isPricingToggle
            ? IS_PRICING_WIDTH - IS_PRICING_HEIGHT
            : WIDTH - HEIGHT
        }px)`};
  transition: transform 0.2s ease;
`;

const Pin = styled.div`
  position: absolute;
  width: ${props =>
    props.isPricingToggle ? IS_PRICING_HEIGHT - 12 : HEIGHT - 4}px;
  height: ${props =>
    props.isPricingToggle ? IS_PRICING_HEIGHT - 12 : HEIGHT - 4}px;
  background: ${props => (props.isPricingToggle ? White : Primary)};
  border-radius: 50%;
  right: ${props => (props.isPricingToggle ? 6 : 2)}px;
  top: ${props => (props.isPricingToggle ? 6 : 2)}px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.3);
`;

// eslint-disable-next-line no-unused-vars
export default function Toggle({
  active,
  onChange,
  label1,
  label2,
  isPricingToggle,
}) {
  return (
    <Container isPricingToggle={isPricingToggle}>
      <Label isPricingToggle={isPricingToggle}>{label1}</Label>
      <Wrapper onClick={onChange} isPricingToggle={isPricingToggle}>
        <Switch active={active} isPricingToggle={isPricingToggle}>
          <Pin isPricingToggle={isPricingToggle} />
        </Switch>
      </Wrapper>
      <Label isPricingToggle={isPricingToggle}>{label2}</Label>
    </Container>
  );
}

Toggle.propTypes = {
  isPricingToggle: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
};

Toggle.defaultProps = {
  isPricingToggle: false,
};
