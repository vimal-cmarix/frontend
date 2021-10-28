import { cdn } from '@utils/general';

export const errorMessagesBack = {
  ER_PASSWORD_MISMATCH: {
    code: 'ER_PASSWORD_MISMATCH',
    message: 'Password and email combination is invalid',
    status: 401,
  },
  ER_WRONG_OLD_PASSWORD: {
    code: 'ER_WRONG_OLD_PASSWORD',
    message: 'Current password is incorrect',
    status: 400,
  },
  ER_EQUAL_PASSWORDS: {
    code: 'ER_EQUAL_PASSWORDS',
    message: 'New and old password must differ',
    status: 400,
  },
  ER_AUTH_METHOD_NOT_ALLOWED: {
    code: 'ER_AUTH_METHOD_NOT_ALLOWED',
    message: `You can't take this action using this auth method`,
    status: 400,
  },
  ER_ACL_INSUFFICIENT_GRANT: {
    code: 'ER_ACL_INSUFFICIENT_GRANT',
    message: 'You do not have permission to execute this action',
    status: 403,
  },
  ER_DUP_ENTRY: {
    code: 'ER_DUP_ENTRY',
    message: 'Email already registered',
    status: 409,
  },
};

export const ANALYTICS_PLANS_E_IDS = {
  ONE_MONTH: 'mbtg',
  SIX_MONTHS: 'mk26',
  TWELVE_MONTHS: '6mnw',
};

export const STARTER_PLANS_E_IDS = {
  ONE_MONTH: 'fzpg',
  TWELVE_MONTHS: 'fn7w',
};

export const PREMIUM_PLANS_E_IDS = {
  ONE_MONTH: '82hb',
  TWELVE_MONTHS: 'nmf2',
};

export const serverErrorMessages = {
  400: 'Bad Request. Your browser sent a request that this server could not understand.',
  401: 'Authorization Required',
  500: 'Internal Server Error',
};

export const AVAILABLE = 'available';
export const DRAFTS = 'drafts';
export const PUBLISHED = 'published';
export const UNPUBLISHED = 'unpublished';
export const TUTORIALS = 'tutorials';
export const INSPIRATIONAL = 'inspirational';
export const PUBLIC = 'public';
export const PRIVATE = 'private';
export const ANALYTICS = 'analytics';
export const FREE = 'free';
export const STARTER = 'starter';
export const PREMIUM = 'premium';
export const PREMIUM_STUDENT = 'premiumStudent';
export const PRESENTATION = 'presentation';
export const PROFILE = 'profile';
export const UPLOAD = 'upload';
export const URL = 'url';
export const IS_ADDING_PITCH_TO_JOBCARD = 'is-adding-pitch-to-jobcard';

export const IMAGECOMING = cdn('/static/img/thumb_default.png');
export const IMAGESOON = cdn('/static/img/thumb_temp.png');

export const YOUTUBE_REGEX = /^https?:\/\/(www\.)?youtube\.com/;
