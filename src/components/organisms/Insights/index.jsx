import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AnalyticsService from '@api/services/analytics';
import errorHandle from '@utils/error';
import { useToast } from '@components/molecules/Notification';
import { Grid, Cell } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';

import TooltipWrapper from '@components/molecules/TooltipWrapper';
import Icon from '@components/atoms/Icon';
import {
  InsightWrapper,
  Insight,
  InsightDescription,
  InsightTitle,
} from './style';

const Insights = ({ profileSlug, columns }) => {
  const toast = useToast();
  const { t } = useTranslation('insights');
  const [insightsData, setInsightsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const showToast = msg => toast.add(msg, 'error');

  async function loadInsights() {
    if (profileSlug) {
      setLoading(true);
      try {
        const { data } = await AnalyticsService.getInsights(profileSlug, {});
        if (data && data.metrics) {
          setInsightsData(
            data.metrics.map(metric => {
              const { description, tooltip } = t(metric.name, {
                returnObjects: true,
              });
              return {
                title: metric.value,
                description,
                tooltip,
              };
            }),
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
    loadInsights();
  }, [profileSlug]);

  return (
    <InsightWrapper>
      <Grid columns={columns} gap="24px">
        {insightsData.map(data => (
          <Cell key={data.description}>
            <Insight loading={loading.toString()}>
              <InsightTitle>{data.title}</InsightTitle>
              <TooltipWrapper
                className="tooltip"
                text={data.tooltip}
                disable={!data.tooltip}
                fromRight
              >
                <InsightDescription>
                  {data.description}
                  {data.tooltip && (
                    <Icon className="icon" name="question_outline" />
                  )}
                </InsightDescription>
              </TooltipWrapper>
            </Insight>
          </Cell>
        ))}
      </Grid>
    </InsightWrapper>
  );
};

Insights.propTypes = {
  profileSlug: PropTypes.string.isRequired,
  columns: PropTypes.number,
};

Insights.defaultProps = {
  columns: 3,
};

export default Insights;
