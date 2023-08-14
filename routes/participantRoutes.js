const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

router.post("/create", async (req, res) => {
  try {
    const newParticipant = await Participant.create(req.body);
    res.status(201).json(newParticipant);
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
    res.json({ message: "Tournament deleted", deletedTournament });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get participants of a tournament by ID
router.get("/:tournamentId/participants", async (req, res) => {
  try {
    const tournament = await Tournament.findById(
      req.params.tournamentId
    ).populate("participants");
    if (!tournament) throw new Error("Tournament not found");
    res.json(tournament.participants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get tournaments based on status 
router.get("/status/:status", async (req, res) => {
  try {
    const tournaments = await Tournament.find({ status: req.params.status });
    res.json(tournaments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
