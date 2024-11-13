drop schema public cascade;
create schema public;

CREATE TABLE ACTOR
(
  actorID INT NOT NULL,
  actorEmail VARCHAR NOT NULL,
  actorRole VARCHAR NOT NULL,
  actorName VARCHAR NOT NULL,
  actorSurname VARCHAR NOT NULL,
  PRIMARY KEY (actorID)
);

CREATE TABLE INSTITUTION
(
  institutionID INT NOT NULL,
  institutionName VARCHAR NOT NULL,
  institutionLink VARCHAR NOT NULL,
  actorID INT NOT NULL,
  PRIMARY KEY (institutionID),
  FOREIGN KEY (actorID) REFERENCES ACTOR(actorID)
);

CREATE TABLE PROJECT_PROPOSAL
(
  proposalID INT NOT NULL,
  attachment VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  actorID INT NOT NULL,
  institutionID INT NOT NULL,
  PRIMARY KEY (proposalID),
  FOREIGN KEY (actorID) REFERENCES ACTOR(actorID),
  FOREIGN KEY (institutionID) REFERENCES INSTITUTION(institutionID)
);

CREATE TABLE PROJECT
(
  projectID INT NOT NULL,
  projectName VARCHAR NOT NULL,
  startTime TIMESTAMP NOT NULL,
  proposalID INT NOT NULL,
  PRIMARY KEY (projectID),
  FOREIGN KEY (proposalID) REFERENCES PROJECT_PROPOSAL(proposalID)
);

CREATE TABLE TASK
(
  taskID INT NOT NULL,
  description VARCHAR NOT NULL,
  projectID INT NOT NULL,
  actorID INT NOT NULL,
  PRIMARY KEY (taskID, projectID),
  FOREIGN KEY (projectID) REFERENCES PROJECT(projectID),
  FOREIGN KEY (actorID) REFERENCES ACTOR(actorID)
);

CREATE TABLE EXPENSE
(
  expenseID INT NOT NULL,
  description VARCHAR NOT NULL,
  expense_cost INT NOT NULL,
  actorID INT NOT NULL,
  projectID INT NOT NULL,
  PRIMARY KEY (expenseID),
  FOREIGN KEY (actorID) REFERENCES ACTOR(actorID),
  FOREIGN KEY (projectID) REFERENCES PROJECT(projectID)
);

CREATE TABLE JOINS
(
  actorID INT NOT NULL,
  institutionID INT NOT NULL,
  PRIMARY KEY (actorID, institutionID),
  FOREIGN KEY (actorID) REFERENCES ACTOR(actorID),
  FOREIGN KEY (institutionID) REFERENCES INSTITUTION(institutionID)
);