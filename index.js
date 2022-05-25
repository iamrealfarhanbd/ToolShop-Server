const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@toolshop.khfz3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorized access' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' })
    }
    req.decoded = decoded;
    next();
  });
}

// const emailSenderOptions = {
//   auth: {
//     api_key: process.env.EMAIL_SENDER_KEY
//   }
// }

// const emailClient = nodemailer.createTransport(sgTransport(emailSenderOptions));

// function sendAppointmentEmail(order) {
//   const { orderId, productname, useremail, username, quantity, price, phone } = order;


//   var email = {
//     from: process.env.EMAIL_SENDER,
//     to: useremail,
//     subject: `Your Appointment for ${orderId} is on ${productname} at ${useremail} is Confirmed`,
//     text: `Your Appointment for ${quantity} is on ${price} at ${phone} is Confirmed`,
//     html: `
//       <div>
//         <p> Hello ${username}, </p>
//         <h3>Your Appointment for ${productname} is confirmed</h3>
//         <p>Looking forward to seeing you on ${price} at ${phone}.</p>

//       </div>
//     `
//   };

//   emailClient.sendMail(email, function (err, info) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log('Message sent: ', info);
//     }
//   });

// }


async function run() {
  try {
    await client.connect();
    const toolsCollection = client.db('toolShop').collection('tools');
    const userCollection = client.db('toolShop').collection('users');
    const orderCollection = client.db('toolShop').collection('orders');
    const paymentCollection = client.db('toolShop').collection('payment');

    const verifyAdmin = async (req, res, next) => {
      const requester = req.decoded.email;
      const requesterAccount = await userCollection.findOne({ email: requester });
      if (requesterAccount.role === 'admin') {
        next();
      }
      else {
        res.status(403).send({ message: 'forbidden' });
      }
    }


    // tools  API
    app.get('/tool', async (req, res) => {
      const query = {};
      const cursor = toolsCollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });

    app.get('/tool/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const tool = await toolsCollection.findOne(query);
      res.send(tool);
    });

    // POST tool
    app.post('/tools', async (req, res) => {
      const newtool = req.body;
      const result = await toolsCollection.insertOne(newtool);
      res.send(result);
    });

    // app.put('/updateTool/:id', async (req, res) => {
    //   const updatedtool = req.body;
    //   const { updatedQuantity } = updatedtool;
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const options = { upsert: true };

    //   const updateTool = {
    //     $set: {
    //       quantity: updatedQuantity
    //     },
    //   };

    //   const result = await toolsCollection.updateOne(query, updateTool, options);
    //   console.log(result);

    //   res.send(result);

    // });

    // DELETE tool
    app.delete('/tool/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toolsCollection.deleteOne(query);
      res.send(result);
    });

    app.get('/user', verifyJWT, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.get('/admin/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user.role === 'admin';
      res.send({ admin: isAdmin })
    })

    app.put('/user/admin/:email', verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: 'admin' },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    })

    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
      res.send({ result, token });
    });
    app.delete('/user/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const filter = {email: email};
      const result = await userCollection.deleteOne(filter);
      res.send(result);
    })


    // app.put('/user/', async (req, res) => {
    //   const user = req.body;
    //   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: '1d'
    //   });
    //   res.send({ accessToken });
    // });


    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
      const toolPrice = req.body;
      const price = toolPrice.price;
      const amount = price * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });


      res.send({ clientSecret: paymentIntent.client_secret });
    });

    // My order Collection API 
    app.get('/order/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const orders = await orderCollection.findOne(query);
      res.send(orders);

    })

    // My order Collection API  Patch
    app.patch('/order/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const payment = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId
        },
      };
      const result = await paymentCollection.insertOne(payment);
      const updateOrder = await orderCollection.updateOne(filter, updateDoc);
      console.log(updateOrder);
      res.send(updateOrder);

    })
    // My order Collection API 
    app.get('/order', verifyJWT, async (req, res) => {
      const useremail = req.query.useremail;
      const decodedEmail = req.decoded.email;
      if (useremail === decodedEmail) {
        const query = { useremail: useremail };
        const orders = await orderCollection.find(query).toArray();
        return res.send(orders);
      }
      else {
        return res.status(403).send({ message: 'forbidden access' });
      }
    })
    // order Collection AP
    app.post('/order', async (req, res) => {
      const order = req.body;
      const query = { quantity: order.quantity, productName: order.productName, useremail: order.useremail }
      const exists = await orderCollection.findOne(query);
      if (exists) {
        return res.send({ success: false, order: exists })
      }
      const result = await orderCollection.insertOne(order);
      console.log('sending email');
      // sendAppointmentEmail(order);
      return res.send({ success: true, result });
    });


    app.delete('/order/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(filter);
      res.send(result);
    })
    // My tool Collection API 
    app.get('/mytools', verifyJWT, async (req, res) => {
      const decodedEmail = req.decoded.email;
      const email = req.query.email;
      if (email === decodedEmail) {
        const query = { email: email };
        const cursor = toolsCollection.find(query);
        const mytools = await cursor.toArray();
        res.send(mytools)
      }
      else {
        res.status(403).send({ message: 'forbidden access' })
      }
    });



  }
  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello From toolShop Uncle!')
})

app.listen(port, () => {
  console.log(`toolShop listening on port ${port}`)
})