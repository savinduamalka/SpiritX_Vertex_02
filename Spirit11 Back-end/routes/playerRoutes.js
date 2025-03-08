import express from 'express';
import { createPlayer, getPlayers } from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.post('/', createPlayer);
playerRouter.get('/', getPlayers);

export default playerRouter;
