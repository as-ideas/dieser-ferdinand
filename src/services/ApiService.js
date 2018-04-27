import AuthService from './AuthService'

class ApiService {
    getJSON(url, options) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        try {
                            resolve(JSON.parse(this.response));
                        } catch (e) {
                            reject({ message: e, status: this.status });
                        }
                    } else {
                        reject({ message: JSON.parse(this.response).message, status: this.status });
                    }
                }
            };

            xhr.open('GET', url, true);

            let token = AuthService.getToken()
            if (token || options) {
                if (options && options.username && options.password) {
                    token = btoa(options.username + ':' + options.password);
                }
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
            }

            xhr.send();
        });
    }

    postJson(url, payload) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject({ message: JSON.parse(this.response).message, status: this.status });
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            let token = AuthService.getToken();
            if (token) {
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
            }

            xhr.send(JSON.stringify(payload));
        });

    }
}

export default new ApiService();