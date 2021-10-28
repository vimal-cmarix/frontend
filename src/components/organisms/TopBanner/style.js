import styled, { css } from 'styled-components';
import { Primary, White, Grey888 } from '@assets/styles/colors';
import { laptop, smscreen } from '@assets/styles/medias';
import {
  DisplayXLarge,
  ParagraphLarge,
  HeadingSmall,
  ParagraphMedium,
  LabelMont,
  LabelMontBold,
} from '@assets/styles/typography';
import { cdn } from '@utils/general';

export const BannerWrapper = styled.div``;

export const BannerPicture = styled.img`
  width: 220px;
  height: 212px;
  align-self: flex-end;

  @media ${smscreen} {
    display: none;
  }
`;

export const Banner = styled.div`
  background: url('${cdn(
    '/static/img/analytics-banner/dots-pattern.svg',
  )}') no-repeat bottom right ${White};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
  box-sizing: border-box;
  height: 220px;
  border-radius: 6px;
  box-shadow: 4px 4px 10px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  @media ${laptop} {
    background: #fff;
    padding: 40px 50px 20px 50px;
  }

  @media ${smscreen} {
    flex-direction: column;
    height: auto;

    &:before {
      content: '';
      width: 252px;
      height: 252px;
      position: absolute;
      left: -110px;
      bottom: -150px;
      background: rgba(216, 219, 255, 0.75);
      border-radius: 50%;
      z-index: 0;
    }
  }
`;

export const CountViews = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  position: relative;
  z-index: 1;
  max-width: 200px;

  @media ${smscreen} {
    text-align: center;
    margin-bottom: 24px;
  }

  .views-count {
    ${LabelMont};
    font-size: 18px;
    position: relative;
    z-index: 1;
    white-space: nowrap;

    number {
      font-weight: 700;
      font-size: 120px;
      line-height: 100%;
      display: block;
      color: ${Primary};
    }
  }

  .views-cta {
    ${LabelMontBold};
    font-size: 24px;
    line-height: 32px;
    position: relative;
    z-index: 1;
    white-space: wrap;
    color: ${Primary};
  }

  &:before {
    content: '';
    width: 252px;
    height: 252px;
    position: absolute;
    left: -110px;
    top: 60px;
    background: rgba(216, 219, 255, 0.75);
    border-radius: 50%;

    @media ${smscreen} {
      content: none;
    }
  }
`;

export const LabelWrapper = styled.div`
  align-self: center;
  max-width: 480px;
  position: relative;
  z-index: 1;

  button {
    width: auto;
    margin-bottom: 8px;
  }

  @media ${smscreen} {
    text-align: center;

    button {
      margin: 0 auto 24px;
    }
  }
`;

export const Label = styled.span`
  ${LabelMont}
  font-size: 25px;
  margin-bottom: 32px;
  display: flex;
`;

export const Divider = styled.div`
  width: 1px;
  height: 180px;
  background: ${Grey888};
  margin: 0 24px;

  @media ${smscreen} {
    width: 100%;
    height: 1px;
    margin: 0 auto 24px;
  }
`;
