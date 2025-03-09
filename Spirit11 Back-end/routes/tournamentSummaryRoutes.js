import express from 'express';
import { getTournamentSummary } from '../controllers/tournamentSummaryController.js';

const tournamentSummaryRouter = express.Router();

tournamentSummaryRouter.get('/', getTournamentSummary);

export default tournamentSummaryRouter;
