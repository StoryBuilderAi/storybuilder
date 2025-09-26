import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { jobs } from './jobs';
import { resumes } from './resumes';

export const jobApplications = pgTable('job_applications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  jobId: integer('job_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  resumeId: integer('resume_id').notNull().references(() => resumes.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).notNull().default('applied'), // applied, reviewing, interviewed, offered, rejected
  matchScore: integer('match_score'), // AI-generated match score 0-100
  notes: text('notes'),
  appliedAt: timestamp('applied_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Types for TypeScript
export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;
