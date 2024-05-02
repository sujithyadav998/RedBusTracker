import {ZodError, z} from 'zod';
/**
 * 
 * @param {strig} password - The password to validate
 * @returns {boolean} - True if email is valid else false
 */
export default function validatePassword(password : string) : boolean {
    try{
        const passwordSchema = z.string().min(4, {message: "Invalid password" }); ;
        passwordSchema.parse(password);
        return true;
    }
    catch (err : any) {
        if (err instanceof ZodError) {
            return false;
        }
        throw err;
    }
}