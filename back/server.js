const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    activityMinutes: { type: Number, required: true },
    targetMinutes: { type: Number, required: true },
    completedTasks: { type: Number, required: true },
    totalTasks: { type: Number, required: true },
    mood: { type: String, required: true },
    score: { type: Number, required: true },
});

const Session = mongoose.model("Session", sessionSchema);

app.post("/api/session", async (req, res) => {
    const { date, time, duration, activityMinutes, targetMinutes, completedTasks, totalTasks, mood } = req.body;

    if (!date || !time || !duration || !activityMinutes || !targetMinutes || !completedTasks || !totalTasks || !mood) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const activityRatio = targetMinutes > 0 ? activityMinutes / targetMinutes : 0;
    const taskRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;
    
    const score = Math.round(activityRatio * taskRatio * duration * 100);

    const newSession = new Session({
        sessionId: uuidv4(),
        date,
        time,
        duration,
        activityMinutes,
        targetMinutes,
        completedTasks,
        totalTasks,
        mood,
        score,
    });

    try {
        await newSession.save();
        res.status(201).json(newSession);
    } catch (err) {
        res.status(500).json({ message: "Error creating session", error: err });
    }
});

app.get("/api/session/:sessionId", async (req, res) => {
    const { sessionId } = req.params;
    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: "Error fetching session", error: err });
    }
});

app.get("/api/sessions", async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching sessions", error: err });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));