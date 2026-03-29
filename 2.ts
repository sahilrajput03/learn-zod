import { z } from "zod";

// ❤️ Topics:
//  - Accessing nested schema

// User
console.log('\nUser 🚀')
const UserSchema = z.object({
    username: z.string(),
    phone: z.number(),
});
console.log(UserSchema.parse({ username: "Ludwig", phone: 1234 })); // { username: 'Ludwig', phone: 1234 }

const result2 = UserSchema.safeParse({ username: 42, phone: "100" });
if (!result2.success) {
    // console.log("❌ ~ result2:", result2.error) // `ZodError instance`
    console.log("❌ ~ result2.error.issues:", result2.error.issues)
    /**
    [
        {
            expected: 'string',
            code: 'invalid_type',
            path: [ 'username' ],
            message: 'Invalid input: expected string, received number'
        },
        {
            expected: 'number',
            code: 'invalid_type',
            path: [ 'phone' ],
            message: 'Invalid input: expected number, received string'
        }
    ]
     */

    // console.log(z.prettifyError(result.error))
    /**
        ✖ Invalid input: expected string, received number
          → at username
        ✖ Invalid input: expected number, received string
          → at phone
     */
} else {
    result2.data;
}

// ✅ Extract the inferred type
type UserSchema = z.infer<typeof UserSchema>;


// Create new schema with all fields optional
const partialUserSchema = UserSchema.partial();


// ❤️ Accessing a nested schema
const CarSchema = z.object({ name: z.string(), price: z.number() });
console.log(CarSchema.shape.name.parse("BMW")) // "BMW"


//  TODO ❤️ ❤️ ❤️ : https://www.youtube.com/watch?v=9UVPk0Ulm6U