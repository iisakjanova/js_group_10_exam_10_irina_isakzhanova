const mysql = require('mysql2/promise');
const dayjs = require('dayjs');

const config = require('./config');

let connection = null;

const posts = 'posts';
const comments = 'comments';

module.exports = {
    connect: async () => {
        connection = await mysql.createConnection(config.databaseOptions);
        console.log(`Connected! id=${connection.threadId}`);
    },
    getConnection: () => connection,

// Posts
    async getPosts() {
        try {
            const [data] = await this.getConnection().query(
                'SELECT ??, ??, ??, ?? FROM ??',
                ['id', 'title', 'image', 'datetime', posts]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async getPostById(id) {
        try {
            const [data] = await this.getConnection().query(
                `SELECT * FROM ?? WHERE id = ?`,
                [posts, id]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async addPost(post) {
        post.datetime = dayjs().format('YYYY-MM-DDTHH:mm:ss');

        try {
            const data = await this.getConnection().query(
                `INSERT INTO ?? (title, content, image, datetime) 
                VALUES (?, ?, ?, ?)`,
                [posts, post.title, post.content, post.image, post.datetime,]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async deletePost(id) {
        try {
            const [data] = await this.getConnection().query(
                'DELETE FROM ?? WHERE id = ?',
                [posts, id]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },

// Comments
    async getComments(id = null) {
        try {
            let data;

            if (!id) {
                [data] = await this.getConnection().query(
                    'SELECT * FROM ??',
                    [comments]
                );
            } else {
                [data] = await this.getConnection().query(
                    'SELECT * FROM ?? WHERE post_id = ?',
                    [comments, id]
                );
            }

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async addComment(comment) {
        try {
            const data = await this.getConnection().query(
                'INSERT INTO ?? (post_id, author, content) VALUES (?, ?, ?)',
                [comments, comment.post_id, comment.author, comment.content]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async deleteComment(id) {
        try {
            const [data] = await this.getConnection().query(
                'DELETE FROM ?? WHERE id = ?',
                [comments, id]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
};
