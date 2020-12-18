const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("crudcrud-films-flow-node-mongo"))
            .catch(err => console.log(err))

function findAll(callback){  
    global.conn.collection("films").find({}).toArray(callback);
}

function insert(film, callback){
    global.conn.collection("films").insert(film, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("films").find(new ObjectId(id)).toArray(callback);
}

function update(id, film, callback){
    global.conn.collection("films").updateOne({_id: new ObjectId(id)}, {$set: film}, callback);
}

function deleteOne(id, callback){
    global.conn.collection("films").deleteOne({_id: new ObjectId(id)}, callback);
}
 
module.exports = { findAll, insert, findOne, update, deleteOne }
