import { pgTable, serial, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  description: text('description').notNull(),
  requirements: text('requirements'), // JSON array of requirements
  location: varchar('location', { length: 255 }),
  salary: varchar('salary', { length: 100 }),
  jobType: varchar('job_type', { length: 50 }), // full-time, part-time, contract, etc.
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Types for TypeScript
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
