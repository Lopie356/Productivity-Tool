const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const sessions = [];

app.post("/api/session", (req, res) => {
    const { sessionName, description } = req.body;

    if (!sessionName || !description) {
        return res.status(400).json({ message: "Session name and description are required" });
    }

    const newSession = {
        id: uuidv4(),
        sessionName,
        description,
        duration: null,
    };

    sessions.push(newSession);
    res.status(201).json(newSession);
});

app.post("/api/session/casual", (req, res) => {
    const casualSession = {
        id: uuidv4(),
        sessionName: "Casual Session",
        description: "User has selected a casual session",
        duration: 30,
    };

    sessions.push(casualSession);
    res.status(201).json(casualSession);
});

app.get("/api/session/:sessionId", (req, res) => {
    const { sessionId } = req.params;
    const session = sessions.find((s) => s.id === sessionId);

    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));