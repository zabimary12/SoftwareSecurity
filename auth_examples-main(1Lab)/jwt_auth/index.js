const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

const jwtKey ="secretJwtKey";
const port = 3000;
const credentials = {abcdef:"123456", username: "pass"}
const expTokenTime = 5*60;

app.get("/", function(req, res) {
        let token = req.get("Authorization"); //Дістати токен із заголовку
        let payload;
        if(token) {
            try{
                payload =jwt.verify(token, jwtKey);
            } catch(e){
                if(e instanceof jwt.JsonWebTokenError) {
                    return res.sendFile(path.join(__dirname + '/index.html'));
                }
            }
        }else {
            return res.sendFile(path.join(__dirname + '/index.html'))
        }

        res.json({login: payload.login, logout: 'http://localhost:${port}/logout'}) 
});

app.post("/login", function(req, res){
    if(credentials[req.body.login] == req.body.password){
        const token = jwt.sign({login: req.body.login}, jwtKey, {
            algorithm:"HS256",
            expiresIn: expTokenTime,
        }) //Створення токену для користувача при вході
        res.json({token:token});
        return;
    }

    res.status(401);
    res.send();
})

app.listen(port);