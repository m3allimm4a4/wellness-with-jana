export type AppointmentConfig = {
  start: number;
  end: number;
  duration: number;
  spacing: number;
  email: {
    template: string;
    subject: string;
  };
  confirmationEmail: {
    template: string;
    subject: string;
  };
};
