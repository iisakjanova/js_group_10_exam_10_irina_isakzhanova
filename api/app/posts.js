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

router.get('/', async (req, res) => {
    const data = await mysqlDb.getPosts();
    res.send(data);
});

router.get('/:id', async (req, res) => {
    const data = await mysqlDb.getPostById(req.params.id);

    if(!data) {
        return res.status(404).send({error: 'Post is not found'});
    }

    res.send(data);
});

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

router.delete('/:id', async (req, res) => {
    const data = await mysqlDb.deletePost(req.params.id);

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Post is not found'});
    }

    res.send({message: `id = ${req.params.id} deleted successfully!`});
});


module.exports = router;