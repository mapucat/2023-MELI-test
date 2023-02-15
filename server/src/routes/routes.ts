import express, { Router } from 'express';
import { getItemsList, getItemWithDetails } from '../controllers/item.controller';

const router: Router = express.Router()

router.get('/items', getItemsList);
router.get('/items/:uid', getItemWithDetails);

export default router
