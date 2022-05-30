const express = require('express');
const router = express.Router();

const validateSession = (req, res, next) => {
    if(!req.session?.user) return res.status(501).json({err: "Not authorized!"})
    next()
}

router.get('/', validateSession, (req, res) => {

    res.json({msg: "Hej, prywatny kontent kotku <3"})

})

module.exports = router;