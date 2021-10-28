import styled from 'styled-components';
import { RadiusSmall } from '@assets/styles/radius';
import { typoTheme } from '@assets/styles/typo';
import { DEFAULT_FONT } from '@assets/styles/theme';
import {
  HeadingLarge,
  LabelMedium,
  LabelXXXSmall,
  LabelXSmall,
} from '@assets/styles/typography';
import {
  Haiti,
  GreyC4,
  PrimaryClean,
  White,
  Black,
  Red,
  GreyCF,
  Grey61,
  Grey50,
} from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';

<script
    type="text/javascript"
    async=""
    src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
/>;

export const Label = styled.span`
  display: inline-block;
  margin-bottom: 0;
  background-color: #fff;
  margin-left: 20px;
  padding: 0 2px;
  position: relative;
  span {
    color: #ea0000;
  }
`;

export const BoxFormSection = styled.div`
  padding: 80px 0;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  overflow: hidden;
`;

export const BoxFormTitle = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 153%;
  font-weight: 700;
  color: #1d242f;
  padding: 32px 24px 24px;
  border-bottom: 1px solid #dbe1e8;
  -webkit-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: inherit;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  text-align: center;
  .btn {
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
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
  }
  .btn-skip-now {
    width: auto;
    background: transparent;
    color: #005e8b;
    border-color: transparent;
    display: inline-block;
  }
`;

export const FormGroup = styled.div`
  margin: 0 0 56px;
  position: relative;
  .form-control {
    padding: 10px 20px;
    border: 1px solid #485768;
    border-radius: 4px;
    margin-top: -8px;
    width: 100%;
    background-color: white;
  }
  select.form-control {
    padding-right: 34px;
  }
  :focus {
    border-color: #4fbbef;
  }
`;

export const CompanyBenefitsWrap = styled.div`
  padding-top: 24px;
  border-top: 1px solid #a1aab4;
  padding-bottom: 24px;
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 8px;
  }
  .company-benefits-des {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
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

export const CompanyBenefitList = styled.div`
  margin: 0 -25px;
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
    /* background-image: url(/img/minus-circle.svg); */
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

export const CardForm = styled.div`
  border: none;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
`;

export const Card = styled.div`
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  .card-header {
    padding: 0 24px;
    margin: 0;
    background: transparent;
    border: none;
  }
`;
