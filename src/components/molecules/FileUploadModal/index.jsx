import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';
import { cdn } from '@utils/general';
import GooglePicker from 'react-google-picker';
import { LoaderContainer } from '@assets/styles/helpers';
// import { Typography } from '@assets/styles/typo';
// import { SPACING } from '@assets/styles/theme';
import AppContext from '@context/appContext';
import FileUpload from 'src/utils/fileupload';
import IconSVG from '@components/atoms/IconSVG';
// import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { useToast } from '@components/molecules/Notification';
import 'react-image-crop/dist/ReactCrop.css';
import { useDropzone } from 'react-dropzone';
import {
  ActionWrapper,
  ActionContent,
  ActionTextWrapper,
  // ActionButtonsWrapper,
  // ActionIcon,
  ActionLoading,
  ActionLoader,
  CloseIconButtonWrapper,
  CloseIconButton,
  UploadedItemInfo,
} from './style';
import Btn from '../Btn';

const DEFAULT_EXPORT_TYPE_MAP = {
  document: 'application/pdf',
  drawing: 'image/png',
  presentation: 'application/pdf',
  script: 'application/vnd.google-apps.script+json',
  spreadsheet:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
const FileUploadModal = ({
  // title,
  // description,
  // onConfirm,
  // onCancel,
  closeModal,
  // type,
  loading,
  // CloseButton,
  // hideCancel,
  // labelConfirm,
  // labelCancel,
  onSuccess,
  isVideo,
  isDocument,
  isImageOrVideo,
  exportMimeTypeOverrides,
}) => {
  const SCOPE = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.file',
  ];
  const FILE_URL = 'https://www.googleapis.com/drive/v3/files';
  const [isAnimated, setIsAnimated] = useState(false);
  const initCrop = {
    aspect: undefined,
    unit: 'px',
    x: 0,
    y: 110.99609375,
    width: 605,
    height: 251.25,
  };
  let newCrops;
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [crop, setCrop] = useState(initCrop);
  const [cropImage, setCropImage] = useState();
  const [src, setSrc] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  //let selectedImage = [];
  const [myDevice, setMyDevice] = useState(true);
  const [linkURL, setLinkURL] = useState(false);
  const [faceBook, setFaceBook] = useState(false);
  const [instaGram, setInstagram] = useState(false);
  const [downloadToken, setDownloadToken] = useState(false);
  const [MimeTypesView, setMimeTypesView] = useState([
    'image/png',
    'image/jpeg',
    'image/jpg',
  ]);
  const [gooGle, setGoogle] = useState(false);
  const [dropBox, setDropBox] = useState(false);
  const { dispatch: appDispatch } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  // const [toast, setToast] = useState('');
  const [bigLoading, setBigLoading] = useState(false);

  const { getRootProps, getInputProps, open } = useDropzone({
    // accept: 'image/*',
    // noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  useEffect(() => {
    if (isDocument) {
      setMimeTypesView([
        'application/vnd.google-apps.document',
        'application/pdf',
      ]);
    } else if (isVideo) {
      setMimeTypesView(['image/png', 'image/jpeg', 'image/jpg', 'video/mp4']);
    }
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const setMyDevices = () => {
    setMyDevice(true);
    setLinkURL(false);
    setFaceBook(false);
    setInstagram(false);
    setGoogle(false);
    setDropBox(false);

    const socialMenu = document.querySelector('.uploadLeftPanel ul');
    socialMenu.classList.toggle('showMenu');
  };
  const setLinkURLS = () => {
    setMyDevice(false);
    setLinkURL(true);
    setFaceBook(false);
    setInstagram(false);
    setGoogle(false);
    setDropBox(false);

    const socialMenu = document.querySelector('.uploadLeftPanel ul');
    socialMenu.classList.toggle('showMenu');
  };
  const setFaceBooks = () => {
    setMyDevice(false);
    setLinkURL(false);
    setFaceBook(true);
    setInstagram(false);
    setGoogle(false);
    setDropBox(false);

    const socialMenu = document.querySelector('.uploadLeftPanel ul');
    socialMenu.classList.toggle('showMenu');
  };
  const setInstagrams = () => {
    setMyDevice(false);
    setLinkURL(false);
    setFaceBook(false);
    setInstagram(true);
    setGoogle(false);
    setDropBox(false);

    const socialMenu = document.querySelector('.uploadLeftPanel ul');
    socialMenu.classList.toggle('showMenu');
  };
  const setGoogles = () => {
    setMyDevice(false);
    setLinkURL(false);
    setFaceBook(false);
    setInstagram(false);
    setGoogle(true);
    setDropBox(false);

    const socialMenu = document.querySelector('.uploadLeftPanel ul');
    socialMenu.classList.toggle('showMenu');
  };
  const setDropBoxs = () => {
    setMyDevice(false);
    setLinkURL(false);
    setFaceBook(false);
    setInstagram(false);
    setGoogle(false);
    setDropBox(true);

    const socialMenu = document.querySelector('.uploadLeftPanel ul');
    socialMenu.classList.toggle('showMenu');
  };

  function uploadImage(image, cb) {
    FileUpload.fileUpload(image, (err, result) => {
      if (err) cb(err, null);
      else {
        cb(null, result);
      }
    });
  }

  // function addEditData(data) {
  //   console.log('data', data);
  // }

  const onSelectImage = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result), false);
      // console.log('result', src);
      // console.log('e___', e.target.files);
      setSelectedImage(e.target.files[0]);
      console.log('file', e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    // console.log('e', e.target.files[0]);
    // const instance = this;
    // const selectedImage = e.target.files[0];
    // // (key === 'authorImage') instance.setState({ selectedAuthorImage: e.target.files[0] })
    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = function() {
    //     //instance.setState({ displayImage: e.target.result });
    //     //if (key === 'authorImage') instance.setState({ displayAuthorImage: e.target.result })
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const getCroppedImg = () => {
    console.log('selectedImage', selectedImage);
    console.log('result', cropImage);
    const canvas = document.createElement('canvas');
    const scaleX = cropImage.naturalWidth / cropImage.width;
    const scaleY = cropImage.naturalHeight / cropImage.height;
    canvas.width = cropImage.width;
    canvas.height = cropImage.height;
    // console.log('canvas', canvas);
    const ctx = canvas.getContext('2d');
    // console.log('ctx', ctx);
    ctx.drawImage(
      cropImage,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    const cropImg = canvas.toDataURL();
    setSrc('');
    console.log('crop', src);
    setCroppedImage(cropImg);
  };

  const onImageLoaded = image => {
    console.log('onCropCompleted', image);
    setCropImage(image);
  };

  const onCropComplete = crops => {
    console.log('onCropComplete', crops);
    newCrops = crops;
  };

  const onCropChange = newcrop => {
    console.log('iscropp', newCrops);
    setCrop({ newCrops });
  };

  // function uploadFile() {
  //   console.log('file__', selectedImage);
  //   // console.log('file__', files[0]);

  //   const newImages = [];
  //   const uploadedImage = [];
  //   if (selectedImage) {
  //     console.log('file upload', selectedImage);
  //     newImages.push({ image: selectedImage });
  //     uploadImage(selectedImage, (err, result) => {
  //       if (err) {
  //         console.log('Error in cover image upload');
  //         //instance.setState({ isProcessing: false });
  //       } else {
  //         console.log('uplolad Success');
  //         //data['image'] = result;
  //         uploadedImage.push(result);
  //         onSuccess(result);
  //         console.log('upload', result);
  //         addEditData(result);
  //       }
  //     });
  //   }
  // }

  function uploadFile() {
    // console.log('file', selectedImage);
    console.log('file__', files[0]);
    const fileSize = (files[0].size / (1024 * 1024)).toFixed(2);
    if (fileSize > 15) {
      showToast('Please select file under 15MB..');
    } else if (files.length > 0) {
      const newImages = [];
      const uploadedImage = [];
      setBigLoading(true);
      newImages.push({ image: files[0] });
      uploadImage(files[0], (err, result) => {
        if (err) {
          console.log(err);
          console.log('Error in cover image upload');
          //instance.setState({ isProcessing: false });
        } else {
          // console.log('uplolad Success');
          //data['image'] = result;
          uploadedImage.push(result);
          setBigLoading(false);
          onSuccess(result);
          console.log('upload', result);
          // addEditData(result);
        }
      });
    }
  }
  function getMimeType(file) {
    //const { exportMimeTypeOverrides } = this.props;
    const typeSplit = file.mimeType.split('.');
    const docstype = typeSplit[typeSplit.length - 1].toLowerCase();

    return (
      exportMimeTypeOverrides[docstype] || DEFAULT_EXPORT_TYPE_MAP[docstype]
    );
  }
  async function onChangeGooglePicker(data) {
    if (data.docs) {
      const fetchOptions = {
        headers: { Authorization: `Bearer ${downloadToken}` },
      };
      const isDoc = data.docs[0].type.toLowerCase() === 'document';
      const mimeType = isDoc && getMimeType(data.docs[0]);
      const url = isDoc
        ? `${FILE_URL}/${data.docs[0].id}/export?mimeType=${mimeType}`
        : `${FILE_URL}/${data.docs[0].id}?alt=media`;
      const blob = await fetch(url, fetchOptions).then(res => res.blob());
      blob.name = data.docs[0].name;
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result), false);
      setSelectedImage(blob);
      reader.readAsDataURL(blob);
    }
  }

  const showMenu = () => {
    const listMenu = document.querySelector('.uploadLeftPanel ul');
    listMenu.classList.toggle('showMenu');
  };

  function ErrorHandling() {
    if (isVideo) {
      showToast('Please select video file');
      setSelectedImage('');
    } else {
      showToast('Please select image file');
      setCroppedImage('');
      setGoogle(false);
    }
    setSrc('');
    setFiles([]);
  }
  return (
    <ActionWrapper className="fileUploadModal">
      <ActionContent isAnimated={isAnimated}>
        <ActionLoading loading={loading ? 1 : 0}>
          <ActionTextWrapper>
            <div className="uploadModalBody">
              <CloseIconButtonWrapper>
                <CloseIconButton
                  className="closebtn"
                  type="button"
                  onClick={() => closeModal(false)}
                >
                  <IconSVG name="close" size={44} />
                </CloseIconButton>
              </CloseIconButtonWrapper>
              <div className="uploadLeftPanel">
                <ul>
                  <li>
                    <div className="upload-menu">
                      <button type="button" onClick={setMyDevices}>
                        <img
                          src={cdn(
                            '/static/img/fileuploadicon/icon-computer.svg',
                          )}
                          alt="My Device"
                        />
                        <span>My Device</span>
                      </button>
                    </div>
                  </li>
                  {/* <li>
                    <div className="upload-menu">
                      <button type="button" onClick={setLinkURLS}>
                        <img
                          src={cdn(
                            '/static/img/fileuploadicon/icon-source-url.svg',
                          )}
                          alt="Link (URL)"
                        />
                        <span>Link (URL)</span>
                      </button>
                    </div>
                  </li> */}
                  {/* <li>
                    <div className="upload-menu">
                      <button type="button" onClick={setFaceBooks}>
                        <img
                          src={cdn(
                            '/static/img/fileuploadicon/icon-facebook.svg',
                          )}
                          alt="Facebook"
                        />
                        <span>Facebook</span>
                      </button>
                    </div>
                  </li> */}
                  {/* <li>
                    <div className="upload-menu">
                      <button type="button" onClick={setInstagrams}>
                        <img
                          src={cdn(
                            '/static/img/fileuploadicon/icon-instagram.svg',
                          )}
                          alt="Instagram"
                        />
                        <span>Instagram</span>
                      </button>
                    </div>
                  </li> */}
                  {/* <li>
                    <div className="upload-menu">
                      <button type="button" onClick={setGoogles}>
                        <img
                          src={cdn(
                            '/static/img/fileuploadicon/icon-googledrive.svg',
                          )}
                          alt="Google Drive"
                        />
                        <span>Google Drive</span>
                      </button>
                    </div>
                  </li> */}
                  {/* <li>
                    <div className="upload-menu">
                      <button type="button" onClick={setDropBoxs}>
                        <img
                          src={cdn(
                            '/static/img/fileuploadicon/icon-dropbox.svg',
                          )}
                          alt="Dropbox"
                        />
                        <span>Dropbox</span>
                      </button>
                    </div>
                  </li> */}
                </ul>
                <button
                  type="submit"
                  onClick={showMenu}
                  className="mobile_toggler"
                >
                  <span>-</span>
                  <span>-</span>
                  <span>-</span>
                </button>
              </div>

              {/* Image Drag and select Start */}
              {myDevice && !isVideo && (
                <div className="uploadRightPanel">
                  <div id="deviceUpload" className="uploadRightPanelInner">
                    <div className="iconsList">
                      <img
                        src={cdn('/static/img/sizigi.svg')}
                        width="332px"
                        alt="icon-computer"
                      />
                    </div>

                    <div
                      style={{ height: '100%', width: '100%' }}
                      {...getRootProps({ className: 'dropzone' })}
                    >
                      <div className="dragDropBox">
                        {!src && !croppedImage && !gooGle && files.length <= 0 && (
                          <>
                            <input
                              {...getInputProps()}
                              multiple={false}
                              accept="image/*"
                            />
                            {/* <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => onSelectImage(e)}
                                /> */}
                            <h3 className="select-file">
                              Select Files to Upload
                            </h3>
                            <p>or Drag and Drop, Copy and Paste Files</p>
                          </>
                        )}
                        {files.map(file => (
                          <>
                            {file?.type !== 'video/mp4'
                              ? myDevice &&
                                files.length > 0 && (
                                  <img
                                    src={file.preview}
                                    height="100%"
                                    width="100%"
                                    alt="cover"
                                  />
                                )
                              : ErrorHandling()}
                          </>
                        ))}

                        {/* {src && myDevice && !gooGle && (
                        <img src={src} height="100%" width="100%" alt="cover" />
                      )} */}
                      </div>
                    </div>
                  </div>

                  {myDevice &&
                    files.length > 0 &&
                    files.map(
                      file =>
                        file?.type !== 'video/mp4' && (
                          <input
                            className="btn-cus-save"
                            type="button"
                            value="Save"
                            onClick={e => uploadFile()}
                          />
                        ),
                    )}
                </div>
              )}
              {/* Image drag and select end */}

              {/* Video and documents Uploader Start */}
              {myDevice && isVideo && (
                <div className="uploadRightPanel">
                  <div id="deviceUpload" className="uploadRightPanelInner">
                    <div className="iconsList">
                      <img
                        src={cdn('/static/img/sizigi.svg')}
                        w
                        idth="332px"
                        alt="icon-computer"
                      />
                    </div>

                    {!src && !selectedImage && files.length <= 0 && (
                      <div
                        style={{ height: '100%', width: '100%' }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <div className="dragDropBox">
                          {/* <input
                            type="file"
                            // accept="video/*"
                            accept={isDocument ? '.doc,.docx,.pdf' : 'video/*'}
                            onChange={e => onSelectImage(e)}
                          /> */}
                          <input
                            {...getInputProps()}
                            multiple={false}
                            // accept={
                            //   isImageOrVideo && isVideo
                            //     ? '/*'
                            //     : isDocument
                            //     ? '.doc,.docx,.pdf'
                            //     : 'video/*'
                            // }
                            accept={isDocument ? '.doc,.docx,.pdf' : 'video/*'}
                          />
                          <h3 className="select-file">
                            Select Files to Upload
                          </h3>
                          <p>or Drag and Drop, Copy and Paste Files</p>
                        </div>
                      </div>
                    )}

                    {myDevice &&
                      files.length > 0 &&
                      files.map(file =>
                        file?.type !== 'image/png' ? (
                          <UploadedItemInfo>
                            <div className="leftimg">
                              <img
                                src={cdn(
                                  '/static/img/fileuploadicon/uploadFileIcon.svg',
                                )}
                                alt="uploadimg"
                              />
                            </div>
                            <div className="right_content">
                              <p className="item-title">{files[0].name}</p>
                              <p className="item-size">
                                {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              className="close_btn"
                              onClick={e => {
                                setSrc('');
                                setFiles('');
                              }}
                            >
                              ×
                            </button>
                            <input
                              className="btn-cus-save"
                              type="button"
                              value="Upload"
                              onClick={e => uploadFile()}
                            />
                          </UploadedItemInfo>
                        ) : (
                          ErrorHandling()
                        ),
                      )}
                  </div>
                </div>
              )}
              {bigLoading && (
                <LoaderContainer show={bigLoading}>
                  <Loader size="xlarge" />
                </LoaderContainer>
              )}

              {gooGle && isVideo && (
                <div className="uploadRightPanel">
                  <div id="deviceUpload" className="uploadRightPanelInner">
                    <div className="iconsList">
                      <img
                        src={cdn('/static/img/sizigi.svg')}
                        w
                        idth="332px"
                        alt="icon-computer"
                      />
                    </div>
                    {!src && (
                      <div className="dragDropBox">
                        <div className="facebookBox">
                          <img
                            src={cdn(
                              '/static/img/fileuploadicon/icon-googledrive.svg',
                            )}
                            width="75px"
                            alt="icon-computer"
                          />
                          <h3>Select Files from Google Drive</h3>
                          <h5>You need to authenticate with Google Drive.</h5>
                          <h5>
                            We only extract images and never modify or delete
                            them.
                          </h5>
                          <GooglePicker
                            clientId={process.env.CLIENT_ID}
                            developerKey={process.env.DEVELOPER_KEY}
                            scope={SCOPE}
                            onAuthenticate={token => setDownloadToken(token)}
                            onChange={data => onChangeGooglePicker(data)}
                            onAuthFailed={data =>
                              console.log('on auth failed:', data)
                            }
                            multiselect
                            navHidden
                            authImmediate={false}
                            mimeTypes={MimeTypesView}
                            viewId="DOCS"
                          >
                            <button
                              type="button"
                              className="button-facebook googlebutton"
                            >
                              <img
                                src={cdn(
                                  '/static/img/fileuploadicon/google-icon-logo.png',
                                )}
                                width="20px"
                                alt="icon-computer"
                              />
                              Select file
                            </button>
                            <div className="google" />
                          </GooglePicker>
                          <h5>A new page will open to connect your account.</h5>
                        </div>
                      </div>
                    )}
                    {selectedImage && (
                      <UploadedItemInfo>
                        <div className="leftimg">
                          <img
                            src={cdn(
                              '/static/img/fileuploadicon/uploadFileIcon.svg',
                            )}
                            alt="uploadimg"
                          />
                        </div>
                        <div className="right_content">
                          <p className="item-title">{selectedImage.name}</p>
                          <p className="item-size">
                            {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          className="close_btn"
                          onClick={e => {
                            setSrc('');
                            setSelectedImage('');
                          }}
                        >
                          ×
                        </button>
                        <input
                          className="btn-cus-save"
                          type="button"
                          value="Upload"
                          onClick={e => uploadFile()}
                        />
                      </UploadedItemInfo>
                    )}
                  </div>
                </div>
              )}
              {gooGle && !isVideo && (
                <div className="uploadRightPanel">
                  <div id="deviceUpload" className="uploadRightPanelInner">
                    <div className="iconsList">
                      <img
                        src={cdn('/static/img/sizigi.svg')}
                        w
                        idth="332px"
                        alt="icon-computer"
                      />
                    </div>
                    <div className="dragDropBox">
                      {!src && (
                        <div className="facebookBox">
                          <img
                            src={cdn(
                              '/static/img/fileuploadicon/icon-googledrive.svg',
                            )}
                            width="75px"
                            alt="icon-computer"
                          />
                          <h3>Select Files from Google Drive</h3>
                          <h5>You need to authenticate with Google Drive.</h5>
                          <h5>
                            We only extract images and never modify or delete
                            them.
                          </h5>
                          <GooglePicker
                            clientId={process.env.CLIENT_ID}
                            developerKey={process.env.DEVELOPER_KEY}
                            scope={SCOPE}
                            onAuthenticate={token => setDownloadToken(token)}
                            onChange={data => onChangeGooglePicker(data)}
                            onAuthFailed={data =>
                              console.log('on auth failed:', data)
                            }
                            multiselect
                            navHidden
                            authImmediate={false}
                            mimeTypes={MimeTypesView}
                            viewId="DOCS"
                          >
                            <button
                              type="button"
                              className="button-facebook googlebutton"
                            >
                              <img
                                src={cdn(
                                  '/static/img/fileuploadicon/google-icon-logo.png',
                                )}
                                width="20px"
                                alt="icon-computer"
                              />
                              Select file
                            </button>
                            <div className="google" />
                          </GooglePicker>
                          <h5>A new page will open to connect your account.</h5>
                        </div>
                      )}
                      {src && gooGle && (
                        <img src={src} height="100%" width="100%" alt="Cover" />
                      )}
                    </div>
                    {src && (
                      <>
                        <input
                          className="btn-cus-save"
                          type="button"
                          value="Save"
                          onClick={uploadFile}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
              {/* {src && (
                <>
                  <input
                    className="btn-cus-save"
                    type="button"
                    value="Save"
                    onClick={uploadFile}
                  />
                </>
              )} */}
              {/* {dropBox && (
                <div className="uploadRightPanel">
                  <div id="deviceUpload" className="uploadRightPanelInner">
                    <div className="iconsList">
                      <img
                        src={cdn('/static/img/sizigi.svg')}
                        width="332px"
                        alt="icon-computer"
                      />
                    </div>
                    <div className="facebookBox">
                      <img
                        src={cdn('/static/img/fileuploadicon/icon-dropbox.svg')}
                        width="75px"
                        alt="icon-computer"
                      />
                      <h3>Select Files from dropBox</h3>
                      <h5>You need to authenticate with dropBox.</h5>
                      <h5>
                        We only extract images and never modify or delete them.
                      </h5>
                      <button
                        type="button"
                        className="button-facebook googlebutton"
                      >
                        Sign in with dropBox
                      </button>
                      <h5>A new page will open to connect your account. </h5>
                      <h5>
                        To disconnect from dropBox click &ldquo;Sign out&ldquo;
                        button in the menu.
                      </h5>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </ActionTextWrapper>
        </ActionLoading>
        {loading && (
          <ActionLoader>
            <Loader size="large" />
          </ActionLoader>
        )}
      </ActionContent>
    </ActionWrapper>
  );
};

FileUploadModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf([
    'error',
    'success',
    'warning',
    'information',
    'none',
    'loading',
  ]),
  loading: PropTypes.bool,
  hideCancel: PropTypes.bool,
  labelConfirm: PropTypes.string,
  labelCancel: PropTypes.string,
  isDocument: PropTypes.bool,
  isVideo: PropTypes.bool,
  isImageOrVideo: PropTypes.bool,
  exportMimeTypeOverrides: {
    document: PropTypes.string,
    drawing: PropTypes.string,
    presentation: PropTypes.string,
    script: PropTypes.string,
    spreadsheet: PropTypes.string,
  },
};

FileUploadModal.defaultProps = {
  type: 'error',
  title: '',
  description: '',
  onCancel: undefined,
  onSuccess: undefined,
  closeModal: undefined,
  loading: false,
  hideCancel: false,
  labelConfirm: '',
  labelCancel: '',
  isDocument: false,
  isVideo: false,
  isImageOrVideo: false,
  exportMimeTypeOverrides: {},
};

export default FileUploadModal;
