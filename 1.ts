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

// Creating a schema for strings
const nameSchema = z.string();
// Learn: Customizing errors (https://zod.dev/error-customization)
//        1. We can provide custome error message via and it will be returned in `error.issues[*].message` property:
// const nameSchema = z.string("Please provide string type only.");
//        2. Another way to pass custom error message is via passing an object:
// const nameSchema = z.string({ error: "Please provide string type only." });
//        3. Passing an object allows us to pass function:
// const nameSchema = z.string({
//     error: (issue) => {
//         const { code, input, expected } = issue
//         console.log('issue?', Object.assign({}, { code, input, expected }))
//         // issue.code; // the issue code
//         // issue.input; // the input data
//         // issue.inst; // (*very long object*) the schema/check that originated this issue
//         // issue.path; // the path of the error
//         return "Please provide string type only. " + new Date().toString();
//     }
// });
// parsing
console.log(nameSchema.parse("tuna")); // "tuna"
// console.log(nameSchema.parse(12)); // throws ZodError

// Using `safeParse` zod doesn't throw error when validation fails
console.log(nameSchema.safeParse("tuna")); // { success: true; data: "tuna" }
// console.log(nameSchema.safeParse(12)); // { success: false; error: `ZodError instance` }
const result1 = nameSchema.safeParse(12)
if (!result1.success) {
    console.log("❌ ~ result1.error.issues:", result1.error.issues)
    /**
    [
        {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected string, received number'
        }
    ]
     */
}


// User
console.log('\nUser 🚀')
const User = z.object({
    username: z.string(),
    phone: z.number(),
});
console.log(User.parse({ username: "Ludwig", phone: 1234 })); // { username: 'Ludwig', phone: 1234 }

const result2 = User.safeParse({ username: 42, phone: "100" });
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
type User = z.infer<typeof User>;


// Create new schema with all fields optional
const UserPartial = User.partial();


// ❤️ Accessing a nested schema
const CarSchema = z.object({ name: z.string(), price: z.number() });
console.log(CarSchema.shape.name.parse("BMW")) // "BMW"


//  TODO ❤️ ❤️ ❤️ : https://www.youtube.com/watch?v=9UVPk0Ulm6U