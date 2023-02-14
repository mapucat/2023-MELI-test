import express, { Router } from 'express';
import { getItemsList } from '../controllers/item.controller';

const router: Router = express.Router()

router.get('/items', getItemsList);

export default router
