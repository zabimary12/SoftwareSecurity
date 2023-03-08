const axios = require("axios");

const PASSWORD_GRANT_TYPE = "http://auth0.com/oauth/grant-type/password-realm";
const CLIENT_CREDENTIALS_GRANT_TYPE = "client_credentials";
const REFRESH_TOKEN_GRANT_TYPE = "refresh_token";
const SCOPE = "offline_access openid";
const CLIENT_ID = "JIvCO5c2IBHlAe2patn6l6q5H35qxti0";
const CLIENT_SECRET = "ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB";
const AUDIENCE = "https://kpi.eu.auth0.com/api/v2/";
const CONNECTION = "Username-Password-Authentication";

const getApiToken = async () => {
    const response = await axios.post("https://kpi.eu.auth0.com/oauth/token", {
        grant_type: CLIENT_CREDENTIALS_GRANT_TYPE,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: AUDIENCE
    }, {
        headers: {
            'Accept-Encoding': 'application/json'
        }
    });
    return response.data.access_token;
}

const login = async (username, password) => {
    try {
        const response = await axios.post("https://kpi.eu.auth0.com/oauth/token", {
            grant_type: PASSWORD_GRANT_TYPE,
            username: username,
            password: password,
            scope: SCOPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            audience: AUDIENCE,
            realm: CONNECTION
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Encoding': 'application/json'
            }
        });
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            idToken: response.data.id_token
        }
    } catch (error) {
        return null;
    }
}

const register = async (username, password) => {
    try {
        const accessToken = await getApiToken();
        const response = await axios.post("https://kpi.eu.auth0.com/api/v2/users", {
            email: username,
            connection: CONNECTION,
            password: password
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept-Encoding': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

const refresh = async refreshToken => {
    try {
        const response = await axios.post("https://kpi.eu.auth0.com/oauth/token", {
            grant_type: REFRESH_TOKEN_GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: refreshToken
        }, {
            headers: {
                'Accept-Encoding': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports = {
    login,
    register,
    refresh
};