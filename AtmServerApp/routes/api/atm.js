const express = require("express");
const router = express.Router();

// Atm model
const atm = require("../../models/atm");

// @route   GET api
// @desc    Get all Atms
router.get("/", (req, res) => {
  atm
    .find()
    .sort({ date: -1 })
    .then(atm => res.json(atm))
    .catch(err => res.status(404).json({ noatmsfound: "No atms found" }));
});

// @route   POST api/atm
// @desc    Create Atm
router.post("/", (req, res) => {
  Atm.findOne({ id: req.body.id }).then(atm => {
    if (atm) res.json("Atm c с таким id уже есть");
    else {
      const newAtm = new Atm({
        id: req.body.id,
        servicingTime: req.body.servicingTime,
        timeGap: req.body.timeGap,
        count: 0
      });
      console.log(newAtm.id);
      newAtm.save().then(atm => res.json(atm));
    }
  });
});

// @route   DELETE api/atm/:id
// @desc    Delete atm
router.delete("/:id", (req, res) => {
  Atm.findOne({ id: req.params.id })
    .then(atm => atm.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/atm/change/:id/:increment
// @desc    Increase atm
router.post("/change/:id/:increment", (req, res) => {
  Atm.findOne({ id: req.params.id })
    .then(atm => {
      atm.count += parseInt(req.params.increment);
      atm.save().then(post => res.status(200).json(post));
    })
    .catch(err => res.status(404).json({ atmnotfound: "No atm found" }));
});

module.exports = router;
