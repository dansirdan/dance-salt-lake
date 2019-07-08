DROP DATABASE IF EXISTS react_example;
CREATE DATABASE react_example;

USE react_example;

-- USERS

INSERT INTO `react_example`.`users`
(`id`,
`password`,
`email`,
`createdAt`,
`updatedAt`)
VALUES
(1,
"11111",
"dan@gmail.com",
current_timestamp(),
current_timestamp()
);

INSERT INTO `react_example`.`users`
(`id`,
`password`,
`email`,
`createdAt`,
`updatedAt`)
VALUES
(2,
"11111",
"steve@gmail.com",
current_timestamp(),
current_timestamp()
);

INSERT INTO `react_example`.`users`
(`id`,
`password`,
`email`,
`createdAt`,
`updatedAt`)
VALUES
(3,
"11111",
"ursula@gmail.com",
current_timestamp(),
current_timestamp()
);

-- AUDITIONS

INSERT INTO `react_example`.`auditions`
(`id`,
`title`,
`lookingFor`,
`description`,
`text`,
`address`,
`gig`,
`photoLink`,
`link`,
`length`,
`payment`,
`time`,
`date`,
`url`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(1,
"Dan & Dancers",
"5 Male/Female/Nonbinary Dancers",
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"Eiusmod labore proident minim consequat.",
"10139 Jermey Place",
"6 Month Contract",
"http://lorempixel.com/640/480",
"http://fakeaudition.com",
 60,
"Cash",
current_time(),
current_date(),
"http://fakeaudition.com",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
1);

INSERT INTO `react_example`.`auditions`
(`id`,
`title`,
`lookingFor`,
`description`,
`text`,
`address`,
`gig`,
`photoLink`,
`link`,
`length`,
`payment`,
`time`,
`date`,
`url`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(2,
"Something Feet",
"2 Female Dancers",
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"Eiusmod labore proident minim consequat.",
"10139 Jermey Place",
"6 Weeks",
"http://lorempixel.com/640/480",
"http://fakeaudition.com",
 60,
"Cash",
current_time(),
current_date(),
"http://fakeaudition.com",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
2);

INSERT INTO `react_example`.`auditions`
(`id`,
`title`,
`lookingFor`,
`description`,
`text`,
`address`,
`gig`,
`photoLink`,
`link`,
`length`,
`payment`,
`time`,
`date`,
`url`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(3,
"The Ballet Company",
"1 Male Dancer",
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"Eiusmod labore proident minim consequat.",
"10139 Jermey Place",
"1 Year Contract",
"http://lorempixel.com/640/480",
"http://fakeaudition.com",
 60,
"none",
current_time(),
current_date(),
"http://fakeaudition.com",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
3);

-- CLASSESS

INSERT INTO `react_example`.`classes`
(`id`,
`title`,
`style`,
`master`,
`description`,
`address`,
`instructorName`,
`photoLink`,
`length`,
`level`,
`payment`,
`time`,
`date`,
`url`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(1,
"Jazz Technique",
"Jazz",
1,
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"65711 Shields Loaf",
"Steve",
"http://lorempixel.com/640/480",
 120,
"Advanced",
"35 Cash",
current_time(),
current_date(),
"http://lorempixel.com/640/480",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
1);

INSERT INTO `react_example`.`classes`
(`id`,
`title`,
`style`,
`master`,
`description`,
`address`,
`instructorName`,
`photoLink`,
`length`,
`level`,
`payment`,
`time`,
`date`,
`url`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(2,
"Ballet Technique",
"Ballet",
0,
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"65711 Shields Loaf",
"Steve",
"http://lorempixel.com/640/480",
 120,
"Advanced",
"35 Cash",
current_time(),
current_date(),
"http://lorempixel.com/640/480",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
2);

INSERT INTO `react_example`.`classes`
(`id`,
`title`,
`style`,
`master`,
`description`,
`address`,
`instructorName`,
`photoLink`,
`length`,
`level`,
`payment`,
`time`,
`date`,
`url`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(3,
"Improvisation",
"Contact Improv",
1,
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"65711 Shields Loaf",
"Ursula",
"http://lorempixel.com/640/480",
 120,
"Beginner",
"35 Cash",
current_time(),
current_date(),
"http://lorempixel.com/640/480",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
3);

-- PERFORMANCES

INSERT INTO `react_example`.`performances`
(`id`,
`title`,
`description`,
`address`,
`price`,
`photoLink`,
`length`,
`payment`,
`time`,
`date`,
`url`,
`special`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(1,
"Ririe-Woodbury Fall Season",
"Laborumort excepteur. Proident deserunt ullamco elit duis mollit sint dolore mollit dolor excepteur enim elit veniam officia.",
"10139 Jermey Place",
35,
"http://lorempixel.com/640/480",
 60,
 "cash, card, check",
current_time(),
current_date(),
"http://fakeaudition.com",
"Lorem Ipsumm something special",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
1);

-- SPACE

INSERT INTO `react_example`.`spaces`
(`id`,
`name`,
`rate`,
`location`,
`squareFootage`,
`url`,
`numPeople`,
`createdAt`,
`updatedAt`,
`UserId`)
VALUES
(1,
"Ririe-Woodbury",
35,
"10139 Jermey Place",
50,
"http://fakeaudition.com",
25,
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
1);
