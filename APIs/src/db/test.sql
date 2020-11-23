-- MySQL dump 10.17  Distrib 10.3.23-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: cars_catalog
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plates` varchar(20) NOT NULL,
  `brand` varchar(30) NOT NULL,
  `color` varchar(20) NOT NULL,
  `year` varchar(10) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `id_user` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cars_plates_uindex` (`plates`),
  KEY `cars_user_id_fk` (`id_user`),
  CONSTRAINT `cars_user_id_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` (`id`, `plates`, `brand`, `color`, `year`, `lat`, `lon`, `is_active`, `id_user`, `creation_date`) VALUES (1,'ASDASD','NISSAN','Rojo','2001',28.633,-106.087,0,1,'2020-11-21 20:43:15'),(2,'KDSFJD','KIA','Rojo','2013',28.675,-106.103,0,1,'2020-11-21 20:43:42'),(3,'LSKFIR','KIA','Negro','2017',28.6664,-106.111,0,2,'2020-11-21 20:44:07'),(4,'PPOSDE','NISSAN','Blanco','2000',28.6424,-106.094,0,2,'2020-11-21 20:44:30'),(5,'LLLLLL','Nissan','Rojo','1970',28.6141,-106.092,1,1,'2020-11-22 23:34:57'),(6,'Prueba','Nissan','Rojo','1970',28.6236,-106.101,1,1,'2020-11-23 00:01:43'),(7,'PPPSSS','Ford','Rojo','2003',28.7034,-106.144,1,1,'2020-11-23 07:47:29'),(8,'PSKXJ','Nissan','Blanco','2090',28.6668,-106.1,0,1,'2020-11-23 07:54:45'),(9,'PSODIJJ','Nissan','Amarillo','2006',28.7038,-106.145,0,1,'2020-11-23 07:56:03'),(10,'LLLLTO','Nissan','Blanco','2009',28.6489,-106.098,1,1,'2020-11-23 08:00:14');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rol_rol_uindex` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`id`, `rol`) VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `name` varchar(70) NOT NULL,
  `password` varchar(200) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_uindex` (`username`),
  KEY `user_rol_id_fk` (`id_rol`),
  CONSTRAINT `user_rol_id_fk` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `name`, `password`, `id_rol`, `creation_date`) VALUES (1,'adal','Adal Valles','$2b$10$5b26jxWFeiuSNxk88Kchn.LuMR1puqSBCUbi9G3Ngo/nY79gV/tQe',1,'2020-11-21 20:42:14'),(2,'dot','Dot','$2b$10$5b26jxWFeiuSNxk88Kchn.LuMR1puqSBCUbi9G3Ngo/nY79gV/tQe',2,'2020-11-21 20:42:30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-23  9:31:48
