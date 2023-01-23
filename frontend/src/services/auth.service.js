import axios from 'axios'


class AuthService {
  login(user) {
    return axios
      .post(import.meta.env.VITE_API_URL + '/auth/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      street: user.street,
      zip: user.zip
    })
    .then(response => {
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new AuthService();
