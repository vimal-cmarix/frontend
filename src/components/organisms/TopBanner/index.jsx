import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'styled-css-grid';

import AnalyticsService from '@api/services/analytics';

import errorHandle from '@utils/error';
import { cdn } from '@utils/general';

import { useToast } from '@components/molecules/Notification';
import Btn from '@components/molecules/Btn';

import {
  BannerPicture,
  BannerWrapper,
  Banner,
  CountViews,
  LabelWrapper,
  Label,
  Divider,
} from '@components/organisms/TopBanner/style';

const TopBanner = ({ profileSlug }) => {
  const toast = useToast();
  const { t } = useTranslation('analytics_banner');
  const [presentationViews, setPresentationsViews] = useState(0);
  const [loading, setLoading] = useState(true);

  const showToast = msg => toast.add(msg, 'error');

  async function loadViews() {
    if (profileSlug) {
      setLoading(true);
      try {
        const { data } = await AnalyticsService.getInsights(profileSlug, {});
        if (data && data.metrics) {
          setPresentationsViews(
            data.metrics.find(item => item.name === 'presentation_views').value,
          );
        }
      } catch (e) {
        showToast(errorHandle(e));
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadViews();
  }, [profileSlug]);

  return (
    <BannerWrapper>
      <Grid columns={1} gap="24px">
        <Cell>
          <Banner>
            <CountViews loading={loading}>
              {presentationViews > 0 ? (
                <span className="views-count">
                  <number>{presentationViews}</number>
                  {t('presentation_views')}
                </span>
              ) : (
                <span className="views-cta">
                  Get views
                  <br />
                  by sharing
                  <br />
                  presentations!
                </span>
              )}
            </CountViews>
            <Divider />
            <LabelWrapper>
              <Label>{t('label_pitch')}</Label>
            </LabelWrapper>
            <BannerPicture
              src={cdn('/static/img/analytics-banner/data-picture.svg')}
            />
          </Banner>
        </Cell>
      </Grid>
    </BannerWrapper>
  );
};

TopBanner.propTypes = {
  profileSlug: PropTypes.string.isRequired,
};

export default TopBanner;
