import styled from 'styled-components';

export const VideoThumbnailRendererPreview = styled.div`
  width: 200px;
  height: 112.5px;
  border: 1px solid black;
  margin: 10px;
  background-color: black;
  background-repeat: no-repeat;
  background-image: ${p => `url(${p.url})`};
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
