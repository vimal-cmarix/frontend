import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
} from '@assets/styles/typography';
import { Grey, Haiti, GreyC4, PrimaryClean } from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';

export const PageWrapper = styled.div`
  letter-spacing: 0;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  color: #1d242f;
  background: #fff;
  min-height: 100vh;
  img {
    vertical-align: middle;
    max-width: 100%;
  }
`;

export const NavLink = styled.a`
  cursor: pointer;
`;

export const SearchJobsWrap = styled.div`
  padding: 32px 96px;
  position: relative;
  @media screen and (max-width: 1440px) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;

export const BackToList = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 153%;
  color: #1d242f;

  button {
    padding: 0;
    background: transparent;
    border: none;
    display: inline-block;
    transition: all 0.35s ease 0s;
    color: inherit;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    outline: none;
    box-shadow: none;

    &:hover {
      color: #a873fa;

      path {
        stroke: #a873fa;
      }
    }

    svg {
      margin-right: 12px;
      top: -2px;
      position: relative;

      path {
        -webkit-transition: 0.3s all ease;
      }
    }
  }
`;
export const SearchJobHeader = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  display: flex;
`;
export const JobPostingWrap = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
`;
export const JobPostingList = styled.div`
  margin-right: 92px;
  width: calc(100% - 540px);
  background: #ffffff;
  box-shadow: 0px 0px 20px #d2e1f1;
  border-radius: 10px;
  padding: 16px;
`;
export const JobPostingItem = styled.div`
  padding: 0 0 16px;
  border-bottom: 1px solid #dbe1e8;
  margin-bottom: 16px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;
export const PostingItemTitle = styled.h3`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 152%;
  color: #1d242f;
  margin: 0;

  a {
    color: inherit;
    text-decoration: none;
    -webkit-transition: 0.3s all ease-in-out;

    &:hover {
      color: #a873fa;
    }
  }
`;
export const JobPostCompany = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 152%;
  color: #1d242f;
  margin: 0 0 16px;
`;
export const Text = styled.p`
  margin: 0;
`;
export const CheckBookmark = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:checked {
    & + a {
      svg {
        path {
          fill: #a873fa;
          stroke: #a873fa;
        }
      }
    }
  }
`;
export const BookmarkBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  a {
    width: 44px;
    height: 44px;
    border-radius: 44px;
    background: #ffffff;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;

    &.selected {
      svg {
        path {
          stroke: #a873fa;
          fill: #a873fa;
        }
      }
    }
  }
`;
export const JobInfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
export const BtnLink = styled.a``;
export const JobInfoListOne = styled.li`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 152%;
  color: #485768;
  position: relative;
  padding-left: 24px;
  margin: 0 0 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;
export const JobListIcon = styled.img`
  left: 0;
  top: 1px;
  position: absolute;
`;
export const PostReadMore = styled.a`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 153%;
  color: #a873fa;
  display: inline-block;
  position: absolute;
  right: 9px;
  bottom: 9px;
  transition: all 0.35s ease 0s;
  cursor: pointer;

  &:hover {
    color: #1d242f;

    path {
      stroke: #1d242f;
    }
  }

  svg {
    margin-left: 15px;

    path {
      transition: all 0.35s ease 0s;
    }
  }
`;
export const JobCompanyBox = styled.div`
  min-width: 448px;
  width: 448px;
  background: #ffffff;
  border: 1px solid #e8ecf1;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px #cfd8e2;
  border-radius: 10px;
  position: sticky;
  top: 30px;
`;
export const JobComapanyHeader = styled.div`
  padding: 16px;
  text-align: center;

  a {
    display: inline-block;
    vertical-align: middle;
    max-width: 73%;
  }
`;
export const ComapanyHeaderTitle = styled.h3`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #1d242f;
  margin: 0 0 16px;
`;
export const JobCompanyLogo = styled.img`
  max-height: 54px;
  vertical-align: middle;
  outline: none;
`;
export const JobComInfo = styled.div`
  background: #edf0f5;
  padding: 15px 32px;
`;
export const JobComInfoListing = styled.ul`
  margin: 0 -10px;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`;
export const JobComInfoOne = styled.li`
  width: 50%;
  padding: 0 10px;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 153%;
  color: #1d242f;
  margin-top: 16px;

  &:first-child,
  &:nth-child(2) {
    margin-top: 0;
  }
`;
export const JobComInfoTitle = styled.h4`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 153%;
  color: #485768;
  margin: 0 0 4px;
  display: flex;
  align-items: center;
`;
export const JobComInfoIcon = styled.img`
  margin-right: 7px;
  &.company-icon {
    position: relative;
    top: -3px;
  }
`;
export const JobCompanyBody = styled.div`
  padding: 24px 32px;
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 153%;
  color: #485768;

  p {
    margin: 0 0 24px;
  }
`;
export const ViewComLink = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 153%;
  text-align: right;
  color: #1ed760;

  a {
    display: inline-block;
    transition: all 0.35s ease 0s;
    color: inherit;

    &:hover {
      color: #1d242f;

      path {
        stroke: #1d242f;
      }
    }
  }

  svg {
    margin-left: 15px;

    path {
      transition: all 0.35s ease 0s;
    }
  }
`;
