const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    try {
        //1.checkUser
        const {username , password} = req.body
        let user =  await User.findOne({ username })

        if (user){
            return res.send('user Already Exist !!!').status(400)
        }
        //2.Encrypt password
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password
        })
        user.password = await bcrypt.hash(password,salt)

        //3.save
        await user.save()

        res.send({
            Message : "Register Success",

        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Error. Try again.')
    }
}

exports.login = async (req, res) => {
    try {
        //code
        //1.Check User
        const { username, password} = req.body
        let user = await User.findOne({ username })
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
            return res.status(400).send('Password Invalid')
            }
             //2.Payload
            let payload = {
                user: {
                    id: user._id,
                    username: user.username
                }
            }
            //3. Generate
            jwt.sign(payload, 'jwtsecret', {expiresIn : 60},(err, token)=>{
                if(err) throw err;
                res.json({ token, payload})
                })
        }else{
            return res.status(400).send('user not found')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Error. Try again.')
    }
}
