import axios from "axios";
import {baseURL, headers} from "../plugins/axios.ts";

export function signUp(
    username: string,
    email: string,
    phone: string,
    password: string,
){
    return axios({
        url: "user/post/sign-up",
        method: "post",
        baseURL: baseURL,
        headers: {
            headers,
            Authorization: "Bearer ",
        },
        data: {
            username: username,
            name: "",
            lastName: "",
            email: email,
            phoneNumber: phone,
            password: password,
        }
    });
}
export function signIn(
    username: string,
    password: string,
){
    return axios({
        url: "user/post/sign-in",
        method: "post",
        baseURL: baseURL,
        headers: {
            headers,
            Authorization: "Bearer ",
        },
        data: {
            username: username,
            password: password,
        }
    });
}
export function info(
    atoken: string,
    id: number
){
    return axios({
        url: "user/get/info",
        method: "get",
        baseURL: baseURL,
        headers: {
            headers,
            Authorization: "Bearer "+atoken,
        },
        params: {
            id: id,
        }
    });
}
export function token(
    rtoken: string,
){
    return axios({
        url: "user/get/token",
        method: "get",
        baseURL: baseURL,
        headers: {
            headers,
            Authorization: "Bearer "+rtoken,
        },
    });
}