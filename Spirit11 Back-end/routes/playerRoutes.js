import express from 'express';
import { createPlayer, deletePlayer, getPlayers, updatePlayer, getAllPlayers } from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.post('/', createPlayer);
playerRouter.get('/', getPlayers);
playerRouter.delete('/:id', deletePlayer);
playerRouter.put('/:id', updatePlayer);
playerRouter.get('/all-players', getAllPlayers);

export default playerRouter;
