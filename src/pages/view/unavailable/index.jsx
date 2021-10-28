import React from 'react';
import Page from '@components/templates/Page';
import Unavailable from '@components/templates/Unavailable';

export default () => {
  return (
    <Page
      title="Unavailable"
      nav={{ show: false }}
      topbar={{ show: false }}
      loadProfile={false}
    >
      <Unavailable />
    </Page>
  );
};
