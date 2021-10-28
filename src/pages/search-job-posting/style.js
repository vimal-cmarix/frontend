import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
} from '@assets/styles/typography';
import { Grey, Haiti, GreyC4, PrimaryClean } from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';

export const ModalStyle = styled.div`
  .modal-body {
    padding: 16px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
  }
  video {
    border-radius: 5px;
    width: 100%;
    height: 315px;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
  }
  iframe {
    max-width: 100%;
    width: 100%;
    height: 315px;
    max-height: 100%;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  .embed-video-box {
    height: 315px;
    margin: 0;
  }
  &.content-modal-wrap {
    .modal-body {
      padding: 24px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #1d242f;
      @media screen and (max-width: 1560px) {
        padding: 16px;
      }
    }
    .explore-media-box {
      margin-bottom: 16px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      height: 315px;
      background: #c4c4c4;
      img,
      video {
        width: 100%;
        height: 100%;
        max-width: 100%;
        border-radius: 4px;
        vertical-align: middle;
        object-fit: cover;
        object-position: center;
      }
    }
    h3 {
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      color: #1d242f;
      margin: 0 0 10px;
    }
    p {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

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

export const AddedList = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    li {
      padding: 16px 0 16px 0;
      position: relative;
      border-bottom: 1px solid #dbe1e8;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #1d242f;
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
      &:first-child {
        padding-top: 0;
      }
      h4 {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 150%;
        color: #1d242f;
        margin: 0;
      }
    }
  }
`;

export const JobPostingTop = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  display: flex;
  @media screen and (max-width: 1600px) {
    margin-bottom: 15px;
  }
  @media screen and (max-width: 1440px) {
    margin-bottom: 8px;
  }
`;

export const JobPostingHead = styled.div`
  border-bottom: 1px solid #c2c9d1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  padding: 32px 96px 30px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 9;
  @media screen and (max-width: 1600px) {
    padding: 22px 96px 20px;
  }
  @media screen and (max-width: 1440px) {
    padding: 15px 48px 15px;
  }
  @media screen and (max-width: 1560px) {
    position: inherit;
  }
`;

export const JobPostContainer = styled.div`
  &.social-feed-container {
    width: 865px;
    max-width: 100%;
    margin: auto;
  }
`;
export const BackToList = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 153%;
  color: #1d242f;
  cursor: pointer;
  transition: all 0.35s ease 0s;
  svg {
    margin-right: 12px;
    top: -2px;
    position: relative;
  }
  path {
    transition: all 0.35s ease 0s;
  }
  &:hover {
    color: #a873fa;
    path {
      stroke: #a873fa;
    }
  }
`;

export const JobPostHeadInfo = styled.div`
  position: relative;
  h3 {
    font-size: 24px;
    line-height: 153%;
    margin: 0 0 8px;
    color: #1d242f;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    @media screen and (max-width: 1440px) {
      font-size: 22px;
      margin-bottom: 5px;
    }
  }
  .job-post-company {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
    margin: 0 0 8px;
  }
  .bookmark-btn {
    right: 92px;
    position: absolute;
    top: 0;
    cursor: pointer;
    width: 44px;
    height: 44px;
    border-radius: 44px;
    background: #ffffff;
    box-shadow: 2px 2px 8px rgb(0 0 0 / 16%);
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
    svg:not(:root) {
      overflow: hidden;
    }
    svg {
      overflow: hidden;
      vertical-align: middle;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 153%;
      color: #485768;
      position: relative;
      padding-left: 24px;
      margin: 0 0 8px;
      min-height: 24px;
      img {
        left: 0;
        position: absolute;
        top: 4px;
        vertical-align: middle;
        border-style: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const JobPostingMain = styled.div`
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  padding: 24px 96px 0;
  @media screen and (max-width: 1440px) {
    padding: 24px 48px 0;
  }
`;

export const JobPostLeftPanel = styled.div`
  margin-right: 116px;
  width: 684px;
  @media screen and (max-width: 1440px) {
    margin-right: 46px;
  }
`;

export const WhyWorkBox = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 153%;
  color: #1d242f;
  padding-bottom: 30px;
  position: relative;
  z-index: 0;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 16px;
  }
  p {
    margin: 0 0 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .apply-now-btn {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    color: #ffffff;
    padding: 6px 20px;
    background: #1db954;
    border: 2px solid #1db954;
    box-sizing: border-box;
    border-radius: 10px;
    width: 100%;
    display: inline-block;
    text-align: center;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    outline: none;
    box-shadow: none;
    text-decoration: none;
    svg {
      margin-left: 9px;
      position: relative;
      top: -1px;
    }
    path {
      transition: all 0.35s ease 0s;
    }
    &:hover {
      background: transparent;
      border-color: #1db954;
      color: #1db954;
      path {
        stroke: #1db954;
      }
    }
  }
`;

export const WorkBoxVideo = styled.div`
  margin: 0 0 16px;
  border-radius: 5px;
  height: 315px;
  a {
    display: block;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
    height: 315px;
    object-fit: cover;
    width: 100%;
    border-radius: 5px;
  }
  video {
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: 100%;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  iframe {
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: 100%;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  .embed-video-box {
    height: 100%;
    margin: 0;
  }
`;

export const JobPostGrayBbox = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 153%;
  position: relative;
  z-index: 0;
  padding: 24px 24px 24px 0;
  color: #485768;
  &:before {
    background: #edf0f5;
    border-radius: 0px 10px 10px 0px;
    content: '';
    position: absolute;
    left: -100%;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 16px;
  }
  p {
    margin: 0 0 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 0 24px;

  iframe {
    max-width: 100%;
    width: 100%;
    height: 360px;
    border: none;
    vertical-align: middle;
    border-radius: 5px;
    outline: none;
  }

  @media ${smscreen} {
    height: 230px;
    box-sizing: border-box;

    iframe {
      height: 100%;
      width: 100%;
    }
  }
`;

export const JobCompanyBox = styled.div`
  background: #ffffff;
  border: 1px solid #e8ecf1;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px #cfd8e2;
  border-radius: 10px;
  min-width: 448px;
  width: 448px;
  margin-top: 51px;
  position: sticky;
  top: 280px;
  margin-bottom: 30px;
  @media screen and (max-width: 1600px) {
    top: 241px;
  }
  @media screen and (max-width: 1440px) {
    top: 222px;
  }
  @media screen and (max-width: 1560px) {
    top: 30px;
  }
  .job-company-header {
    padding: 16px;
    text-align: center;
    h3 {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      text-align: center;
      color: #1d242f;
      margin: 0 0 16px;
    }
    a {
      display: inline-block;
    }
    img {
      max-width: 100%;
      vertical-align: middle;
      max-height: 70px;
    }
  }
  .job-com-info {
    background: #edf0f5;
    padding: 15px 32px;
    h4 {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 153%;
      color: #485768;
      margin: 0 0 4px;
      position: relative;
      padding-left: 24px;
      img {
        position: absolute;
        left: 0;
        top: 4px;
      }
      .company-icon {
        top: 0;
      }
    }
    ul {
      margin: 0 -10px;
      padding: 0;
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        padding: 0 10px;
        font-family: Mulish;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 153%;
        color: #1d242f;
        margin-top: 16px;
        p {
          margin: 0;
        }
        &:first-child,
        &:nth-child(2) {
          margin-top: 0;
        }
        @media screen and (max-width: 1440px) {
          margin-top: 13px;
        }
      }
    }
  }
  .job-company-body {
    padding: 24px 32px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 153%;
    color: #485768;
    p {
      margin: 0 0 24px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    @media screen and (max-width: 1440px) {
      font-size: 15px;
      padding: 16px 32px;
      p {
        margin: 0 0 16px;
      }
    }
  }
  .view-com-link {
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
    }
    path {
      transition: all 0.35s ease 0s;
    }
  }
`;

export const FeatureArticleone = styled.div`
  padding: 24px 0 42px;
  position: relative;
  width: 100%;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 153%;
  color: #1d242f;
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 24px;
  }
`;
export const FeatureArticleInnertwo = styled.div`
  max-width: 920px;
  margin: auto;
`;

export const FeatureArticle = styled.div`
  background: #edf0f5;
  padding: 24px 0 42px;
  position: relative;
  width: 100%;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 153%;
  color: #1d242f;
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 24px;
  }
`;
export const FeatureArticleInner = styled.div`
  max-width: 920px;
  margin: auto;
`;

export const ArticleImgBox = styled.div`
  width: 100%;
  height: 348px;
  border-radius: 5px;
  margin-bottom: 16px;
  img {
    height: 100%;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  video {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    max-height: 100%;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
  }
  iframe {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    max-height: 100%;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
  }
  .embed-video-box {
    height: 100%;
    margin: 0;
  }
`;

export const ArticleInfo = styled.div`
  max-width: 496px;
  margin: auto;
  text-align: center;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #1d242f;
    margin: 0;
  }
  p {
    margin: 0;
  }
  .learn-more {
    position: relative;
    display: block;
    width: max-content;
    margin: 8px auto auto;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 153%;
    color: #009de9;
    transition: all 0.35s ease 0s;
    padding-right: 20px;
    &:after {
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      border-right: 2px solid #009de9;
      border-top: 2px solid #009de9;
      transform: rotate(45deg) translateY(-50%);
      margin-left: 5px;
      top: 50%;
      transition: all 0.35s ease 0s;
    }
    &:hover {
      color: #1d242f;
      &:after {
        border-color: #1d242f;
      }
    }
  }
`;

export const LearnMoreLink = styled.a`
  position: relative;
  display: block;
  width: max-content;
  margin: 8px auto auto;
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 153%;
  color: #009de9;
  transition: all 0.35s ease 0s;
  padding-right: 20px;
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    border-right: 2px solid #009de9;
    border-top: 2px solid #009de9;
    transform: rotate(45deg) translateY(-50%);
    margin-left: 5px;
    top: 50%;
    transition: all 0.35s ease 0s;
  }
  &:hover {
    color: #1d242f;
    &:after {
      border-color: #1d242f;
    }
  }
`;

export const SocialFeedWrap = styled.div`
  padding: 48px 0;
  .row {
    justify-content: space-between;
    [class^='col-'] {
      width: 399px;
      max-width: 399px;
    }
  }
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #1d242f;
    margin: 0 0 16px;
  }
`;

export const SocialFeedImg = styled.div`
  background: #c4c4c4;
  width: 48px;
  height: 48px;
  border-radius: 50px;
  margin: auto auto 8px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50px;
  }
`;

export const SocialFeedBox = styled.div`
  height: 812px;
  background: #c4c4c4;
  width: 100%;
  border: 1px solid #c4c4c4;
  @media screen and (max-width: 1560px) {
    height: 650px;
  }
  @media screen and (max-width: 1440px) {
    height: 550px;
  }
  .Container {
    border: none;
    border-radius: 0;
    height: 100%;
    background: #fff;
  }
`;

export const PerksBenefits = styled.div`
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom:0;
  .accordion-item{
    border: none;
    &:nth-child(2n){
      .accordion-header{
        background:#E6EDF5;
      }
    }
  }

  .accordion-header{
    padding: 0 24px;

    button{
      border: none;
      border-radius: 0;
      width: 100%;
      text-align: left;
      display: block;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #005e8b;
      position: relative;
      padding: 12px 32px 12px 38px;
      text-decoration: none;
      box-shadow: none;
      transition: all .35s ease 0s;
      background: none;

      .toggle-icon{
        width: 24px;
        height: 24px;
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url('${cdn('/static/img/minus-circle.svg')}');

        svg{
          position: unset;
          display: none;
        }
      }

      &.collapsed{
        color: #1d242f;
        
        .toggle-icon{
          background: none;

          svg{
            display: block;
            path {
              stroke: #A1AAB4;
            }
          }
        }

        svg{
          path{
            stroke: #1d1d1d ;
            
            &.b{
              fill: #1d1d1d;
              stroke: none;
            }
          }
        }
      }

      svg{
        position: absolute;
        left: 0;
        top: 10px;

        path{
          stroke: #005e8b;

          &.b{
            fill: #005e8b;
            stroke: none;
          }
        }
      }
     
    }
  }

  .accordion-body{
    background: #f9f9fa;
    padding: 16px 24px;
    min-height: 220px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #1d242f;
    transition: all .3s ease-in-out;
  }

  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 8px;
  }
  span {
    color: #005e8b;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

export const PerksTop = styled.div`
background: url('${cdn('/static/img/perks-bg.png')}') no-repeat 50%;
background-size: cover;
display: -webkit-flex;
display: flex;
-webkit-align-items: center;
align-items: center;
-webkit-justify-content: center;
justify-content: center;
padding: 60px 10px 59px;
.com-name {
  padding:13px 24px;
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 110%;
  color: #FFFFFF;
  text-align:center;
  border-radius:50px;
  background-color: #1db954;
  min-width:468px;
  max-width:90%;
  margin:0;
}
`;
export const companyProfile = styled.div``;
export const CompanyBenefitList = styled.div`
  .card:nth-child(2n) .card-header {
    background: #e6edf5;
  }
  h3 {
    margin: 0;
  }
  .btn-link {
    border: none;
    border-radius: 0;
    width: 100%;
    text-align: left;
    display: block;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    position: relative;
    padding: 12px 32px 12px 38px;
    text-decoration: none;
    box-shadow: none;
  }
  .btn-link:hover {
    color: #005e8b !important;
  }
  .btn-link svg {
    display: block;
    vertical-align: middle;
  }
  .btn-link:hover svg path{
    stroke: #005E8B !important;
  }
  .btn-link:hover svg path.b{
    fill: #005E8B !important;
  }
  .btn-link svg path{
    stroke: #005E8B;
  }
  .btn-link.collapsed svg path{
    stroke: #1d1d1d;
  }
  .btn-link svg path.a{
    stroke: #005E8B;
  }
  .btn-link svg path.b {
    fill: #005E8B;
    stroke: none !important;
  }
  .btn-link.collapsed svg path.a{
    stroke: #1d1d1d;
  }
  .btn-link.collapsed svg path.b {
    fill: #1d1d1d;
  }
  .btn-link.collapsed{
    color: #1D242F;
  }
  .btn-link > svg {
    position: absolute;
    left: 0;
    top: 10px;
  }
  .btn-link > img {
    position: absolute;
    left: 0;
    top: 10px;
  }
  .toggle-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: url('${cdn('/static/img/minus-circle.svg')}')
    background-repeat: no-repeat;
    background-position: center;
  }
  .toggle-icon {
    background-image: url('${cdn('/static/img/minus-circle.svg')}')
  }
  .company-benefits-body {
    background: #f9f9fa;
    padding: 16px 24px;
    min-height: 220px;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #1d242f;
  }
  .add-benefits-btn {
    display: block;
    background: #4fbbef;
    color: #00405f;
    font-size: 18px;
    line-height: 24px;
    float: none;
    width: 100%;
    font-family: Mulish;
    font-weight: 700;
    padding: 8px 15px;
    border: 2px solid #4fbbef;
    box-sizing: border-box;
    border-radius: 10px;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
  }
`;
export const ToggleAccordion = styled.button`
  display: block;
  background: #4fbbef;
  color: #00405f;
  font-size: 18px;
  line-height: 24px;
  float: none;
  width: 100%;
  font-family: Mulish;
  font-weight: 700;
  padding: 8px 15px;
  border: 2px solid #4fbbef;
  box-sizing: border-box;
  border-radius: 10px;
  transition: all 0.35s ease 0s;
  outline: none;
  box-shadow: none;
  text-align: center;
  text-decoration: none;

  svg {
    margin-right: 7px;
    position: relative;
    top: -1px;
    path {
      vertical-align: middle;
      transition: all 0.35s ease 0s;
    }
  }

  &:hover {
    text-decoration: none;
    color: #4fbbef;
    background: #fff !important;

    svg {
      path {
        stroke: #4fbbef;
      }
    }
  }
`;

export const JobPostingPerksnBenefits = styled.div`
  padding: 32px 24px 32px 0;
`;

export const HiringOuterWrapper = styled.div`
  padding: 24px 96px 32px;
  margin:0;
  background-color: #edf0f5;
  @media screen and (max-width: 1440px) {
    padding: 24px 48px 32px;
  }

  .com-name {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #1D242F;
    margin: 0 0 24px;
  }

  .now_hiring{
    .save-the-job{
      position: absolute;
      top: -20px;
      margin-top: 0 !important;
      right: -20px;
      background: #fff;
      box-shadow: 0px 0px 15px rgb(0 0 0 / 15%);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;

      img{
        margin-right: 0 !important;
      }
    }
    .search-form {
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      width: 100%;
      input {
        width: calc(100% - 110px);
        height: 42px;
        padding: 5px 12px 5px 54px;
        font: 500 16px 'Mulish';
        outline: none;
        border: none;
        background: #fff url('${cdn(
          '/static/img/search-icon.svg',
        )}') no-repeat 16px;
        background-size: 22px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      button {
        background: #1db954;
        color: #fff;
        width: 110px;
        padding: 5px;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 152%;
        outline: none;
        height: 42px;
        border: none;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        text-align:center;
        box-shadow:none;
      }
    }
    .job_one {
      background: #fff;
      position: relative;
      box-shadow: 0px 8px 13px -3px #CFD8E2;
      border-radius: 10px;
      padding: 16px 25px 16px 16px;
      margin-top: 35px;
      border: 1px solid #E8ECF1;
      > div {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 152%;
        letter-spacing: 0;
        color: #485768;
        margin: 0 0 8px;
    
        img{
          margin-right: 10px
        }
      }
      > div.job-posting{
        margin-bottom:0;
        > a {
          display: block;
          position: relative;
          padding-right: 20px;
          font-family: Mulish;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 153%;
          text-align: right;
          color: #009DE9;
          transition:all 0.35s ease 0s;
          right:0;
          bottom:0;    
          &::after{
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-right: 2px solid #009DE9;
            border-top: 2px solid #009DE9;
            transform: translateY(-50%) rotate(45deg);
            right: 0;
            top: 14px;
            transition:all 0.35s ease 0s;
          }
          &:hover{
            color: #1D242F;
            &:after{
              border-color: #1D242F;
            }
          }
        }
      }
      .job-name {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 152%;
        color: #1D242F;
        margin: 0;
      }
      .company-name {
        font-family: Mulish;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 152%;
        color: #1D242F;
        margin-bottom:16px;
        display: block;
      }
    }
    .carousel {
      padding-bottom: 68px;
      .carousel-inner{
        margin: 0 -30px 0 -10px;
        padding: 0;
        width: auto;
        min-width: 100%;
        .carousel-item {
          padding: 0 30px 0 10px;
        }
      }
      .carousel-control-prev,
      .carousel-control-next {
        width: 110px;
        height: 44px;
        border: none;
        border-radius: 8px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #fff;
        font: 600 18px "Mulish";
        background: #1db954;
        opacity: 1;
        position: absolute;
        bottom: 0;
        top: auto;
        span{
          display: none;
        }
      }
      .carousel-control-prev {
        left: -25px;
        &:before {
          content: "";
          width: 10px;
          height: 10px;
          border-bottom: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(45deg);
          margin-right: 10px;
          margin-top: 1px;
        }
        &:after {
          content: 'Prev';
        }
      }
      .carousel-control-next {
        right: -25px;
        &:after {
          content: "";
          width: 10px;
          height: 10px;
          border-top: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: rotate(45deg);
          margin-left: 10px;
          margin-top: 1px;
        }
        &:before {content: 'Next';}    
      }
      .carousel-indicators{
        position: absolute;
        top: auto;
        right: 120px;
        bottom: 0;
        left: 120px;
        margin: 0;
        min-height: 44px;        
        align-items: center;
        justify-content: center;
        display: flex;
        button {
          width: 8px;
          height: 8px;
          border: 1px solid #485768;
          background: #485768;
          border-radius: 50%;
          display: inline-block;
          margin: 0 10px;
          position: relative;
          cursor: pointer;
          opacity: 1;
          transition: all 0.35s ease 0s;
          box-sizing: border-box;
          padding: 0;
          &.active {
            background: transparent;
          }
        }
      }
    }
  }
  .slider-footer {
    align-items: center;
    justify-content: space-between;
    margin: 24px -25px 0;
    display: flex;
    > .nav-buttons {
      width: 110px;
      height: 44px;
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font: 600 18px "Mulish";
      background: #a873fa;
      .next :disabled {
        background: red!important;
      }
      &.next:after {
        content: "";
        width: 10px;
        height: 10px;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: rotate(45deg);
        margin-left: 10px;
      }
      &.prev:before {
        content: "";
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(45deg);
        margin-right: 10px;
      }
    }
    .nav-dots {
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      .nav-dot {
        width: 8px;
        height: 8px;
        border: 1px solid #485768;
        background: #485768;
        border-radius: 50%;
        display: inline-block;
        margin: 0 10px;
        position: relative;
        cursor: pointer;
        &.active {
          background: transparent;
        }
      }
    }
  }
`;

export const CompnayPreviewWrapper = styled.div`
  width: 100%;
`;

export const MeetEmployees = styled.div`
  padding: 32px 24px 72px 0;
  .meet-employees-container{
    border-radius: 5px;
    margin:0;
    box-shadow: 0px 8px 13px -3px #cfd8e2;
  }  
  .meet-employees_main {
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
    padding:0 8px;
    .employee_one {
      text-align: center;
      padding: 30px 8px 32px;
      width:33.33%;
  
      .employee_one_inner{
        display: inline-block;
      }
  
      .video-icon{
        position: absolute;
        right: -24px;
        bottom: 16px;
        width: 58px;
        height: 26px;      
        align-items: center;
        justify-content: center;
        background: #1db954;
        border-radius: 8px;
        display: flex;
        border: none;
        outline: none;
        box-shadow: none;
        a{
          display:block;
        }
        img {
          vertical-align: middle;
          max-height: 16px;
          border-radius: 0;
        }
      }
      .employee_img {
        width: 100px;
        position: relative;
        height: 100px;
        border-radius: 50%;
        margin: auto;
        background: #C4C4C4;
        box-shadow: 0px 8px 13px -3px #CFD8E2;
        > img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .employee_details{
        margin-top:8px;
        .employee-name{
          margin: 0;
          font-family: Mulish;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 28px;
          text-align: center;
          color: #1D242F;
        }
        .designation{
          font-family: Mulish;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 28px;
          text-align: center;
          color: #1D242F;
          margin-bottom: 8px;
          display: block;
        }
        p{
          font-family: Mulish;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 153%;
          text-align: center;
          color: #1D242F;
          margin: 0;
        }
      }
    }
  }
  .show_more-employees {
    text-align: center;
    padding-bottom: 30px;
  }
  .meet-employees-top {
    padding: 60px 0 59px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background: url('${cdn('/static/img/perks-bg.png')}') no-repeat 50%;
    background-size: cover;    
    align-items: center;
    justify-content: center;
    display: flex;

    .com-name{
      margin: 0;
      color: #fff;
      padding:13px 24px;
      border-radius: 40px;
      background-color: #1db954;
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 110%;
      min-width: 498px;
      text-align: center;
    }
  }
  .show_more-employees a {
    position: relative;
    display: inline-block;
    padding-bottom: 20px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    text-align: center;
    color: #009de9;
    transition:all 0.35s ease 0s;
    &::after{
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      left: 50%;
      bottom: 0;
      border-right: 2px solid #009de9;
      border-bottom: 2px solid #009de9;
      transform: rotate(45deg) translateX(-50%);
      transition:all 0.35s ease 0s;
    }
    &:hover{
      color: #1D242F;
      &:after{
        border-color: #1D242F;
      }
    }
`;

export const ZigZagWrap = styled.div`
  padding: 48px 0;

  .zig-zag-inner {
    width: 920px;
    max-width: 100%;
    margin: auto;
    padding: 0;
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 153%;
    color: #1d242f;
  }
  p {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .img {
    width: 100%;
    height: 237px;
    border-radius: 4px;
    background: #c4c4c4;
    box-shadow: 0px 8px 13px -3px #cfd8e2;
    border-radius: 5px;
    video {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: cover;
      border: none;
      outline: none;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
    iframe {
      max-width: 100%;
      width: 100%;
      height: 100%;
      max-height: 100%;
      vertical-align: middle;
      object-fit: cover;
      border: none;
      outline: none;
      border-radius: 5px;
    }
    .embed-video-box {
      height: 100%;
      margin: 0;
    }
  }
  .row {
    margin-bottom: 56px;
    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:nth-child(2n) {
      .col-md-6 {
        &:last-child {
          text-align: right;
          .info {
            max-width: 354px;
          }
        }
      }
    }
  }
  .info {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 153%;
    color: #1d242f;
    max-width: 330px;
    display: inline-block;
    text-align: left;
    h3 {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #1d242f;
      margin: 0 0 8px;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
    p {
      max-height: 144px;
      overflow: hidden;
    }
    .explore-link {
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 153%;
      color: #009de9;
      text-decoration: none;
      outline: none;
      transition: all 0.35s ease 0s;
      border: none;
      padding: 0;
      background: transparent;
      outline: none;
      box-shadow: none;
      svg {
        margin-left: 13px;
      }
      path {
        transition: all 0.35s ease 0s;
      }
      :hover {
        color: #1d242f;
        path {
          stroke: #1d242f;
        }
      }
    }
  }
`;
