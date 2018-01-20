import * as _ from 'lodash';

export const ErrFmt = (errObj: any = {}, defaultMessage = 'Something when wrong') => {
  return _.get(errObj, 'error.message', defaultMessage);
};
