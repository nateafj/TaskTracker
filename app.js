// Imports
const express = require('express')
const bodyParser=require('body-parser')
const {check, validationResult } = require('express-validator')
const app = express()
const port = 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))
const urlencodedParser = bodyParser.urlencoded({extended:false})

//Page Navigation
app.get('', (req,res)=>{
    res.render('index')
})
app.get("/register", (req,res)=> {
    res.render('register')
})
app.post("/register", urlencodedParser,[
    check('username', 'The username must be 3+ characters long')
        .exists()
        .isLength({min: 3}),
    check('email', 'email is not valid')
        .isEmail()
        .normalizeEmail()
],(req,res)=> {
   const errors=validationResult(req)
   if(!errors.isEmpty()){
    // return res.status(422).json(errors.array())
    const alert=errors.array()
    res.render('register',{
        alert
    })
} else {
    res.render('mainTask');
}
})

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`)) 