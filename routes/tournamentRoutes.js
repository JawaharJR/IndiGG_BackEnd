const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");

// Create a new tournament
router.post("/create", async (req, res) => {
  try {
    const newTournament = await Tournament.create(req.body);
    res.status(201).json(newTournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tournaments
router.get("/list", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add participants to a tournament
router.post("/:tournamentId/participants", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.tournamentId);
    if (!tournament) throw new Error("Tournament not found");

    const participantId = req.body.participantId; // Assuming you send the participant's ID
    tournament.participants.push(participantId);
    await tournament.save();

    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a tournament by ID
router.put("/:tournamentId", async (req, res) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.tournamentId,
      req.body,
      { new: true }
    );
    res.json(updatedTournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a tournament by ID
router.delete("/:tournamentId", async (req, res) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(
      req.params.tournamentId
    );
    res.json(deletedTournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View a tournament by ID
router.get("/:tournamentId", async (req, res) => {
  try {
    const tournament = await Tournament.findById(
      req.params.tournamentId
    ).populate("participants");
    if (!tournament) throw new Error("Tournament not found");
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
