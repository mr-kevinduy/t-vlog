import { parseErrors } from '../../utils/common';
import { validateRequired, validateEmail, validateMinLength } from '../../utils/validate';

const valid = (request) => {
  const { email, password } = request;

  return parseErrors({
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
    ]
  });

};

export default valid;
