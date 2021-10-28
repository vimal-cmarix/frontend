import React from 'react';
import Link from 'next/link';
import Page from '@components/templates/Page';
import HeaderB2B from '@components/organisms/headerB2B';
import { cdn } from '@utils/general';
import {
  SecondaryHeader,
  OuterMostWrapper,
  LoadMoreLink,
  AllNotificationWrap,
  NotificationsInner,
  NotificationsItem,
  SecondaryWrapper,
} from './style';

const Faqs = () => {
  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />
      <AllNotificationWrap>
        <NotificationsInner>
          <h2>All Notifications</h2>
          {/* <NotificationsItem>
            <h3>Welcome to Sizigi 🤗</h3>
            <p>
              <strong>[User name]</strong>, we’re so excited to get you started!
              Let’s start by posting some jobs
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>New job posted 👏</h3>
            <p>
              <strong>[Team member name]</strong> just posted an opening looking
              for a <strong>[position title]</strong>
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>New app received 🎉</h3>
            <p>
              <strong>[User name]</strong> just applied for{' '}
              <strong>[position title]</strong>
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>New message 🗣</h3>
            <p>
              <strong>[User name]</strong> sent you a message!{' '}
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>You have an interview coming up 🚨</h3>
            <p>
              Tomorrow is your interview with <strong>[User name]</strong> for{' '}
              <strong>[position title]</strong>
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>Quick reminder 🔔</h3>
            <p>
              Today’s your interview with <strong>[User name]</strong> for{' '}
              <strong>[position title]</strong>
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>People are checking you out 👀</h3>
            <p>
              WOOHOO! Keep showing off <strong>[Company name]</strong> by
              sharing your link!
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>Your job has been posted ✅</h3>
            <p>
              Your posting for <strong>[postition title]</strong> has been
              posted!
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>Rejection emails sent ❗️</h3>
            <p>
              Your rejection email for <strong>[position title]</strong> has
              been sent to selected candidates
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>Rejection emails scheduled ❗️</h3>
            <p>
              Your rejection email for <strong>[position title]</strong> has
              been scheduled to be sent to selected candidates
            </p>
          </NotificationsItem>

          <NotificationsItem>
            <h3>A new company has joined 🔔</h3>
            <p>
              Welcome to <strong>[Company name]</strong>! Be sure to check out
              their company page
            </p>
          </NotificationsItem>

          <LoadMoreLink>
            <Link href="/all-notification-new">Load more</Link>
          </LoadMoreLink> */}

          {/* Notifications Not Found */}
          <div className="notifications-not-found">
            <img
              src={cdn('/static/img/notifications-not-found.svg')}
              alt="notifications-not-found"
            />
            <h4>
              No notifications yet!
              <br />
              Get out there and start posting jobs
            </h4>
          </div>
        </NotificationsInner>
      </AllNotificationWrap>
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
