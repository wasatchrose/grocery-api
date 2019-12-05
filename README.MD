// SAVE THIS

MongoClient.connect(mongoDburl, settings, function(err, client) {
    if(err){
        console.log("ERROR: " + err);
    }
    else{
        console.log("SUCCESSFULLY CONNECTED TO DATABASE!");
        database = client.db("grocery-db");
        const productCollection = database.collection('products');
        productCollection.find().toArray(function(err, docs){
            if(err){
                console.log("ERROR 2: " + err);
            }
            else{
                docs.forEach((d) => {
                    console.log(d);
                });
            }
        });
    }


});