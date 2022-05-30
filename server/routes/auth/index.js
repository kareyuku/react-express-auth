const express = require('express');
const router = express.Router();

const { crypt, decrypt } = require('../../crypt');

const UserModel = require('../../models/User');

const validateEmail = (mail) => { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) }
const usernameRegex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/

router.post('/register', async (req, res) => {
    
    const { username, password, email } = req.body;

    if(!username || !email || !password ) return res.status(501).json({err: "Invalid data."})
    if(username.toString().length > 32 || username.toString().length == 0 || email.toString().length > 500 || email.toString().length == 0 || password.toString().length > 500 || password.toString().length == 0) return res.status(501).json({err: "Invalid form data."})
    
    if(!usernameRegex.test(username.toString())) return res.status(501).json({err: "Invalid username"});
    if(!validateEmail(email)) return res.status(501).json({err: "Invalid email."});

    const user = await UserModel.findOne({$or: [ { username }, { email } ]});

    if(user) {
        console.log(user.username, username, user.email, email)
        if(user.username == username && user.email == email) return res.status(501).json({err: "Username and email is already taken."})
        if(user.username == username) return res.status(501).json({err: "Username is already taken."});
        if(user.email == email) return res.status(501).json({err: "Email is already taken."})
        return;
    } else {

        await UserModel.create({
            username, email, password: crypt(password)
        })

        return res.status(200).json({msg: "User created."})

    }

})

router.post('/login', async (req, res) => {

    if(req.session?.user) {
        const { username, id } = req.session.user;
        return res.status(200).json({msg: "You are already logged.", data: {username, id}})
    }

    const { username, password } = req.body;

    const user = await UserModel.findOne({$or: [ { username }, { email: username } ] });

    if(!user) return res.status(501).json({err: "Invalid password or username"})

    if(decrypt(user?.password) == password)
    {

        req.session.user = { username: user.username, id: user._id }
        return res.status(200).json({msg: "Success", data: { username: user.username, id: user._id}})

    } else {
        return res.status(501).json({err: "Invalid password or username"})
    }

})

router.post('/logout', (req, res) => {
    if(req.session?.user) {
        req.session.destroy();
        return res.status(200).json({msg: "Success"});
    } else {
        return res.status(501).json({err: "No valid session"})
    }
})

module.exports = router;