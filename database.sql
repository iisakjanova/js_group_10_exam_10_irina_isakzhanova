DROP DATABASE IF EXISTS exam10;

CREATE DATABASE IF NOT EXISTS exam10;

USE exam10;

CREATE TABLE posts
(
	id int auto_increment,
	title varchar(255) not null,
	content text not null,
	image varchar(255) null,
	datetime datetime not null,
	constraint posts_pk
		primary key (id)
);

CREATE TABLE comments
(
	id int auto_increment,
	post_id int not null,
	author varchar(255) not null,
	content text not null,
	constraint comments_pk
		primary key (id),
	constraint comments_posts_id_fk
		foreign key (post_id) references posts (id)
			on update cascade on delete cascade
);

INSERT INTO posts (title, content, datetime, image)
VALUES ('Post 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit vel vero. Accusamus, beatae consequuntur cumque ', '2021-10-19 20:14:10', 'image1.jpg'),
       ('Post 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit vel vero. Accusamus, beatae consequuntur cumque ', '2021-10-19 20:15:10', 'image2.jpg'),
       ('Post 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit vel vero. Accusamus, beatae consequuntur cumque ', '2021-10-19 20:16:10', 'image3.jpg');

INSERT INTO comments (author, content, post_id)
VALUES ('somebody', 'Lorem ipsum dolor sit amet', 1),
       ('somebody2', 'Lorem ipsum dolor sit amet', 1),
       ('Anonymous', 'Lorem ipsum dolor sit amet', 1);
