import mongoose, {Schema, Document} from 'mongoose';

export interface User extends Document {
    email : string;
    fullName : string;
    password : string;
    createdAt : Date;
    updatedAt : Date;
}

const userSchema : Schema<User> = new Schema(
    {
        email : {type: String, required: true, unique: true},
        fullName : {type: String, required: true},
        password : {type: String, required: true}
    }, 
    {
        timestamps: true // Adds createdAt, updatedAt fields automatically
    }
)

export default mongoose.model<User>('User', userSchema);