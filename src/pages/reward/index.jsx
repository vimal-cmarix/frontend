import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '@components/templates/Page';
import { withAuthSync } from '@src/utils/auth';
import UserService from '@api/services/user';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import { cdn } from '@utils/general';
import { useToast } from '@components/molecules/Notification';
import errorHandle from '@utils/error';
import { useRouter } from 'next/router';
import Btn from '@components/molecules/Btn';
import {
  ButtonWrapper,
  DiscountPercentage,
  ImageWrapper,
  Paragraph,
  SectionTitle,
  Section,
  SectionWrapper,
  TextWrapper,
} from './style';

const Reward = ({ jwt }) => {
  const { t: rewardT } = useTranslation('reward');
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const showError = msg => toast.add(msg, 'error');
  const discount = 50;

  async function activateReferralDiscount() {
    setLoading(true);
    const extoleToken = await (
      await fetch('https://go.joinsizigi.com/api/v4/token', {
        credentials: 'include',
        method: 'get',
      })
    ).json();
    const extoleUser = await (
      await fetch(
        `https://go.joinsizigi.com/api/v4/me?access_token=${extoleToken.access_token}`,
        {
          credentials: 'include',
          method: 'get',
        },
      )
    ).json();
    const extoleAccessToken = extoleToken.access_token;
    try {
      await UserService.setReferralAdvocate({ extoleAccessToken });
      await router.push('/pricing?billing=annual');
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page
      title={rewardT('page_title')}
      description={rewardT('page_description')}
      isVerified={jwt.isVerified}
    >
      <SafeArea>
        <ContentWrapper>
          <Section>
            <SectionWrapper>
              <TextWrapper>
                <SectionTitle>{rewardT('title')}</SectionTitle>
                <Paragraph>
                  {rewardT(`paragraph_one`)}
                  <DiscountPercentage>{`${discount}%`}</DiscountPercentage>
                  {rewardT(`paragraph_two`)}
                  <br />
                  {rewardT(`paragraph_three`)}
                </Paragraph>
                <ButtonWrapper>
                  <Btn
                    loading={loading}
                    label={rewardT(`action_button`)}
                    variant="outlinePrimary"
                    handleClick={activateReferralDiscount}
                  />
                </ButtonWrapper>
              </TextWrapper>
              <ImageWrapper>
                <img src={cdn('/static/img/reward_image.svg')} alt="Reward" />
              </ImageWrapper>
            </SectionWrapper>
          </Section>
        </ContentWrapper>
      </SafeArea>
    </Page>
  );
};

export default withAuthSync(Reward, true);
