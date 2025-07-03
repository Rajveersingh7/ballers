const express = require("express");
const Data = require("../models/dataModel");
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");
const cloudinary = require("../utils/cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cardValidation = require("../middlewares/cardValidation");

const router = express.Router();

// Set up multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ballers_cards",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});
const upload = multer({storage: storage});

// create
router.post(
  "/",
  auth,
  upload.single("image"),
  cardValidation,
  async (req, res) => {
    const {
      name,
      position,
      pace,
      dribbling,
      shooting,
      defending,
      passing,
      physicality,
      overall
    } = req.body;
    try {
      const image = req.file ? req.file.path : "";
      const playerAdded = await Data.create({
        name,
        position,
        pace,
        dribbling,
        shooting,
        defending,
        passing,
        physicality,
        overall,
        image,
        createdBy: req.user.id
      });
      res.status(201).json(playerAdded);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
);

// read all
router.get("/my-cards", auth, async (req, res) => {
  try {
    const cards = await Data.find({createdBy: req.user.id});
    res.status(200).json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

// update
router.patch("/:id", auth, cardValidation, async (req, res) => {
  const {id} = req.params;
  try {
    const card = await Data.findById(id);
    if (!card) return res.status(404).json({error: "Card not found"});
    if (card.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({error: "Not authorized to update this card"});
    }
    const updatePlayer = await Data.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.status(200).json(updatePlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

// delete
router.delete("/:id", auth, async (req, res) => {
  const {id} = req.params;
  try {
    const card = await Data.findById(id);
    if (!card) return res.status(404).json({error: "Card not found"});

    if (card.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({error: "Not authorized to delete this card"});
    }

    await card.deleteOne();
    res.status(200).json({message: "Card deleted"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
