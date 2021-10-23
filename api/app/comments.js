const express = require('express');

const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    let data;

    if (req.query.news_id) {
        data = await mysqlDb.getComments(req.query.news_id);
    } else {
        data = await mysqlDb.getComments();
    }

    res.send(data);
});

router.post('/', async (req, res) => {
    if (!req.body.content || !req.body.post_id) {
        return res.status(400).send({"error": "Incorrect data"});
    }

    const comment = {
        post_id: req.body.post_id,
        author: req.body.author || 'Anonymous',
        content: req.body.content,
    };

    const newData = await mysqlDb.addComment(comment);

    res.send({
        ...comment,
        id: newData.insertId,
    });
});

router.delete('/:id', async (req, res) => {
    const data = await mysqlDb.deleteComment(req.params.id);

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Comment is not found'});
    }

    res.send({message: `id = ${req.params.id} deleted successfully!`});
});

module.exports = router;