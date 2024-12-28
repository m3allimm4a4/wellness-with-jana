import dayjs from 'dayjs';
import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Appointment } from '../models/appointment.model';
import { getAppointmentConfig } from '../shared/dynamic-config-manager';
import { Timeslot } from '../types/timeslot.type';

const generateTimeslots = async (date: Date) => {
  const config = await getAppointmentConfig();
  const startOfDay = dayjs(new Date(date.getTime()).setHours(config.start, 0, 0, 0));
  const endOfDay = dayjs(new Date(date.getTime()).setHours(config.end, 0, 0, 0));

  const timeslots: Timeslot[] = [];

  let timeslotStart = dayjs(startOfDay);
  do {
    const timeslotEnd = timeslotStart.add(config.duration, 'minutes');
    timeslots.push({
      start: timeslotStart.toDate(),
      end: timeslotEnd.toDate(),
      reserved: false,
    });
    timeslotStart = timeslotEnd.add(config.spacing, 'minutes');
  } while (timeslotStart.isBefore(endOfDay));

  return timeslots;
};

export const getTimeslots: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const day = new Date(req.query.day as string);
  const startOfDay = new Date(day.getTime());
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(day.getTime());
  endOfDay.setHours(23, 59, 59, 999);
  const reservedAppointments = await Appointment.find({ time: { $gte: startOfDay, $lte: endOfDay } });
  const timeslots = await generateTimeslots(day);

  reservedAppointments.forEach(appointment => {
    timeslots.forEach(timeslot => {
      if (
        timeslot.start.getTime() < appointment.end.getTime() &&
        timeslot.end.getTime() > appointment.start.getTime()
      ) {
        timeslot.reserved = true;
      }
    });
  });

  res.status(200).json(timeslots);
});
