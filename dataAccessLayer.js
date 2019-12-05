const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const mongoDburl = process.env.MONGODB_URL;
console.log(mongoDburl);


const settings = {
    useUnifiedTopology: true
}

let database;
const databaseName = "grocerydb";
const collectionName = "products"


const Connect = function(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDburl, settings, function(err, client) {
            if(err){
                reject(err);
            }
            else{
                console.log("SUCCESSFULLY CONNECTED TO DATABASE!");
                database = client.db(databaseName);
                resolve();
            }   
        });
    });
};

const Insert = function(product) {
    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName);
        productCollection.insertOne(product, function(err, res) {
            if (err){
                reject(err);
            }
            else{
                console.log("SUCCESSFULLY INSERTED A NEW DOCUMENT");
                resolve(res);
            }
        });
    });
};

const Find = function(product) {
    let productQuery = {};
    if (product) {
        productQuery = product;
    }

    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName);

        productCollection.find(productQuery).toArray(function(err, res) {
            if (err){
                reject(err);
            }
            else{
                console.log("SUCCESSFULLY FOUND ");
                resolve(res);
            }
        });
    });
};

const Update = function(oldProduct, newProduct) {
    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName);
    
        productCollection.updateOne(oldProduct, newProduct, function(err, res) {
            if (err){
                reject(err);
            }
            else{
                console.log("SUCCESSFULL UPDATE");
                resolve(res);
            }
        });
    });
};

const Delete = function(product) {
    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName);
       
        productCollection.deleteOne(product, function(err, res) {
            if (err){
                reject(err);
            }
            else{
                console.log("SUCCESSFULL DELETE");
                resolve(res);
            }
        });
    });
};

module.exports= {Connect, Insert, Find, Update, Delete};





// const promise = Connect();
// console.log(promise);
// promise
//     .then(() =>{
//         console.log("Promise finished successfully!");
        
//         Delete()
//             .then((res) => {
//                 console.log("SUCCESSFULLY DELETED DOCUMENTS");
//                 // console.log(res);
//             })
//     })
//     .catch((err) => {
//         console.log("Promise fail");
//     });

