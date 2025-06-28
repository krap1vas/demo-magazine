const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const sqlite3 = require('sqlite3')

const app = express()
const port = 1488;

app.use(cors())
app.use(bodyParser.json())

const db = new sqlite3.Database('./db.db')

app.post('/register', async(row, req) =>{
    const {username, password} = row.body
    db.get(`select * from users where username = (?)`, [username], (err, user) =>{
        if (user) {
            return req.status(500).send('пользователь уже сущесвует')
        }
        if (err) {
            return req.status(500).send('проблемы на сервере')
        }

        const hashPass = bcrypt.hashSync(password, 10)
        db.get(`insert into users (username, password) values (?, ?)`, [username, hashPass], function(err){
            if (err) {
                return req.status(500).send('ну я ваще хз')
            }
            return req.status(200).send('регистрация прошла успешно')
        })
    })
})

app.post('/login', async(row, req) =>{
    const {username, password} = row.body
    db.get(`select * from users where username = (?)`, [username], (err, user) =>{
        const unHashPass = bcrypt.compareSync(password, user.password)
        if (!user || !unHashPass) {
            return req.status(500).send('пользователь не сущесвует')
        }
        if (err) {
            return req.status(500).send('проблемы на сервере')
        }

        const token = jsonwebtoken.sign({userId: user.id, username: user.username}, 'secret_token', {expiresIn: '1h'})
        return req.status(200).send({access_token: token})
    })
})

app.post('/requests', async(row, req) =>{
    const token = row.headers.authorization?.split(' ')[1]
    if (!token) {
        return req.status(500).send('нет токена')
    }
    let username = ''

    jsonwebtoken.verify(token, 'secret_token', (err, meow) =>{
        if(err) {
            return req.status(500).send('неправильный токен')
        }
        return username = meow.username
    })

    if (username === 'admin') {
        db.all(`select * from items`, (err, meow) =>{
            if (err) {
                return req.status(500).send('админ лох')
            }
            return req.status(200).send(meow)
        })
    } else {
        db.all(`select * from items where username = (?)`, [username], (err, meow) =>{
            if (err) {
                return req.status(500).send('пользователь лох')
            }
            return req.status(200).send(meow)
        })
    }
})

app.post('/buy', async(row, req)=>{
    const { price, name, description, username } = row.body
    
    const token = row.headers.authorization?.split(' ')[1]
    if (!token){
        return req.status(500).send('динаху без токена')
    }

    jsonwebtoken.verify(token, 'secret_token', (err, meow)=>{
        if (err) {
            return req.status(500).send('нет токена')
        }
    })

    db.run(`insert into items (price, name, description, username) values (?, ?, ?, ?)`, [price, name, description, username], function (err) {
    if (err) {
        return req.status(500).send('товар не купился')
    }
    return req.status(200).send('товар куплен!')
    })
})

app.post('/change_status', async(row, req) =>{
    const {id, status} = row.body
    const token = row.headers.authorization?.split(' ')[1]
    if (!token) {
        return req.status(500).send('нет токена')
    }

    jsonwebtoken.verify(token, 'secret_token', (err, meow) =>{
        if(err) {
            return req.status(500).send('неправильный токен')
        }
    })

    db.run(`update items set status = (?) where id = (?)`, [id, status], function(err){
        if (err) {
            return req.status(500).send('не добавилось')
        }
        return req.status(200).send('успещно добавилось')
    })
})

app.listen(port, ()=>{
    console.log(`сервер запущен на хосте http://localhost:${port}/`);
})