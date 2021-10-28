import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
} from '@assets/styles/typography';
import { Grey, Haiti, GreyC4, PrimaryClean } from '@assets/styles/colors';
import { smscreen, xxsscreen, xmscreen } from '@assets/styles/medias';
// import { xmscreen, sizes as breakpoint } from '@assets/styles/medias';
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

export const Searchjobswrap = styled.div`
  // padding: 32px 24px 32px 168px;
  padding: 20px 96px 0;
  position: relative;
  @media screen and (max-width: 1440px) {
    padding: 17px 48px 0;
  }
`;

export const Searchjobheader = styled.div`
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 20px;
  background: #fff;
  position: sticky;
  top: 0;
  @media screen and (max-width: 1440px) {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
`;
export const Jobsearchbar = styled.div`
  position: relative;
  min-width: calc(100% - 80px);

  .job-search-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    display: inline-block;
    left: 0;
    top: 2px;
    background:url('${cdn(
      '/static/img/images/job-search-icon.svg',
    )}') no-repeat center;
  }
  input {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    border: none;
    margin: 0;
    padding: 0 0 0 40px;
    outline: none;
    width: auto;
    max-width: 100%;
    &:focus {
      width: 100%;
    }
    &::-webkit-input-placeholder{color:#485768;opacity:1;}
    &::-moz-placeholder{color:#485768;opacity:1;}
    &:-ms-input-placeholder{color:#485768;opacity:1;}
    &:-moz-placeholder{color:#485768;opacity:1;}
  }
`;

export const Jobslistwrap = styled.div`
  flex-wrap: wrap;
  overflow: hidden;
  display: flex;
`;

export const Jobsitem = styled.div`
  width: calc(33.33% - 96px);
  margin-right: 144px;
  margin-bottom: 48px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  @media screen and (max-width: 1440px) {
    width: calc(33.33% - 60px);
    margin-right: 90px;
    margin-bottom: 35px;
  }
`;

export const Jobsitemimg = styled.div`
  border: 1px solid #e8ecf1;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px #cfd8e2;
  border-radius: 10px;
  margin-bottom: 16px;
  height: 166px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  img {
    max-width: 66% !important;
    max-height: 80px !important;
    vertical-align: middle;
    border-style: none;
  }
  @media screen and (max-width: 1440px) {
    height: 140px;
    img {
      max-width: 60% !important;
      max-height: 70px !important;
    }
  }
`;

export const ImageGrid = styled.div``;

export const ButtonLoadMoreWrapper = styled.div`
  width: 216px;
  margin: 16px auto 40px auto;

  @media ${xmscreen} {
    width: 100%;
    margin: 40px auto 80px;
  }
`;

export const Jobsitemimgh = styled.h3`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 153%;
  color: #1d242f;
  margin: 0;
  button {
    padding: 0;
    background: transparent;
    border: none;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    transition: all 0.35s ease 0s;
    text-decoration: underline;
    box-shadow: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-align: left;
    &:hover {
      color: #a873fa;
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1440px) {
    font-size: 16px;
    button {
      font-size: 16px;
    }
  }
`;

export const NoDataFound = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 20px;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoDataFoundWrapimg = styled.img`
  max-height: 200px !important;
`;
export const NoDataFoundWrap = styled.div``;

export const NoDataFoundWrapp = styled.p`
  font-size: 24px;
  margin-top: 20px;
  font-weight: 700;
`;
