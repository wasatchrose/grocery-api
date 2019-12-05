const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");
const fs = require("fs");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3000;
const DAL = require("./dataAccessLayer")

DAL.Connect();
app.use(bodyParser.json());

app.get('/api/products', cors(), async function(req, res) {
    const result = await DAL.Find();

    res.send(result);
});

 // Get 1 or all product by ID endpoint
 app.get('/api/products/:id', cors(), async function(req, res) 
 {
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)
    };

    const result = await DAL.Find(product);
    if (result) {
        res.send(result);
    }
    else {
        res.status(404).send("No product with ID: ' + id + ' found!");
    }
});

// add a new product
app.post("/api/products", cors(), async function (req, res) 
{
    const product = req.body;
    if (product.name && product.price > 0) 
    {
        const result = await DAL.Insert(product);
        res.status(201).send("Success on Post");
    }
    else 
    {
        res.send("Fail on Post");
    }
});

app.delete("/api/products/:id", cors(), async function (req, res) 
    {
        const id = req.params.id;
        const product = {
            _id: ObjectId(id)
        };
    
        const result = await DAL.Delete(product );
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("Could not delete product!");
        }
    });

    app.put('/api/products/:id', async function(req, res) {
        const id = req.params.id;
        const product = {
        _id: ObjectId(id)
        };
        const newProduct = req.body;
        const updatedProduct = {
        $set: newProduct
        };
        
        const result = await DAL.Update(product, updatedProduct);
        res.send(result);
       });

    //  Start listening
    app.listen(port,
        () => console.log("Example app listening on port " + port));