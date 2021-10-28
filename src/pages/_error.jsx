import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'next/link';
import Brand from '@components/atoms/Brand';
import { HeadingSmall } from '@assets/styles/typography';
import { Black, SizigiGrey } from '@assets/styles/colors';
import { serverRedirect } from '@utils/general';
import * as qs from 'querystring';

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${HeadingSmall}
  color: ${Black};
  

  p {
    padding: 24px 0;
  }

  &.error404{
    text-align:center;
    padding:30px 15px;
    color: #313134;
    letter-spacing: 0;
    overflow-y: auto;
    @media only screen and (max-width:812px) and (orientation:landscape){
      justify-content: flex-start;
    }
    @media (max-width:767px){
      justify-content: flex-start;
      h1{
        width:130px;
        height: 44px;
        min-height: 44px;
      }
    }
    @media (max-width:480px){
      justify-content:center;
    }

    h2{
      font-weight: 700;
      font-size: 250px;
      line-height: 0.8;
      margin: 50px 0 25px;

      @media (max-width:767px){
        font-size: 180px;
        margin-top:40px;
        margin-bottom:18px;
      }
      @media (max-width:480px){
        font-size: 46vw;
      }
    }
    p {
      font-size: 23px;
      line-height: 1.4;
      padding: 0;
      @media (max-width:767px){
        font-size: 16px;
      }
    }
    .goHomeBtn{
      cursor: pointer;
      background-color: #a873fa;
      color: #fff;
      font-size: 15px;
      line-height: 20px;
      border-radius: 7px;
      padding: 12px 25px;
      text-align:center;
      margin-top:70px;
      outline:none;
      transition:all 0.2s ease 0s;
      min-width:140px;
      box-sizing: border-box;
      font-weight: 700;
      letter-spacing: 0.5px;

      &:hover{
        background-color: #4c3f8f;
      }
      @media (max-width:767px){
        margin-top:45px;
        font-size: 14px;
        padding: 10px 15px;
        min-width: 134px;
      }
    }
    
  }
`;

const Error = ({ statusCode }) => {
  // if (statusCode === '404') {
  //   return (
  //     <ErrorWrapper>
  //       <Brand size="large" colorSchema="dark" />
  //       <p>
  //         The URL you are trying to access does not exist or is not available
  //         anymore.
  //       </p>
  //     </ErrorWrapper>
  //   );
  // }
  return (
    <ErrorWrapper className="error404">
      <Brand size="large" colorSchema="gray" />
      <h2>404</h2>
      {/* <p>
        {statusCode
          ? `We couldn't find the page you're looking for`
          : 'An error occurred on client'}
      </p> */}
      <p>We couldn&apos;t find the page you&apos;re looking for</p>
      <Link href="/company/dashboard">
        <div className="goHomeBtn">Go to my dashboard</div>
      </Link>
    </ErrorWrapper>
  );
};

Error.getInitialProps = ctx => {
  // console.log('ctx', ctx);
  const { req, res, err, query } = ctx;
  let statusCode;

  if (res) statusCode = res.statusCode;
  else if (err) statusCode = err.statusCode;
  else statusCode = 404;

  const { url } = req;

  if (statusCode === 404 && !query.from) {
    query.from = '404';
    serverRedirect(ctx, `${url}?${qs.stringify(query)}`);
  }

  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default Error;
