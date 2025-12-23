const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const commentRoutes = require('./routes/commentRoutes');
const statsRoutes = require('./routes/statsRoutes');
const skillController = require('./controllers/skillController');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/stats', statsRoutes);
// Extra route to return skills for a given user id
app.get('/api/users/:id/skills', skillController.getUserSkills);

// Health check
app.get('/', (req, res) => res.json({ success: true, data: 'SkillSwap API is running' }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
