import {JwtHelper} from "./jwt.helper";

describe('JWT helper', () => {
  let jwtHelper;

  beforeEach(() => {
    jwtHelper = new JwtHelper();
  });

  it('should decode a valid token', function () {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MjIxMzI0NDcsIm5iZiI6MTUxOTYzMjQ0NywiZGF0YSI6eyJfaWQiOiI1YTkyNzcxOGU3OTlmNzc2Njg0OGNlYWUiLCJlbWFpbCI6InppaXNoYW5lZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyeSQxMCRGTjl1ajBucmcxNzZSUEZCRi5MZk9PMmNTT3ZkU3dIajlzTE9UUVwvTlk4ZGpuZk14V2Z4TlciLCJ1cGRhdGVfYXQiOiIxNTE5NTQ4MTk1Njk1IiwiY3JlYXRlZF9hdCI6IjE1MTk1NDgxODQ5NjYiLCJmaXJzdG5hbWUiOiJaZWVzaGFuIiwibGFzdG5hbWUiOiJBaG1hZCJ9fQ.Ra5Zq38Zf7c7Lz0uz1D-LHwaK1MaVS9Erg07rLwJj50O2XXWUGLG29H1cqGuAiwTCw1ytO0cCtQt4Pi5te5R4A';

    const decodedToken = jwtHelper.decodeToken(token).data;

    expect(decodedToken.email).toBe('ziishaned@gmail.com');
    expect(decodedToken.firstname).toBe('Zeeshan');
    expect(decodedToken.lastname).toBe('Ahmad');
  });

  it('should not decode a valid token', function () {
    const token = 'Invalid token';

    try {
      const decodedToken = jwtHelper.decodeToken(token).data;
    } catch (e) {
      expect(e.message).toBe('JWT must have 3 parts');
    }
  });
});
