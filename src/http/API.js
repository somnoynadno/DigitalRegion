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

    ImportCSV() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/data/send_csv`)
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                HTTP.handleError(error);
            });
        });
    }
}

export const api = new API();
