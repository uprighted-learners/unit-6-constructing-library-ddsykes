// Your code goes here

const { ObjectId } = require("mongodb");
const Library = require("./library");
const collection = new Library("mongodb://127.0.0.1:27017", "library", "books");
collection.test();

async collection(){
    const client = await this.client()
    const db = client.db(this.dbName)
    const collection = db.collection(this.collName);
    return collection;
}

async allBooks(){
    const collection = await this.collection();
    return collection.find({}).toArray();
}
async findOneBook(id){
    const docId = new ObjectId(id);
    const collection = await this.collection();
    return collection.findOne({_id:docId});
}
async findManyBooks(query){
    const collection = await this.collection();
    return collection.find(query).toArray();
}
async addBook(info){
    const collection = await this.collection();
    await collection.insertOne(info);
    console.log("Book was successfull added");
}
async changeBook(id, newInfo){
    const mongoId = new ObjectId(id);
    const infoObj ={$set: newInfo};
    const collection = await this.collection();
    await collection.update({_id: mongoId}, infoObj);
    console.log("Book updated successfully");
}

(asyc() =>{
   const Library = require('./library');
   const collection = new Library('mongodb://127.0.0.1:27017", "library", "books')
   await collection.addBook({title: "New Book", author:"Joe Doe", copies: 5});
   const allBooks = await collection.allBooks();
   allBooks.forEach(book => console.log(book));
   const oneBook = await collection.findManyBooks({author:"John Doe"});
   manyBooks.forEach(book => console.log(book));
   await collection.changeBook('specific_book_id_here', {title:"Updated Title"});
   await collection.removeBook('specific_book_id_here') 
})