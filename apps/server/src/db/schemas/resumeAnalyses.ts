import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { resumes } from './resumes';

export const resumeAnalyses = pgTable('resume_analyses', {
  id: serial('id').primaryKey(),
  resumeId: integer('resume_id').notNull().references(() => resumes.id, { onDelete: 'cascade' }),
  analysis: text('analysis').notNull(), // JSON string of analysis results
  score: integer('score'), // Overall score 0-100
  skills: text('skills'), // JSON array of skills
  experience: text('experience'), // JSON object of experience summary
  recommendations: text('recommendations'), // JSON array of recommendations
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Types for TypeScript
export type ResumeAnalysis = typeof resumeAnalyses.$inferSelect;
export type NewResumeAnalysis = typeof resumeAnalyses.$inferInsert;
