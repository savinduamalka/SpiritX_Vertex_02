import express from 'express';
import { createPlayer, deletePlayer, getPlayers, updatePlayer } from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.post('/', createPlayer);
playerRouter.get('/', getPlayers);
playerRouter.delete('/:id', deletePlayer);
playerRouter.put('/:id', updatePlayer);

export default playerRouter;
