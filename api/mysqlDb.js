const mysql = require('mysql2/promise');
const dayjs = require('dayjs');

const config = require('./config');

let connection = null;

const posts = 'posts';

module.exports = {
    connect: async () => {
        connection = await mysql.createConnection(config.databaseOptions);
        console.log(`Connected! id=${connection.threadId}`);
    },
    getConnection: () => connection,

// Posts
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
};
