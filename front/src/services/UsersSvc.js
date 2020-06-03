import API from '../services/api';

export default class UsersSvc {
  static async signIn({username, password}) {
    try {
      const {data} = await API.post('/auth/sign-in', {
        username,
        password
      });

      return data;
    } catch (e) {
      console.log('Sign in error:', e);
    }
  }
}
