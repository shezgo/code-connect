const express = require("express")
const path = require('path')
// const url = require('url')

// const __dirname = url.fileURLToPath(new URL('..', import.meta.url));
const port = 3000;

const app = express()
app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '../about/about_us.html'))
})
app.get('/about/:member', (req, res)=>{
    try{
        res.sendFile(path.join(__dirname, ('../about/' + req.params.member)))
    }
    catch(err)
    {
        console.log(err)
    }
    
})
app.get('/application/images/:member', (req, res)=>{
    try{
	res.sendFile(path.join(__dirname, ('../images/' + req.params.member)))
    }
    catch(err)
    {
	console.log(err)
    }
})
app.listen(port, ()=>{
    console.log("Server is running on port ", port)
})
