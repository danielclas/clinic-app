export const spanish = {
  // User card
  welcome: 'Bienvenido',
  enabled: 'Usted se encuentra habilitado para utilizar el sitio',
  pendingApproval: 'Usted aún no ha sido aprobado por un administrador',
  pendingVerification: ' Usted aún no ha verificado su correo',
  registeredAs: 'Usted está registrado como',

  // User types (from enum)
  Staff: 'doctor',
  Patient: 'paciente',
  Admin: 'admin',

  // Cards
  navigate: 'Navegar',

  // Patient home cards
  newAppointmentTitle: 'Solicitar un turno',
  newAppointmentContent: 'Solicitar un nuevo turno con un profesional',
  pendingAppointmentsTitle: 'Turnos pendientes',
  pendingAppointmentsContent: 'Ver todos los turnos pendientes',
  pastAppointmentsTitle: 'Turnos pasados',
  pastAppointmentsContent: 'Ver todos los turnos anteriores al día de la fecha',

  // Staff home cards
  specialtyAddTitle: 'Agregar especialidad',
  specialtyAddContent: 'Agregar una especialidad médica',
  workingHoursTitle: 'Configurar horarios de atención',
  workingHoursContent: 'Ver y modificar los días y horarios de atención',
  staffAppointmentsTitle: 'Ver turnos',
  staffAppointmentsContent: 'Ver turnos pasados, aceptar o rechazar turnos pendientes',
  attendAppointmentTitle: 'Atender paciente',
  attendAppointmentContent: 'Atender a un paciente, agregar una reseña y completar la encuesta',
  reportsTitle: 'Informes',
  reportsContent: 'Generar informes de los turnos y actividades. Buscar información de los turnos.',

  // Admin home cards
  staffApprovalTitle: 'Aprobar profesionales',
  staffApprovalContent: 'Ver la lista de profesionales pendientes de aprobación',
  adminAddTitle: 'Agregar administrador',
  adminAddContent: 'Agregar un administrador al sistema',

  // Navbar
  notifications: 'No hay notificaciones para mostrar',

  // Login
  login: 'Ingreso',
  loginButton: 'Ingresar',
  email: 'Correo',
  password: 'Contraseña',
  forgotPassword: '¿Olvidó su contraseña?',
  register: 'Registrarse',
  testUsers: 'Usuarios de prueba',

  // Register
  registerAsUser: 'Registrarse como usuario',
  registerAsStaff: 'Registrarse como profesional',
  name: 'Nombre',
  surname: 'Apellido',
  profilePictures: 'Seleccione las fotos de perfil',
  specialties: 'Seleccione la(s) especialidade(s)',

  // Staff approval
  approve: 'Aprobar',
  noPendingApprovals: 'No quedan profesionales sin aprobar',

  // Specialty add
  existingSpecialties: 'Especialidades existentes',
  addSpecialty: 'Agregar especialidad',
  specialty: 'Especialidad',

  // Reports
  loginReport: 'Reporte de logeos',
  specialtyReport: 'Reporte de especialidades',
  weekdaysReport: 'Reporte días de semana',
  reportsHelp: 'Presione en cualquiera de las opciones para descargar reportes en Excel y PDF',
  appointmentDataSearch: 'Búsqueda de información',
  searchHelp: 'Sólo turnos completados. Presione sobre uno para ver el detalle.',

  // Appointment search
  patient: 'Paciente',
  doctor: 'Doctor',
  date: 'Fecha',
  clinicalData: 'Datos clínicos',

  // Patient past appointments
  filterByState: 'Filtrar turnos por estados',
  state: 'Estado',
  select: 'Seleccionar',
  emptyList: 'No hay turnos para mostrar',
  seeDetails: 'Ver detalles',
  leaveReview: 'Dejar reseña',

  //Appointment states, from enum
  Aceptado: 'Aceptado',
  Cancelado: 'Cancelado',
  Rechazado: 'Rechazado',
  Pendiente: 'Pendiente',
  Hecho: 'Hecho',

  // Patient future appointments
  futureAppointments: 'Próximos turnos',
  cancelAppointment: 'Cancelar turno',

  // New appointment
  dateTime: 'Día y horario',
  confirmation: 'Confirmación',
  filterSpecialties: 'Filtrar especialidades',
  filterDoctors: 'Filtrar doctores',
  daysAvailable: 'Días disponibles',
  nextAvailableSlot: 'Próximo turno disponible',
  day: 'Día',
  hour: 'Hora',
  registerAppointment: 'Registrar turno',
  selectAnotherDay: 'Seleccione otro dia y fecha para su turno',
  selectHour: 'Seleccione un horario',
  nextAvailableLabel: 'El próximo turno disponible un',
  nextAvailableLabelSecond: 'es para la fecha',
  confirmationTitle: 'Constancia de confirmación. Clínica online',
  confirmationLabel: '¡Turno confirmado!',
  confirmationHelp: 'Su turno ha sido confirmado. Presione en el botón debajo para descargar la constancia',
  downloadConfirmation: 'Descargar constancia',

  // Days (from enum)
  Lunes: 'Lunes',
  Martes: 'Martes',
  Miercoles: 'Miercoles',
  Jueves: 'Jueves',
  Viernes: 'Viernes',
  Sabado: 'Sabado',

  // Staff schedule
  from: 'Desde',
  to: 'Hasta',
  submit: 'Actualizar',

  // Staff appointments
  accept: 'Aceptar',
  reject: 'Rechazar',
  cancel: 'Cancelar',

  // Attend appointment
  notesOnPatient: 'Nota sobre el paciente',
  questionsOnPatient: 'Encuesta sobre el paciente',
  firstQuestion: 'Del 1 al 10, ¿qué tan frecuente es el paciente en sus visitas?',
  secondQuestion: 'Del 1 al 10, ¿qué tan puntual es el paciente?',
  age: 'Edad',
  bloodPressure: 'Presión sanguínea',
  temperature: 'Temperatura',
  additionalData: 'Información adicional',
  itemName: 'Dato',
  itemValue: 'Observación',
  endAppointment: 'Finalizar turno',

  // Appointment details
  detailsTitle: 'Detalles del turno',
  doctorsReview: 'Reseña del doctor',
  doctorsQuestions: 'Encuesta del doctor',
  patientQuestions: 'Encuesta del paciente',
  firstPatientQuestion: 'Del 1 al 10, ¿qué puntaje le daría a la comunicación del doctor? ',
  secondPatientQuestion: 'Del 1 al 10, ¿qué tan puntual es el doctor?',
  pendingPatientQuestions: 'El paciente aún no ha cargado la encuesta de satisfacción',
  patientComments: 'Comentario del paciente',
  pendingPatientComments: 'No hay un comentario sobre este turno',

  // Patient's review
  patientReviewTitle: 'Dejar una reseña',
  patientReview: 'Reseña del paciente',
  questionsLabel: 'Encuesta sobre el profesional',
  registerReview: 'Registrar encuesta'
}

export const english = {
  // User card
  welcome: 'Welcome',
  enabled: 'You have been enabled to use this site',
  pendingApproval: 'You have not yet been approved by an admin',
  pendingVerification: 'You have not yet verified your email address',
  registeredAs: 'You are registered as',

  // User types (from enum)
  Staff: 'staff',
  Patient: 'patient',
  Admin: 'admin',

  // Cards
  navigate: 'Navigate',

  // Patient home cards
  newAppointmentTitle: 'Request an appointment',
  newAppointmentContent: 'Request a new appointment with a professional',
  pendingAppointmentsTitle: 'See pending appointments',
  pendingAppointmentsContent: 'See all pending appointments',
  pastAppointmentsTitle: 'See past appointments',
  pastAppointmentsContent: 'See all appointments with date before today',

  // Staff home cards
  specialtyAddTitle: 'Add an specialty',
  specialtyAddContent: 'Add a medical specialty to the existing ones',
  workingHoursTitle: 'Set working hours',
  workingHoursContent: 'See and modify current working hours',
  staffAppointmentsTitle: 'See appointments',
  staffAppointmentsContent: 'See past appointments, accept or reject pending appointments',
  attendAppointmentTitle: 'Attend an appointment',
  attendAppointmentContent: 'Attend an appointment and add a review',
  reportsTitle: 'Reports',
  reportsContent: 'Generate reports from activities and appointments stats',

  // Admin home cards
  staffApprovalTitle: 'Approve staff members',
  staffApprovalContent: 'See list of staff members pending approval',
  adminAddTitle: 'Add an admin',
  adminAddContent: 'Add an amin user to the system',

  // Navbar
  notifications: 'No new notifications',

  // Login
  login: 'Login',
  loginButton: 'Login',
  email: 'Email',
  password: 'Password',
  forgotPassword: 'Forgot your password?',
  register: 'Register',
  testUsers: 'Test users',

  // Register
  registerAsUser: 'Register as user',
  registerAsStaff: 'Register as professional',
  name: 'Name',
  surname: 'Surname',
  profilePictures: 'Select profile pictures',
  specialties: 'Select specialties',

  // Staff approval
  approve: 'Approve',
  noPendingApprovals: 'No professionals left to approve',

  // Specialty add
  existingSpecialties: 'Existing specialties',
  addSpecialty: 'Add specialty',
  specialty: 'Specialty',

  // Reports
  loginReport: 'Login report',
  specialtyReport: 'Specialties report',
  weekdaysReport: 'Weekdays report',
  reportsHelp: 'Press on any of the options to download the reports on PDF and Excel format',
  appointmentDataSearch: 'Appointment data search',
  searchHelp: 'Only completed appointments. Press on one to see the details.',

  // Appointment search
  patient: 'Patient',
  doctor: 'Doctor',
  date: 'Date',
  clinicalData: 'Clinical data',

  // Patient past appointments
  filterByState: 'Filter appointments by state',
  state: 'State',
  select: 'Select',
  emptyList: 'No appointments to show',
  seeDetails: 'See details',
  leaveReview: 'Leave review',

  //Appointment states, from enum
  Aceptado: 'Accepted',
  Cancelado: 'Cancelled',
  Rechazado: 'Rejected',
  Pendiente: 'Pending',
  Hecho: 'Done',

  // Patient future appointments
  futureAppointments: 'Future appointments',
  cancelAppointment: 'Cancel appointment',

  // New appointment
  dateTime: 'Date and time',
  confirmation: 'Confirmation',
  filterSpecialties: 'Filter specialties',
  filterDoctors: 'Filter doctors',
  daysAvailable: 'Available days',
  nextAvailableSlot: 'Nexy available slot',
  day: 'Day',
  hour: 'Time',
  registerAppointment: 'Register appointment',
  selectAnotherDay: 'Select a different date and time',
  selectHour: 'Select a time of the day',
  nextAvailableLabel: 'The next available slot on a',
  nextAvailableLabelSecond: 'is for',
  confirmationTitle: 'Confirmation ticket. Online clinic.',
  confirmationLabel: '¡Appointment confirmed!',
  confirmationHelp: 'Your appointment has been confirmed. Press the button below to download the ticket',
  downloadConfirmation: 'Download confirmation',

  // Days (from enum)
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miercoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sabado: 'Saturday',

  // Staff schedule
  from: 'From',
  to: 'To',
  submit: 'Update',

  // Staff appointments
  accept: 'Accept',
  reject: 'Reject',
  cancel: 'Cancel',

  // Attend appointment
  notesOnPatient: 'Note on the patient',
  questionsOnPatient: 'Questions on the patient',
  firstQuestion: 'From 1 to 10, how frequent are the patient\'s visits?',
  secondQuestion: 'From 1 to 10, how punctual is the patient?',
  age: 'Age',
  bloodPressure: 'Blood pressure',
  temperature: 'Temperature',
  additionalData: 'Additional data',
  itemName: 'Data',
  itemValue: 'Observation',
  endAppointment: 'End appointment',

  // Appointment details
  detailsTitle: 'Appointment details',
  doctorsReview: 'Doctor\'s review',
  doctorsQuestions: 'Doctor\'s questions',
  patientQuestions: 'Patient\'s questions',
  firstPatientQuestion: 'From 1 to 10, how would you rate the doctor\'s communication skills?',
  secondPatientQuestion: 'From 1 to 10, how punctual is the doctor?',
  pendingPatientQuestions: 'The patient has not yet answered the questions',
  patientComments: 'Patient comments',
  pendingPatientComments: 'There are no comments on this appointment',

  // Patient's review
  patientReviewTitle: 'Leave a review',
  patientReview: 'Patient\'s review',
  questionsLabel: 'Questions about the doctor',
  registerReview: 'Register review'

}

export const portuguese = {
  // User card
  welcome: 'Bem-vinda',
  enabled: 'Você está autorizado a usar o site',
  pendingApproval: 'Você ainda não foi aprovado por um administrador',
  pendingVerification: 'Você ainda não verificou seu e-mail',
  registeredAs: 'Você está registrado como',

  // User types (from enum)
  Staff: 'médico',
  Patient: 'paciente',
  Admin: 'admin',

  // Cards
  navigate: 'Navegar',

  // Patient home cards
  newAppointmentTitle: 'Solicite um turno',
  newAppointmentContent: 'Solicite uma nova consulta com um profissional',
  pendingAppointmentsTitle: 'Turnos pendentes',
  pendingAppointmentsContent: 'Veja todos os turnos pendentes',
  pastAppointmentsTitle: 'Turnos anteriores',
  pastAppointmentsContent: 'Veja todos os turnos anteriores à data de hoje',

  // Staff home cards
  specialtyAddTitle: 'Adicionar especialidade',
  specialtyAddContent: 'Adicione uma especialidade médica',
  workingHoursTitle: 'Definir horário comercial',
  workingHoursContent: 'Visualize e modifique os dias e horários de funcionamento',
  staffAppointmentsTitle: 'Ver turnos',
  staffAppointmentsContent: 'Ver turnos anteriores, aceitar ou recusar turnos pendentes',
  attendAppointmentTitle: 'Atender paciente',
  attendAppointmentContent: 'Sirva um paciente, adicione uma revisão e preencha a pesquisa',
  reportsTitle: 'Relatórios',
  reportsContent: 'Gere relatórios de turnos e atividades. Pesquise informações de turno.',

  // Admin home cards
  staffApprovalTitle: 'Aprovar profissionais',
  staffApprovalContent: 'Veja a lista de profissionais com aprovação pendente',
  adminAddTitle: 'Adicionar administrador',
  adminAddContent: 'Adicionar um administrador ao sistema',

  // Navbar
  notifications: 'Não há notificações para exibir',

  // Login
  login: 'Entrada',
  loginButton: 'Entrar',
  email: 'Correio eletrônico',
  password: 'Senha',
  forgotPassword: 'esqueceu sua senha?',
  register: 'Registrar',
  testUsers: 'Usuários de teste',

  // Register
  registerAsUser: 'Cadastre-se como usuário',
  registerAsStaff: 'Cadastre-se como profissional',
  name: 'Nome',
  surname: 'Sobrenome',
  profilePictures: 'Selecione as fotos do perfil',
  specialties: 'Selecione as especialidades',

  // Staff approval
  approve: 'Aprovar',
  noPendingApprovals: 'Não há profissionais não aprovados',

  // Specialty add
  existingSpecialties: 'Especialidades existentes',
  addSpecialty: 'Adicionar especialidade',
  specialty: 'Especialidade',

  // Reports
  loginReport: 'Relatório de registro',
  specialtyReport: 'Relatório de especialidades',
  weekdaysReport: 'Relatório de dias da semana',
  reportsHelp: 'Clique em qualquer uma das opções para baixar relatórios em Excel e PDF',
  appointmentDataSearch: 'Busca de informação',
  searchHelp: 'Apenas turnos concluídos. Clique em um para ver os detalhes.',

  // Appointment search
  patient: 'Paciente',
  doctor: 'Doctor',
  date: 'Encontro',
  clinicalData: 'Dados clínicos',

  // Patient past appointments
  filterByState: 'Filtrar mudanças por status',
  state: 'Estado',
  select: 'Selecionar',
  emptyList: 'Sem turnos para mostrar',
  seeDetails: 'Veja detalhes',
  leaveReview: 'Deixe um comentário',

  //Appointment states, from enum
  Aceptado: 'Aceitaram',
  Cancelado: 'Cancelado',
  Rechazado: 'Rejeitado',
  Pendiente: 'Pendente',
  Hecho: 'Feito',

  // Patient future appointments
  futureAppointments: 'Próximos turnos',
  cancelAppointment: 'Cancelar turno',

  // New appointment
  dateTime: 'Dia e hora',
  confirmation: 'Confirmação',
  filterSpecialties: 'Filtrar especialidades',
  filterDoctors: 'Filtrar doutores',
  daysAvailable: 'Dias disponíveis',
  nextAvailableSlot: 'Próximo turno disponível',
  day: 'Dia',
  hour: 'Tempo',
  registerAppointment: 'Mudança de registro',
  selectAnotherDay: 'Selecione outro dia e data para o seu turno',
  selectHour: 'Selecione uma programação',
  nextAvailableLabel: 'O próximo turno disponível a',
  nextAvailableLabelSecond: 'é para o encontro',
  confirmationTitle: 'Certificado de confirmação. Clínica Online',
  confirmationLabel: 'Turno confirmado!',
  confirmationHelp: 'Sua vez foi confirmada. Clique no botão abaixo para baixar o certificado',
  downloadConfirmation: 'Baixar certificado',

  // Days (from enum)
  Lunes: 'Segunda-feira',
  Martes: 'Terça-feira',
  Miercoles: 'Quarta feira',
  Jueves: 'Quinta feira',
  Viernes: 'Sexta-feira',
  Sabado: 'Sábado',

  // Staff schedule
  from: 'Desde a',
  to: 'Até',
  submit: 'Atualizar',

  // Staff appointments
  accept: 'Aceitar',
  reject: 'Recusar',
  cancel: 'Cancelar',

  // Attend appointment
  notesOnPatient: 'Nota sobre o paciente',
  questionsOnPatient: 'Pesquisa de paciente',
  firstQuestion: 'De 1 a 10, qual a frequência do paciente em suas consultas?',
  secondQuestion: 'De 1 a 10, quão pontual é o paciente?',
  age: 'Era',
  bloodPressure: 'Pressão sanguínea',
  temperature: 'Temperatura',
  additionalData: 'Informação adicional',
  itemName: 'Facto',
  itemValue: 'Observação',
  endAppointment: 'Turno final',

  // Appointment details
  detailsTitle: 'Detalhes de turno',
  doctorsReview: 'Revisão do médico',
  doctorsQuestions: 'Pesquisa médica',
  patientQuestions: 'Pesquisa de paciente',
  firstPatientQuestion: 'De 1 a 10, que nota você daria para a comunicação do médico?',
  secondPatientQuestion: 'De 1 a 10, quão pontual é o médico?',
  pendingPatientQuestions: 'O paciente ainda não fez upload da pesquisa de satisfação',
  patientComments: 'Comentário do paciente',
  pendingPatientComments: 'Não há comentários sobre esta mudança',

  // Patient's review
  patientReviewTitle: 'Deixe um comentário',
  patientReview: 'Visão geral do paciente',
  questionsLabel: 'Pesquisa sobre o profissional',
  registerReview: 'Registrar pesquisa'
}
