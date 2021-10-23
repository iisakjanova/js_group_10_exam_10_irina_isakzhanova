const express = require('express');
const cors = require('cors');

const posts = require('./app/posts');
const comments = require('./app/comments');

const mysqlDb = require('./mysqlDb');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/news', posts);
app.use('/comments', comments);

app.use(express.static('public'));

mysqlDb.connect().catch(e => console.log(e));

app.listen(port, () => {
    console.log('We are live in ' + port);
});