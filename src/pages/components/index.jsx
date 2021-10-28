import React, { useContext, useState } from 'react';

import useOuterClick from '@hooks/useOuterClick';

import { Typography } from '@assets/styles/typo';

import DigitalPresenceTooltip from '@components/molecules/DigitalPresenceTooltip';
import Btn from '@components/molecules/Btn';
import BtnGroup from '@components/organisms/BtnGroup';
import Tag from '@components/atoms/Tag';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import ProfileTabs from '@components/organisms/ProfileTabs';
import ProfileTab from '@components/molecules/ProfileTab';
import DeleteDialog from '@components/molecules/DeleteDialog';
import ProficiencyLevel from '@components/molecules/ProficiencyLevel';
import CardSkill from '@components/molecules/CardSkill';
import { CardSkillWrapper } from '@components/molecules/CardSkill/style';
import CertificateCard from '@components/molecules/CertificateCard';
import DotsMenu from '@components/molecules/DotsMenu';
import IconSVG from '@components/atoms/IconSVG';
import InputFieldHelper from '@components/molecules/InputFieldHelper';

import NdEditor from '@components/organisms/NdEditor';

import AppContext from '@context/appContext';
import ContactAndAppointmentModal from '@components/organisms/ContactAndAppointment';
import DiscrepancyModal from '@components/templates/Modals/TrackedJob/DiscrepancyModal';
import Downgrade from '@components/templates/Modals/Downgrade';
import DiscountAppliedModal from '@components/templates/Modals/DiscountApplied';
import {
  Container,
  Section,
  SectionTitle,
  ButtonAddMoreTooltip,
  TagsWrapper,
  TagItem,
  SectionRow,
  SectionColumn,
  ThreeDotsButtonWrapper,
  ThreeDotsButton,
  TypographyContainer,
} from './styles';

const Components = () => {
  const [showTooltip, toggleTooltip] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showDialog, toggleShowDialog] = useState(false);
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  const [level, setLevel] = useState(0);

  const dotsMenuRef = useOuterClick(() => {
    if (showDotsMenu) {
      setShowDotsMenu(false);
    }
  });

  const { dispatch } = useContext(AppContext);

  const handleOpenModalSendAMessage = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => <ContactAndAppointmentModal option="send-a-message" />,
    });
  };

  const handleOpenModalRequestAnInterview = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <ContactAndAppointmentModal option="request-interview" />
      ),
    });
  };

  const handleOpenModalDowngrade = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => <Downgrade />,
    });
  };

  const handleOpenDiscrepancyModal = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <DiscrepancyModal
          originalJobTitle="Insights Manager"
          updatedJobTitle="Insights Manager Senior"
        />
      ),
    });
  };

  return (
    <Container>
      <SectionTitle>Digital Presence ToolTip</SectionTitle>
      <Section>
        <ButtonAddMoreTooltip>
          <Btn
            handleClick={() => toggleTooltip(currState => !currState)}
            variant="textPrimary"
            label="Add more"
            startIcon="plus"
            iconSize={12}
          />
          <DigitalPresenceTooltip shown={showTooltip} />
        </ButtonAddMoreTooltip>
      </Section>

      <SectionTitle>Tags</SectionTitle>
      <Section>
        <TagsWrapper>
          <TagItem>
            <Tag type="solid" label="Hello" />
          </TagItem>

          <TagItem>
            <Tag type="outline" label="World" />
          </TagItem>

          <TagItem>
            <Tag type="thin" label="Marketing" />
          </TagItem>

          <TagItem>
            <Tag
              type="solid"
              label="Lorem ipsum"
              removeHandler={() => alert('remove tag')}
            />
          </TagItem>
        </TagsWrapper>
      </Section>

      <SectionTitle>Custom DatePicker</SectionTitle>
      <SectionColumn>
        <SectionRow>
          <h3>Default</h3>
          <CustomDatePicker
            selected={startDate}
            onChange={setStartDate}
            useWeekdaysShort
          />
        </SectionRow>

        <SectionRow>
          <h3>Month Picker</h3>
          <CustomDatePicker
            selected={startDate}
            onChange={setStartDate}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            calendarClassName="date-picker-month-year"
          />
        </SectionRow>

        <SectionRow>
          <h3>Month Picker bottom-end position</h3>
          <CustomDatePicker
            selected={startDate}
            onChange={setStartDate}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            calendarClassName="date-picker-month-year"
            popperPlacement="right-end"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '8px, 7px',
              },
            }}
          />
        </SectionRow>

        <SectionRow>
          <h3>Month Picker right-start position</h3>
          <CustomDatePicker
            selected={startDate}
            onChange={setStartDate}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            calendarClassName="date-picker-month-year"
            popperPlacement="right-start"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '0px, 7px',
              },
            }}
          />
        </SectionRow>
      </SectionColumn>

      <SectionTitle>Profile Tabs</SectionTitle>
      <SectionColumn>
        <ProfileTabs>
          <ProfileTab text="Overview" isActive />
          <ProfileTab text="Culture Fit" />
          <ProfileTab text="Content" />
          <ProfileTab text="Resume" />
        </ProfileTabs>

        <ProfileTabs isTimeline>
          <ProfileTab isTimeline text="All" isActive />
          <ProfileTab
            isTimeline
            text="Education"
            onClickEditButton={() => {}}
          />
          <ProfileTab
            isTimeline
            text="Experience"
            onClickEditButton={() => {}}
          />
          <ProfileTab
            isTimeline
            text="Certificates"
            onClickEditButton={() => {}}
          />
          <ProfileTab isTimeline text="Skills" />
        </ProfileTabs>
      </SectionColumn>

      <SectionTitle>Delete Dialog</SectionTitle>
      <Section>
        <ButtonAddMoreTooltip>
          <Btn
            handleClick={() => toggleShowDialog(currState => !currState)}
            variant="textPrimary"
            label="Remove"
            endIcon="trash"
          />
          {showDialog && (
            <DeleteDialog
              type="warning"
              title="Oops?"
              description="Are you sure you want to delete this education?"
              warnDescription="Once you delete, it will be lost forever"
              onCancel={() => toggleShowDialog(false)}
              onConfirm={() => toggleShowDialog(false)}
              isLoading={false}
            />
          )}
        </ButtonAddMoreTooltip>
      </Section>

      <SectionTitle>Send a Message Modal</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenModalSendAMessage}>
          Send a Message
        </button>
      </Section>

      <SectionTitle>Request an Interview Modal</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenModalRequestAnInterview}>
          Request an Interview
        </button>
      </Section>

      <SectionTitle>Tracked Job - Discrepancy Modal</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenDiscrepancyModal}>
          Open Discrepancy Modal
        </button>
      </Section>

      <SectionTitle>Proficiency Level</SectionTitle>
      <ProficiencyLevel
        level={5}
        text="I’m like friggin yoda and the force with this skill"
        isActive={level === 5}
        action={() => setLevel(5)}
      />
      <ProficiencyLevel
        level={4}
        text="I mean I can’t do this in my sleep but that doesn’t mean I can’t do it half-asleep"
        isActive={level === 4}
        action={() => setLevel(4)}
      />
      <ProficiencyLevel
        level={3}
        text="The definition of “just good enough to get the job done”"
        isActive={level === 3}
        action={() => setLevel(3)}
      />
      <ProficiencyLevel
        level={2}
        text="If you’re a complete noob, just take the L and press 1"
        isActive={level === 2}
        action={() => setLevel(2)}
      />
      <ProficiencyLevel
        level={1}
        text="I like... kinda know it but not really? "
        isActive={level === 1}
        action={() => setLevel(1)}
      />

      <SectionTitle>Card Skill</SectionTitle>
      <CardSkillWrapper>
        <CardSkill
          level={5}
          title="C++"
          levelText="Level: 5"
          relatedText="4 related content"
          showIcon
        />
        <CardSkill
          level={5}
          title="C++"
          levelText="Level: 5"
          relatedText="4 related content"
          showIcon
        />
        <CardSkill
          level={4}
          title="C++"
          levelText="Level: 4"
          relatedText="4 related content"
          showIcon
        />
        <CardSkill
          level={3}
          title="C++"
          levelText="Level: 3"
          relatedText="4 related content"
          showIcon
        />
        <CardSkill
          level={2}
          title="C++"
          levelText="Level: 2"
          relatedText="4 related content"
          showIcon
        />
        <CardSkill
          level={1}
          title="C++"
          levelText="Level: 1"
          relatedText="4 related content"
          showIcon
        />
      </CardSkillWrapper>

      <SectionTitle>Certificate Card</SectionTitle>
      <SectionColumn>
        <CertificateCard
          cardAvatar="https://ui-avatars.com/api/?name=Google+Analytics"
          title="Google Analytics"
          description="Attained: March"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit
          ut aliquam, purus sit amet luctus Lorem ipsum dolor sit amet,
          consectetur adipiscing elit ut aliquam, purus sit amet luctus
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus"
        />
      </SectionColumn>

      <SectionTitle>Dots Menu</SectionTitle>
      <SectionColumn>
        <ThreeDotsButtonWrapper>
          <ThreeDotsButton onClick={() => setShowDotsMenu(true)}>
            <IconSVG name="threeDots" />
          </ThreeDotsButton>
          <DotsMenu
            ref={dotsMenuRef}
            shown={showDotsMenu}
            handleDeleteClick={() => null}
            handleEditClick={() => null}
            handleHideClick={() => null}
          />
        </ThreeDotsButtonWrapper>
      </SectionColumn>

      <SectionTitle>TextArea with InlineEditor</SectionTitle>
      <SectionColumn style={{ maxWidth: '60%' }}>
        <NdEditor
          onlyInlineEditor
          hidePlaceholder
          onChange={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          content={{
            blocks: [
              {
                key: 'component_screen_test',
                text: '',
                depth: 0,
              },
            ],
            entityMap: {},
          }}
        />
      </SectionColumn>

      <SectionTitle>New Buttons</SectionTitle>
      <BtnGroup>
        <Btn label="Text" />
        <Btn variant="textPrimary" label="Text primary" />
        <Btn variant="solidPrimary" label="Solid primary" />
        <Btn variant="solidPrimary" label="With loading" loading />
        <Btn variant="solidSecondary" label="Solid secondary" />
        <Btn variant="outlinePrimary" label="Outline primary" />
        <Btn variant="outlineSecondary" label="Outline secondary" />
        <Btn variant="danger" label="Danger" />
        <Btn variant="grey" label="Grey" />
        <Btn variant="outlinePrimary" startIcon="plus" label="Start icon" />
        <Btn variant="outlinePrimary" endIcon="plus" label="End icon" />
        <Btn
          variant="outlinePrimary"
          startIcon="plus"
          spaceElements={16}
          label="Custom spacing"
        />
        <Btn variant="solidPrimary" rounded="sm" label="Rounded sm" />
        <Btn variant="solidPrimary" rounded="md" label="Rounded md" />
        <Btn variant="solidPrimary" rounded="lg" label="Rounded lg" />
      </BtnGroup>
      <BtnGroup>
        <Btn variant="solidPrimary" size="sm" label="Small button" />
        <Btn variant="solidPrimary" size="md" label="Medium button" />
        <Btn variant="solidPrimary" size="lg" label="Large button" />
      </BtnGroup>
      <BtnGroup>
        <Btn variant="solidPrimary" full label="Full" />
      </BtnGroup>
      <BtnGroup>
        <Btn variant="addBoard" startIcon="plus" full />
      </BtnGroup>

      <SectionTitle>New Typography</SectionTitle>
      <TypographyContainer>
        <Typography size="headline2" color="grey29" as="h5">
          Heading 1
        </Typography>
        <Typography size="headline1" color="grey29" as="h6">
          Heading 2.1
        </Typography>
        <Typography fontWeight={900} color="grey400" size="headline1" as="h6">
          Heading 2.2
        </Typography>
        <Typography color="grey31" size="headline1">
          Heading 2.3
        </Typography>
        <Typography color="grey29">Heading 3.1</Typography>
        <Typography fontWeight={900} color="grey29">
          Heading 3.2
        </Typography>
        <Typography color="grey61">Heading 3.3</Typography>
        <Typography size="body1" color="grey29">
          Body 1
        </Typography>
        <Typography size="body2" color="grey61">
          Body 2
        </Typography>
        <Typography size="body2" fontWeight={300} color="grey29">
          Body 3
        </Typography>
        <Typography size="body2" color="grey29">
          Body 4
        </Typography>
        <Typography
          size="caption"
          color="grey29"
          fontWeight={300}
          lineHeight="170%"
        >
          Sub Header 1
        </Typography>
        <Typography size="body1" color="grey31">
          Buttons
        </Typography>
        <Typography size="headline1" color="black" as="h4">
          Cover Video Title
        </Typography>
        <Typography size="body2" fontWeight={300} color="black">
          Pop-out Modal Title
        </Typography>
        <Typography size="headline3" fontWeight={900} color="grey31" as="h2">
          Skill Card Title
        </Typography>
        <Typography
          size="headline3"
          fontWeight={900}
          color="grey31"
          as="h2"
          transform="uppercase"
        >
          Text uppercase
        </Typography>
      </TypographyContainer>

      <SectionTitle>InputField helper</SectionTitle>
      <SectionColumn>
        <InputFieldHelper
          content="Not sure what to put? Occupation is not necessarily a job title.
          It’s more along the lines of what you do professionally on a high level!\n
          Since this is one of the first things people see, you can have fun and be creative with it!"
          exampleText="i.e. Best damn marketer in the world"
        />
      </SectionColumn>

      <SectionTitle>Send a Message Modal</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenModalSendAMessage}>
          Send a Message
        </button>
      </Section>

      <SectionTitle>Request an Interview Modal</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenModalRequestAnInterview}>
          Request an Interview
        </button>
      </Section>

      <SectionTitle>Tracked Job - Discrepancy Modal</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenDiscrepancyModal}>
          Open Discrepancy Modal
        </button>
      </Section>

      <SectionTitle>Downgrade</SectionTitle>
      <Section>
        <button type="button" onClick={handleOpenModalDowngrade}>
          Modal Downgrade
        </button>
      </Section>

      <SectionTitle>Modal Discount Aplied</SectionTitle>
      <Section>
        <button
          type="button"
          onClick={() => {
            return dispatch({
              type: 'SET_MODAL_OPENED',
              component: DiscountAppliedModal,
              props: {
                cancelBackClick: true,
                title: 'Yay!!! Your discount has been applied',
                confirmText: 'Go back to my account',
                onConfirm: () => console.log('clicked'),
              },
            });
          }}
        >
          Open Modal Discount Aplied
        </button>
      </Section>
    </Container>
  );
};

export default Components;
