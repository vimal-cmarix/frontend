import React from 'react';
import Skeleton from 'react-loading-skeleton';

import {
  Container,
  Header,
  HeaderLeft,
  HeaderContent,
  HeaderGroup,
} from './style';

function SwimlaneSkeleton() {
  return (
    <Container>
      <Header>
        <HeaderGroup>
          <HeaderLeft />
          <HeaderContent>
            <Skeleton />
            <Skeleton style={{ width: 100, margin: '0 auto' }} />
          </HeaderContent>
        </HeaderGroup>
      </Header>
    </Container>
  );
}

export default SwimlaneSkeleton;
