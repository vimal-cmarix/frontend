import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { serverRedirect } from '@utils/general';

export const login = (token, profileId, callback) => {
  cookie.set(`${process.env.PROJECT_NAME}-token`, token, { expires: 1 });
  if (profileId)
    cookie.set(`${process.env.PROJECT_NAME}-profileId`, profileId, {
      expires: 1,
    });
  return callback();
};

export const loginVerification = (profileId, userId, callback) => {
  if (profileId)
    cookie.set(`${process.env.PROJECT_NAME}-profileId`, profileId, {
      expires: 1,
    });
  if (userId)
    cookie.set(`${process.env.PROJECT_NAME}-userId`, userId, {
      expires: 1,
    });
  return callback();
};

export const updateToken = token => {
  cookie.set(`${process.env.PROJECT_NAME}-token`, token, { expires: 1 });
};

export const auth = (ctx, needsVerification, useAccessToken) => {
  const nameToken = `${process.env.PROJECT_NAME}-token`;
  const response = nextCookie(ctx);
  const token = response[nameToken];

  if (useAccessToken && useAccessToken !== '') return null;

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      const { url } = ctx.req;
      const sufix = url.includes('/checkout') ? `?redirect=${url}` : '';

      // serverRedirect(ctx, `/signin${sufix}`);
      serverRedirect(ctx, `/company/signin${sufix}`);
    } else {
      Router.push(`/company/signin`);
    }
  } else if (needsVerification) {
    const info = jwtDecode(token);
    console.log('info', info);
    if (!info.isVerified) {
      if (typeof window === 'undefined') {
        serverRedirect(ctx, '/company/dashboard');
        // serverRedirect(ctx, '/home');
      } else {
        Router.push('/company/dashboard');
        // Router.push('/home');
      }
    }
  }

  return token;
};

export const clearCredentials = () => {
  cookie.remove(`${process.env.PROJECT_NAME}-token`);
  cookie.remove(`${process.env.PROJECT_NAME}-profileId`);
  localStorage.removeItem('isCompanyUser');
  localStorage.removeItem('companyProfile');
  localStorage.removeItem('companyAbout');
  localStorage.removeItem('userDetail');
  if (
    process.browser &&
    window.extole &&
    typeof window.extole.require === 'function'
  ) {
    // '[EXTOLE LOG OUT]'
    window.extole.require(
      ['core-root:///common/user-service.js'],
      userService => {
        userService.logout();
      },
    );
  }
};

export const logout = () => {
  clearCredentials();

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  // window.location.href = '/';
  Router.push('/');
};

export const withAuthSync = (WrappedComponent, needsVerification) => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        Router.push(`/company/signin`);
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    // eslint-disable-next-line
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const { query } = ctx;
    const { accessToken } = query;
    const token = auth(ctx, needsVerification, accessToken);
    const jwt = token ? jwtDecode(token) : null;

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token, jwt };
  };

  return Wrapper;
};

export const withoutAuth = WrappedComponent => {
  const Wrapper = props => {
    // eslint-disable-next-line
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const nameToken = `${process.env.PROJECT_NAME}-token`;
    const response = nextCookie(ctx);
    const token = response[nameToken];

    if (token) {
      const isCompanyUser = localStorage.getItem('isCompanyUser');
      //console.log('info', isCompanyUser);
      if (typeof window === 'undefined') {
        // serverRedirect(ctx, `/home`);
        if (isCompanyUser === 'true') {
          serverRedirect(ctx, `/company/dashboard`);
        } else {
          serverRedirect(ctx, `/profile`);
        }
      } else {
        // Router.push('/home');
        if (isCompanyUser === 'true') {
          Router.push('/company/dashboard');
        } else {
          Router.push('/profile');
        }
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
