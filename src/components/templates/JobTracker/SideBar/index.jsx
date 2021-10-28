import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { Container, Header, Content, Title, LinkItem } from './style';
import { BackButton } from '../style';

const SideBar = ({ handleChangeBoard, boards }) => {
  const router = useRouter();

  return (
    <Container>
      <Header>
        <Title className="appHeaderTitle">Application Tracker</Title>
      </Header>
      <Content>
        {/* <Title>Application Tracker</Title> */}
        <LinkItem isActive>
          <span>My Board</span>
          {/* <PlusButtonContainer>
            <PlusButton action={() => console.log('open modal add')} />
          </PlusButtonContainer> */}
        </LinkItem>
        {/* {boards?.map(board => (
          <LinkItem key={board.id} onClick={handleChangeBoard} isActive>
            <span>{board.name}</span>
             <TrashContainer>
              <IconSVG name="trash" size={24} />
            </TrashContainer>
          </LinkItem>
        ))} */}
      </Content>
    </Container>
  );
};

SideBar.propTypes = {
  handleChangeBoard: PropTypes.func,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SideBar.defaultProps = {
  handleChangeBoard: () => {},
};

export default SideBar;
