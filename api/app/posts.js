const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const mysqlDb = require('../mysqlDb');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).send({"error": "Incorrect data"});
    }

    const post = {
        title: req.body.title,
        content: req.body.content,
    };

    if (req.file) {
        post.image = req.file.filename;
    }

    const newData = await mysqlDb.addPost(post);

    res.send({
        ...post,
        id: newData.insertId,
    });
});

module.exports = router;