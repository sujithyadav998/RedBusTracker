import {ZodError, z} from 'zod';
/**
 * 
 * @param {strig} email - The email address
 * @returns {boolean} - True if email is valid else false
 */
export default function validateEmail(email : string) : boolean {
    try{
        const emailSchema = z.string().email({ message: "Invalid email address" });
        emailSchema.parse(email);
        return true;
    }
    catch (err : any) {
        if (err instanceof ZodError) {
            return false;
        }
        throw err;
    }
}