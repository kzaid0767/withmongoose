import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 8082 || process.env.PORT;
const uri = "mongodb+srv://kzaid0767:Reometry123$@cluster0.8d1aj.mongodb.net/students-db";


const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connectDB();

//designing the schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    objectId: mongoose.Schema.Types.ObjectId,
    address: {
        street: String,
        city: String,
        zipCode: Number}
});

//compile the schema into a model
const Student = mongoose.model("Student", studentSchema);

//CRUD operations
const newStudent = new Student({
    name: "Kassim Paid",
    email: "x9a6v@example.com",
    age: 43,
    gender: "male",
    objectId: new mongoose.Types.ObjectId(),
    address: {
        street: "123 Twain St",
        city: "New KSC",
        zipCode: 10301
    } 
})

/* newStudent.save()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */

const students = [
    {
        name: "Tim Tom",
        email: "x9sd6v@example.com", 
        age: 33,
        gender: "male",
        objectId: new mongoose.Types.ObjectId(),
        address: {
            street: "1203 Twain St",
            city: "New KSC",
            zipCode: 12301    
        }
    },    
    {
        name: "Juan de la Cruz",
        email: "z9a6v@example.com", 
        age: 13,
        gender: "male",
        objectId: new mongoose.Types.ObjectId(),
        address: {
            street: "123 akain St",
            city: "New BKC",
            zipCode: 10301    
        }
    }]

/*  Student.insertMany(students)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })    */ 

//create a new student
 Student.create(
    {
        name: "Tina Jones",
        email: "xtr6v@example.com",
        age: 43,
        gender: "female",
        objectId: new mongoose.Types.ObjectId(),
        address: {
            street: "123 Twain Lane",
            city: "Tew KSC",
            zipCode: 10301
        } 
    }
 )
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});