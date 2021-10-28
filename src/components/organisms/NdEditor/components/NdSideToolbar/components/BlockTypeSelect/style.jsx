import styled from 'styled-components';

export const Container = styled.div`
  button {
    position: relative;
    background: transparent;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    outline: none;
    cursor: pointer;
    border: 1px solid #ddd;

    &:hover {
      background: #eee;
    }

    svg {
      fill: #777;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .sidetoolbar-menu {
    transition: transform 250ms;
    background-color: #fafafa;

    &.sidetoolbar-open {
      transform: rotate(45deg);
    }
  }

  .sidetoolbar-actions {
    height: 32px;
    position: absolute;
    /* background: #fafafa; */
    /* top: 42px; */
    /* left: 0; */
    top: 0;
    left: 42px;
    transform: scale(0);
    transition: transform 0.15s cubic-bezier(0.3, 1.2, 0.2, 1);
    display: flex;

    > div {
      margin-left: 6px;
      /* margin-top: 0; */
    }

    button {
      background-color: #fafafa;
    }

    &.sidetoolbar-open {
      transform: scale(1);
    }
  }

  &.active-tour {
    display: inline-flex;
    flex-direction: row;

    .sidetoolbar-actions {
      position: relative;
      left: 10px;
      padding-right: 10px;
      pointer-events: none;
    }
  }
`;

export default Container;
