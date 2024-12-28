import { Router } from 'express';
import { createAppointment, getAppointments, getTimeslots } from '../controllers/bookings.controller';

const router = Router();

router.route('/').get(getAppointments).post(createAppointment);
router.route('/timeslots').get(getTimeslots);

export const bookingRoutes = router;
