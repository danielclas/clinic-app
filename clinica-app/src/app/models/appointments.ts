export enum AppointmentStatus{
  Accepted = 'Aceptado',
  Canceled = 'Cancelado',
  Rejected = 'Rechazado',
  Pending = 'Pendiente',
  Done = 'Hecho'
}

export interface Appointment{
  id?: string,
  date: any,
  patient: any,
  professional: any,
  review?: string,
  status: AppointmentStatus,
  data?: any,
  poll?: any,
}
