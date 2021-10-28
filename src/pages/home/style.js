import styled from 'styled-components';
import { LabelMediumUpper, ParagraphSmall } from '@assets/styles/typography';
import {
  White,
  Grey100,
  Blueberry,
  Grey4,
  Grey5,
  Grey500,
} from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { smscreen } from '@assets/styles/medias';
import { LoaderContainer } from '@assets/styles/helpers';

export const Section = styled.section`
  margin-bottom: 40px;
  position: relative;
`;

export const InsertBox = styled.div`
  ${RadiusSmall}
  height: 126px;
  opacity: 0.9;
  border: 1px solid ${Grey5};
  color: ${Grey4};
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  cursor: pointer;

  span {
    font-size: 32px;
    margin-bottom: 8px;
  }

  &:hover {
    color: ${Blueberry};
    border-color: ${Blueberry};
  }
`;

export const InsertTitle = styled.h2`
  ${ParagraphSmall}
`;

export const SectionTitle = styled.h4`
  ${LabelMediumUpper}
  margin-bottom: ${props => (props.largeMargin ? '40px' : '16px')};

  @media ${smscreen} {
    margin-bottom: ${props => (props.largeMargin ? '40px' : '16px')};
  }
`;

export const PostsCardWrapper = styled.div`
  margin-bottom: 24px;
`;

export const PostCardWrapper = styled.div`
  cursor: pointer;
`;

export const InsertBoxWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: ${White};
  padding: 24px;
  box-sizing: border-box;
  position: relative;

  @media ${smscreen} {
    height: auto;
    padding: 0;
  }
`;

export const LoaderWrapper = styled.div`
  ${RadiusSmall}
  width: 100%;
  height: 100%;
  border: 1px solid ${Grey100};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

export const PortifolioButtonWrapper = styled.div`
  width: 140px;
  position: absolute;
  top: -10px;
  right: 0;

  @media ${smscreen} {
    width: 130px;
    top: -11px;
  }
`;

export const MobilePortifolioButtonWrapper = styled.div`
  width: 100%;
  display: none;

  @media ${smscreen} {
    display: block;
  }
`;

export const BigLoaderWrapper = styled(LoaderContainer)``;

export const WrapperEmptyState = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 1;

  span {
    display: block;
    white-space: break-spaces;
    background: ${White};
    text-align: center;
    padding: 48px 12px;
    border: 1px solid ${Grey500};
    margin: 24px;
    border-radius: 8px;
    color: ${Grey500};
  }
`;
