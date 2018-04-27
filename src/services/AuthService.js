import ApiService from './ApiService';

class AuthService {
    authorize(username, password) {
        return this.checkUser(username, password)
            .then(() => {
                this.setToken(username, password);
                return Promise.resolve();
            })
            .catch((e) => {
                return Promise.reject({ message: 'Wrong username or password' });
            });
    }

    checkUser(username, password) {
        return ApiService.getJSON('https://content-coins-backend.herokuapp.com/api/currentUser', { username: username, password: password });
    }

    getToken() {
        return sessionStorage.getItem('contentCoinsUser');
    }

    setToken(username, password) {
        let token = window.btoa(username + ':' + password);
        sessionStorage.setItem('contentCoinsUser', token);
    }

    checkLoggedIn() {
        return this.getToken() !== null;
    }

    login(username, password) {
        return this.authorize(username, password).then(() => {
            this.setToken(username, password);
        });
    }

    logout() {
        sessionStorage.removeItem('contentCoinsUser');
    }
}

export default new AuthService();