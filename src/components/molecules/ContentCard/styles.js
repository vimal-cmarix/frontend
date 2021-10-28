import styled, { css } from 'styled-components';

import { RadiusMedium, RadiusCircle } from '@assets/styles/radius';
import { ContentCardBG, Grey87 } from '@assets/styles/colors';
import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';
import { xmscreen } from '@assets/styles/medias';

export const Container = styled.article`
  ${RadiusMedium};
  background-color: ${ContentCardBG};
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-family: ${DEFAULT_FONT};
  cursor: pointer;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(
    109.6deg,
    rgba(49, 49, 52, 0.7) 10.97%,
    rgba(255, 255, 255, 0) 93.49%
  );
`;

export const ThumbnailImage = styled.img`
  border-radius: 16px 16px 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThumbnailPlayButton = styled.div`
  position: absolute;
  ${RadiusCircle};
  top: 12px;
  left: 12px;
`;

export const AuthorAvatar = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  ${RadiusCircle};
  bottom: 8px;
  right: 14px;
`;

export const CardBody = styled.div`
  padding: 18px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div``;

export const CardDescription = styled.div`
  margin-top: ${SPACING * 2}px;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ unMarginTop }) =>
    !unMarginTop &&
    css`
      margin-top: 18px;
    `};

  @media ${xmscreen} {
    flex-direction: column;
  }
`;

export const TagItem = styled.div`
  margin-bottom: ${SPACING * 2}px;
  margin-right: ${SPACING * 3}px;

  @media ${xmscreen} {
    margin-right: ${SPACING * 2}px;
  }
`;

export const CardCreatedDate = styled.div`
  color: ${Grey87};
  font-size: 10px;
  margin-top: 15px;
  font-weight: 300;
  line-height: 24px;
`;
