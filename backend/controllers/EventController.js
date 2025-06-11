import Event from '../models/EventModel.js';
import User from '../models/UserModel.js';

// Create / Upload a new event
const uploadEvent = async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
        const newEvent = new Event({ title, description, date, location });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ error: "Error creating event", details: error.message });
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (events && events.length > 0) {
            return res.status(200).json({ message: "Events fetched successfully", events });
        }
        return res.status(404).json({ error: "No events found" });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching events", details: error.message });
    }
};

// Get event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Fetch attendee details
    const attendees = await User.find({ _id: { $in: event.attendees } }).select("name email phone");

    return res.status(200).json({ message: "Event fetched successfully", event, attendees });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching event", details: error.message });
  }
};

const registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) return res.status(404).json({ error: "User or Event not found" });

    // Avoid duplicates
    if (!user.events.includes(eventId)) {
      user.events.push(eventId);
      await user.save();
    }

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    res.status(200).json({ message: "User registered for event successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering for event", details: error.message });
  }
};

export { uploadEvent, getEventById, getEvents, registerForEvent };
