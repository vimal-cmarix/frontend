import styled, { css } from 'styled-components';

import { SPACING } from '@assets/styles/theme';
import { RadiusMedium } from '@assets/styles/radius';
import { sizes as breakpoint } from '@assets/styles/medias';
import { Grey31, Grey61, PrimaryLight, White } from '@assets/styles/colors';
import { CircleIconButton } from '@assets/styles/helpers';

export const ContainerGroup = styled.div`
  & + & {
    margin-top: ${SPACING * 9}px;
  }
`;

export const ContainerTitle = styled.div`
  padding-bottom: ${({ pb }) => pb || SPACING * 4}px;
`;

export const ShowMoreArrow = styled.div``;

export const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: 0;
  outline: none;
  color: ${Grey61};
  cursor: pointer;

  ${({ showMoreActive }) =>
    showMoreActive &&
    css`
      ${ShowMoreArrow} {
        transform: rotate(180deg);
      }
    `};

  > *:not(:last-child) {
    margin-right: ${SPACING * 2}px;
  }

  > :nth-child(2) {
    position: relative;
    top: 1px;
  }

  :hover:not(:active) {
    color: ${Grey31};
  }
`;

export const LeftCol = styled.div``;

export const RightCol = styled.div`
  ${ShowMoreButton} {
    margin-top: ${SPACING * 3}px;
  }
`;

export const ContainerCols = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${LeftCol} {
    flex-grow: 1;
  }

  ${RightCol} {
    width: 100%;
    flex-shrink: 0;
    margin-bottom: ${SPACING * 6}px;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    flex-direction: row;

    ${RightCol} {
      width: 426px;
      flex-shrink: 0;
      margin-bottom: 0;
    }

    ${LeftCol} {
      padding-right: ${SPACING * 9}px;
    }
  }

  @media screen and (min-width: ${breakpoint.tablet}) {
    ${RightCol} {
      width: 572px;
    }
  }
`;

export const VideoBoxEditButton = styled(CircleIconButton)`
  position: absolute;
  top: ${SPACING * 3}px;
  right: ${SPACING * 3}px;
`;

export const VideoBoxIconUpload = styled.div``;

export const VideoBoxIconEdit = styled.div`
  position: absolute;
  top: ${SPACING * 2}px;
  right: ${SPACING * 2}px;
  color: ${Grey31};
`;

export const VideoBoxOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(49, 49, 52, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  :not(:hover) {
    color: ${Grey61};
  }

  :hover {
    color: #d32c63;
  }
`;

export const VideoBox = styled.figure`
  ${RadiusMedium};
  overflow: hidden;
  position: relative;
  box-shadow: 5px 7px 7px rgba(75, 75, 75, 0.1);
  transition: all 0.2s;
  background-image: linear-gradient(
    109.6deg,
    rgba(49, 49, 52, 0.7) 10.97%,
    rgba(255, 255, 255, 0) 93.49%
  );
  cursor: pointer;

  :not(:hover) {
    background-color: #c4c4c4;
  }

  ::before {
    content: '';
    display: block;
    //padding-top: calc(720 / 1280 * 100%);

    padding-top: -moz-calc(720 / 1280 * 100%);
    padding-top: -webkit-calc(720 / 1280 * 100%);
    padding-top: -o-calc(720 / 1280 * 100%);
    padding-top: calc(720 / 1280 * 100%);
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  ${VideoBoxEditButton} {
    z-index: 1;
  }

  ${VideoBoxIconUpload} {
    width: 110px;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color: ${Grey61};
  }
`;

export const VideoTitle = styled.div`
  margin-top: ${SPACING * 8}px;
`;

export const VideoDescriptionBox = styled.div`
  margin-top: ${SPACING * 2}px;
  padding: ${SPACING * 2}px 0;
  border-width: 1px 0;
  border-style: solid;
  border-color: ${PrimaryLight};
`;

export const DescriptionContainer = styled.div`
  position: relative;

  ${({ expanded }) =>
    !expanded &&
    css`
      ::before {
        content: '';
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(
          360deg,
          #ffffff -21.05%,
          rgba(255, 255, 255, 0) 55.77%
        );
      }
    `};
`;

export const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -${SPACING * 2.5}px;
  margin-bottom: ${SPACING * 1.5}px;

  > * {
    margin-top: ${SPACING * 2}px;
    margin-bottom: ${SPACING * 2}px;
  }

  > *:not(:last-child) {
    margin-right: ${SPACING * 5}px;
  }
  > div {
    word-break: break-word;
    height: auto;
  }
`;

export const Container = styled.div`
  padding: ${SPACING * 8}px;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    padding: ${SPACING * 9}px;
  }
`;

export const ReadOnlyField = styled.input`
  pointer-events: none;
  border: none;
  width: 115px;
`;

export const ReadoblyBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1;
  padding: 0;
`;
