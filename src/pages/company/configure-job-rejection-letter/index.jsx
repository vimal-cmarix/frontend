import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
// import logoMain from '@src/assets/images/logo-black.svg';
// import notificationBell from '@src/assets/images/notification.png';
// import loggedinuser from '@src/assets/images/loggedinuser.svg';
// import configure from '@src/assets/images/configure-2.png';
// import PlusiCon from '@src/assets/images/plus-circle.svg';
// import paperClip from '@src/assets/images/paperclip.svg';
import Link from 'next/link';
import Btn from '@components/molecules/Btn';
import { cdn } from '@utils/general';
import FileUpload from 'src/utils/fileupload';
import RejectionOrOffer from '@api/services/rejection-offer';
import Slider from 'react-input-slider';
import { withAuthSync } from '@src/utils/auth';
import HeaderB2B from '@components/organisms/headerB2B';
import { Accordion, Dropdown } from 'react-bootstrap';
import {
  Label,
  ProfileSectionWrap,
  ProfileLeftsideMenu,
  ProfileRightPanel,
  ProfileBoxForm,
  ProfileBoxHead,
  BoxFormWrap,
  FormGroup,
  FileAttBtn,
  TextCount,
  CheckboxField,
  CheckBoxInner,
  BoxProgrssBar,
  ProgressBar,
  ProfileBoxAction,
  OuterMostWrapper,
  SecondaryHeader,
  SecondaryWrapper,
} from './style';

const ConfigureJobRejectionLetter = () => {
  const [letter1, setLetter1] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [selectedLatterFile, setSelectedLatterFile] = useState('');
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState({ x: 0 });
  const [characterCount, setCharaterCount] = useState(0);
  const [characterrejCount, setCharaterrejCount] = useState(0);
  const [letterOffer, setLetterOffer] = useState('');
  const [selectedFilesOffer, setSelectedFilesOffer] = useState('');
  const [offerFile, setOfferFile] = useState('');
  const [checkedOffer, setCheckedOffer] = useState(false);
  const [offerValue, setOfferValue] = useState({ x: 0 });

  const loadData = response => {
    console.log(response);
    const latterResponse = response.filter(res => res.isReject);
    if (latterResponse && latterResponse.length >= 0) {
      setLetter1(latterResponse[0]?.letter);
      setChecked(latterResponse[0]?.isReject);
      setValue({ x: latterResponse[0]?.delay ? latterResponse[0]?.delay : 0 });
    }

    const formResponse = response.filter(resp => resp.isOffer);
    if (formResponse && formResponse.length >= 0) {
      setLetterOffer(formResponse[0]?.letter);
      setCheckedOffer(formResponse[0]?.isOffer);
      setOfferValue({ x: formResponse[0]?.delay ? formResponse[0]?.delay : 0 });
    }
  };

  useEffect(() => {
    const getRejectOrOffer = async () => {
      const checkout =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('userDetail'))
          : null;
      const { companyProfileId } = checkout;
      const res = await RejectionOrOffer.getRejectOffer(companyProfileId);
      const { data } = res;
      loadData(data?.data);
    };
    getRejectOrOffer();
  }, []);

  async function uploadImage(image, cb) {
    FileUpload.fileUpload(image, (err, result) => {
      if (err) cb(err, null);
      else {
        cb(null, result);
      }
    });
  }

  const onChnageFile = async e => {
    const selectedFile = e.target.files[0];
    setSelectedLatterFile(selectedFile);
    if (selectedFile) {
      await uploadImage(selectedFile, (err, result) => {
        if (err) {
          console.log('Error in upload Files..');
        } else {
          console.log('upload', result);
          setSelectedFiles(result);
        }
      });
    } else {
      console.log('File Not selected');
    }
  };

  async function onHandleSubmit() {
    const oldFile = selectedFiles;
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout;
    const data = {
      isReject: true,
      isOffer: false,
      letter: letter1,
      file: selectedFiles || oldFile,
      isdelay: checked,
      delay: value.x,
    };
    const res = await RejectionOrOffer.rejectionOrOffer(companyProfileId, data);
    if (res.status === 201) {
      setLetter1('');
      setSelectedLatterFile('');
      setChecked(false);
      setValue({ x: 1, y: 1 });
      console.log('response1__', res);
    }
  }

  const onChnageFileOffer = async e => {
    const selectedFile = e.target.files[0];
    setOfferFile(selectedFile);
    if (selectedFile) {
      await uploadImage(selectedFile, (err, result) => {
        if (err) {
          console.log('Error in upload Files..');
        } else {
          console.log('upload', result);
          setSelectedFilesOffer(result);
        }
      });
    } else {
      console.log('File Not selected');
    }
  };

  async function onHandleSubmitOffer() {
    const oldFiles = selectedFilesOffer;
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout;
    console.log('data__', checked);
    const data = {
      isReject: false,
      isOffer: true,
      letter: letterOffer,
      file: selectedFilesOffer || oldFiles,
      isdelay: checkedOffer,
      delay: offerValue.x,
    };
    const res = await RejectionOrOffer.rejectionOrOffer(companyProfileId, data);
    if (res.status === 201) {
      setLetterOffer('');
      setOfferFile('');
      setCheckedOffer(false);
      setOfferValue({ x: 0 });
      console.log('response2__', res);
    }
  }

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <ProfileSectionWrap>
        <ProfileLeftsideMenu>
          <h2>Configure job posting</h2>
          <ul>
            <li className="active">
              <Link href="/company/configure-job-rejection-letter">
                <a href="/company/configure-job-rejection-letter">
                  Rejection/Offer Letter
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#1D242F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/company/configure-job-video-content">
                <a href="/company/configure-job-video-content">
                  Video Content
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#1D242F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Link>
            </li>
            {/* <li>
              <Link href="/company/configure-job-additional-features">
                <a href="/company/configure-job-additional-features">
                  Additional features
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#1D242F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Link>
            </li> */}
          </ul>
        </ProfileLeftsideMenu>

        <ProfileRightPanel>
          <ProfileBoxForm>
            <ProfileBoxHead>
              <h2>Rejection Letter</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap>
                <h4 className="mb-14">Applicant rejection letter</h4>

                <FormGroup className="border-form-group mb-20">
                  <Label className="border-group-label">
                    Rejection Letter <span className="req-star">*</span>
                  </Label>
                  <FileAttBtn>
                    <input type="file" onChange={e => onChnageFile(e)} />
                    <img
                      src={cdn('/static/img/images/paperclip.svg')}
                      alt="paperclip"
                    />
                    {/* <img src={paperClip} alt="paperclip" /> */}
                  </FileAttBtn>
                  <textarea
                    className="form-control"
                    placeholder="Rejection Letter"
                    name="rejection_letter"
                    value={letter1}
                    maxLength="1000"
                    onChange={e => {
                      setLetter1(e.target.value);
                      setCharaterCount(e.target.value.length);
                    }}
                  />
                  <TextCount>{characterCount}/1000</TextCount>
                  {selectedLatterFile && (
                    <p>Selected File : {selectedLatterFile.name}</p>
                  )}
                </FormGroup>

                <h4 className="mb-24">Rejection letter delivery delay</h4>

                <CheckboxField>
                  <CheckBoxInner>
                    <input
                      type="checkbox"
                      checked={checked}
                      className="checkbox"
                      onChange={e => setChecked(e.target.checked)}
                    />
                    <Label>Rejection letter delivery delay</Label>
                  </CheckBoxInner>
                </CheckboxField>

                <BoxProgrssBar>
                  <ProgressBar>
                    <Slider
                      //step={10}
                      disabled={!checked}
                      styles={{
                        thumb: {
                          width: 24,
                          height: 24,
                          backgroundColor: '#005E8B',
                        },
                      }}
                      className="nodelay"
                      axis="x"
                      x={value.x ? value.x : 0}
                      xmin={0}
                      xmax={15}
                      value={value.x ? value.x : 0}
                      onChange={newValue => {
                        setValue(newValue);
                      }}
                    />
                    <span className="progress-bar-value">
                      {/* {value.x === 0 ? 'No Delay' : `${offerValue.x} Days`} */}
                      {value.x === 0 ? 'No Delay' : `${value.x} Days`}
                    </span>
                  </ProgressBar>
                </BoxProgrssBar>

                <ProfileBoxAction>
                  {/* <button
                    type="submit"
                    className="btn action-btn"
                    onClick={onHandleSubmit}
                  >
                    Update
                  </button> */}
                  <Btn
                    label="Update"
                    type="submit"
                    // variant="outlinePrimary"
                    handleClick={onHandleSubmit}
                    loading={loading}
                    className="btn action-btn"
                    rounded="lg"
                  />
                </ProfileBoxAction>
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>

          <ProfileBoxForm className="mt-32">
            <ProfileBoxHead>
              <h2>Job Offer Email</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap>
                <h4 className="mb-14">Applicant Job Offer Email</h4>
                <FormGroup className="border-form-group mb-20">
                  <Label className="border-group-label">
                    Job Offer Email <span className="req-star">*</span>
                  </Label>
                  <FileAttBtn>
                    <input type="file" onChange={e => onChnageFileOffer(e)} />
                    <img
                      src={cdn('/static/img/images/paperclip.svg')}
                      alt="paperclip"
                    />
                    {/* <img src={paperClip} alt="paperclip" /> */}
                  </FileAttBtn>
                  <textarea
                    className="form-control"
                    placeholder="Job Offer Email"
                    value={letterOffer}
                    onChange={e => {
                      setLetterOffer(e.target.value);
                      setCharaterrejCount(e.target.value.length);
                    }}
                  />
                  <TextCount>{characterrejCount}/1000</TextCount>
                  {offerFile && <p>Selected File : {offerFile.name}</p>}
                </FormGroup>
                <h4 className="mb-24">Job offer email delivery delay</h4>

                <CheckboxField>
                  <CheckBoxInner>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={checkedOffer}
                      onChange={e => setCheckedOffer(e.target.checked)}
                    />
                    <Label>Set delay time after sending</Label>
                  </CheckBoxInner>
                </CheckboxField>

                {/* <BoxProgrssBar>
                <ProgressBar style={{ width: '0%' }}>
                  <span style={{ left: '0%' }}>No delay</span>
                </ProgressBar>
              </BoxProgrssBar> */}
                <BoxProgrssBar>
                  <ProgressBar>
                    <Slider
                      disabled={!checkedOffer}
                      styles={{
                        thumb: {
                          width: 24,
                          height: 24,
                          backgroundColor: '#005E8B',
                        },
                      }}
                      //step={10}
                      className="nodelay"
                      axis="x"
                      x={offerValue.x ? offerValue.x : 0}
                      xmin={0}
                      xmax={15}
                      value={offerValue.x ? offerValue.x : 0}
                      onChange={newValue => setOfferValue(newValue)}
                    />
                    <span className="progress-bar-value">
                      {offerValue.x === 0 ? 'No Delay' : `${offerValue.x} Days`}
                    </span>
                  </ProgressBar>
                </BoxProgrssBar>

                <ProfileBoxAction>
                  {/* <button
                    type="submit"
                    className="btn action-btn"
                    onClick={onHandleSubmitOffer}
                  >
                    Update
                  </button> */}

                  <Btn
                    label="Update"
                    type="submit"
                    // variant="outlinePrimary"
                    handleClick={onHandleSubmitOffer}
                    loading={loading}
                    className="btn action-btn"
                    rounded="lg"
                  />
                </ProfileBoxAction>
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>
        </ProfileRightPanel>
      </ProfileSectionWrap>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <Page
      title="Configure Job Rejection Letter"
      description="Configure Job Rejection Letter Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(ConfigureJobRejectionLetter);
