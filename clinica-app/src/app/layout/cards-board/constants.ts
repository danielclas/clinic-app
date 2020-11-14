export const admin = [
  {
    'link': '/home/staffapproval',
    'description': 'Ver la lista de profesionales pendientes de aprobación',
    'label': 'Aprobar profesionales'
  },
  {
    'link': '/home/adminadd',
    'description': 'Agregar un administrador al sistema',
    'label': 'Agregar administrador'
  },
  {
    'link': '/home/specialtyadd',
    'description': 'Agregar una especialidad médica',
    'label': 'Agregar especialidad'
  },
];

export const staff = [
  {
    'link': '/home/specialtyadd',
    'description': 'Agregar una especialidad médica',
    'label': 'Agregar especialidad'
  },
  {
    'link': '/home/staffschedule',
    'description': 'Ver y modificar los días y horarios de atención',
    'label': 'Configurar horarios de atención'
  },
  {
    'link': '/home/staffappointments',
    'description': 'Ver turnos pasados, aceptar o rechazar turnos pendientes',
    'label': 'Ver turnos'
  },
  {
    'link': '/home/attendappointment',
    'description': 'Atender a un paciente, agregar una reseña y completar la encuesta (sólo para turnos del día de la fecha)',
    'label': 'Atender paciente'
  }
];


//Solicitar un turno, cancelar turno pendiente, ver turnos futuros, ver reseñas

export const patient = [
  {
    'link': '/home/newappointment',
    'description': 'Solicitar un nuevo turno con un profesional',
    'label': 'Solicitar un turno'
  },
  {
    'link': '/home/patientappointments',
    'description': 'Ver solo los turnos hasta 15 días desde la fecha',
    'label': 'Ver turnos pedientes'
  },
  {
    'link': '/home/pastappointments',
    'description': 'Ver todos los turnos anteriores al día de la fecha',
    'label': 'Ver turnos pasados'
  }

]
