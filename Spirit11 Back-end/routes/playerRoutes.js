import express from 'express';
import { createPlayer } from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.post('/', createPlayer);

export default playerRouter;
