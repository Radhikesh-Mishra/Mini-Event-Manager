import e, { json, urlencoded } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { getEventById, getEvents, uploadEvent, registerForEvent } from './controllers/EventController.js';
import { signIn, loginUser } from './controllers/UserController.js';

const app = e();

mongoose.connect('mongodb://127.0.0.1:27017/WarpBay')
    .then(() => console.log('Mongodb connected'));

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());

app.post('/signIn', signIn);
app.post('/login', loginUser);
app.get('/getEvents', getEvents);
app.get('/getEvent/:id', getEventById);
app.post('/uploadEvent', uploadEvent);
app.post('/registerEvent/:eventId', registerForEvent);

app.listen(9000, () => {
    console.log(`Server is running`);
});