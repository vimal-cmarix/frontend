import styled, { css } from 'styled-components';
import { Black, White, Red, Green, Blue, Yellow } from '@assets/styles/colors';
import {
  LabelSmall,
  LabelMedium,
  ParagraphSmall,
} from '@assets/styles/typography';
import { RadiusXLarge, RadiusXSmall } from '@assets/styles/radius';
import { MediumElevation } from '@assets/styles/elevations';
import { SPACING } from '@assets/styles/theme';
import { cdn } from '@utils/general';

const handleColorType = color => {
  switch (color) {
    case 'error':
      return Red;
    case 'success':
      return Green;
    case 'warning':
      return Yellow;
    case 'information':
      return Blue;
    default:
      return Red;
  }
};

export const StyledToast = styled.div`
  background-color: ${White};
  ${RadiusXSmall}
  max-width: 480px;
  ${MediumElevation}
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-20px);
  box-sizing: border-box;
  margin: 24px auto auto;
  width: max-content;
  white-space: nowrap;

  @media (max-width: 480px) {
    max-width: 92%;
    white-space: normal;
  }

  ${props =>
    props.isAnimated &&
    css`
      opacity: 1;
      transform: translateY(0);
    `};

  span {
    color: ${({ type }) => handleColorType(type)};
  }
`;

export const StyledToastText = styled.div`
  ${LabelSmall}
  color: ${Black};
  ${props =>
    props.type !== 'none' &&
    css`
      margin-left: 8px;
    `}
`;

export const StyledToastWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // transform: translateX(-50%);
  transform: none;
  background-color: rgba(47, 53, 62, 0.86);
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -ms-grid-row-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
`;

export const ActionContent = styled.div`
    border-radius: 0;
    width: 750px;
  max-width: 100%;
  background-color:#EEEEEE;
  //${MediumElevation};
  //margin-top: 24px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-20px);
  box-shadow: 0 2px 14px 0 rgba(0,0,0,0.50), 0 2px 4px 0 rgba(0,0,0,0.50);

  ${props =>
    props.isAnimated &&
    css`
      opacity: 1;
      transform: translateY(0);
    `};
`;

export const ActionWrapper = styled(StyledToastWrapper)`
  &.fileUploadModal {
    z-index: 999;
  }
`;

export const ActionIcon = styled.div`
  color: ${({ type }) => handleColorType(type)};
  font-size: 24px;
`;

export const ActionTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;

  .editModalTitle {
    white-space: nowrap;
    span {
      margin-top: 5px;
    }
  }

  .uploadModalBody {
    max-width: 100%;
    // width: calc(100% - 60px);
    width: 100%;
    padding-left: 60px;
    position: relative;
    height: 500px;

    @media only screen and (max-width:812px) and (orientation:landscape){
      min-height:inherit;
      height:100vh;
    }

    @media (max-width:767px){
      min-height:inherit;
      height:100vh;
      width: 100%;
      padding-left: 0;

    }

    * {
      box-sizing: border-box;
    }

    .modalClose{
      background-image: url('${cdn(
        '/static/img/fileuploadicon/icon-close.svg',
      )}');
      background-repeat: no-repeat;
      background-position: center;
      z-index: 10050;
      cursor: pointer;
      display: block;
      width: 22px;
      height: 22px;
      outline: 0;
      position: absolute;
      top: 13px;
      right: 10px;
      opacity: .5;
      transition: all .2s ease-out;
      &:hover{
        opacity: 1;
      }
    }

    @media(max-width: 767px){
      button.closebtn{
        margin-top: -8px
      }
    }
    

    .uploadLeftPanel {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 60px;
      overflow: hidden;
      -webkit-transition: all 0.15s cubic-bezier(0.84, 0.02, 0.37, 0.74);
      transition: all 0.15s cubic-bezier(0.84, 0.02, 0.37, 0.74);
      background: #e2e2e2;
      z-index: 9;
      white-space: nowrap;

      &:hover {
        width: 240px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.18),
          0 16px 16px 0 rgba(0, 0, 0, 0.24);
      }
      @media (max-width:767px){
        width: 60px;
        height: 50px;
        
        &:hover {
          width: 60px;
          box-shadow: none;
        }
      }

      ul {
        @media(max-width: 767px){
          position: fixed;
          width: 100%;
          height: calc(100% - 50px);
          left: 0;
          bottom: 0;
          background-color: #e2e2e2;
          display: none;

          &.showMenu{
            display: block;
          }

        }
        & + .mobile_toggler{
          margin-top: 15px;
          margin-left: 12px;
          display: none;
          border: none;
          cursor: pointer;
          background: transparent;

          @media(max-width: 767px){
            display: block;
          }

          span{
            font-size: 0;
            width: 20px;
            height: 2px;
            display: block;
            margin: 3px 0;
            background: #000;
          }
        }
        li {
          &.active-menu {
            .upload-menu {
              background-color: #eee;
              transition: all 0.2s ease-in;
            }
          }
          

          .upload-menu {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            outline: 0;
            font-size: 13px;
            font-weight: 400;
            width: 240px;
            padding:0;
            color: #444;

            @media (max-width:767px){
              width: 100%;
              margin: 10px 0;

              &:hover, &:focus, &:active{
                box-shadow: none !important;
                background-color: transparent !important
              }
            }

            &:hover {
              color: #2e68fb;
              transition: all 0.2s ease-in;
            }

            &:hover, &:focus, &:active {
              box-shadow: 0 0 5px 1px rgba(112, 112, 112, 0.5);
              background-color: #eee;
            }
            
            button{
              cursor: pointer;
              border: none;
              background: transparent;
              display: flex;
              align-items: center;
              width:100%;
              height: 50px;
              padding: 0 11px;
              
              @media (max-width:767px){
                height: 44px;
                padding: 0 12px;
              }
    
              &:hover{
                & > span{
                  color: #2e68fb;
                }
              }
            }

            img {
              width: 38px;
              height: 38px;
              margin: 0 16px 0 0;
              @media (max-width:767px){
                width: 32px;
                height: 32px;
                margin: 0 11px 0 0;
              }
            }
          }
        }
      }
    }

    .uploadRightPanel {
      padding: 0 30px 60px;
      height: 100%;

      .btn-cus-save, .btn-cus-crop{
        color: #2e68fb;
        border: 1px solid rgba(46,104,251,.5);
        display: inline-block;
        font-size: 13px;
        font-weight: 400;
        height: 38px;
        line-height: 38px;
        padding: 0 30px;
        border-radius: 4px;
        cursor: pointer;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -moz-user-select: none;
        outline: 0;
        -webkit-transition: all .2s cubic-bezier(.84,.02,.37,.74);
        transition: all .2s cubic-bezier(.84,.02,.37,.74);
         margin-top: 12px;
         float: right;

         @media (max-width:767px){
            margin-top: 100px;
            position: absolute;
            bottom: 5px;
            right: 5px;
          }

         &:hover {
          opacity: 1;
          border: 1px solid #2e68fb;
         }
      }
      

      @media (max-width:767px){
        padding: 0;
      }

      .uploadRightPanelInner {
        padding-top: 80px;
        height: 100%;
        position: relative;
        @media (max-width:767px){
          padding-top: 50px;
        }
      }

      .iconsList {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        min-height: 50px;
        align-items: center;
        justify-content: center;
        display: flex;

        @media(max-width: 767px){
          background: #e2e2e2;
        }

        img {
          width: 80px;
          margin-top: 15px;
          transform: translateX(-10px);

          @media (max-width: 767px){
            margin-top: 0;
            width: 60px;
            transform: translateX(0px);
          }
        }
      }

      .dragDropBox {
        border: 1px dashed #bdbdbd;
        background-color: #eee;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: all 0.2s ease-out;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        outline: 0;
        display: flex;
        position: relative;
        color: #9e9e9e;
        line-height: 20px;
        font-size: 13px;
        font-weight: 400;

        img{
          object-fit: contain;
          object-position: center;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 767px){
          border: none;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.5);
          -webkit-transition: all 0.2s ease-in;
          transition: all 0.2s ease-in;
          h3.select-file{
            background-image: url('${cdn(
              '/static/img/fileuploadicon/icon-add-files-blue.svg',
            )}');
          }
        }

        &:focus {
          box-shadow: 0 0 5px 1px rgba(112, 112, 112, 0.5);
          h3.select-file{
            background-image: url('${cdn(
              '/static/img/fileuploadicon/icon-add-files-blue.svg',
            )}');
          }
        }

        input[type='file'] {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 1;
          opacity: 0;
        }

        h3{
            color: #444;
            font-size: 20px;
            font-weight: 400;
            margin: 0 0 10px;
            padding-top:75px;
            background-repeat:no-repeat;
            background-position:top center;
            transition:all .2s ease-out;
            &.select-file{
              background-image:url('${cdn(
                '/static/img/fileuploadicon/icon-add-files-grey.svg',
              )}');
            }
        }

        .ReactCrop > div{
          height:100%;
          .ReactCrop__image{
            max-height:100%;
          }
        }
      }
      .facebookBox {
        background-color: #eee;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: all 0.2s ease-out;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        outline: 0;
        display: flex;
        position: relative;
        color: #9e9e9e;
        line-height: 20px;
        font-size: 13px;
        font-weight: 400;
        overflow-y: auto;

        & > img{
          @media(max-width: 767px){
            width: 50px !important
          }
        }

        @media only screen and (max-width:812px) and (orientation:landscape){
          justify-content: flex-start;
        }
        @media (max-width:767px){
          justify-content: center;
        }
        @media (max-width:480px){
          justify-content: center;
        }


        h3{
            color: #444;
            font-size: 20px;
            font-weight: 400;
            margin: 0 0 10px;
            padding-top:25px;
            background-repeat:no-repeat;
            background-position:top center;
            transition:all .2s ease-out;
        }
        .button-facebook {
          color: #fcfcfc;
          background-color: #2e68fb;
          margin: 25px auto;
          line-height: 48px;
          height: 48px;
          padding-left: 30px;
          padding-right: 30px;
          -webkit-transition: none;
          transition: none;
        }
  
        .link_button {
          display: inline-block;
          font-size: 13px;
          font-weight: 400;
          height: 38px;
          line-height: 38px;
          padding: 0 30px;
          border-radius: 4px;
          border-width: 1px;
          border-style: solid;
          border-color: transparent;
          cursor: pointer;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -moz-user-select: none;
          outline: 0;
          -webkit-transition: all .2s cubic-bezier(.84,.02,.37,.74);
          transition: all .2s cubic-bezier(.84,.02,.37,.74);
      }
      .googlebutton {
        margin-bottom: 20px;
        outline: 0;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #3c4043;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 42px;
        line-height: 20px;
        padding: 0 10px;
        vertical-align: middle;
        display: flex;
        align-items: center;
        img{
          width:24px;
          margin-right:7px;
        }
    }
    .link_submit_btn {
      position: absolute;
      right: -1px;
      bottom: 0;
      padding: 0 14px !important;
      border: 0;
      border-radius: 0 3px 3px 0 !important;
      outline: 0;
      height: 46px !important;
      line-height: 46px;
      color: rgba(255,255,255,.9);
      background-color: #2e68fb;
  }
  .link_submit_icon {
    outline: 0;
    min-width: 18px;
    height: 18px;
    background: url('${cdn(
      '/static/img/fileuploadicon/icon-link.svg',
    )}') no-repeat;
    background-position: 50% 50%;
  }
    .link_icon {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 0 0;
      text-indent: -9999px;
      overflow: hidden;
    }
    .link-url-source-input {
      color: #444;
      font-size: 13px;
      height: 46px;
      padding: 0 48px 0 10px;
      border-radius: 3px;
      border: 1px solid #cacaca;
      outline: 0;
      background: #fff;
      box-shadow: none;
      width: 100%;
  }

  .link-url-source-form {
    display: block;
    position: relative;
    width: 60%;
    margin: 0;

    @media (max-width: 767px){
      width: 92%;
    }
}
    }
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  width: 100%;

  button:first-child {
    width: 100px;
    margin-right: 16px;
    ${props =>
      props.autoWidth &&
      css`
        width: auto;
      `}
  }

  button:last-child {
    min-width: 50px;
    width: auto;
    max-width: 100px;
    ${props =>
      props.autoWidth &&
      css`
        width: auto;
        max-width: unset;
      `}
  }
`;

export const ActionTitle = styled.h2`
  ${LabelMedium}
`;

export const ActionDescription = styled.p`
  ${ParagraphSmall}
`;

export const ActionLoader = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

export const ActionLoading = styled.div`
  opacity: 1;
  padding: 0;
  display: flex;

  ${props =>
    props.loading &&
    css`
      opacity: 0;
    `};
`;

export const CloseIconButtonWrapper = styled.div`
  position: absolute;
  top: ${SPACING * 2}px;
  right: ${SPACING * 2}px;
  display: inline-flex;
`;

export const CloseIconButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #000;
  outline: none;
  z-index: 99999;
`;
export const UploadedItemInfo = styled.div`
  display: flex;
  background: #fff;
  padding: 8px 15px 8px 10px;

  .leftimg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ededed;

    img {
      width: 15px;
    }
  }

  .right_content {
    margin-left: 14px;

    .item-title {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .item-size {
      font-size: 14px;
      font-weight: 400;
      margin-top: 2px;
    }
  }
  .close_btn {
    margin-left: auto;
    font-size: 20px;
    border: none;
    padding: 0;
    font-size: 30px;
    background: transparent;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }
  }

  .btn-cus-save {
    position: absolute;
    bottom: -45px;
    right: -15px;
  }
`;
