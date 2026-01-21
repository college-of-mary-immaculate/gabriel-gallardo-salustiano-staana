-- Database Schema
SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Election`;
DROP TABLE IF EXISTS `Position`;
DROP TABLE IF EXISTS `Candidate`;
DROP TABLE IF EXISTS `Vote`;
DROP TABLE IF EXISTS `Otp`;

SET foreign_key_checks = 1;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `vin` varchar(20) NOT NULL,
  `fullname` varchar(80) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,

  PRIMARY KEY (`userId`),
  UNIQUE KEY `vin` (`vin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ELECTION INFO: one-at-a-time election
DROP TABLE IF EXISTS `Election`;
CREATE TABLE `Election` (
    `electionId` INT AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `status` ENUM('active','ended') DEFAULT 'active',
    `startTime` DATETIME NOT NULL,
    `endTime` DATETIME NOT NULL,

    PRIMARY KEY (`electionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- POSITION (president, vice president...)
DROP TABLE IF EXISTS `Position`;
CREATE TABLE `Position` (
    `positionId` INT AUTO_INCREMENT,
    `electionId` INT NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`positionId`),
    FOREIGN KEY (electionId) REFERENCES `Election`(electionId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- CANDIDATES (pre-generated, random/seeds)
DROP TABLE IF EXISTS `Candidate`;
CREATE TABLE `Candidate` (
    `candidateId` INT AUTO_INCREMENT,
    `positionId` INT NOT NULL,
    `fullname` VARCHAR(80) NOT NULL,
    `description` TEXT,
    `imageUrl` VARCHAR(255),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`candidateId`),
    FOREIGN KEY (positionId) REFERENCES `Position`(positionId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- USER VOTES
DROP TABLE IF EXISTS `Vote`;
CREATE TABLE `Vote` (
    `voteId` INT AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `candidateId` INT NOT NULL,
    `voteTime` DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`voteId`),
    UNIQUE KEY unique_vote (userId, candidateId),
    FOREIGN KEY (userId) REFERENCES `User`(userId) ON DELETE CASCADE,
    FOREIGN KEY (candidateId) REFERENCES `Candidate`(candidateId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- USER Otp
DROP TABLE IF EXISTS `Otp`;
CREATE TABLE `Otp` (
    `otp`              VARCHAR(128)   NOT NULL,
    `destination`      VARCHAR(255) NOT NULL,
    `purpose`          ENUM('registration', 'login', 'password_reset', 'verification') NOT NULL,
    `attempts`         INT          DEFAULT 0 NOT NULL,
    `verified`         BOOLEAN      DEFAULT FALSE NOT NULL,
    `created_at`       DATETIME    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `expires_at`       DATETIME    NOT NULL,

    PRIMARY KEY (`destination`),
    INDEX `idx_expires_at` (`expires_at`),
    INDEX `idx_verified` (`verified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;