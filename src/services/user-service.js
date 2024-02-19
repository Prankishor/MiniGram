import { myAxios } from "./constants";

export const signUp = async (user) => {
    return await myAxios.post('/api/v1/auth/register', user)
        .then((response) => response.data)

}

export const login = async (loginDetails) => {
    return await myAxios.post('/api/v1/auth/login', loginDetails)
        .then((response) => response.data)
}