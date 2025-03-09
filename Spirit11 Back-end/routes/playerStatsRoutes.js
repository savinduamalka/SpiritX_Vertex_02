import express from 'express';
import { createPlayerStats, getPlayerStats } from '../controllers/playerStatsController.js';

const playerStatsRouter = express.Router();

playerStatsRouter.post('/',createPlayerStats);
playerStatsRouter.get('/',getPlayerStats);


export default playerStatsRouter;
