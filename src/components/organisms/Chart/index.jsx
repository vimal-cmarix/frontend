import React from 'react';
import PropTypes from 'prop-types';
import { Line, defaults } from 'react-chartjs-2';

import Loader from '@components/atoms/Loader';

import {
  Grey,
  Blue,
  Red,
  Orange,
  Yellow,
  Green,
  Brown,
  RedViolet,
  Froly,
  MaroonFlush,
  RedBerry,
  Coral,
  Goldenrod,
  GreenPea,
  HitPink,
  Bouquet,
  Malibu,
  Turquoise,
  EasternBlue,
} from '@assets/styles/colors';

import { CanvasWrapper, LoadingWrapper } from './style';

import optMultiple from './optMultiple';
// import optSingle from './optSingle';

const Chart = ({ type, data, loading }) => {
  function defaultColorsSchema(color) {
    return {
      pointHoverBackgroundColor: color,
      borderColor: color,
      pointBackgroundColor: color,
      pointBorderColor: color,
    };
  }

  const defaultLine = {
    fill: false,
    lineTension: 0.1,
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderWidth: 0,
    pointRadius: 1,
    pointHoverRadius: 5,
  };

  const defaultColors = index => {
    const colors = [
      Orange,
      Yellow,
      Green,
      Brown,
      Blue,
      Red,
      RedViolet,
      Froly,
      MaroonFlush,
      RedBerry,
      Coral,
      Goldenrod,
      GreenPea,
      HitPink,
      Bouquet,
      Malibu,
      Turquoise,
      EasternBlue,
    ];
    const totalLength = colors.lenght;
    const total = totalLength - 1;

    if (index > total) return colors[index - totalLength];
    return colors[index];
  };

  defaults.global.defaultFontColor = Grey;
  defaults.global.defaultFontFamily = "'Apercu Pro', Arial";
  defaults.global.defaultFontSize = 14;
  defaults.global.defaultFontStyle = '500';

  const dataParsed = {
    labels: [],
    datasets: [],
  };

  if (type === 'presentation' && data) {
    const labels = [];
    data[0].chart.map(i => {
      const date = new Date(i.date.split('Z')[0]);
      labels.push(
        Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
          .format(date)
          .toUpperCase(),
      );
      return i;
    });
    dataParsed.labels = labels;

    data.map((item, index) => {
      const { chart } = item;
      const datas = [];

      chart.map(d => {
        datas.push(parseInt(d.views, 10));
        return d;
      });

      dataParsed.datasets.push({
        ...defaultLine,
        ...defaultColorsSchema(defaultColors(index)),
        label:
          item.presentation && item.presentation.name
            ? item.presentation.name
            : 'Outside of presentations',
        data: datas,
      });

      return item;
    });
  }

  if (type === 'library' && data) {
    if (data?.length > 0) {
      const labels = [];
      data[0].chart.map(i => {
        const date = new Date(i.date.split('Z')[0]);
        labels.push(
          Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
            .format(date)
            .toUpperCase(),
        );
        return i;
      });
      dataParsed.labels = labels;

      data.map((item, index) => {
        const { chart } = item;
        const datas = [];

        chart.map(d => {
          datas.push(parseInt(d.views, 10));
          return d;
        });

        dataParsed.datasets.push({
          ...defaultLine,
          ...defaultColorsSchema(defaultColors(index)),
          label:
            item.presentation && item.presentation.name
              ? item.presentation.name
              : 'Outside of presentations',
          data: datas,
        });

        return item;
      });
    } else {
      const labels = [];
      const datas = [];
      const { chart: dataPresentation } = data;

      if (dataPresentation) {
        dataPresentation.map(item => {
          const date = new Date(item.date.split('Z')[0]);
          labels.push(
            Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
              .format(date)
              .toUpperCase(),
          );
          datas.push(parseInt(item.views, 10));
          return item;
        });

        dataParsed.labels = labels;
        dataParsed.datasets.push({
          ...defaultLine,
          ...defaultColorsSchema(defaultColors(0)),
          data: datas,
        });
      }
    }
  }

  // const options = dataParsed.datasets?.length > 1 ? optMultiple : optSingle;
  const options = optMultiple;
  const totalLabels = dataParsed.labels?.length;
  let steps = 1;

  if (totalLabels > 28) steps = 5;
  if (totalLabels > 90) steps = 14;
  if (totalLabels > 150) steps = 30;

  options.scales.xAxes[0].time.stepSize = steps;

  // dataParsed.labels = dataParsed.labels.map(label => `${label  } __`);

  return (
    <CanvasWrapper>
      {loading ? (
        <LoadingWrapper>
          <Loader size="large" />
        </LoadingWrapper>
      ) : (
        <Line data={dataParsed} options={options} />
      )}
    </CanvasWrapper>
  );
};

Chart.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Chart.defaultProps = {
  loading: false,
};

export default Chart;
