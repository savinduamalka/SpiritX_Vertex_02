import express from 'express';
import { createPlayer, deletePlayer, getPlayers } from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.post('/', createPlayer);
playerRouter.get('/', getPlayers);
playerRouter.delete('/:id', deletePlayer);

export default playerRouter;
