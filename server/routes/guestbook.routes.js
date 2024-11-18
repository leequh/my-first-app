const express = require('express');
const router = express.Router();
const Guestbook = require('../models/Guestbook');

// 모든 방명록 가져오기
router.get('/', async (req, res) => {
  try {
    const entries = await Guestbook.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 새 방명록 작성하기
router.post('/', async (req, res) => {
  const entry = new Guestbook({
    name: req.body.name,
    message: req.body.message,
    rating: req.body.rating
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 방명록 수정하기
router.put('/:id', async (req, res) => {
  try {
    const entry = await Guestbook.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: '방명록을 찾을 수 없습니다.' });

    if (req.body.name) entry.name = req.body.name;
    if (req.body.message) entry.message = req.body.message;
    if (req.body.rating) entry.rating = req.body.rating;

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 방명록 삭제하기
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Guestbook.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: '방명록을 찾을 수 없습니다.' });

    await entry.deleteOne();
    res.json({ message: '방명록이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
