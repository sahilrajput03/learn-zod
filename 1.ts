import { z } from "zod";
import { deepEqual, equal } from 'assert'

// ❤️ Topics:
//  - Safe (throw error on validation errors) and,
//  - Unsafe parsing via `safeParse()` (without throwing errors on validation errors)

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
// E.g., 
//      const CarStatusEnumSchema = z.enum(CarStatusEnum).default(CarStatusEnum.AVAILABLE).optional()
//      Note: `optiona()` must occur after default(..) else optional doesn't work. [TESTED]


// * 1. Unsafe Parsing - Throw erron if validation fails.
equal(z.string().parse("tuna"), "tuna")
let e: any
try { z.string().parse(12) } catch (error) { e = error }
equal(e.issues[0].message, 'Invalid input: expected string, received number')

// * 2. Safe Parsing via `safeParse` - No error thrown when validation fails
deepEqual(z.string().safeParse("tuna"), { success: true, data: "tuna" })
// console.log(nameSchema.safeParse(12)); // { success: false; error: `ZodError instance` }

// & We use `safeParse` in below code for all of our testing because I like to use in prod code as well.

// ❤️ Default error messages at `result.error.issues[*].message` property.
equal(z.string().safeParse('Sahil').data, 'Sahil') // No validation error
equal(z.string().safeParse(123).error?.name, 'ZodError') // ❤️ Default error message
equal(z.string().safeParse(123).error?.issues[0].message, 'Invalid input: expected string, received number')
equal(z.string().safeParse(123).error?.issues.map(i => i.message).join(', '), 'Invalid input: expected string, received number')
equal(z.string().safeParse(123).error?.message, `[
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [],
    "message": "Invalid input: expected string, received number"
  }
]`)

// ❤️ Custom error message (1) (Source: https://zod.dev/error-customization)
equal(z.string("Please provide string type only.").safeParse('Sahil').data, 'Sahil') // No validation error
equal(z.string("Please provide string type only.").safeParse(123).error?.name, 'ZodError')
equal(
    z.string("Please provide string type only.").safeParse(123).error?.issues[0].message,
    "Please provide string type only.",
)
equal(
    z.string("Please provide string type only.").safeParse(123).error?.message,
    `[
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [],
    "message": "Please provide string type only."
  }
]`
)

// ❤️ Custom error message (2) - Another way to pass custom error message is via passing an object:
equal(
    z.string({ error: "Please provide string type only." }).safeParse(123).error?.name,
    'ZodError',
)
equal(
    z.string({ error: "Please provide string type only." }).safeParse(123).error?.message,
    `[
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [],
    "message": "Please provide string type only."
  }
]`,
)
equal(
    z.string({ error: "Please provide string type only." }).safeParse(123).error?.issues[0].message,
    'Please provide string type only.',
)

// ❤️ Custom error message (3) - Fro docs: The error param optionally
//      accepts a function. An error customization function is known as an
//      error map in Zod terminology. The error map will run at parse time
//      if a validation error occurs.
equal(z.string({
    error: (issue) => {
        const { code, input, expected } = issue
        equal(issue.expected, 'string')
        equal(issue.code, 'invalid_type')
        equal(issue.input, 123)
        return "Please provide string type only. ";
    }
}).safeParse(123).error?.issues[0].message, "Please provide string type only. ")
