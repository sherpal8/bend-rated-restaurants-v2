DROP DATABASE IF EXISTS manchester_restaurants;
CREATE DATABASE manchester_restaurants;

\c manchester_restaurants

CREATE TABLE Areas
(
  area_id SERIAL PRIMARY KEY,
  areaName VARCHAR(40)
)
;

INSERT INTO Areas
  (
  areaName
  )
VALUES
  ('Greater Manchester'),
  ('Lesser Manchester'),
  ('Gipton')
;

CREATE TABLE Restaurants
(
  restaurant_id SERIAL PRIMARY KEY,
  restaurantName VARCHAR(40),
  area_id INT REFERENCES Areas(area_id),
  cuisine VARCHAR(40),
  website VARCHAR(40)
)
;

INSERT INTO Restaurants
  (
  restaurantName,
  area_id,
  cuisine,
  website
  )
VALUES
  ('Zizzi', 1, 'Italian', 'https://www.zizzi.com'),
  ('Wagamamas', 3, 'Fusion', 'https://www.wagamama.com'),
  ('Harvesters', 2, 'English', 'https://www.harvesters.com')
;

CREATE TABLE Comments
(
  comment_id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES Restaurants(restaurant_id),
  body VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

INSERT INTO Comments
  (
  restaurant_id,
  body
  )
VALUES
  (1, 'Amazing food and service'),
  (2, 'Friendly staff'),
  (3, 'Poor service')
;

CREATE TABLE Ratings
(
  rating_id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES Restaurants(restaurant_id),
  rating INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

INSERT INTO Ratings
  (
  restaurant_id,
  rating
  )
VALUES
  (1, 8),
  (2, 9),
  (3, 7)
;

SELECT *
FROM Areas;

SELECT *
FROM Restaurants;

SELECT *
FROM Comments;

SELECT *
FROM Ratings;