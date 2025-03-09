import express from 'express';
import { selectPlayer, getTeam, getTeamMembers, finalizeTeam, getLeaderboard } from '../controllers/teamController.js';

const teamRouter = express.Router();

teamRouter.post('/select-player', selectPlayer);
teamRouter.get('/team/:userId', getTeam);
teamRouter.get('/team-members/:userId', getTeamMembers);
teamRouter.post('/team/finalize/:userId', finalizeTeam);
teamRouter.get('/leaderboard/all', getLeaderboard);

export default teamRouter;
