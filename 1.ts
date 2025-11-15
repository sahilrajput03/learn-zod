import { z } from "zod";
// * primitive types
//  z.string()
//  z.number()
//  z.bigint();
//  z.boolean();
//  z.symbol();
//  z.undefined();
//  z.null();
// * More
//  z.array()
//  z.string().datetime(),
//  z.string().regex(SIMPLE_MONGODB_ID_REGEX),
//  z.string().datetime().optional(), // Making anything optional

// creating a schema for strings
const usernameSchema = z.string();
// parsing
console.log(usernameSchema.parse("tuna")); // "tuna"
// console.log(mySchema.parse(12)); // throws ZodError

// Using `safeParse` zod doesn't throw error when validation fails
console.log(usernameSchema.safeParse("tuna")); // { success: true; data: "tuna" }
// console.log(mySchema.safeParse(12)); // { success: false; error: ZodError }


// User
console.log('\nUser 🚀')
const User = z.object({
    username: z.string(),
    phone: z.number(),
});
console.log(User.parse({ username: "Ludwig", phone: 1234 })); // { username: 'Ludwig', phone: 1234 }

const result = User.safeParse({ username: 42, phone: "100" });
if (!result.success) {
    // console.log("🚀 ~ result:", result.error) // ZodError instance
    console.log("🚀 ~ result.error.issues:", result.error.issues)
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
    result.data;
}

// ✅ Extract the inferred type
type User = z.infer<typeof User>;