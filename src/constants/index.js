const MINIKUBE_IP = "192.168.49.2";
// const AUTH_BASE_URL = `http://localhost:3001`;
const AUTH_BASE_URL = `http://${MINIKUBE_IP}:30001`;
// const BOOKING_BASE_URL = `http://localhost:3004`;
const BOOKING_BASE_URL = `http://${MINIKUBE_IP}:30004`;

export const BASE_URL =
  "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend";

export const MENU_URL = `http://${MINIKUBE_IP}:30002/menu`;
export const RECOMMENDATIONS_URL = `http://${MINIKUBE_IP}:30003/recommendations`;

export const REGISTER_URL = `${AUTH_BASE_URL}/register`;
export const LOGIN_URL = `${AUTH_BASE_URL}/login`;
export const DELETE_ACCOUNT_URL = `${AUTH_BASE_URL}/deleteUser`;

export const GET_ALL_SCHEDULED_URL = `${BOOKING_BASE_URL}/allScheduleSlots`;
export const GET_AVAILABLE_SLOTS_URL = `${BOOKING_BASE_URL}/availableScheduleSlots`;
export const GET_USER_SCHEDULED_URL = `${BOOKING_BASE_URL}/userScheduleSlots`;
export const GET_BOOKED_SCHEDULES_URL = `${BOOKING_BASE_URL}/bookedScheduleSlots`;
export const DELETE_SCHEDULE_URL = `${BOOKING_BASE_URL}/deleteScheduleSlot`;
export const CANCEL_SCHEDULE_URL = `${BOOKING_BASE_URL}/cancelScheduleSlot`;
export const BOOK_SCHEDULE_URL = `${BOOKING_BASE_URL}/bookScheduleSlot`;
export const UPDATE_QUANTITY_URL = `${BOOKING_BASE_URL}/updateScheduleSlotQuantity`;
export const CREATE_SCHEDULE_URL = `${BOOKING_BASE_URL}/createScheduleSlot`;

//-------------------------------------

export const SUGGESTIONS_URL = `${BASE_URL}/suggestions`;
export const GET_FEEDBACK_URL = `${BASE_URL}/getFeedback`;
export const SEND_FEEDBACK_URL = `${BASE_URL}/sendFeedback`;

export const GET_USER_URL = `${BASE_URL}/getUserById`;
export const RESET_PWD_URL = `${BASE_URL}/resetPassword`;
export const UPDATE_PWD_URL = `${BASE_URL}/updatePassword`;
