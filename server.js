const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'))

app.get("/index.html",(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})
const port = process.env.PORT || 5500;
	app.listen(port, () => console.log(`doing stuff ${port}`));
