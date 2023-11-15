import { z } from "zod";

const SIMPLE_MONGODB_ID_REGEX = /^[a-f\d]{24}$/i;

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
// type JobType = z.infer<typeof Job>;