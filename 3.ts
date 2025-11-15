import { z } from "zod";

const SIMPLE_MONGODB_ID_REGEX = /^[a-f\d]{24}$/i;

// From Piyush's Project

// Job
const Job = z.object({
	order: z.string().regex(SIMPLE_MONGODB_ID_REGEX),
	images: z.array(z.object({
		public_id: z.string(),
		url: z.string(),
	})),
	itemName: z.string(),
	costPerUnit: z.number(),
	inventory: z.null(),
	quantity: z.number(),
});
Job.parse({
	order: '5c9cb7138a874f1dcd0d8dcc',
	images: [{
		public_id: 'abc',
		url: 'abc',
	}],
	itemName: 'abc',
	costPerUnit: 0,
	inventory: null,
	quantity: 0,
});
// extract the inferred type
type JobType = z.infer<typeof Job>;


// JobTask
const JobTask = z.object({
	order: z.string().regex(SIMPLE_MONGODB_ID_REGEX),
	job: z.string().regex(SIMPLE_MONGODB_ID_REGEX),
	jobTaskType: z.number(),
	status: z.number(),
	type: z.string(),
	notes: z.string(),
	user: z.string().regex(SIMPLE_MONGODB_ID_REGEX),
	// `deadline` is optional here because we may want to set this on backend instead of getting from frontend.
	deadline: z.string().datetime().optional(),
});
JobTask.parse({
	order: '5c9cb7138a874f1dcd0d8dcc',
	job: '5c9cb7138a874f1dcd0d8dcc',
	jobTaskType: 0,
	status: 0,
	type: 'abc',
	notes: 'abc',
	user: '5c9cb7138a874f1dcd0d8dcc',
	deadline: '2023-11-15T13:40:18.365Z',
});
// extract the inferred type
type JobTaskType = z.infer<typeof JobTask>;


// Order
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
type OrderType = z.infer<typeof Order>;