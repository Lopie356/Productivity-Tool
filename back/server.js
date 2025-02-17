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
    sessionName: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, default: null },
});

const Session = mongoose.model("Session", sessionSchema);

app.post("/api/session", async (req, res) => {
    const { sessionName, description } = req.body;

    if (!sessionName || !description) {
        return res.status(400).json({ message: "Session name and description are required" });
    }

    const newSession = new Session({
        sessionId: uuidv4(),
        sessionName,
        description,
    });

    try {
        await newSession.save();
        res.status(201).json(newSession);
    } catch (err) {
        res.status(500).json({ message: "Error creating session", error: err });
    }
});

app.post("/api/session/casual", async (req, res) => {
    const casualSession = new Session({
        sessionId: uuidv4(),
        sessionName: "Casual Session",
        description: "User has selected a casual session",
        duration: 30,
    });

    try {
        await casualSession.save();
        res.status(201).json(casualSession);
    } catch (err) {
        res.status(500).json({ message: "Error creating casual session", error: err });
    }
});

// 5️⃣ Get session details
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
