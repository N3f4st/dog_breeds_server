-- schema
CREATE SCHEMA auth;

-- auth table
CREATE TABLE auth.app_user
(
    id         serial PRIMARY KEY,
    password   VARCHAR(250)       NOT NULL,
    name       VARCHAR(255)       NOT NULL,
    email      varchar(75)        NOT NULL,
    created_at TIMESTAMP          NOT NULL,
    updated_at TIMESTAMP          NOT NULL,
    role_id    int,
    favorite_subbreed  varchar(50),
    favorite_breed  varchar(50)
);

-- mock data
insert into auth.app_user (password, name, email, created_at, updated_at, role_id)
VALUES ('$2a$10$7jLoEmD5yMJm.sURbxOeRe3FJZwUaEkduLEJ0PZa3NkQQn8CuTAXO', 'Juergüen Stefan Herrera', 'jherrera@neardogpund.com', now(), now(), 1);

-- create auth function to prevent sql injection.
CREATE OR REPLACE FUNCTION auth.user_auth (_email varchar(100))
RETURNS TABLE(id int, role_id int, name varchar(255), password varchar(250))
language SQL AS
    $$
        SELECT id, role_id, name, password  from auth.app_user where email = _email;
    $$;

-- create registration procedure
CREATE OR REPLACE PROCEDURE auth.register_user(
    _password varchar (255),
    _name varchar(255),
    _email varchar(75)) AS
    $$
        begin
            INSERT INTO auth.app_user (password, name, created_at, updated_at, role_id, email)
            VALUES (_password, _name, now(), now(), 1, _email);
        end;
    $$ language plpgsql;


-- modifying auth function to recognize username or email.
CREATE OR REPLACE FUNCTION auth.user_auth (uName varchar(100))
RETURNS TABLE(id int, role_id int, name varchar(255), password varchar(255), favoriteSubBreed varchar(250), favoriteBreed varchar(250))
language SQL AS
    $$
        SELECT id, role_id, name, password, favorite_subbreed, favorite_breed  from auth.app_user where email = uName;
    $$;


CREATE OR REPLACE FUNCTION auth.getUsersQuantity (_userOrEmail varchar(255))
RETURNS TABLE(qty int)
language SQL AS
    $$
        SELECT count(1) as qty from auth.app_user where email = _userOrEmail;
    $$;


-- create registration procedure
drop procedure auth.update_user_favorite(_email varchar, _favoritesubbreed varchar)
CREATE OR REPLACE PROCEDURE auth.update_user_favorite(
    _email varchar(255),
    _favoriteSubBreed varchar(50),
    _favoriteBreed varchar(50)) AS
    $$
        begin
            UPDATE auth.app_user SET favorite_subbreed = _favoriteSubBreed, favorite_breed = _favoriteBreed WHERE email = _email;
        end;
    $$ language plpgsql;

