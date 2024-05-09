"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
/**
 *
 * @param {strig} email - The email address
 * @returns {boolean} - True if email is valid else false
 */
function validateEmail(email) {
    try {
        const emailSchema = zod_1.z.string().email({ message: "Invalid email address" });
        emailSchema.parse(email);
        return true;
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return false;
        }
        throw err;
    }
}
exports.default = validateEmail;
