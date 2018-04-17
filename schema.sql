CREATE TABLE User (
  UserID int NOT NULL AUTO_INCREMENT,
  Name varchar(50) DEFAULT NULL,
  Email varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  PRIMARY KEY (UserID)
);

CREATE TABLE Event (
  EventID int NOT NULL AUTO_INCREMENT,
  Name varchar(50) NOT NULL,
  EventTime datetime NOT NULL,
  Location varchar(50) NOT NULL,
  UserID int,
  PRIMARY KEY (EventID),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Image (
  ImageID int NOT NULL AUTO_INCREMENT,
  Name varchar(50) NOT NULL,
  Filename varchar(100) NOT NULL,
  EventID int,
  PRIMARY KEY (ImageID),
  FOREIGN KEY (EventID) REFERENCES Event(EventID)
);


