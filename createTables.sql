CREATE TABLE disctricts (
    districtid int IDENTITY(0,1) PRIMARY KEY,
    startx int NOT NULL,
    endx int NOT NULL,
    starty int NOT NULL,
    endy int NOT NULL,
    district_name varchar(255) NOT NULL
)
GO

CREATE TABLE blip_details (
    detailsid int IDENTITY(0,1) PRIMARY KEY,
    title varchar(255) NOT NULL,
    details_desc varchar(500) NOT NULL,
    path_to_img varchar(100)
)
GO

CREATE TABLE blip_types (
    typeid int IDENTITY(0,1) PRIMARY KEY,
    type_name varchar(50) NOT NULL,
    path_to_img varchar(100) NOT NULL
)
GO

CREATE TABLE blips (
    blipid int IDENTITY(0,1) PRIMARY KEY,
    x int NOT NULL,
    y int NOT NULL,
    blip_type int NOT NULL,
    district_id int,
    blip_desc_id int NOT NULL,
    CONSTRAINT FK_BlipDescId FOREIGN KEY (blip_desc_id) REFERENCES blip_details(detailsid) ON DELETE CASCADE
)
GO

INSERT INTO blip_types (type_name, path_to_img) VALUES ('shop', '/img/shop.png');
INSERT INTO blip_types (type_name, path_to_img) VALUES ('race', '/img/race.png');
INSERT INTO blip_types (type_name, path_to_img) VALUES ('stunt', '/img/stunt_jump.png');
INSERT INTO blip_types (type_name, path_to_img) VALUES ('garage', '/img/garage.png');
INSERT INTO blip_types (type_name, path_to_img) VALUES ('house', '/img/house.png');
INSERT INTO blip_types (type_name, path_to_img) VALUES ('tennis', '/img/tenis.png');
INSERT INTO blip_types (type_name, path_to_img) VALUES ('office', '/img/office.png');