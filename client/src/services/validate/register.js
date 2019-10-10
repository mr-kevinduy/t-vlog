import { parseErrors } from '../../utils/common';
import { validateRequired, validateEmail, validateMinLength, validateBetweenLength, validateEqua } from '../../utils/validate';

const valid = (request) => {
  const { username, email, password, repeatPassword } = request;
  console.log(repeatPassword);
  return parseErrors({
    username: [
      {
        message: 'Can not blank',
        valid: () => validateRequired(username)
      },
      {
        message: 'Between 3 and 50 chars',
        valid: () => validateBetweenLength(username, 3, 50)
      }
    ],
    email: [
      {
        message: 'Can not blank',
        valid: () => validateRequired(email)
      },
      {
        message: 'Format not true',
        valid: () => validateEmail(email)
      }
    ],
    password: [
      {
        message: 'Can not blank',
        valid: () => validateRequired(password)
      },
      {
        message: 'Min 6 chars',
        valid: () => validateMinLength(password, 6)
      }
    ],
    repeatPassword: [
      {
        message: 'Can not blank',
        valid: () => validateRequired(repeatPassword)
      },
      {
        message: 'Must aqua with password',
        valid: () => validateEqua(repeatPassword, password)
      }
    ]
  });

};

export default valid;
