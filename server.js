const express = require('express');
const path = require('path');
const webpush = require("web-push");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
const publicVapidKey = "BMjUHqFeaPgMLifC--c6WtThZU0fRnkVW7KH2EKbJZSmra7xStK5J6coJMSPf_xftjChcl81Yue_29gItgfdXoM";
const privateVapidKey = "c2WMCP58OnHZm-TPwVERjUhoA4w3UkrvMkqwDbRoT2w";
webpush.setVapidDetails(
    "mailto:angelsedmakov@gmail.com",
    publicVapidKey,
    privateVapidKey
  );
app.get("/index.html",(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post("/notify", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Hi Angel" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });

const port = process.env.PORT || 5500;
	app.listen(port, () => console.log(`doing stuff ${port}`));
