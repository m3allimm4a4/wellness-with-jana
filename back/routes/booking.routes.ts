import { Router } from 'express';
import { getTimeslots } from '../controllers/bookings.controller';

const router = Router();

router.route('/timeslots').get(getTimeslots);

export const bookingRoutes = router;
