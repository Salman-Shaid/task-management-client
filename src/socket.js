import { io } from 'socket.io-client';

const socket = io('https://task-management-server-j8t7.onrender.com'); // Adjust URL if needed
export default socket;
