import { Router } from 'express';
import { geocodeAddress } from '../controllers/locationController';

const router = Router();

router.post('/geocode', geocodeAddress);

export default router;
