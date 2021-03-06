const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51HTb4yCMTvSAbugnQs8Hf3RxRU2wpWkdSrKmFFFVok30JlzLlyFk0aHsTQGinKdqsYTWlh8O9Eu4pEGOolag86OP00RHB7UAHp"
);

//API 

//App config
const app = express();

//Middleware
app.use(cors({ origin: true })); //cors is like a security
app.use(express.json());

// API Routes

app.get("/health", (request, response) => response.status(200).send("All good!"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved! for this amount ", total);


  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "cad",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});


//Listen command 
exports.api = functions.https.onRequest(app);

//API Endpoint
//http://localhost:5001/master-menu-app/us-central1/api
