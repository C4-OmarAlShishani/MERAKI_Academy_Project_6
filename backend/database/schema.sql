-- DROP DATABASE MERAKI_Academy_Project_6;
-- CREATE DATABASE MERAKI_Academy_Project_6;
CREATE DATABASE MERAKI_Academy_Project_6;

USE MERAKI_Academy_Project_6;

-- ============================ // done
CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- ============================ // done
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- ============================ // done 
CREATE TABLE role_permission (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role INT NOT NULL,
    permission INT NOT NULL,
    FOREIGN KEY (role) REFERENCES roles (id),
    FOREIGN KEY (permission) REFERENCES permissions (id)
);

-- ============================ // done
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firsName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    image VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

-- user name VARCHAR(100),
-- ============================ // done
CREATE TABLE albums (
    id INT AUTO_INCREMENT NOT NULL,
    album VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
     is_deleted TINYINT DEFAULT 0
);

-- ============================ // done
CREATE TABLE videos (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    descriptions VARCHAR(255),
    album_id INT,
    video VARCHAR(250) NOT NULL,
    user_id INT,
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);

-- ============================ // done 
CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    comment VARCHAR(255),
    video_id INT NOT NULL,
    commentr_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (video_id) REFERENCES videos (id),
    FOREIGN KEY (commentr_id) REFERENCES users (id)
);

INSERT INTO
    roles (role)
VALUES
    ('Admin');

INSERT INTO
    roles (role)
VALUES
    ('User');

INSERT INTO
    permissions (permission)
VALUES
    ('create');

INSERT INTO
    permissions (permission)
VALUES
    ('read');

INSERT INTO
    permissions (permission)
VALUES
    ('update');

INSERT INTO
    permissions (permission)
VALUES
    ('delete');

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 1);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 2);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 3);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 4);

INSERT INTO
    role_permission (role, permission)
VALUES
    (2, 1);

INSERT INTO
    role_permission (role, permission)
VALUES
    (2, 3);

INSERT INTO
    albums (album) VALUE ('Music');

INSERT INTO
    albums (album) VALUE ('Favorite');