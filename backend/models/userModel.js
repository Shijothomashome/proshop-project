import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

},{
    timestamps: true
});

// Attaching a method to the userSchema for checking the input password with the hashed password while login
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};

// Password hashing before saving into database
//  it's a pre-save hook, which means it will run before saving a document to the database.
// Likewise pre, we can use post for some operations which we want to run after the database operation we perform inside the controller
userSchema.pre('save', async function (next){
    if (!this.isModified('password')){ //if we are modifying the data without modifying the password then it will do nothing, goes to next middleware or else it will hash the password which is given outside the if block.
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;