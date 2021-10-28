import React, { useContext, useEffect, useState } from 'react';
import loadable from '@loadable/component';
import cookie from 'js-cookie';

import AssetService from '@api/services/asset';
import ProfileService from '@api/services/profile';
import LocationService from '@api/services/location';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import errorHandle from '@src/utils/error';
import { useTranslation } from 'react-i18next';
import { useToast, Action } from '@components/molecules/Notification';
import { getGMT, convertToMb } from '@src/utils/general';

import { IconButton } from '@components/molecules/Button';
import Avatar from '@components/molecules/Avatar';
import Icon from '@components/atoms/Icon';
import Tag from '@components/atoms/Tag';

import getFormatedLocation from '@utils/location';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';

// MODALS
import InterestsModal from '@components/templates/Modals/Interests';
import ContactsModal from '@components/templates/Modals/Contact';
import AboutModal from '@components/templates/Modals/About';
import PersonalModal from '@components/templates/Modals/Personal';

import {
  Container,
  SideBarWrapper,
  HeaderWrapper,
  AvatarContent,
  AvatarWrapper,
  EditLayer,
  AddButton,
  UserName,
  Section,
  SectionTitle,
  RowIconPlusText,
  RowIconWrapper,
  RowText,
  EditIconWrapper,
  InterestsWrapper,
  InterestWrapper,
} from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

/**
 * Profile Sidebar is used to display all user informations.
 * You can Edit the informations.
 */
const SideBar = () => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { dispatch: profileDispatch } = useContext(ProfileContext);
  const { state: profileState } = useContext(ProfileContext);

  const [user, setUser] = useState({});
  const [about, setAbout] = useState({});
  const [contact, setContact] = useState({});
  const [interests, setInterests] = useState([]);
  const [timeZone, setTimeZone] = useState(null);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const { t: toastT } = useTranslation('profile_picture');
  const { t: profileT } = useTranslation('profile');

  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);

  const [actionVisible, setActionVisible] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [deletePhotoLoading, setDeletePhotoLoading] = useState(false);

  const getGMTService = async dataAbout => {
    if (dataAbout && dataAbout.timezone) {
      const res = await LocationService.getTimezones({
        limit: 1000,
        query: dataAbout.timezone,
      });
      const { name } = res.data.data[0] || { name: `(${dataAbout.timezone})` };
      const options = {
        timeZone: dataAbout.timezone,
        hour: '2-digit',
        minute: '2-digit',
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const date = formatter.format(new Date());
      setTimeZone(`${date} (${getGMT(name)})`);
    } else setTimeZone(null);
  };

  const handleData = () => {
    const data = profileState;
    const { personalInfo, contactInfo, photo } = data;

    setUser({
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      occupation: data.about.occupation,
      photo,
    });
    setInterests(data.interests);
    setContact(contactInfo);
    setAbout(data.about);
    setAvatarUrl((photo && photo.url) || null);

    getGMTService(data.about);
  };

  const optionsUpload = {
    accept: 'image/*',
    // imageDim: [800, 800],
    transformations: {
      circle: true,
      rotate: true,
      force: true,
      crop: false,
    },
    maxFiles: 1,
    maxSize: convertToMb(10),
    storeTo: {
      path: FSPath,
    },
    onOpen: () => {
      appDispatch({ type: 'HIDE_TOUR' });
    },
    onClose: () => {
      goToNextStepAndShow(appDispatch);
    },
    onCancel: () => {
      goToNextStepAndShow(appDispatch);
    },
  };

  const savePhotoProfile = async data => {
    const { url, id } = data.data;
    const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

    try {
      if (profileId && id) {
        const response = await ProfileService.setPhoto(profileId, {
          photoId: id,
        });

        if (response) {
          const { photo } = response.data.data;

          profileDispatch({
            type: 'SET_PHOTO',
            photo,
          });
          showSuccess(toastT('success'));

          setAvatarUrl(url);
        }
      }
      setLoadingFile(false);
    } catch (e) {
      showError(errorHandle(e));
      setLoadingFile(false);
    }
  };

  const onUploadSuccess = async res => {
    try {
      const { filesUploaded } = res;

      if (filesUploaded?.length) {
        setLoadingFile(true);

        const { url } = filesUploaded[0];
        const response = await AssetService.createAsset(url);
        const { data } = response;
        savePhotoProfile(data);
      } else {
        setAvatarUrl(null);
      }
    } catch (e) {
      showError(errorHandle(e));
      setLoadingFile(false);
    }
  };

  const deletePhotoProfile = async () => {
    try {
      setDeletePhotoLoading(true);

      // Validation passed
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

      const response = await ProfileService.setPhoto(profileId, {
        photoId: null,
      });

      if (response) {
        const { photo } = response.data.data;

        profileDispatch({
          type: 'SET_PHOTO',
          photo,
        });

        showSuccess(toastT('delete_success'));
        setActionVisible(false);
      }

      setDeletePhotoLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setDeletePhotoLoading(false);
    }
  };

  const onDeleteAvatar = () => {
    setActionVisible(true);
  };

  const assetAuthData = async () => {
    const { data } = await AssetService.getAuth();
    const { key, policy, signature, path } = data.data.params;

    setFSKey(key);
    setFSPolicy(policy);
    setFSSignature(signature);
    setFSPath(path);
  };

  useEffect(() => {
    assetAuthData();
  }, []);

  useEffect(() => {
    if (profileState.id) handleData();
  }, [profileState]);

  return (
    <Container>
      {actionVisible && (
        <Action
          title={profileT('sidebar.avatar.remove.title')}
          description={profileT('sidebar.avatar.remove.description')}
          type="warning"
          onConfirm={deletePhotoProfile}
          onCancel={() => setActionVisible(false)}
          loading={deletePhotoLoading}
        />
      )}
      <HeaderWrapper>
        <AvatarContent data-tut="reactour__avatar">
          <AvatarWrapper>
            <Avatar image={avatarUrl} size="xxlarge" name={user.name} />
          </AvatarWrapper>
          <EditLayer>
            {FSKey && FSPolicy && FSSignature && FSPath ? (
              <ReactFilestack
                apikey={FSKey}
                clientOptions={{
                  security: {
                    policy: FSPolicy,
                    signature: FSSignature,
                  },
                  sessionCache: true,
                }}
                actionOptions={optionsUpload}
                componentDisplayMode={{
                  type: 'immediate',
                }}
                customRender={({ onPick }) => {
                  return (
                    <>
                      {avatarUrl ? (
                        <IconButton
                          colorSchema="secondary"
                          size="small"
                          loading={loadingFile}
                          icon="reload_outline"
                          handleClick={onPick}
                        />
                      ) : (
                        <IconButton
                          colorSchema="secondary"
                          size="small"
                          loading={loadingFile}
                          icon="upload_solid"
                          handleClick={onPick}
                        />
                      )}
                    </>
                  );
                }}
                onSuccess={onUploadSuccess}
              />
            ) : (
              <>
                {avatarUrl ? (
                  <IconButton
                    colorSchema="secondary"
                    size="small"
                    loading={loadingFile}
                    icon="reload_outline"
                  />
                ) : (
                  <IconButton
                    colorSchema="secondary"
                    size="small"
                    loading={loadingFile}
                    icon="upload_solid"
                  />
                )}
              </>
            )}
            {avatarUrl && (
              <IconButton
                colorSchema="secondary"
                size="small"
                icon="delete_solid"
                handleClick={onDeleteAvatar}
              />
            )}
          </EditLayer>
        </AvatarContent>
        <Section>
          <UserName>{user.name}</UserName>
          <EditIconWrapper
            onClick={() => {
              appDispatch({
                type: 'SET_MODAL_OPENED',
                component: PersonalModal,
              });
            }}
          >
            <Icon name="edit_outline" />
          </EditIconWrapper>
        </Section>
      </HeaderWrapper>

      <SideBarWrapper>
        <Section data-tut="reactour__about">
          <SectionTitle>{profileT('sidebar.about')}</SectionTitle>

          {/* ROLE */}
          {about.occupation && (
            <RowIconPlusText>
              <RowIconWrapper>
                <Icon name="briefcase_outline" />
              </RowIconWrapper>
              <RowText>{about.occupation}</RowText>
            </RowIconPlusText>
          )}

          {/* LOCATION */}
          {about.state && about.city && (
            <RowIconPlusText>
              <RowIconWrapper>
                <Icon name="pin" />
              </RowIconWrapper>
              <RowText>{getFormatedLocation(about.state, about.city)}</RowText>
            </RowIconPlusText>
          )}

          {/* TIME ZONE */}
          {timeZone && (
            <RowIconPlusText>
              <RowIconWrapper>
                <Icon name="clock" />
              </RowIconWrapper>
              <RowText>{timeZone}</RowText>
            </RowIconPlusText>
          )}

          {about.timezone || (about.state && about.city) || about.occupation ? (
            <EditIconWrapper
              onClick={() => {
                appDispatch({
                  type: 'SET_MODAL_OPENED',
                  component: AboutModal,
                });
              }}
            >
              <Icon name="edit_outline" />
            </EditIconWrapper>
          ) : (
            <AddButton
              onClick={() => {
                appDispatch({
                  type: 'SET_MODAL_OPENED',
                  component: AboutModal,
                });
              }}
            >
              {profileT('add')}
            </AddButton>
          )}
        </Section>

        <Section data-tut="reactour__contact">
          <SectionTitle>{profileT('sidebar.contact')}</SectionTitle>

          {/* PHONE */}
          {contact.phone && (
            <RowIconPlusText>
              <RowIconWrapper>
                <Icon name="phone_outline" />
              </RowIconWrapper>
              <RowText>{contact.phone}</RowText>
            </RowIconPlusText>
          )}

          {/* EMAIL */}
          {contact.email && (
            <RowIconPlusText>
              <RowIconWrapper>
                <Icon name="mail_outline" />
              </RowIconWrapper>
              <RowText>{contact.email}</RowText>
            </RowIconPlusText>
          )}

          <EditIconWrapper
            onClick={() => {
              appDispatch({
                type: 'SET_MODAL_OPENED',
                component: ContactsModal,
              });
            }}
          >
            <Icon name="edit_outline" />
          </EditIconWrapper>
        </Section>

        <Section data-tut="reactour__interests">
          <SectionTitle>{profileT('sidebar.interests')}</SectionTitle>
          <>
            {interests?.length > 0 && (
              <InterestsWrapper>
                {interests.map(item => (
                  <InterestWrapper key={item}>
                    <Tag label={item} />
                  </InterestWrapper>
                ))}
              </InterestsWrapper>
            )}
          </>

          {interests?.length ? (
            <EditIconWrapper
              onClick={() => {
                appDispatch({
                  type: 'SET_MODAL_OPENED',
                  component: InterestsModal,
                  props: { interestsList: interests },
                });
              }}
            >
              <Icon name="edit_outline" />
            </EditIconWrapper>
          ) : (
            <AddButton
              onClick={() => {
                appDispatch({
                  type: 'SET_MODAL_OPENED',
                  component: InterestsModal,
                  props: { interestsList: interests },
                });
              }}
            >
              {profileT('add')}
            </AddButton>
          )}
        </Section>
      </SideBarWrapper>
    </Container>
  );
};

export default SideBar;
