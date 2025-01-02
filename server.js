import express from "express";
import mongoose, { set } from "mongoose";
import validator from "validator";

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

// custom validation function
function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

//designing the schema with validation
// adding setters and getters
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        minLength: [2, "Name must be at least 2 characters"],
        maxLength: [50, "Name must be less than 50 characters"],
        set: (value) => value.trim().toLowerCase(),
        get: (value) => value.toUpperCase(),         
        },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validateEmail, "Please enter a valid email"]
    },
    isActive: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isBoolean(value),
            message: "Please enter a boolean value"
        }
    },
    age: {
        type: Number,
        required: [true, "Please enter an age"],
        min: [18, "Age must be at least 18"],
        max: [100, "Age must be less than 100"],
        get: (value) => value * 2
    },
    gender: {
        type: String,
        required: [true, "Please enter a gender"],
        enum: ["male", "female"]
    },
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
    isActive: 'true',
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
        age: 23,
        gender: "male",
        objectId: new mongoose.Types.ObjectId(),
        address: {
            street: "123 akain St",
            city: "New BKC",
            zipCode: 10301    
        }
    },
    {
        name: "Tina Jones",
        email: "xtr6v@example.com", 
        age: 53,
        gender: "female",
        objectId: new mongoose.Types.ObjectId(),
        address: {
            street: "123 Twain Lane",
            city: "Tew KSC",
            zipCode: 10301    
        }
    }]

 /*  Student.insertMany(students)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })     */

//create a new student
/*   Student.create(
    {
        name: "MARIA GARCIA",
        email: "mariex@ample.com",
        age: 27,
        gender: "female",
        isActive: true,
        objectId: new mongoose.Types.ObjectId(),
        address: {
            street: "123 Street Twain St",
            city: "Tew KSC",
            zipCode: 18301
        } 
    }
 )
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })  */

//read all operation

/* Student.find()  
    .then((result) => {
        console.log(result.length);
    })
    .catch((error) => {
        console.error(error);
    }) */

//read one operation
   Student.findById("67769ae4216c8352a92538de")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })   
/* 
Student.findOne({name: "Kassim Paid"})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })   */

//Query operations
// .where() .limit() .skip() .sort()

/*  Student.find()
    .where("gender", "male")
    .limit(3)   
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */
  
/* Student.find()
    .where("age").gt(30)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */

/* Student.find()
    .where("age").lt(30)
    .sort({name: -1})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */
 

//update operation

/*  Student.updateOne(
    {_id: "67756fed9ff4f1858c3e8cbc"},
    {
        $set: {
            name: "Kassim Wajid",       
        }
    }
)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })  */

/* Student.findByIdAndUpdate(
        "67756fed9ff4f1858c3e8cbc",
        {
            $set: {
                name: "Kassim Wajid",
                age: 36       
            }
        },
        {
            new: true
        }
    )
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */


//delete operation

 /*  Student.findByIdAndDelete("67756fed9ff4f1858c3e8cbc")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })  */

/* Student.deleteMany(
    {
        gender: "male"
    }
)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */


//increment and decrement operations

 /*  Student.findById("67756ee190162181b1dae95e")
    .then((result) => {
        result.age++;
        result.save();
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })   */

/*   Student.findById("67757587a9d4efd79a13f42e")
    .then((result) => {
        result.age--;
        result.save();
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })   */

//multiply and divide operations

/* Student.findOneAndUpdate(
    {_id: "67757587a9d4efd79a13f42e"},
    {
        $mul: {
            age: 2
        }
    }
)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) */

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});