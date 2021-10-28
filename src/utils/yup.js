import libphonenumber from 'google-libphonenumber';
import * as Yup from 'yup';

const addCustomMethods = () => {
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

  Yup.addMethod(Yup.string, 'phone', function fn() {
    return this.test({
      name: 'invalid',
      exclusive: true,
      message: undefined,
      test: value => {
        try {
          const phone = phoneUtil.parseAndKeepRawInput(value, 'ZZ');
          return phoneUtil.isValidNumber(phone);
        } catch (e) {
          return false;
        }
      },
    });
  });
};

export default addCustomMethods;
