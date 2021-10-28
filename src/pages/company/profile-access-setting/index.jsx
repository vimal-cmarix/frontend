import React, { useEffect, useState } from 'react';
import {
  login,
  withoutAuth,
  withAuthSync,
  loginVerification,
} from '@src/utils/auth';
import Page from '@components/templates/Page';
import AccessSetting from '@api/services/access-setting';
import { cdn } from '@utils/general';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import Link from 'next/link';
import HeaderB2B from '@components/organisms/headerB2B';
import { useToast } from '@components/molecules/Notification';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  OuterMostWrapper,
  Label,
  ProfileSectionWrap,
  ProfileLeftsideMenu,
  ProfileRightPanel,
  ProfileBoxForm,
  ProfileBoxHead,
  BoxFormWrap,
  FormGroup,
  TeamMemberList,
  TeamMemberListHead,
  TeamMemberListBody,
  ProfileBoxAction,
  BorderTitle,
  TableResponsive,
  ModalBox,
  ModalStyle,
  ModalAction,
} from './style';

const ProfileAccessSetting = () => {
  const [userDetail, setUserDetail] = useState('');
  const [companyEMP, setCompanyEMP] = useState('');
  const [response, setResponse] = useState(undefined);
  const [optionsStateAdmin, setOptionsStateAdmin] = useState('Admin');
  const [optionsStateTeamMember, setOptionsStateTeamMember] = useState(
    'Employee',
  );
  const [className, setClassName] = useState('modal fade send-invite-modal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deactiveUser, setDeactiveUser] = useState('Team Member Deactivated');
  const [addEmail, setAddEmail] = useState('');
  const [sentEmailRole, setSentEmailRole] = useState('Admin');
  const [modalShow, setModalShow] = React.useState(false);
  const [jobDetail, setJobDetail] = useState([]);
  const [changeButtontext, setChangeButtonText] = useState('');
  const [adminAccess, setAdminAccess] = useState('');
  let invitationEmail = '';
  let invitationRole = '';
  const toast = useToast();
  const { t: toastT } = useTranslation('');
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [
    modalReassignJobPostingShow,
    setModalReassignJobPostingShow,
  ] = React.useState(false);

  // const jobStatus = async () => {
  //   const companyId = companyProfileId;
  //   const res = await AccessSetting.onGetJobStatus(companyId);

  //   console.log('res gte', res.data.data);
  //   setJobDetail(res.data.data);
  // };

  function getCloseJob(item) {
    const jobInfee = item.job_info;
    let close = 0;
    if (jobInfee !== '' && jobInfee !== undefined) {
      close = jobInfee.filter(items => items.status === 'closed').length;
    }
    return close;
  }

  function getOpenJob(item) {
    const jobInfee = item.job_info;
    let count = 0;
    if (jobInfee !== '' && jobInfee !== undefined) {
      count = jobInfee.filter(items => items.status === 'published').length;
    }
    return count;
  }

  const router = useRouter();

  function handleSearch(id) {
    router.push({
      pathname: '/company/user-job-board',
      query: { id },
    });
  }

  useEffect(() => {
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    console.log(checkout, 'CompanyDetail');
    const companyEmp =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('companyProfile'))
        : null;
    setUserDetail(checkout);
    setCompanyEMP(companyEmp);
    const { companyProfileId } = checkout;

    const getProfileData = async () => {
      const resp = await AccessSetting.getProfileAccessSetting(
        companyProfileId,
      );
      const { data } = resp;
      console.log('Response', data.data);
      setResponse(data.data);
      //console.log('Response', response.length);
    };

    const jobStatus = async () => {
      const companyId = companyProfileId;
      //console.log('id', companyId);
      const res = await AccessSetting.onGetJobStatus(companyId);

      console.log('res gte', res.data.data);
      setJobDetail(res.data.data);
      const userDet = JSON.parse(localStorage.getItem('userDetail'));
      console.log('userde', userDet.email);
      res.data.data.forEach(item => {
        console.log('one', item);
        if (item.email === userDet.email) {
          setAdminAccess(item.adminAccess);
        }
      });
    };

    getProfileData();
    jobStatus();
  }, []);

  const getNewResponse = async () => {
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout;
    const resp = await AccessSetting.getProfileAccessSetting(companyProfileId);
    const { data } = resp;
    setResponse(data.data);
    console.log('res', response);
  };

  const onChangeAdminRole = async e => {
    const adminId = e.target.id;
    setOptionsStateAdmin(e.target.value[adminId]);
    const data1 = {
      role: e.target.value,
    };
    const updatedAdmin = await AccessSetting.onChangeCompanyRole(
      adminId,
      data1,
    );
    const { data } = updatedAdmin;
    setResponse(
      response && response.map(res => (res.id === data.id ? data : res)),
    );
    setOptionsStateAdmin('Admin');
  };

  function setInvitationEmail(value, name) {
    invitationEmail = value;
    //console.log('invi', invitationEmail, name);
    if (name === 'email') {
      invitationEmail = value;
    }
    if (name === 'role') {
      invitationRole = value;
    }
  }

  const sentAdminRequest = async () => {
    // const getAdmin = response
    //   .filter(res => res.role === 'admin')
    //   .map(val => val.email);
    const data = {
      userId: userDetail.id,
    };
    const res = await AccessSetting.requestAsAdmin(data);
    //console.log('res..', res.data.ok);
    //setAdminAccess(res.data.ok);
    //jobStatus();
    if (res.status === 201) {
      setAdminAccess(true);
      showSuccess(toastT('Request sent Successfully'));
      setChangeButtonText('Pending Admin Request');
    }

    // console.log('Response', res);
  };

  const onSentInvitation = async () => {
    // if (e.charCode === 13) {
    //console.log('test', invitationEmail);
    if (invitationEmail === '') {
      showError('Email is required');
      return;
    }
    let role = invitationRole;
    if (userDetail.role === 'employee') {
      role = 'employee';
    }
    if (userDetail.role !== 'employee') {
      if (invitationRole === '') {
        role = 'admin';
      }
    }

    console.log('role', role);
    const originalEmailString = invitationEmail;
    const seperatedEmail = originalEmailString.split(',');
    const data = {
      email: seperatedEmail,
      role,
    };
    const sendInvite = await AccessSetting.sendInvitation(data);
    console.log('send', sendInvite.data);
    if (sendInvite.data.ok) {
      showSuccess(toastT('Invitation sent successfully'));
    }
    setModalShow(false);
    setIsModalOpen(false);
    setAddEmail('');
    setOptionsStateAdmin('Admin');
    //console.log('APIResponseOfSendInvitation', sendInvite);
    //}
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="send-invite-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .send-invite-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .send-invite-modal .modal-content {
              background: #FFFFFF;
              border-radius: 10px;
              border: none;
            }
          `}
        </style>
        <ModalStyle>
          {/* <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <h3 className="mb-0">Email address</h3>
            <p>*separate with comma</p>
            <FormGroup className="mb-48">
              <Label>Add Emails</Label>
              <input
                type="text"
                className="form-control"
                placeholder="Add emails"
                //value={addEmail}
                onChange={e => setInvitationEmail(e.target.value, 'email')}
                //onKeyPress={e => onSentInvitation(e)}
              />
            </FormGroup>

            <h3>What level of access would you like to provide?</h3>
            {userDetail.role === 'employee' && (
              <>
                <FormGroup className="border-form-group mb-0">
                  <Label className="border-group-label">
                    Role <span className="req-star">*</span>
                  </Label>
                  <select
                    className="form-control"
                    //value={sentEmailRole}
                    onChange={e => setInvitationEmail(e.target.value, 'role')}
                  >
                    <option value="employee">Team member</option>
                  </select>
                </FormGroup>
              </>
            )}
            {userDetail.role !== 'employee' && (
              <FormGroup className="border-form-group mb-0">
                <Label className="border-group-label">
                  Role <span className="req-star">*</span>
                </Label>
                <select
                  className="form-control"
                  //value={sentEmailRole}
                  onChange={e => setInvitationEmail(e.target.value, 'role')}
                >
                  <option value="admin">Admin</option>
                  <option value="employee">Team member</option>
                </select>
              </FormGroup>
            )}
            <ModalAction className="btn-top-bdr">
              <button
                type="submit"
                className="btn action-btn w-100"
                onClick={onSentInvitation}
              >
                Send
              </button>
            </ModalAction>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer> */}
        </ModalStyle>
      </Modal>
    );
  }

  function MyModalReassignJobPosting(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="send-invite-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .send-invite-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .send-invite-modal .modal-content {
              background: #FFFFFF;
              border-radius: 10px;
              border: none;
            }
          `}
        </style>
        <ModalStyle>
          <Modal.Header>
            <Modal.Title>Reassign job posting(s)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup className="border-form-group mb-0">
              <Label className="border-group-label">
                Member <span className="req-star">*</span>
              </Label>
              <select className="form-control">
                <option>Admin</option>
                <option>Team member</option>
              </select>
            </FormGroup>

            <ModalAction className="mt-32 text-right">
              <button type="submit" className="btn action-btn">
                Reassign
              </button>
            </ModalAction>

            <div className="or">
              <span>OR</span>
            </div>

            <ModalAction className="mt-32 text-right">
              <button type="submit" className="btn action-btn btn-danger w-100">
                Delete job posting(s)
              </button>
            </ModalAction>
          </Modal.Body>
        </ModalStyle>
      </Modal>
    );
  }

  const onChangeActiveDeactive = async e => {
    setDeactiveUser(e.target.value[e.target.id]);
    await AccessSetting.onActiveDeactiveUser(e.target.id, { isDeleted: false });
    setDeactiveUser('Team Member Deactivated');
    getNewResponse();
  };

  const onChangeTeamMemberRole = async e => {
    const teamMemberId = e.target.id;
    if (e.target.value === 'Deactivate this user') {
      await AccessSetting.onActiveDeactiveUser(teamMemberId, {
        isDeleted: true,
      });
      getNewResponse();
    } else {
      setOptionsStateTeamMember(e.target.value[teamMemberId]);
      const updatedTeamMember = await AccessSetting.onChangeCompanyRole(
        teamMemberId,
        { role: e.target.value },
      );
      const { data } = updatedTeamMember;
      setResponse(
        response && response.map(res => (res.id === data.id ? data : res)),
      );
      setOptionsStateTeamMember('Employee');
    }
  };

  const changeClassName = () => {
    setIsModalOpen(true);
    if (className === 'modal fade send-invite-modal show') {
      setClassName('modal fade send-invite-modal');
      setIsModalOpen(false);
    } else {
      setClassName('modal fade send-invite-modal show');
    }
  };

  const onReassignJobPosting = async e => {
    if (e.charCode === 13) {
      const role = sentEmailRole;
      const originalEmailString = addEmail;
      const seperatedEmail = originalEmailString.split(',');
      const data = {
        email: seperatedEmail,
        role,
      };
      const reassignJobPosting = await AccessSetting.onReassignJobPosting(data);
      setIsModalOpen(false);
      setAddEmail('');
      setOptionsStateAdmin('Admin');
      //console.log('APIResponseOfSendInvitation', reassignJobPosting);
    }
  };

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <ProfileSectionWrap>
        <ProfileLeftsideMenu>
          <h2>Profile</h2>
          <ul>
            <li>
              <Link href="/company/profile-personal-info">
                <a href="/company/profile-personal-info">
                  Personal Info
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
            <li className="active">
              <Link href="/company/profile-access-setting">
                <a href="/company/profile-access-setting">
                  Access Settings
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
              <Link href="/company/profile-change-password">
                <a href="/company/profile-change-password">
                  Security
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
          </ul>
        </ProfileLeftsideMenu>

        <ProfileRightPanel>
          <ProfileBoxForm>
            <ProfileBoxHead>
              <h2>Access Settings</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap className="box-title-group">
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup className="border-form-group">
                      <Label className="border-group-label">Me</Label>
                      <input
                        readOnly
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userDetail && userDetail.firstName}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup className="border-form-group">
                      <Label className="border-group-label">Role</Label>
                      <input
                        readOnly
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={
                          userDetail.role && userDetail.role === 'employee'
                            ? 'Team Member'
                            : 'Admin'
                        }
                      />
                    </FormGroup>
                  </div>
                </div>

                {userDetail.role === 'employee' ? (
                  <>
                    <TeamMemberList>
                      <TeamMemberListHead>
                        <div className="row">
                          <div className="col-md-6">
                            <h4>Sizigi Team</h4>
                          </div>
                          <div className="col-md-6">
                            <h4>Role</h4>
                          </div>
                        </div>
                      </TeamMemberListHead>
                      <TeamMemberListBody>
                        {response &&
                          response.map(val => (
                            <div className="row">
                              <div className="col-md-6">
                                <p>{val.firstName}</p>
                              </div>
                              <div className="col-md-6">
                                <p>
                                  {val.role && val.role === 'employee'
                                    ? 'Team Member'
                                    : 'Admin'}
                                </p>
                              </div>
                            </div>
                          ))}

                        {/* <div className="row">
                          <div className="col-md-6">
                            <p>Michael Smargon</p>
                          </div>
                          <div className="col-md-6">
                            <p>Admin</p>
                          </div>
                        </div> */}

                        {/* <div className="row">
                          <div className="col-md-6">
                            <p>Sarah Michaels</p>
                          </div>
                          <div className="col-md-6">
                            <p>Team member</p>
                          </div>
                        </div> */}

                        {/* <div className="row">
                          <div className="col-md-6">
                            <p>Tim Myers</p>
                          </div>
                          <div className="col-md-6">
                            <p>Team member</p>
                          </div>
                        </div> */}

                        {/* <div className="row">
                          <div className="col-md-6">
                            <p>Ariana Carey</p>
                          </div>
                          <div className="col-md-6">
                            <p>Team member</p>
                          </div>
                        </div> */}
                      </TeamMemberListBody>
                    </TeamMemberList>

                    <ProfileBoxAction className="mt-24">
                      <button
                        disabled={adminAccess !== false}
                        type="button"
                        className="btn action-btn"
                        onClick={sentAdminRequest}
                      >
                        {adminAccess !== false
                          ? 'Pending admin access'
                          : 'Request admin access'}
                        {/* Request admin access */}
                      </button>

                      {/* <button type="button" className="btn action-btn"> */}
                      <button
                        type="button"
                        className="btn action-btn"
                        data-toggle="modal"
                        data-target="#sendInvite"
                        onClick={() => setModalShow(true)}
                        // onClick={e => changeClassName()}
                      >
                        Send invite
                      </button>
                    </ProfileBoxAction>
                  </>
                ) : (
                  <>
                    <BorderTitle>Admin</BorderTitle>
                    <div className="row">
                      {response &&
                        userDetail &&
                        response
                          .filter(
                            res =>
                              res.role === 'admin' &&
                              res.id !== userDetail.id &&
                              !res.isDeleted,
                          )
                          .map(adminU => (
                            <>
                              <div className="col-md-6">
                                <FormGroup className="border-form-group">
                                  <Label className="border-group-label">
                                    Member
                                  </Label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={adminU.firstName}
                                  />
                                </FormGroup>
                              </div>
                              <div className="col-md-6">
                                <FormGroup className="border-form-group">
                                  <Label className="border-group-label">
                                    Role
                                  </Label>
                                  <select
                                    className="form-control"
                                    value={optionsStateAdmin}
                                    id={adminU.id}
                                    onChange={onChangeAdminRole}
                                  >
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">
                                      Team Member
                                    </option>
                                  </select>
                                </FormGroup>
                              </div>
                            </>
                          ))}
                    </div>
                    <BorderTitle>Team members</BorderTitle>
                    <div className="row">
                      {response &&
                        response
                          .filter(
                            res => res.role === 'employee' && !res.isDeleted,
                          )
                          .map(emp => (
                            <>
                              <div className="col-md-6">
                                <FormGroup className="border-form-group">
                                  <Label className="border-group-label">
                                    Member
                                  </Label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={emp.firstName}
                                  />
                                </FormGroup>
                              </div>
                              <div className="col-md-6">
                                <FormGroup className="border-form-group">
                                  <Label className="border-group-label">
                                    Role
                                  </Label>
                                  <select
                                    className="form-control"
                                    value={optionsStateTeamMember}
                                    id={emp.id}
                                    onChange={onChangeTeamMemberRole}
                                  >
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">
                                      Team Member
                                    </option>
                                    <option
                                      value="Deactivate this user"
                                      style={{ color: 'red' }}
                                    >
                                      Deactivate this user
                                    </option>
                                  </select>
                                </FormGroup>
                              </div>
                            </>
                          ))}
                    </div>
                    <ProfileBoxAction className="mt-8">
                      <button
                        type="button"
                        className="btn action-btn"
                        data-toggle="modal"
                        data-target="#sendInvite"
                        onClick={() => setModalShow(true)}
                        // onClick={e => changeClassName()}
                      >
                        Send invite
                      </button>

                      {/* <button
                        type="button"
                        className="btn action-btn"
                        data-toggle="modal"
                        data-target="#reassignJobPosting"
                        onClick={() => setModalReassignJobPostingShow(true)}
                        style={{ float: 'right' }}
                        // onClick={e => changeClassName()}
                      >
                        Reassign job posting
                      </button> */}
                      {isModalOpen && (
                        <ModalBox
                          className={className}
                          id="sendInvite"
                          // tabindex="-1"
                          role="dialog"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-body">
                                <div className="box-form-wrap">
                                  <h3 className="mb-0">Email address</h3>
                                  <p>*separate with comma</p>
                                  <div className="form-group">
                                    {/* <label>Add label</label> */}
                                    <Label>Add label</Label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Add emails"
                                      value={addEmail}
                                      onChange={e =>
                                        setAddEmail(e.target.value)
                                      }
                                      onKeyPress={e => onSentInvitation(e)}
                                    />
                                  </div>

                                  <h3>
                                    What level of access would you like to
                                    provide?
                                  </h3>
                                  <div className="form-group border-form-group mb-0">
                                    <Label className="border-group-label">
                                      Role <span className="req-star">*</span>
                                    </Label>
                                    <select
                                      className="form-control"
                                      value={sentEmailRole}
                                      onChange={e =>
                                        setSentEmailRole(e.target.value)
                                      }
                                    >
                                      <option>Team member</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ModalBox>
                      )}
                    </ProfileBoxAction>
                  </>
                )}
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>

          {userDetail.role === 'employee' ? (
            <></>
          ) : (
            <>
              {' '}
              <ProfileBoxForm className="mt-32">
                <ProfileBoxHead>
                  <h2>
                    {companyEMP && companyEMP.personalInfo.companyName} Team
                  </h2>
                </ProfileBoxHead>
                <div className="profile-box-form-body">
                  <TableResponsive>
                    <table className="table">
                      <tr>
                        <th width="75%"> </th>
                        <th className="text-right">Open jobs</th>
                        <th className="text-right">Closed jobs</th>
                      </tr>
                      {response &&
                        jobDetail &&
                        response
                          .filter(
                            res => res.id !== jobDetail.id && !res.isDeleted,
                          )
                          .map(emp => (
                            <>
                              <tr>
                                <Link
                                  href={`/company/user-job-board?id=${emp.id}`}
                                >
                                  <td width="75%">
                                    <h4>{emp.firstName}</h4>
                                    <p>
                                      {emp.role && emp.role === 'employee'
                                        ? 'Team Member'
                                        : 'Admin'}
                                    </p>
                                  </td>
                                  {/* <button
                              type="button"
                              onClick={handleSearch(emp.id)}
                            >
                              click
                            </button> */}
                                </Link>
                                <td className="text-right">
                                  {getOpenJob(emp)}
                                </td>
                                <td className="text-right">
                                  {getCloseJob(emp)}
                                </td>
                              </tr>
                            </>
                          ))}
                    </table>
                  </TableResponsive>
                </div>
              </ProfileBoxForm>{' '}
            </>
          )}
          {userDetail.role !== 'employee' && (
            <>
              <ProfileBoxForm className="mt-32 deactive-user-box">
                <ProfileBoxHead>
                  <h2>Deactive Users</h2>
                </ProfileBoxHead>
                <div className="profile-box-form-body">
                  <BoxFormWrap className="box-title-group">
                    {response &&
                      response
                        .filter(res => res.isDeleted)
                        .map(isDeactive => (
                          <>
                            {/* <div className="profile-box-form-body">
                      <BoxFormWrap className="box-title-group"> */}
                            <div className="row">
                              <div className="col-md-6">
                                <FormGroup className="border-form-group">
                                  <Label className="border-group-label">
                                    Member
                                  </Label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={isDeactive.firstName}
                                  />
                                </FormGroup>
                              </div>
                              <div className="col-md-6">
                                <FormGroup className="border-form-group">
                                  <Label className="border-group-label">
                                    Role
                                  </Label>
                                  <select
                                    className="form-control"
                                    value={deactiveUser}
                                    id={isDeactive.id}
                                    style={{ color: 'red' }}
                                    onChange={onChangeActiveDeactive}
                                  >
                                    <option
                                      value="Team Member Deactivated"
                                      style={{ color: '#1d242f' }}
                                    >
                                      Team member - Deactivated
                                    </option>
                                    <option
                                      value="Active TeamMember"
                                      style={{ color: '#1d242f' }}
                                    >
                                      Reactivate account as team member
                                    </option>
                                  </select>
                                </FormGroup>
                              </div>
                            </div>
                            {/* </BoxFormWrap>
                    </div> */}
                          </>
                        ))}
                  </BoxFormWrap>
                </div>
              </ProfileBoxForm>
            </>
          )}
        </ProfileRightPanel>
      </ProfileSectionWrap>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <>
      <Page
        title=" Profile Access Setting Info"
        description="Profile Access Setting Info Page"
        nav={{ show: false }}
        topbar={{ show: false }}
        isVerified
      >
        {content}
      </Page>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyModalReassignJobPosting
        show={modalReassignJobPostingShow}
        onHide={() => setModalReassignJobPostingShow(false)}
      />
    </>
  );
};

export default withAuthSync(ProfileAccessSetting, true);
