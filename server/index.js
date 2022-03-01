const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('hello world');
})

const uri = "mongodb+srv://bismillah_store_user:dEPj745Szsi4m7o8@cluster0.e2cer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function mongoRun() {
    try {
        await client.connect();
        const db = client.db('bismillah_store');
        const orders = db.collection('orders');
        const users = db.collection('users');
        const company = db.collection('company');
        const product = db.collection('product');


        // user pannel routes
        app.post('/register', async function (req, res) {
            users.findOne({ email: req.body.email }).then(res1 => {
                if (res1) {
                    res.send("Email has to be unique");
                } else {
                    req.body.active = true;
                    req.body.last_activated_at = new Date().toLocaleString();
                    users.insertOne(req.body).then(res2 => {
                        if (res2.acknowledged) {
                            users.findOne({ _id: res2.insertedId }).then(res3 => {
                                res2.user = res3;
                                res.send(res2);
                            }).catch(error => res.send(error.message));
                        } else {
                            res.send("Something went wrong");
                        }
                    }).catch(error => res.send(error.message));
                }
            }).catch(error => res.send(error.message))
        });
        app.post('/login', async function (req, res) {
            const response = await users.findOne(req.body);
            const newDate = new Date().toLocaleString();
            if (response) {
                const response2 = await users.updateOne({ _id: response._id }, { $set: { active: true, last_activated_at: newDate } });
                response2.user = {
                    ...response,
                    active: true,
                    last_activated_at: newDate
                }
                res.send(response2);
            } else {
                res.send('User not found')
            }
        });
        app.post('/logout', (req, res) => {
            users.findOneAndUpdate({ _id: req.body._id }, { $set: { active: false } }).then(res1 => {
                res.send(res1)
            }).catch(error => {
                console.log(error.message);
            })
        })
        app.post('/palce_order', async function (req, res) {
            req.body.created_at = new Date().toLocaleString();
            const response = await orders.insertOne(req.body);
            res.send(response);
        })
        app.get('/my_orders', async function (req, res) {
            // user_id:req.body.user_id
            const response = await orders.find({}).toArray();
            res.send(response);
        })

        // company pannel routes
        app.post('/company/register', (req, res) => {
            company.findOne({ email: req.body.email }).then(res1 => {
                if (res1) {
                    res.send("Email has to be unique");
                } else {
                    req.body.active = true;
                    req.body.last_activated_at = new Date().toLocaleString();
                    company.insertOne(req.body).then(res2 => {
                        if (res2.acknowledged) {
                            company.findOne({ _id: res2.insertedId }).then(res3 => {
                                res2.company = res3;
                                res.send(res2);
                            }).catch(error => res.send(error.message));
                        } else {
                            res.send("Something went wrong");
                        }
                    }).catch(error => res.send(error.message));
                }
            }).catch(error => res.send(error.message))
        });
        app.post('/company/login', async function (req, res) {
            const response = await company.findOne(req.body);
            if (response) {
                const newDate = new Date().toLocaleString();
                const response2 = await company.updateOne({ _id: response._id }, { $set: { active: true, last_activated_at: newDate } });
                response2.company = {
                    ...response,
                    active: true,
                    last_activated_at: newDate
                }
                res.send(response2);
            }
            else {
                res.send('User not found or Wrong credentials')
            }
        });
        app.post('/company/logout', (req, res) => {
            company.findOneAndUpdate({ _id: req.body._id }, { $set: { active: false } }).then(res1 => {
                res.send(res1)
            }).catch(error => {
                console.log(error.message);
            })
        });
        // addign product
        app.post('/company/add-product',(req,res)=>{
            req.body.created_at = new Date().toLocaleString()
            req.body.updated_at = new Date().toLocaleString()
            req.body.selling = true
            product.insertOne(req.body).then(response=>{
                res.send(response);
            }).catch(error=>{
                res.send(error.message)
            })
        })
        // getting products
        app.get('/company/products',(req,res)=>{
            product.find({}).toArray().then(response=>{
                res.send(response)
            }).catch(err => {
                res.send(err.message)
            })
        })

        console.log('connected');
    } catch (error) {
        console.log(error.message);
    }
}



mongoRun();
app.listen(port, function () {
    console.log("http://localhost:5000");
})