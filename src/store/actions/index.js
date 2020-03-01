import * as type from './types';

// Reset message
export const resetMessage = () => dispatch => {
  dispatch({
    type: type.RESET_MESSAGE
  });
}