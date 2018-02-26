import {ErrFmt} from "./err.helper";

describe('Err helper', () => {
  it('should return error.message from error object', function () {
    const data = {
      error: {
        'message': 'This is test message',
      }
    };

    const message = ErrFmt(data);
    expect(message).toBe(data.error.message);
  });
});
