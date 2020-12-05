import axios from 'axios'
import {apiAddress} from "../config";
import {HTTP} from "./http-common";

class API {
    LoginUser(username, password) {
        return new Promise((resolve) => {
            axios.post(apiAddress + `/auth/login`, {
                username: username,
                password: password
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(error);
                resolve(error);
            });
        })
    }

    QueryData() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/data/query`)
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                HTTP.handleError(error);
            });
        });
    }

    GetUsers() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/users/list`)
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                HTTP.handleError(error);
            });
        });
    }

    GetStats(exam, period) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/data/stats?exam=${exam}&period=${period}`)
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                HTTP.handleError(error);
            });
        });
    }


    ImportCSV(b64) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/data/send_csv`, {"Data": b64})
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                HTTP.handleError(error);
            });
        });
    }
}

export const api = new API();
