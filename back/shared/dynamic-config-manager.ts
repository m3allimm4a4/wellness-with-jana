import { DynamicConfig } from '../models/dynamic-config.model';
import { NotFoundError } from '../errors/not-found.error';
import { AppointmentConfig } from '../types/appointment-config.type';

const getDynamicConfig = async (name: string): Promise<AppointmentConfig> => {
  const config = await DynamicConfig.findOne({ name: name });
  if (!config) {
    throw new NotFoundError();
  }
  return JSON.parse(config.value);
};

export const getAppointmentConfig = async (): Promise<AppointmentConfig> => {
  return getDynamicConfig('APPOINTMENT');
};

export const saveDynamicConfig = async (name: string, value: any) => {
  const config = await DynamicConfig.findOne({ name: name });
  let res;
  if (!config) {
    res = await DynamicConfig.create({ name: name, value: JSON.stringify(value) });
  } else {
    res = await DynamicConfig.findByIdAndUpdate(config._id, { value: JSON.stringify(value) });
  }
  return res?.toObject();
};

export const deleteDynamicConfig = async (name: string) => {
  await DynamicConfig.findOneAndDelete({ name: name });
};
