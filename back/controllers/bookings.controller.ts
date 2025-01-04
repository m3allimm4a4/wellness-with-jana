import dayjs from 'dayjs';
import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Appointment, IAppointment } from '../models/appointment.model';
import { getAppointmentConfig } from '../shared/dynamic-config-manager';
import { Timeslot } from '../types/timeslot.type';
import { BadRequestError } from '../errors/bad-request.error';
import { NotFoundError } from '../errors/not-found.error';

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

export const getTimeslots: RequestHandler = catchAsync(async (req, res) => {
  const day = new Date(req.query.day as string);
  const startOfDay = new Date(day.getTime());
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(day.getTime());
  endOfDay.setHours(23, 59, 59, 999);
  const reservedAppointments = await Appointment.find({ start: { $gte: startOfDay, $lte: endOfDay } });
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

export const createAppointment: RequestHandler = catchAsync(async (req, res) => {
  const appointment: Partial<IAppointment> = req.body;
  appointment.start = new Date(appointment.start || 0);
  appointment.end = new Date(appointment.end || 0);
  const intersection = await Appointment.findOne({ start: { $lt: appointment.end }, end: { $gt: appointment.start } });
  if (intersection) {
    throw new BadRequestError();
  }

  const newBooking = await Appointment.create({
    name: appointment.name,
    country: appointment.country,
    email: appointment.email,
    phone: appointment.phone,
    start: appointment.start,
    end: appointment.end,
    service: appointment.service?.id,
  });

  res.status(200).json(newBooking.toObject());
});

export const confirmAppointment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new BadRequestError();
  }
  const appointment = await Appointment.findByIdAndUpdate(id, { confirmed: true });

  if (!appointment) {
    throw new NotFoundError();
  }

  res.status(200).json(appointment.toObject());
});

export const cancelAppointment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new BadRequestError();
  }
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) {
    throw new NotFoundError();
  }
  res.status(204).send();
});

export const getAppointments: RequestHandler = catchAsync(async (req, res) => {
  const history = req.query.history === 'true';

  const currentDate = new Date();
  const query = history
    ? Appointment.find({ start: { $lte: currentDate } })
    : Appointment.find({ start: { $gt: currentDate } });

  const appointments = await query.populate('service');

  res.status(200).json(appointments.map(a => a.toObject()));
});
