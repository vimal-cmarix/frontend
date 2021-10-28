import React from 'react';
import Link from 'next/link';

import { Container, Logo, Title } from './style';

const Unavailable = () => {
  return (
    <Container>
      <Logo />
      <Title>This content is currently unavailable</Title>
      <p className="text-center">
        <Link className="btn btn-primary btn-mt-primary" href="/profile">
          Go to Home
        </Link>
      </p>
    </Container>
  );
};

export default Unavailable;
