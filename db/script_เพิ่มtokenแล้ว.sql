-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`history` (
  `history_id` INT NOT NULL AUTO_INCREMENT,
  `status_name` VARCHAR(45) NULL,
  PRIMARY KEY (`history_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`doctor` (
  `doc_id` INT NOT NULL AUTO_INCREMENT,
  `doc_fname` VARCHAR(45) NULL,
  `doc_lname` VARCHAR(45) NULL,
  PRIMARY KEY (`doc_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer` (
  `cust_id` INT NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(45) NULL,
  `lname` VARCHAR(45) NULL,
  `cust_phone` VARCHAR(45) NULL,
  `cust_email` VARCHAR(45) NULL,
  `cust_pass` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`cust_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`booking` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `book_date` DATE NULL,
  `book_hour` TIME NULL,
  `history_id` INT NOT NULL,
  `doc_id` INT NOT NULL,
  `cust_id` INT NOT NULL,
  PRIMARY KEY (`book_id`),
  INDEX `fk_booking_history_idx` (`history_id` ASC) ,
  INDEX `fk_booking_doctor1_idx` (`doc_id` ASC) ,
  INDEX `fk_booking_customer1_idx` (`cust_id` ASC) ,
  CONSTRAINT `fk_booking_history`
    FOREIGN KEY (`history_id`)
    REFERENCES `mydb`.`history` (`history_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_doctor1`
    FOREIGN KEY (`doc_id`)
    REFERENCES `mydb`.`doctor` (`doc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_customer1`
    FOREIGN KEY (`cust_id`)
    REFERENCES `mydb`.`customer` (`cust_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`schedule` (
  `sched_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `doc_id` INT NOT NULL,
  PRIMARY KEY (`sched_id`),
  INDEX `fk_schedule_doctor1_idx` (`doc_id` ASC) ,
  CONSTRAINT `fk_schedule_doctor1`
    FOREIGN KEY (`doc_id`)
    REFERENCES `mydb`.`doctor` (`doc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(45) NULL,
  `cust_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tokens_customer1_idx` (`cust_id` ASC) ,
  CONSTRAINT `fk_tokens_customer1`
    FOREIGN KEY (`cust_id`)
    REFERENCES `mydb`.`customer` (`cust_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`available_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`available_time` (
  `avail_time` INT NOT NULL AUTO_INCREMENT,
  `time` TIME NULL,
  `is_booked` INT NULL,
  `sched_id` INT NOT NULL,
  PRIMARY KEY (`avail_time`),
  INDEX `fk_available_time_schedule1_idx` (`sched_id` ASC) ,
  CONSTRAINT `fk_available_time_schedule1`
    FOREIGN KEY (`sched_id`)
    REFERENCES `mydb`.`schedule` (`sched_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
