import { z } from "zod";

const SIMPLE_MONGODB_ID_REGEX = /^[a-f\d]{24}$/i;

const Order = z.object({
	user: z.string().regex(SIMPLE_MONGODB_ID_REGEX),
	paymentInfo: z.object({
		subTotal: z.number(),
		discount: z.number(),
		tax: z.number(),
		totalAmount: z.number(),
		paidAmount: z.number(),
		remainingAmount: z.number(),
	}),
	note: z.string(),
	customer: z.string().regex(SIMPLE_MONGODB_ID_REGEX),
	shippingInfo: z.object({
		name: z.string(),
		phoneNumber: z.number(),
		deadline: z.string().datetime(),
		address: z.string(),
		instructions: z.string(),
	})
});

Order.parse({
	user: '5c9cb7138a874f1dcd0d8dcc',
	paymentInfo: {
		subTotal: 0,
		discount: 0,
		tax: 0,
		totalAmount: 0,
		paidAmount: 0,
		remainingAmount: 0,
	},
	note: 'abc',
	customer: '5c9cb7138a874f1dcd0d8dcc',
	shippingInfo: {
		name: 'abc',
		phoneNumber: 0,
		deadline: '2023-11-15T13:40:18.365Z',
		address: 'abc',
		instructions: 'abc',
	}
});


// extract the inferred type
// type OrderType = z.infer<typeof Order>;