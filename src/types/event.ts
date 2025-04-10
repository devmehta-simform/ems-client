import { z } from 'zod';
import { EventSchema } from '../models';

type Event = z.infer<typeof EventSchema>;

export { type Event };
