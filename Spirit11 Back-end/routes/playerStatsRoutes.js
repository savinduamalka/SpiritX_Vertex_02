import express from 'express';
import { createPlayerStats, getPlayerStats, getMultiplePlayerStats, calculateTeamPoints } from '../controllers/playerStatsController.js';


const playerStatsRouter = express.Router();

playerStatsRouter.post('/', createPlayerStats);
playerStatsRouter.get('/', getPlayerStats);
playerStatsRouter.post('/multiple', getMultiplePlayerStats);
playerStatsRouter.post('/calculate-team-points', calculateTeamPoints);
playerStatsRouter.post('/team/points', calculateTeamPoints);

export default playerStatsRouter;
