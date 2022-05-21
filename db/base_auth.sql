-- schema
CREATE SCHEMA auth;

-- auth table
CREATE TABLE auth.app_user
(
    id         serial PRIMARY KEY,
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(250)       NOT NULL,
    name       VARCHAR(255)       NOT NULL,
    created_at TIMESTAMP          NOT NULL,
    updated_at TIMESTAMP          NOT NULL,
    role_id    int
);

-- mock data
insert into auth.app_user (username, password, name, created_at, updated_at, role_id)
VALUES ('doghouse', '$2a$10$7jLoEmD5yMJm.sURbxOeRe3FJZwUaEkduLEJ0PZa3NkQQn8CuTAXO', 'Juergüen Stefan Herrera', now(), now(), 1);

-- create auth function to prevent sql injection.
CREATE OR REPLACE FUNCTION auth.user_auth (uName varchar(100))
RETURNS TABLE(id int, role_id int, name varchar(255), password varchar(250))
language SQL AS
    $$
        SELECT id, role_id, name, password  from auth.app_user where username = uname;
    $$;

