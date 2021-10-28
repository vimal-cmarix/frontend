import { Haiti } from '@assets/styles/colors';

export default {
  animation: {
    duration: 300,
    easing: 'easeOutQuart',
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
    backgroundColor: Haiti,
    titleFontSize: 12,
    titleSpacing: 4,
    bodyFontSize: 12,
    bodySpacing: 4,
    caretSize: 5,
    xPadding: 10,
    yPadding: 10,
    custom: tooltip => {
      if (!tooltip) return;
      // eslint-disable-next-line
      tooltip.displayColors = false;
    },
    callbacks: {
      title() {
        return ``;
      },
      label(tooltipItem) {
        return `${tooltipItem.yLabel} views on ${tooltipItem.label}`;
      },
    },
  },
  hover: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          displayFormats: {
            hour: 'MMM D',
          },
        },
        ticks: {
          padding: 10,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          padding: 10,
          stepSize: 1,
          min: 0,
        },
        gridLines: {
          drawBorder: false,
        },
      },
    ],
  },
};
