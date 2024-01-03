const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

router.post("/register", async function(req, res) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    
    await user.save()
    .then(function() {
        res.json({msg: "User created successfully!"})
    })
})

router.post("/login", async function(req, res) {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        res.json({msg: "User not found!"})
    }

    else {
        if(req.body.password != user.password) {
            res.json({msg: "Password is incorrect!"})
        }

        const token = jwt.sign({_id: user._id}, "secret")
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1day
        })

        res.json(user)
    }
})

router.get("/user", async function(req, res) {
    try {
        const cookie = req.cookies["jwt"]
        const claims = jwt.verify(cookie, "secret")
    
        if(!claims) {
            res.json({msg: "unauthenticated!"})
        }
    
        const user = await User.findOne({_id: claims._id})
        res.json({
            firstName: user.firstName,
            lastName: user.lastName
        })
    }
    catch(e) {
        res.json({msg: "unauthenticated!"})
    }

})

router.post("/logout", function(req, res) {
    res.cookie("jwt", "", {
        maxAge: 0
    })
    res.json({msg: "successfully logged out!"})
})

module.exports = router