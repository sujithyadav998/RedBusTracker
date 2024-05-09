"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
/**
 *
 * @param {strig} password - The password to validate
 * @returns {boolean} - True if email is valid else false
 */
function validatePassword(password) {
    try {
        const passwordSchema = zod_1.z.string().min(4, { message: "Invalid password" });
        ;
        passwordSchema.parse(password);
        return true;
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return false;
        }
        throw err;
    }
}
exports.default = validatePassword;
