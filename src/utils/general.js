import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseISO, addHours, isBefore } from 'date-fns';

import * as qs from 'querystring';

const generateUEID = () => {
  const first = Math.random() * 46656 || 0;
  const second = Math.random() * 46656 || 0;

  const firstS = `000${first.toString(36)}`.slice(-3);
  const secondS = `000${second.toString(36)}`.slice(-3);

  return firstS + secondS;
};

export const monthYearToString = (date, monthsNames) => {
  const month = monthsNames(new Date(date).getUTCMonth());
  const year = new Date(date).getFullYear();
  return `${month} ${year}`;
};

export const generateDates = () => {
  const months = [];
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let m = 0; m < 12; m += 1) {
    months.push({
      label: m.toString(),
      value: m < 10 ? `0${m}` : m.toString(),
    });
  }

  for (let y = 1961; y <= currentYear; y += 1) {
    years.push({
      label: y.toString(),
      value: y.toString(),
    });
  }

  return {
    months,
    years: years.reverse(),
  };
};

export const monthToString = month => {
  return month < 10 ? `0${month}` : month.toString();
};

export const formatDate = (date, months, format) => {
  const template = format;
  const d = new Date(date);
  const year = d.getFullYear();
  const day = monthToString(d.getDate());
  const m = d.getMonth() + 1;
  const month = monthToString(m);
  const monthName = months(d.getMonth());
  const dayE = () => {
    const dd = d.getDate();

    if (dd === 1) return '1st';
    if (dd === 2) return '2nd';
    if (dd === 3) return '3rd';

    return `${dd}th`;
  };

  return template
    .replace(/{DD}/g, day)
    .replace(/{DDD}/g, dayE())
    .replace(/{YYYY}/g, year)
    .replace(/{MM}/g, month)
    .replace(/{MMMM}/g, monthName);
};

export const getGMT = offset => {
  return offset.split('(')[1].split(')')[0];
};

export const convertToMb = bytes => bytes * 1024 * 1024;

export const converToBytes = megabytes => megabytes / (1024 * 1024);

export function focusInEmbed() {
  const lastPosition = window.scrollY > 2000 ? window.scrollY : 2000;
  const $ = e => document.querySelector(e);
  const embedFocus = $('.sidetoolbar-menu').classList.contains(
    'sidetoolbar-open',
  );
  if (embedFocus) {
    setTimeout(() => {
      window.scrollTo(0, lastPosition);
    }, 800);
  }
}

export const nFormatter = num => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si?.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(1).replace(rx, '$1') + si[i].symbol;
};

export function handleIconName(data) {
  if (data.subtype === 'pdf') return 'pdf';
  if (data.filename.match(/(.docx|.doc)/g)) return 'msword';
  return '';
}

export function formateCurrency(val, unmask) {
  const num = parseInt(val, 10) / 100;

  if (unmask) return num;

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(num.toFixed(2))
    .replace(/^(\D+)/, '$1 ');
}

export default generateUEID;

export function getCanonicalUrl(ctx) {
  try {
    let urlParts = ctx.req.url.split('?');
    if (urlParts?.length > 1) {
      urlParts = urlParts.slice(0, -1);
    }
    let path = urlParts.join('?');
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    return [process.env.APP_BASE_URL, process.env.BASE_PATH, path].join('');
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function useLoading(section) {
  const [loading, setLoading] = useState({});
  console.debug(`[${section}] loading: ${Object.keys(loading)}`);
  return [
    Object.keys(loading)?.length > 0,
    name => setLoading({ ...loading, [name]: 1 }),
    name => {
      const { [name]: removed, ...rest } = loading;
      setLoading({ ...rest });
    },
  ];
}

export function serverRedirect(ctx, location) {
  ctx.res.writeHead(302, { Location: `${process.env.BASE_PATH}${location}` });
  ctx.res.end();
}

export function sample(arr, size) {
  const newArr = [...arr];
  const response = [];
  for (let i = 0; i < size; i += 1) {
    const n = Math.floor(Math.random() * newArr?.length);
    const [item] = newArr.splice(n, 1);
    response.push(item);
  }
  return response;
}

export function cdn(path) {
  return `${process.env.ASSET_PREFIX}${path}`;
}

export function useQueryTab(initial) {
  const [tab, setTab] = useState(initial);
  const router = useRouter();

  useEffect(() => {
    const [path, queryString] = router.asPath.split('?');
    const query = qs.parse(queryString);

    query.tab = tab;
    router.push(`${path}?${qs.stringify(query)}`, undefined, {
      shallow: false,
      scroll: false,
    });
  }, [tab]);

  return [tab, setTab];
}

export function intlFormatDate(date) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

  return formattedDate;
}

export function formatPhoneNumber(phoneNumberString) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  return phoneNumberString;
}

export function formatZonedTimeToUtc(date) {
  if (!date) return null;

  const offset = new Date().getTimezoneOffset();

  const utcDate = addHours(parseISO(date), offset / 60);

  return utcDate;
}

export function validateDatePicker(
  startDate,
  endDate,
  isCurrently,
  errorMessage,
) {
  const error = {
    startDate: null,
    endDate: null,
  };

  if (!startDate) error.startDate = errorMessage.startDate.required;

  if (!isCurrently) {
    if (!endDate) {
      error.endDate = errorMessage.endDate.required;
    } else if (isBefore(endDate, startDate)) {
      error.endDate = errorMessage.greaterThan;
    }
  }

  return error;
}

export function getFirstLetters(words) {
  if (typeof words !== 'string') return null;

  const shortWord = words.replace(/[^\w\s]/g, '').split(' ');
  const finalWord = shortWord
    .splice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return finalWord.toUpperCase();
}
