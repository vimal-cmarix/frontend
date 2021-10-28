import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
// import Airplane from '@src/assets/images/airplane-b2b.svg';
// import Frown from '@src/assets/images/frown.png';
import { withAuthSync } from '@src/utils/auth';
// import Meh from '@src/assets/images/meh.png';
// import Smile from '@src/assets/images/smile.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cdn } from '@utils/general';
import RejectionOrOffer from '@api/services/rejection-offer';
import DashboardNew from '@src/api/services/dashboard-new';
import { useToast } from '@components/molecules/Notification';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import Storage from '@utils/storage';
import {
  ActiveRate,
  PageSubmittedWrap,
  TopHeadline,
  ApplicationExperience,
  Wrapper,
  SubmitButton,
  Btn,
  Btn1,
  ExpOne,
  ShareModalStyle,
  ModalAction,
} from './style';

const SubmitPage = () => {
  const { t } = useTranslation('signup');
  const toast = useToast();
  const [userData, setUserData] = useState('');
  const [rate, setRate] = useState('');
  const router = useRouter();
  const [openShareModal, setOpenShareModal] = useState(false);
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [jobId, setJobId] = useState('');
  const [currentDomain, setCurrentDomain] = useState('');

  useEffect(() => {
    // console.log('router', window.location.origin);
    Storage.rm('showBackButton');
    Storage.rm('backButton');
    setCurrentDomain(window.location.origin);
    const getDetail = async () => {
      const obj = JSON.parse(localStorage.getItem('profileuserInformation'));
      const JobID = obj?.data?.id;
      setJobId(JobID);
      setUserData(JSON.parse(localStorage.getItem('userDetail')));
    };
    getDetail();
  }, []);

  // const OnEmojiRating = async () => {
  //   const obj = JSON.parse(localStorage.getItem('profileuserInformation'));
  //   console.log('Jobdetail ', obj.data.id);
  //   // const data = {
  //   // }
  //    const res =  RejectionOrOffer.updateEmojiRate(data);
  // };
  useEffect(() => {
    async function OnEmojiRating() {
      // console.log(reviewDetails, 'value');
      const obj = JSON.parse(localStorage.getItem('profileuserInformation'));
      const jobid = obj.data.id;
      const data = {
        rate,
      };
      const res = await DashboardNew.updateEmojiRate(jobid, data);
      if (res.status === 200) {
        toast.add(t('Thanks for your review'), 'success');
      }
    }
    if (rate) {
      OnEmojiRating();
    }
  }, [rate]);

  const copyLink = () => {
    Storage.rm('showBackButton');
    Storage.rm('backButton');
    const copyText = document.getElementById('input-copy').innerText;
    const el = document.createElement('textarea');
    el.value = copyText;
    // el.value = copyText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.querySelector('.link-copied').classList.add('showed');
    setTimeout(function() {
      document.querySelector('.link-copied').classList.remove('showed');
    }, 3000);
    //toast.add(t('Link Copied Successfully'), 'success');
  };

  function MyVerticallyShareCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="share-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .share-modal .modal-dialog {
              max-width: 100%;
              width: 538px;
              letter-spacing: 0;
            }
            .share-modal .modal-content {
              background: #FFFFFF;
              border-radius: 30px;
              border: none;
            }
          `}
        </style>
        <ShareModalStyle>
          <Modal.Body>
            <p className="link-copied">
              <img src={cdn('/static/img/check-green.png')} alt="" />
              Link Copied
            </p>
            <div className="share-link-info">
              <h2>Share link and access code with lead</h2>
              <p>
                Once your mockup looks good, copy the code below and send it
                over to your lead!
              </p>
            </div>
            <div className="share-link-box">
              <div className="share-link-box-inner">
                <p id="input-copy">
                  {currentDomain}/r/search-job-posting/{jobId}
                </p>
              </div>
            </div>
            <ModalAction className="btn-top-bdr">
              <button
                type="button"
                className="btn action-btn w-100"
                onClick={copyLink}
              >
                Copy link
              </button>
            </ModalAction>
          </Modal.Body>
        </ShareModalStyle>
      </Modal>
    );
  }

  const rightContent = () => (
    <PageSubmittedWrap>
      {/* <img src={Airplane} alt="airplane" width="384" /> */}
      <img
        src={cdn('/static/img/images/airplane-b2b.svg')}
        alt="airplane"
        width="384"
      />
      <TopHeadline>Your job posting has been submitted!</TopHeadline>
      <ul>
        <li>
          You will get an email confirmation at <span>{userData.email}</span>
        </li>
        {/* <li>
          This job has been added to your <span>applicant tracking system</span>
        </li> */}
        <li>
          Your <span>job posting</span> is live!
        </li>
        <li>
          Copy your <span>job posting</span> and{' '}
          <button
            type="button"
            className="share-link"
            onClick={e => setOpenShareModal(true)}
          >
            share!
          </button>
          {/* <Link href="/">
            <span className="share-link">share!</span>
          </Link> */}
        </li>
      </ul>
      <ApplicationExperience>
        <Wrapper>
          <h4>Rate your job posting experience</h4>
          <div
            className={`d-flex justify-content-center ${
              rate ? 'rateClass' : ''
            }`}
          >
            <ExpOne>
              {/* <img src={Frown} alt="frown" /> */}
              <ActiveRate
                role="button"
                onClick={() => {
                  setRate('poor');
                }}
                onKeyDown={console.log('')}
                tabIndex="0"
                className={`${rate === 'poor' ? 'active' : ''}`}
              >
                {/* <img src={cdn('/static/img/images/poor-icon.svg')} alt="poor" /> */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 32C32 32 29 28 24 28C19 28 16 32 16 32"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 18H18.02"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 18H30.02"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Poor</span>
              </ActiveRate>
            </ExpOne>
            <ExpOne>
              {/* <img src={Meh} alt="meh" /> */}
              <ActiveRate
                role="button"
                onClick={() => {
                  setRate('fair');
                }}
                onKeyDown={console.log('')}
                tabIndex="0"
                className={`${rate === 'fair' ? 'active' : ''}`}
              >
                {/* <img src={cdn('/static/img/images/fair-icon.svg')} alt="fair" /> */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 30H32"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 18H18.02"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 18H30.02"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Fair</span>
              </ActiveRate>
            </ExpOne>
            <ExpOne>
              {/* <img src={Smile} alt="smile" /> */}
              <ActiveRate
                role="button"
                onClick={() => {
                  setRate('excellent');
                }}
                onKeyDown={console.log('')}
                tabIndex="0"
                className={`${rate === 'exellent' ? 'active' : ''}`}
              >
                {/* <img
                  src={cdn('/static/img/images/excellent-icon.svg')}
                  alt="excellent"
                /> */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 28C16 28 19 32 24 32C29 32 32 28 32 28"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 18H18.02"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 18H30.02"
                    stroke="#1D242F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Excellent</span>
              </ActiveRate>
            </ExpOne>
          </div>

          {/* <SubmitButton type="button" onClick={OnEmojiRating}>
            Submit
          </SubmitButton> */}
        </Wrapper>
      </ApplicationExperience>

      <Link
        onClick={e => {
          Storage.rm('profileId');
          localStorage.removeItem('profileuserInformation');
        }}
        href="/company/general-info"
      >
        <Btn1
          className="transparent_btn"
          onClick={e => {
            Storage.rm('profileId');
            localStorage.removeItem('profileuserInformation');
          }}
        >
          Post another job
        </Btn1>
      </Link>
      <Link href="/company/dashboard">
        <Btn className="save-btn">Go to my dashboard</Btn>
      </Link>
    </PageSubmittedWrap>
  );

  const content = rightContent();
  return (
    <>
      <Page
        title="Submit Page"
        description="Submit Page"
        nav={{ show: false }}
        topbar={{ show: false }}
        isVerified
      >
        {content}
      </Page>

      <MyVerticallyShareCenteredModal
        show={openShareModal}
        onHide={() => setOpenShareModal(false)}
      />
    </>
  );
};

export default withAuthSync(SubmitPage);
