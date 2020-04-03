require('dotenv/config');

export const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const ERROR_CODES = {
  DUPLICATE: '23505',
};

export const CONSTRAINTS = {
  UQ_USER_USERNAME: {
    name: 'UQ_USER_USERNAME',
    field: 'username',
  },
  UQ_USER_EMAIL: {
    name: 'UQ_USER_EMAIL',
    field: 'email',
  },
};


export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN);
