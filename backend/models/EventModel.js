import { Schema, model } from 'mongoose';

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true 
    },
    attendees: {
        type: [],
    },
    location: {
        type: String,
        required: true,
    }
});

const EventModel = model('Event', EventSchema);

export default EventModel;