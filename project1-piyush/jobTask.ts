import { z } from "zod";

const SIMPLE_MONGODB_ID_REGEX = /^[a-f\d]{24}$/i;

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
// type JobTaskType = z.infer<typeof JobTask>;