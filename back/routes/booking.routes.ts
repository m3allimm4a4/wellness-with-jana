import { Router } from 'express';
import {
  confirmAppointment,
  createAppointment,
  getAppointments,
  getTimeslots
} from '../controllers/bookings.controller';

const router = Router();

router.route('/').get(getAppointments).post(createAppointment);
router.route('/:id').patch(confirmAppointment)
router.route('/timeslots').get(getTimeslots);

export const bookingRoutes = router;
