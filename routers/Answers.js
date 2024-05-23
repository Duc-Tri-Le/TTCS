const express = require("express");
const router = express.Router();
const answerDB = require("../models/Answer");
const mongoose = require("mongoose")

router.post("/", async (req, res) => {
  const answerData = new answerDB({
    question_id: req.body.question_id,
    answer: req.body.answer,
    user: req.body.user,
  });

  await answerData
    .save()
    .then((doc) => {
      res.status(201).send({
        status: true,
        data: doc
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: "Answer not added successfully",
      });
    });
});
router.get('/', async (req, res) => {
})
module.exports = router;