const axios = require("axios");

const PASSWORD_GRANT_TYPE = process.env.PASSWORD_GRANT_TYPE;
const CLIENT_CREDENTIALS_GRANT_TYPE = process.env.CLIENT_CREDENTIALS_GRANT_TYPE;
const AUTHORIZATION_CODE_GRANT_TYPE = process.env.AUTHORIZATION_CODE_GRANT_TYPE;
const REFRESH_TOKEN_GRANT_TYPE = process.env.REFRESH_TOKEN_GRANT_TYPE;
const SCOPE = process.env.SCOPE;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const AUDIENCE = process.env.AUDIENCE;
const CONNECTION = process.env.CONNECTION;

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

const loginByCode = async (code, redirectUri) => {
    try {
        const response = await axios.post("https://kpi.eu.auth0.com/oauth/token", {
            grant_type: AUTHORIZATION_CODE_GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: redirectUri
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
    loginByCode,
    register,
    refresh
};
