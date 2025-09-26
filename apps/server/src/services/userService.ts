import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { users, type User, type NewUser } from '../db/schemas';
import { logger } from '../utils/logger';
import { validateEmail, validatePassword } from '../utils/validation';
import bcrypt from 'bcryptjs';

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export class UserService {
  async createUser(userData: CreateUserData): Promise<User> {
    logger.info('Creating new user', { email: userData.email });

    // Validate input
    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`);
    }

    // Check if user already exists
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    // Create new user
    const newUserData: NewUser = {
      email: userData.email,
      name: userData.name,
      passwordHash,
      role: userData.role || 'user',
      isActive: true,
    };

    const [newUser] = await db.insert(users).values(newUserData).returning();
    
    logger.info('User created successfully', { userId: newUser.id });
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  async updateUser(id: number, updateData: UpdateUserData): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) {
      logger.warn('User not found for update', { userId: id });
      return null;
    }

    // Validate email if provided
    if (updateData.email && !validateEmail(updateData.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email is already taken by another user
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.getUserByEmail(updateData.email);
      if (existingUser) {
        throw new Error('Email is already taken');
      }
    }

    // Update user
    const [updatedUser] = await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    logger.info('User updated successfully', { userId: id });
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.getUserById(id);
    if (!user) {
      logger.warn('User not found for deletion', { userId: id });
      return false;
    }

    await db.delete(users).where(eq(users.id, id));
    logger.info('User deleted successfully', { userId: id });
    return true;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.createdAt);
  }

  async getActiveUsers(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(eq(users.isActive, true))
      .orderBy(users.createdAt);
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.isActive) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`);
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await db
      .update(users)
      .set({
        passwordHash: newPasswordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    logger.info('Password changed successfully', { userId });
    return true;
  }
}

export const userService = new UserService();
