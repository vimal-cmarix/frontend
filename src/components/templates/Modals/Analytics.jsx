import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { Grid, Cell } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import AnalyticsService from '@api/services/analytics';

import CustomSelect from '@components/molecules/CustomSelect';
import Icon from '@components/atoms/Icon';
import Chart from '@components/organisms/Chart';
import FormBlock from '@components/organisms/FormBlock';
import { sizes } from '@assets/styles/medias';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import { PRIVATE } from '@modules/consts';
import { formatDate } from '@utils/general';

import {
  DefaultModalContent,
  Body,
  CloseButton,
  Title,
  LabelList,
  LabelTitle,
  LabelListWrapper,
} from './style';

const Analytics = ({ data: analyticsData, type }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { t: modalT } = useTranslation('modals');
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const { id } = analyticsData;

  const filters = [
    {
      label: modalT('analytics.filters.seven'),
      value: 'sevenDaysAgo',
    },
    {
      label: modalT('analytics.filters.month'),
      value: 'oneMonthAgo',
    },
    {
      label: modalT('analytics.filters.3month'),
      value: 'threeMonthAgo',
    },
    {
      label: modalT('analytics.filters.6month'),
      value: 'sixMonthAgo',
    },
  ];

  const viewOutSide = {
    value: null,
    label: 'View outside of presentations',
  };

  const viewAllPresentation = {
    value: '',
    label: 'View all presentations',
  };

  const [numPresentationsUsed, setNumPresentationsUsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [filter, setFilter] = useState(filters[0]);
  const [presentationFilterList, setPresentationFilterList] = useState([]);
  const [presentationFilter, setPresentationFilter] = useState(
    viewAllPresentation,
  );
  const [engagement, setEngagement] = useState('');

  const [data, setData] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function resetModal() {
    setPresentationFilter(viewAllPresentation);
    setFilter(filters[0]);
  }

  async function updatePresentationSelectBox() {
    const option = {
      libraryId: id,
      filter: filter.value,
    };
    const response = await AnalyticsService.getMetrics(option);
    const { library } = response.data;
    const presentationsList = library.presentation;

    const presentationCombo = presentationsList.map(item => {
      return {
        label: item.title,
        value: item.id,
      };
    });

    presentationCombo.unshift(viewAllPresentation);
    presentationCombo.push(viewOutSide);

    setPresentationFilterList(presentationCombo);
  }

  async function handleData() {
    setLoading(true);

    try {
      if (type === 'presentation') {
        const [insightsResponse, chartResponse] = await Promise.all([
          AnalyticsService.getPresentationInsights(id, {}),
          AnalyticsService.getMetrics({
            presentationId: id,
            filter: filter.value,
          }),
        ]);
        const { data: insights } = insightsResponse;
        const { data: chartData } = chartResponse.data;
        const engagementFormatted =
          insights.engagement === null
            ? null
            : `${Math.round((insights.engagement || 0) * 100)}%`;
        setEngagement(engagementFormatted);
        const numberOfSessionsLine = chartData.find(
          item => item.library === null,
        );
        numberOfSessionsLine.presentation.name =
          'Unique sessions in this presentation';
        const contentViewsLine = {
          library: null,
          presentation: {
            id: numberOfSessionsLine.presentation.id,
            name: 'Total content views in this presentation', // FIXME - this is an workaround to show this message in the line representing "total content views"
          },
          chart: Object.values(
            chartData
              .filter(item => item.library !== null)
              .reduce((acc, cur) => {
                cur.chart.forEach(chart => {
                  acc[chart.date] = acc[chart.date] || {
                    date: chart.date,
                    views: 0,
                  };
                  acc[chart.date].views += chart.views;
                });
                return acc;
              }, {}),
          ),
        };
        if (contentViewsLine.chart?.length === 0) {
          contentViewsLine.chart = numberOfSessionsLine.chart.map(item => {
            return {
              ...item,
              views: 0,
            };
          });
        }
        setData([numberOfSessionsLine, contentViewsLine]);
      } else {
        const option = {
          libraryId: id,
          filter: filter.value,
          presentationId: presentationFilter.value,
        };
        if (option.presentationId === null || option.presentationId === '')
          delete option.presentationId;
        const response = await AnalyticsService.getMetrics(option);
        const { data: apiChartData } = response.data;
        const { library } = response.data;
        const chartData = library.presentation.map(presentation => {
          const dataFromApi = apiChartData.find(
            d => d.presentation && d.presentation.id === presentation.id,
          );
          if (dataFromApi) return dataFromApi;
          return {
            chart: apiChartData[0].chart.map(item => {
              return {
                date: item.date,
                views: 0,
              };
            }),
            library,
            presentation: {
              id: presentation.id,
              name: presentation.title,
            },
          };
        });

        // Add "outside of presentations" line
        const dataFromApi = apiChartData.find(d => d.presentation === null);
        if (dataFromApi) {
          chartData.push(dataFromApi);
        } else {
          chartData.push({
            chart: apiChartData[0].chart.map(item => {
              return {
                date: item.date,
                views: 0,
              };
            }),
            library,
            presentation: {
              id: null,
              name: 'Outside of presentations',
            },
          });
        }
        setNumPresentationsUsed(library.presentation?.length);
        let presentationsList;
        if (presentationFilter.value === null) {
          presentationsList = chartData.filter(
            item => item.presentation === null,
          );
        } else if (presentationFilter.value !== '') {
          presentationsList = chartData.filter(
            item =>
              item.presentation &&
              item.presentation.id === presentationFilter.value,
          );
        } else {
          presentationsList = chartData;
        }
        setData(presentationsList);
      }
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (appState.modal.isOpened) {
      if (type === 'library') updatePresentationSelectBox();
      handleData();
    } else resetModal();
  }, [appState.modal.isOpened]);

  useEffect(() => {
    if (appState.modal.isOpened) handleData();
  }, [presentationFilter, filter]);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened} large>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        {type === 'presentation' ? (
          <>
            <Title>{modalT('analytics.title_present')}</Title>
            <LabelTitle>{analyticsData && analyticsData.title}</LabelTitle>
            <LabelListWrapper>
              {analyticsData && analyticsData.type === PRIVATE && (
                <>
                  {analyticsData.hiringName && (
                    <LabelList>{analyticsData.hiringName}</LabelList>
                  )}
                  {analyticsData.job && (
                    <LabelList>{analyticsData.job}</LabelList>
                  )}
                </>
              )}
              {analyticsData.portfolioIds &&
                analyticsData.portfolioIds?.length > 0 && (
                  <LabelList>{`${analyticsData.portfolioIds?.length} LIBRARY ITEMS`}</LabelList>
                )}
              <LabelList>
                {engagement
                  ? `${engagement} ENGAGEMENT`
                  : 'NO ENGAGEMENT DATA YET'}
              </LabelList>
            </LabelListWrapper>
          </>
        ) : (
          <>
            <Title>{modalT('analytics.title_content')}</Title>
            <LabelTitle>{analyticsData && analyticsData.title}</LabelTitle>
            <LabelListWrapper>
              <LabelList>
                {`PUBLISHED ON ${formatDate(
                  analyticsData.publishedAt,
                  monthsT,
                  dateFormatesT('write'),
                )}`}
              </LabelList>
              <LabelList>{analyticsData.type}</LabelList>
              <LabelList>
                {`USED IN ${numPresentationsUsed} PRESENTATION${
                  numPresentationsUsed > 1 ? 'S' : ''
                }`}
              </LabelList>
            </LabelListWrapper>
          </>
        )}
        <Form ref={formRef}>
          <Grid gap="24px" columns={6}>
            <Cell width={screenWidth > parseInt(sizes.tablet, 10) ? 2 : 6}>
              <FormBlock label={modalT('analytics.period')}>
                <CustomSelect
                  options={filters}
                  name="filter"
                  size="medium"
                  placeholder={modalT('analytics.period')}
                  value={filter}
                  onOptionSelected={mm => {
                    setFilter(mm);
                  }}
                />
              </FormBlock>
            </Cell>
            {type !== 'presentation' && (
              <Cell width={screenWidth > parseInt(sizes.tablet, 10) ? 2 : 6}>
                <FormBlock label={modalT('analytics.presentation')}>
                  <CustomSelect
                    options={presentationFilterList}
                    name="filter"
                    size="medium"
                    placeholder={modalT('analytics.presentation')}
                    value={presentationFilter}
                    onOptionSelected={mm => setPresentationFilter(mm)}
                  />
                </FormBlock>
              </Cell>
            )}
          </Grid>
        </Form>
        {data && <Chart data={data} loading={loading} type={type} />}
      </Body>
    </DefaultModalContent>
  );
};

Analytics.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default Analytics;
