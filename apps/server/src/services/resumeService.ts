import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { resumes, type Resume, type NewResume } from '../db/schemas';
import { logger } from '../utils/logger';

export interface CreateResumeData {
  userId: number;
  title: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  status?: string;
}

export interface UpdateResumeData {
  title?: string;
  status?: string;
}

export class ResumeService {
  async createResume(resumeData: CreateResumeData): Promise<Resume> {
    logger.info('Creating new resume', { userId: resumeData.userId, title: resumeData.title });

    const newResumeData: NewResume = {
      userId: resumeData.userId,
      title: resumeData.title,
      fileName: resumeData.fileName,
      filePath: resumeData.filePath,
      fileSize: resumeData.fileSize,
      mimeType: resumeData.mimeType,
      status: resumeData.status || 'pending',
    };

    const [newResume] = await db.insert(resumes).values(newResumeData).returning();
    
    logger.info('Resume created successfully', { resumeId: newResume.id });
    return newResume;
  }

  async getResumeById(id: number): Promise<Resume | null> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume || null;
  }

  async getResumesByUserId(userId: number): Promise<Resume[]> {
    return await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId))
      .orderBy(resumes.createdAt);
  }

  async updateResume(id: number, updateData: UpdateResumeData): Promise<Resume | null> {
    const resume = await this.getResumeById(id);
    if (!resume) {
      logger.warn('Resume not found for update', { resumeId: id });
      return null;
    }

    const [updatedResume] = await db
      .update(resumes)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(resumes.id, id))
      .returning();

    logger.info('Resume updated successfully', { resumeId: id });
    return updatedResume;
  }

  async deleteResume(id: number): Promise<boolean> {
    const resume = await this.getResumeById(id);
    if (!resume) {
      logger.warn('Resume not found for deletion', { resumeId: id });
      return false;
    }

    await db.delete(resumes).where(eq(resumes.id, id));
    logger.info('Resume deleted successfully', { resumeId: id });
    return true;
  }

  async getAllResumes(): Promise<Resume[]> {
    return await db.select().from(resumes).orderBy(resumes.createdAt);
  }

  async getResumesByStatus(status: string): Promise<Resume[]> {
    return await db
      .select()
      .from(resumes)
      .where(eq(resumes.status, status))
      .orderBy(resumes.createdAt);
  }
}

export const resumeService = new ResumeService();
