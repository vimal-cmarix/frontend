import { errorMessagesBack, serverErrorMessages } from '@modules/consts';

const errorHandle = response => {
  const msg = 'An unexpected error occurred';
  const { status } = response;
  const { code, message } = response.data || {};
  const backMsg = errorMessagesBack[code] && errorMessagesBack[code].message;

  if (backMsg) return backMsg;
  if (message && typeof message !== 'object') return message;
  if (typeof message === 'object') {
    const { constraints } = message[0];
    if (constraints) return Object.values(constraints)[0];
    if (typeof message[0] === 'string') return message[0];
  }
  if (serverErrorMessages[status]) return serverErrorMessages[status];

  return msg;
};

export const braintreeErrorHandle = response => {
  const message = 'An unexpected error occurred';
  return response.message || message;
};

export default errorHandle;
