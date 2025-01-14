import { Router } from 'express';
import {
  cancelAppointment,
  confirmAppointment,
  createAppointment,
  getAppointments,
  getTimeslots,
} from '../controllers/bookings.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router
  .route('/')
  .get(auth([UserRole.ADMIN]), getAppointments)
  .post(auth([UserRole.ADMIN, UserRole.NORMAL]), createAppointment);
router
  .route('/:id')
  .patch(auth([UserRole.ADMIN]), confirmAppointment)
  .delete(auth([UserRole.ADMIN]), cancelAppointment);
router.route('/timeslots').get(getTimeslots);

export const bookingRoutes = router;
