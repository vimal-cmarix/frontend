import React from 'react';
// import chewronDown from '@src/assets/images/chevron-down.svg';
import Page from '@components/templates/Page';
import { Accordion, Dropdown } from 'react-bootstrap';
import HeaderB2B from '@components/organisms/headerB2B';
import { cdn } from '@src/utils/general';
// import notificationBell from '@src/assets/images/notification.png';
import {
  OuterMostWrapper,
  DashboardSection,
  SecondaryHeader,
  SecondaryWrapper,
  FaqsWrap,
  FaqsInner,
  FaqsAction,
  // Card,
  // CardHeader,
  // ToggleIcon,
  // FaqsBody,
} from './style';

const Faqs = () => {
  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <FaqsWrap>
        <FaqsInner>
          <h2>Frequently Asked Questions</h2>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyOpenJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyOpenJobs"
                  >
                    How is Sizigi different from other places where I can post
                    jobs?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  With our recruiting tools, hiring teams have a fully
                  integrated approach to job posting, applicant review,
                  messaging, and scheduling candidates all in one place. By
                  posting jobs on Sizigi, companies receive custom applications
                  with requested digital content to increase the speed of hiring
                  and ensure the most efficient interviewing process.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    What is a job slot vs a job post?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Job slots are a pooled resource shared by all team
                  members/admin on your company account that allows you to post
                  jobs on Sizigi. The number of jobs you can post is determined
                  by the number of job slots your company has purchased.
                  <br />
                  Job posts are the job ads you create to attract candidates.
                  Job slots represent the number of jobs ads you can have active
                  on the job boards at any given time. For example, if you are
                  on a Sizigi plan with 3 job slots, you can post 3 jobs today
                  and replace them with 3 different jobs tomorrow without
                  needing any more slots. You can freely swap jobs in and out of
                  these slots by closing and posting jobs as needed. If you need
                  additional job slots, just upgrade your plan under plans and
                  pricing
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    How much should I spend each month?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Your ideal budget depends on how many jobs you have, the type
                  of jobs, your location, and your industry. Not sure where to
                  start? Contact us for a recommended budget.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    Where does someone go after clicking apply on my job
                    posting?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  After a person clicks on your job, they are taken to the
                  application page you directed when posting. If you are posting
                  and receiving applicants within Sizigi, they will appear in
                  your applicant tracker on our site. You can also choose to
                  route applicants to your own career site and application
                  tracking software. If you don’t have a career site, you can
                  post jobs directly on Sizigi and receive applications via our
                  applicant tracking tools. Manage all candidates within your
                  Sizigi dashboard. Review/organize applications, message
                  applicants, schedule interviews, and view recommended
                  candidates.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    What if I don’t have an Applicant Tracking System (ATS)?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  If you don’t have an ATS, Sizigi has the tools and technology
                  available at no additional charge. These features are
                  available for all clients that post jobs directly on Sizigi.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    Is there a limit on candidates I can receive?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  No. We never limit the number of candidates or applications
                  you receive.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    What is the commitment?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Subscribe monthly or annually. If you decide to cancel your
                  subscription, it will be canceled at the end of your
                  subscription period (and you won’t be billed again).
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    What happens if I downgrade my plan?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Once the term of your current plan ends, your subscription
                  will automatically renew at the price of the downgraded plan.
                  If your new plan includes fewer job postings, you will be
                  prompted to select the jobs you would like to close out.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    Can I increase my number of job postings at any time?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes. Simply log in to your account, form there: 1. On the
                  right-hand corner select the down arrow by your profile
                  picture 2. Select Pricing &amp; Plans 3. From here, you can
                  add additional job slots and upgrade your plan.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    How do I post a job?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  When your profile is ready, follow these simple steps after
                  signing into your account: 1. On the right-hand corner select
                  the down arrow by your profile picture 2. Select Add new job
                  posting
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    How do I add someone to my team?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Adding someone to your team allows them access to your company
                  plan. Meaning, if your plan is for 15 monthly job postings,
                  all your team members will have access to post within this
                  limit. Admin will have access to control team members and the
                  status of the team. To add a team member, sign in to your
                  account, from there: 1. On the right-hand corner select the
                  down arrow by your profile picture 2. Select Access Settings
                  3. Click on Send Invite
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
              <Accordion.Header>
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseMyClosedJobs"
                    aria-expanded="false"
                    aria-controls="collapseMyClosedJobs"
                  >
                    How do I get admin access?
                    <span className="toggle-icon">
                      <img
                        src={cdn('/static/img/images/chevron-down.svg')}
                        alt="chevron-down"
                      />
                      {/* <img src={chewronDown} alt="chevron-down" /> */}
                    </span>
                  </button>
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  In order to keep your company account secure, the admin will
                  have full visibility of who signed in as part of the company,
                  how many job openings they have, what they are posting, and
                  control to close and edit all listings of team members. All
                  team members can request admin access, to do so, sign in to
                  your account: 1. On the right-hand corner select the down
                  arrow by your profile picture 2. Select Access Settings
                  <br />
                  Listed at the top will be your name and your role, if your
                  role is Team Member, at the bottom of the page click the
                  button that says, Request Admin Access. Once your request is
                  sent you will see the button grey out to Pending Admin Request
                  until your admin grants this permission.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <FaqsAction>
            <button type="submit" className="btn action-btn btn-danger w-100">
              Delete/Inactivate Account
            </button>
          </FaqsAction> */}
        </FaqsInner>
      </FaqsWrap>

      {/* <FaqsWrap>
        <FaqsInner>
          <h2>Frequently Asked Questions</h2>
          <div id="accordion">
            <Card>
              <CardHeader id="faqOne">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link"
                    data-toggle="collapse"
                    data-target="#collapseFaqOne"
                    aria-expanded="true"
                    aria-controls="collapseFaqOne"
                  >
                    How is Sizigi different from other places where I can post
                    jobs?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqOne"
                className="collapse show"
                aria-labelledby="faqOne"
                data-parent="#accordion"
              >
                <p>
                  With our recruiting tools, hiring teams have a fully
                  integrated approach to job posting, applicant review,
                  messaging, and scheduling candidates all in one place. By
                  posting jobs on Sizigi, companies receive custom applications
                  with requested digital content to increase the speed of hiring
                  and ensure the most efficient interviewing process.
                </p>
              </FaqsBody>
            </Card>

            <Card>
              <CardHeader id="faqTwo">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqTwo"
                    aria-expanded="false"
                    aria-controls="collapseFaqTwo"
                  >
                    What is a job slot vs a job post?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqTwo"
                className="collapse"
                aria-labelledby="faqTwo"
                data-parent="#accordion"
              >
                <p>
                  Job slots are a pooled resource shared by all team
                  members/admin on your company account that allows you to post
                  jobs on Sizigi. The number of jobs you can post is determined
                  by the number of job slots your company has purchased.
                  <br />
                  Job posts are the job ads you create to attract candidates.
                  Job slots represent the number of jobs ads you can have active
                  on the job boards at any given time. For example, if you are
                  on a Sizigi plan with 3 job slots, you can post 3 jobs today
                  and replace them with 3 different jobs tomorrow without
                  needing any more slots. You can freely swap jobs in and out of
                  these slots by closing and posting jobs as needed. If you need
                  additional job slots, just upgrade your plan under plans and
                  pricing
                </p>
              </FaqsBody>
            </Card>

            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    How much should I spend each month?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  Your ideal budget depends on how many jobs you have, the type
                  of jobs, your location, and your industry. Not sure where to
                  start? Contact us for a recommended budget.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    Where does someone go after clicking apply on my job
                    posting?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  After a person clicks on your job, they are taken to the
                  application page you directed when posting. If you are posting
                  and receiving applicants within Sizigi, they will appear in
                  your applicant tracker on our site. You can also choose to
                  route applicants to your own career site and application
                  tracking software. If you don’t have a career site, you can
                  post jobs directly on Sizigi and receive applications via our
                  applicant tracking tools. Manage all candidates within your
                  Sizigi dashboard. Review/organize applications, message
                  applicants, schedule interviews, and view recommended
                  candidates.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    What if I don’t have an Applicant Tracking System (ATS)?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  If you don’t have an ATS, Sizigi has the tools and technology
                  available at no additional charge. These features are
                  available for all clients that post jobs directly on Sizigi.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    Is there a limit on candidates I can receive?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  No. We never limit the number of candidates or applications
                  you receive.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    What is the commitment?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  Subscribe monthly or annually. If you decide to cancel your
                  subscription, it will be canceled at the end of your
                  subscription period (and you won’t be billed again).
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    What happens if I downgrade my plan?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  Once the term of your current plan ends, your subscription
                  will automatically renew at the price of the downgraded plan.
                  If your new plan includes fewer job postings, you will be
                  prompted to select the jobs you would like to close out.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    What happens if I downgrade my plan?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  Once the term of your current plan ends, your subscription
                  will automatically renew at the price of the downgraded plan.
                  If your new plan includes fewer job postings, you will be
                  prompted to select the jobs you would like to close out.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    Can I increase my number of job postings at any time?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  Yes. Simply log in to your account, form there: 1. On the
                  right-hand corner select the down arrow by your profile
                  picture 2. Select Pricing & Plans 3. From here, you can add
                  additional job slots and upgrade your plan.
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    How do I post a job?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  When your profile is ready, follow these simple steps after
                  signing into your account: 1. On the right-hand corner select
                  the down arrow by your profile picture 2. Select Add new job
                  posting
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    How do I add someone to my team?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  Adding someone to your team allows them access to your company
                  plan. Meaning, if your plan is for 15 monthly job postings,
                  all your team members will have access to post within this
                  limit. Admin will have access to control team members and the
                  status of the team. To add a team member, sign in to your
                  account, from there: 1. On the right-hand corner select the
                  down arrow by your profile picture 2. Select Access Settings
                  3. Click on Send Invite
                </p>
              </FaqsBody>
            </Card>
            <Card>
              <CardHeader id="faqThree">
                <h3>
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseFaqThree"
                    aria-expanded="false"
                    aria-controls="collapseFaqThree"
                  >
                    How do I get admin access?
                    <ToggleIcon>
                      <img src={ChevronDown} alt="chevron-down" />
                    </ToggleIcon>
                  </button>
                </h3>
              </CardHeader>
              <FaqsBody
                id="collapseFaqThree"
                className="collapse"
                aria-labelledby="faqThree"
                data-parent="#accordion"
              >
                <p>
                  In order to keep your company account secure, the admin will
                  have full visibility of who signed in as part of the company,
                  how many job openings they have, what they are posting, and
                  control to close and edit all listings of team members. All
                  team members can request admin access, to do so, sign in to
                  your account: 1. On the right-hand corner select the down
                  arrow by your profile picture 2. Select Access Settings
                  <br />
                  Listed at the top will be your name and your role, if your
                  role is Team Member, at the bottom of the page click the
                  button that says, Request Admin Access. Once your request is
                  sent you will see the button grey out to Pending Admin Request
                  until your admin grants this permission.
                </p>
              </FaqsBody>
            </Card>
          </div>

          <FaqsAction>
            <button type="submit" className="btn action-btn btn-danger w-100">
              Delete/Inactivate Account
            </button>
          </FaqsAction>
        </FaqsInner>
      </FaqsWrap> */}
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <Page
      title="Profile Change Password Info"
      description="Profile Change Password Info Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default Faqs;
