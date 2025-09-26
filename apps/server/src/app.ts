import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import authRoutes from './routes/auth';
import http from 'http';


dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(helmet()); 
app.use(cors()); 
app.use(morgan('combined')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from StoryBuilder API!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', authRoutes);

app.get('/api/users', async (req, res, next) => {
  try {
    const { userService } = await import('./services');
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    const { userService } = await import('./services');
    const { email, password, name, role } = req.body;
    
    const newUser = await userService.createUser({
      email,
      password,
      name,
      role
    });
    
    // Don't return password hash
    const { passwordHash, ...userWithoutPassword } = newUser;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return next(error);
  }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const { userService } = await import('./services');
    const userId = parseInt(req.params.id);
    
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't return password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    return next(error);
  }
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📊 Health check: http://localhost:${PORT}/health`);
  logger.info(`🔗 API endpoint: http://localhost:${PORT}/api/hello`);
  logger.info(`👥 Users endpoint: http://localhost:${PORT}/api/users`);
});

export {
  app, server
}