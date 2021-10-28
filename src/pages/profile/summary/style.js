import styled from 'styled-components';
import { Haiti, Black, PrimaryLight } from '@assets/styles/colors';
import {
  HeadingLarge,
  ParagraphMedium,
  LabelXSmall,
} from '@assets/styles/typography';
import { SPACING } from '@assets/styles/theme';

export const FileUploadWrapper = styled.div`
  padding-bottom: 8px;
  position: relative;
  width: 100%;
`;

export const FileUploadControl = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACING * 8}px;
`;

export const SummaryTitle = styled.h2`
  ${HeadingLarge}
  color: ${Haiti};
  padding-bottom: 16px;
`;

export const SummaryDescription = styled.p`
  ${ParagraphMedium}
  color: ${Black};
  padding-bottom: 16px;
`;

export const UpdateDate = styled.div`
  ${LabelXSmall}
  padding-bottom: 16px;
`;

export const VideoSummaryDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${SPACING * 2}px 0;
  background-color: ${PrimaryLight};
`;
