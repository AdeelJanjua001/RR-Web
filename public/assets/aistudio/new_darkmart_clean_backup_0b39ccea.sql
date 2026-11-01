/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: new_darkmart
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

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
-- Table structure for table `admin_notifications`
--

DROP TABLE IF EXISTS `admin_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_notifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `title` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `click_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1514 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_notifications`
--

LOCK TABLES `admin_notifications` WRITE;
/*!40000 ALTER TABLE `admin_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_password_resets`
--

DROP TABLE IF EXISTS `admin_password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_password_resets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(40) DEFAULT NULL,
  `token` varchar(40) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_password_resets`
--

LOCK TABLES `admin_password_resets` WRITE;
/*!40000 ALTER TABLE `admin_password_resets` DISABLE KEYS */;
INSERT INTO `admin_password_resets` VALUES
(2,'supportteam@zwickweb.cc','110949',1,'2026-08-04 06:26:59');
/*!40000 ALTER TABLE `admin_password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES
(1,'Web Team','supportteam@germanmarket','Web',NULL,'6aa7e08a08e371789386890.png','$2y$12$dvNDdp3zbMfDHBk3MVI./eI.fDR9lf7c.NWwCIwe/xu02r.ZP67nS',NULL,NULL,'2026-09-14 11:55:21');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `subcategory_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `trx` varchar(40) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `purchased_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 1,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>Enable , 0->Disable',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'For Binance Withdrawal','6aa826d3a09641789404883.jpg',1,1,'2025-10-11 08:15:04','2026-09-14 16:54:43'),
(2,'For Crypto','6aa82773ef8381789405043.jpg',1,1,'2025-10-11 16:03:11','2026-09-14 16:57:23'),
(3,'For Every Shoping Platform','68ea8794c50751760200596.png',1,1,'2025-10-11 16:10:05','2025-10-11 17:34:43'),
(4,'For Online Purchasing at Any Site','68ea87c43fefe1760200644.jpg',1,1,'2025-10-11 16:22:37','2025-10-11 17:13:55'),
(5,'For PayPal (Withdrawal)','68ea87d625ce11760200662.png',1,1,'2025-10-11 16:28:09','2025-10-11 16:37:42'),
(6,'For Apple','68ea87759e9d21760200565.png',1,1,'2025-10-11 16:30:22','2025-10-11 16:36:05'),
(7,'For Titkok Coins','68ea876515a4f1760200549.png',1,1,'2025-10-11 16:33:42','2026-08-05 13:21:38'),
(8,'For Meta Ads / Other Ads','68ea87b4f31c61760200628.jpeg',1,1,'2025-10-11 16:34:36','2025-10-11 16:37:09'),
(9,'For Amazon','68ea883f8431c1760200767.jpeg',1,1,'2025-10-11 16:39:27','2025-10-11 16:39:27'),
(10,'For Flipcart Shopping','6aa827064ecf11789404934.jpg',1,1,'2025-10-12 01:19:51','2026-09-14 16:55:34'),
(11,'Redot Pay (Withdrawal)','6aa827375be6d1789404983.jpg',1,1,'2025-10-24 02:04:42','2026-09-14 16:56:23'),
(12,'For Every Crypto Platform','6aa826ec68e041789404908.jpg',1,1,'2025-11-26 10:59:29','2026-09-14 16:55:08'),
(13,'PUBG UC /FREE FIRE DIAMOND','6aa8271c4d3871789404956.jpg',1,1,'2025-11-26 10:59:29','2026-09-14 16:55:56');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposits`
--

DROP TABLE IF EXISTS `deposits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposits` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `method_code` int(10) unsigned NOT NULL DEFAULT 0,
  `amount` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `method_currency` varchar(40) DEFAULT NULL,
  `charge` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `rate` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `final_amount` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `detail` text DEFAULT NULL,
  `btc_amount` varchar(255) DEFAULT NULL,
  `btc_wallet` varchar(255) DEFAULT NULL,
  `trx` varchar(40) DEFAULT NULL,
  `payment_try` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1=>success, 2=>pending, 3=>cancel',
  `from_api` tinyint(1) NOT NULL DEFAULT 0,
  `admin_feedback` varchar(255) DEFAULT NULL,
  `success_url` varchar(255) DEFAULT NULL,
  `failed_url` varchar(255) DEFAULT NULL,
  `last_cron` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2695 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_tokens`
--

DROP TABLE IF EXISTS `device_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `is_app` tinyint(1) NOT NULL DEFAULT 0,
  `token` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_tokens`
--

LOCK TABLES `device_tokens` WRITE;
/*!40000 ALTER TABLE `device_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extensions`
--

DROP TABLE IF EXISTS `extensions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `extensions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `act` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `script` text DEFAULT NULL,
  `shortcode` text DEFAULT NULL COMMENT 'object',
  `support` text DEFAULT NULL COMMENT 'help section',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>enable, 2=>disable',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extensions`
--

LOCK TABLES `extensions` WRITE;
/*!40000 ALTER TABLE `extensions` DISABLE KEYS */;
INSERT INTO `extensions` VALUES
(1,'tawk-chat','Tawk.to','Key location is shown bellow','tawky_big.png','<script>\r\n                        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\r\n                        (function(){\r\n                        var s1=document.createElement(\"script\"),s0=document.getElementsByTagName(\"script\")[0];\r\n                        s1.async=true;\r\n                        s1.src=\"https://embed.tawk.to/{{app_key}}\";\r\n                        s1.charset=\"UTF-8\";\r\n                        s1.setAttribute(\"crossorigin\",\"*\");\r\n                        s0.parentNode.insertBefore(s1,s0);\r\n                        })();\r\n                    </script>','{\"app_key\":{\"title\":\"App Key\",\"value\":\"------\"}}','twak.png',0,'2019-10-18 11:16:05','2022-03-21 17:22:24'),
(2,'google-recaptcha2','Google Recaptcha 2','Key location is shown bellow','recaptcha3.png','\n<script src=\"https://www.google.com/recaptcha/api.js\"></script>\n<div class=\"g-recaptcha\" data-sitekey=\"{{site_key}}\" data-callback=\"verifyCaptcha\"></div>\n<div id=\"g-recaptcha-error\"></div>','{\"site_key\":{\"title\":\"Site Key\",\"value\":\"6LdPC88fAAAAADQlUf_DV6Hrvgm-pZuLJFSLDOWV\"},\"secret_key\":{\"title\":\"Secret Key\",\"value\":\"6LdPC88fAAAAAG5SVaRYDnV2NpCrptLg2XLYKRKB\"}}','recaptcha.png',0,'2019-10-18 11:16:05','2024-05-08 03:23:13'),
(3,'custom-captcha','Custom Captcha','Just put any random string','customcaptcha.png',NULL,'{\"random_key\":{\"title\":\"Random String\",\"value\":\"SecureString\"}}','na',0,'2019-10-18 11:16:05','2024-06-01 23:00:16'),
(4,'google-analytics','Google Analytics','Key location is shown bellow','google_analytics.png','<script async src=\"https://www.googletagmanager.com/gtag/js?id={{measurement_id}}\"></script>\n                <script>\n                  window.dataLayer = window.dataLayer || [];\n                  function gtag(){dataLayer.push(arguments);}\n                  gtag(\"js\", new Date());\n                \n                  gtag(\"config\", \"{{measurement_id}}\");\n                </script>','{\"measurement_id\":{\"title\":\"Measurement ID\",\"value\":\"------\"}}','ganalytics.png',0,NULL,'2021-05-03 22:19:12'),
(5,'fb-comment','Facebook Comment ','Key location is shown bellow','Facebook.png','<div id=\"fb-root\"></div><script async defer crossorigin=\"anonymous\" src=\"https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v4.0&appId={{app_key}}&autoLogAppEvents=1\"></script>','{\"app_key\":{\"title\":\"App Key\",\"value\":\"----\"}}','fb_com.PNG',0,NULL,'2024-06-01 23:01:30');
/*!40000 ALTER TABLE `extensions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `act` varchar(40) DEFAULT NULL,
  `form_data` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES
(1,'manual_deposit','{\"screenshot\":{\"name\":\"Screenshot\",\"label\":\"screenshot\",\"is_required\":\"required\",\"instruction\":\"adgjklkll.\",\"extensions\":\"jpg,jpeg,png,pdf\",\"options\":[],\"type\":\"file\",\"width\":\"6\"}}','2025-10-11 08:34:18','2025-10-11 13:50:08');
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frontends`
--

DROP TABLE IF EXISTS `frontends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `frontends` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `data_keys` varchar(40) DEFAULT NULL,
  `data_values` longtext DEFAULT NULL,
  `seo_content` longtext DEFAULT NULL,
  `tempname` varchar(40) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `view` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frontends`
--

LOCK TABLES `frontends` WRITE;
/*!40000 ALTER TABLE `frontends` DISABLE KEYS */;
INSERT INTO `frontends` VALUES
(1,'seo.data','{\"seo_image\":\"1\",\"keywords\":[\"admin\",\"blog\",\"aaaa\",\"ddd\",\"aaa\"],\"description\":\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit\",\"social_title\":\"Viserlab Limited\",\"social_description\":\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit ff\",\"image\":\"68ea64d74de081760191703.jpg\"}',NULL,NULL,'',0,'2020-07-04 23:42:52','2025-10-11 14:08:23'),
(24,'about.content','{\"has_image\":\"1\",\"title\":\"About Us\",\"heading\":\"2 Years Of Your Trust\",\"button_text\":\"Get Started\",\"button_link\":\"user\\/register\",\"description\":\"Welcome to German Market\\u2013 Your Trusted Digital Card Marketplace At Dark Web, we specialize in providing top-quality digital cards at unbeatable prices. Whether you\'re looking for gift cards, game cards, or prepaid services, we have a wide range of options to meet your needs. Our platform is designed for simplicity, speed, and security \\u2014 so you can shop with confidence. With a passion for reliability and customer satisfaction, we aim to become your go-to hub for all digital card solutions. Every transaction is handled with care, and we\\u2019re always here to help with friendly support and quick service. Join the Dark Web community today \\u2014 where digital convenience meets trust.\",\"image\":\"68e821479af261760043335.png\"}',NULL,'basic','',0,'2020-10-28 00:51:20','2026-09-14 14:07:54'),
(25,'blog.content','{\"title\":\"Blog Posts\",\"heading\":\"Latest News\",\"subheading\":\"Hic tenetur nihil ex. Doloremque ipsa velit, ea molestias expedita sed voluptatem ex voluptatibus temporibus sequi.\"}',NULL,'basic','',0,'2020-10-28 00:51:34','2024-05-22 23:56:39'),
(27,'contact_us.content','{\"phone\":\"+49..................\",\"email\":\"supportteam@germanmarket\",\"address\":\"Germany\",\"map_latitude\":\"0\",\"map_longitude\":\"0\"}',NULL,'basic','',0,'2020-10-28 00:59:19','2026-09-14 13:56:54'),
(28,'counter.content','{\"heading\":\"Latest News\",\"subheading\":\"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus necessitatibus repudiandae porro reprehenderit, beatae perferendis repellat quo ipsa omnis, vitae!\"}',NULL,'basic',NULL,0,'2020-10-28 01:04:02','2024-03-13 23:54:07'),
(31,'social_icon.element','{\"title\":\"Facebook\",\"social_icon\":\"<i class=\\\"fab fa-facebook-f\\\"><\\/i>\",\"url\":\"https:\\/\\/www.facebook.com\\/\"}',NULL,'basic','',0,'2020-11-12 04:07:30','2024-05-25 00:39:26'),
(41,'cookie.data','{\"short_desc\":\"We may use cookies or any other tracking technologies when you visit our website, including any other media form, mobile website, or mobile application related or connected to help customize the Site and improve your experience.\",\"description\":\"<h4>Cookie Policy<\\/h4>\\r\\n\\r\\n<p>This Cookie Policy explains how to use cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.<\\/p>\\r\\n<br>\\r\\n<h4>What are cookies?<\\/h4>\\r\\n\\r\\n<p>Cookies are small pieces of data stored on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.<\\/p>\\r\\n<br>\\r\\n<h4>Why do we use cookies?<\\/h4>\\r\\n\\r\\n<p>We use cookies for several reasons. Some cookies are required for technical reasons for our Website to operate, and we refer to these as \\\"essential\\\" or \\\"strictly necessary\\\" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.<\\/p>\\r\\n<br>\\r\\n<h4>What types of cookies do we use?<\\/h4>\\r\\n\\r\\n<div>\\r\\n    <ul style=\\\"list-style: unset;\\\">\\r\\n        <li>\\r\\n            <strong>Essential Website Cookies:<\\/strong> \\r\\n            These cookies are strictly necessary to provide you with services available through our Website and to use some of its features.\\r\\n        <\\/li>\\r\\n        <li>\\r\\n            <strong>Analytics and Performance Cookies:<\\/strong> \\r\\n            These cookies allow us to count visits and traffic sources to measure and improve our Website\'s performance.\\r\\n        <\\/li>\\r\\n        <li>\\r\\n            <strong>Advertising Cookies:<\\/strong> \\r\\n            These cookies make advertising messages more relevant to you and your interests. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.\\r\\n        <\\/li>\\r\\n    <\\/ul>\\r\\n<\\/div>\\r\\n<br>\\r\\n<h4>Data Collected by Cookies<\\/h4>\\r\\n<p>Cookies may collect various types of data, including but not limited to:<\\/p>\\r\\n<ul style=\\\"list-style: unset;\\\">\\r\\n    <li>IP addresses<\\/li>\\r\\n    <li>Browser and device information<\\/li>\\r\\n    <li>Referring website addresses<\\/li>\\r\\n    <li>Pages visited on our website<\\/li>\\r\\n    <li>Interactions with our website, such as clicks and mouse movements<\\/li>\\r\\n    <li>Time spent on our website<\\/li>\\r\\n<\\/ul>\\r\\n<br>\\r\\n<h4>How We Use Collected Data<\\/h4>\\r\\n\\r\\n<p>We may use data collected by cookies for the following purposes:<\\/p>\\r\\n<ul style=\\\"list-style: unset;\\\">\\r\\n    <li>To personalize your experience on our website<\\/li>\\r\\n    <li>To improve our website\'s functionality and performance<\\/li>\\r\\n    <li>To analyze trends and gather demographic information about our user base<\\/li>\\r\\n    <li>To deliver targeted advertising based on your interests<\\/li>\\r\\n    <li>To prevent fraudulent activity and enhance website security<\\/li>\\r\\n<\\/ul>\\r\\n<br>\\r\\n<h4>Third-party cookies<\\/h4>\\r\\n\\r\\n<p>In addition to our cookies, we may also use various third-party cookies to report usage statistics of our Website, deliver advertisements on and through our Website, and so on.<\\/p>\\r\\n<br>\\r\\n<h4>How can we control cookies?<\\/h4>\\r\\n\\r\\n<p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the \\\"Cookie Settings\\\" link in the footer of our website. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted.<\\/p>\\r\\n<br>\\r\\n<h4>Changes to our Cookie Policy<\\/h4>\\r\\n\\r\\n<p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.<\\/p>\",\"status\":1}',NULL,NULL,NULL,0,'2020-07-04 23:42:52','2024-04-25 06:26:36'),
(42,'policy_pages.element','{\"title\":\"Privacy Policy\",\"details\":\"<h4>Introduction<\\/h4>\\r\\n        <p>\\r\\n            This Privacy Policy describes how we collects, uses, and discloses information, including personal information, in connection with your use of our website.\\r\\n        <\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Information We Collect<\\/h4>\\r\\n        <p>We collect two main types of information on the Website:<\\/p>\\r\\n        <ul>\\r\\n            <li><p><strong>Personal Information: <\\/strong>This includes data that can identify you as an individual, such as your name, email address, phone number, or mailing address. We only collect this information when you voluntarily provide it to us, like signing up for a newsletter, contacting us through a form, or making a purchase.<\\/p><\\/li>\\r\\n            <li><p><strong>Non-Personal Information: <\\/strong>This data cannot be used to identify you directly. It includes details like your browser type, device type, operating system, IP address, browsing activity, and usage statistics. We collect this information automatically through cookies and other tracking technologies.<\\/p><\\/li>\\r\\n        <\\/ul>\\r\\n        <br \\/>\\r\\n        <h4>How We Use Information<\\/h4>\\r\\n        <p>The information we collect allows us to:<\\/p>\\r\\n        <ul>\\r\\n            <li>Operate and maintain the Website effectively.<\\/li>\\r\\n            <li>Send you newsletters or marketing communications, but only with your consent.<\\/li>\\r\\n            <li>Respond to your inquiries and fulfill your requests.<\\/li>\\r\\n            <li>Improve the Website and your user experience.<\\/li>\\r\\n            <li>Personalize your experience on the Website based on your browsing habits.<\\/li>\\r\\n            <li>Analyze how the Website is used to improve our services.<\\/li>\\r\\n            <li>Comply with legal and regulatory requirements.<\\/li>\\r\\n        <\\/ul>\\r\\n        <br \\/>\\r\\n        <h4>Sharing of Information<\\/h4>\\r\\n        <p>We may share your information with trusted third-party service providers who assist us in operating the Website and delivering our services. These providers are obligated by contract to keep your information confidential and use it only for the specific purposes we disclose it for.<\\/p>\\r\\n        <p>We will never share your personal information with any third parties for marketing purposes without your explicit consent.<\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Data Retention<\\/h4>\\r\\n        <p>We retain your personal information only for as long as necessary to fulfill the purposes it was collected for. We may retain it for longer periods only if required or permitted by law.<\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Security Measures<\\/h4>\\r\\n        <p>We take reasonable precautions to protect your information from unauthorized access, disclosure, alteration, or destruction. However, complete security cannot be guaranteed for any website or internet transmission.<\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Changes to this Privacy Policy<\\/h4>\\r\\n        <p>We may update this Privacy Policy periodically. We will notify you of any changes by posting the revised policy on the Website. We recommend reviewing this policy regularly to stay informed of any updates.<\\/p>\\r\\n        <p><strong>Remember:<\\/strong>  This is a sample policy and may need adjustments to comply with specific laws and reflect your website\'s unique data practices. Consider consulting with a legal professional to ensure your policy is fully compliant.<\\/p>\"}','{\"image\":null,\"description\":null,\"social_title\":null,\"social_description\":null,\"keywords\":null}','basic','privacy-policy',0,'2021-06-09 08:50:42','2024-04-24 05:43:19'),
(43,'policy_pages.element','{\"title\":\"Terms of Service\",\"details\":\"<h4>Introduction<\\/h4>\\r\\n        <p>\\r\\n            This Privacy Policy describes how we collects, uses, and discloses information, including personal information, in connection with your use of our website.\\r\\n        <\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Information We Collect<\\/h4>\\r\\n        <p>We collect two main types of information on the Website:<\\/p>\\r\\n        <ul>\\r\\n            <li><p><strong>Personal Information: <\\/strong>This includes data that can identify you as an individual, such as your name, email address, phone number, or mailing address. We only collect this information when you voluntarily provide it to us, like signing up for a newsletter, contacting us through a form, or making a purchase.<\\/p><\\/li>\\r\\n            <li><p><strong>Non-Personal Information: <\\/strong>This data cannot be used to identify you directly. It includes details like your browser type, device type, operating system, IP address, browsing activity, and usage statistics. We collect this information automatically through cookies and other tracking technologies.<\\/p><\\/li>\\r\\n        <\\/ul>\\r\\n        <br \\/>\\r\\n        <h4>How We Use Information<\\/h4>\\r\\n        <p>The information we collect allows us to:<\\/p>\\r\\n        <ul>\\r\\n            <li>Operate and maintain the Website effectively.<\\/li>\\r\\n            <li>Send you newsletters or marketing communications, but only with your consent.<\\/li>\\r\\n            <li>Respond to your inquiries and fulfill your requests.<\\/li>\\r\\n            <li>Improve the Website and your user experience.<\\/li>\\r\\n            <li>Personalize your experience on the Website based on your browsing habits.<\\/li>\\r\\n            <li>Analyze how the Website is used to improve our services.<\\/li>\\r\\n            <li>Comply with legal and regulatory requirements.<\\/li>\\r\\n        <\\/ul>\\r\\n        <br \\/>\\r\\n        <h4>Sharing of Information<\\/h4>\\r\\n        <p>We may share your information with trusted third-party service providers who assist us in operating the Website and delivering our services. These providers are obligated by contract to keep your information confidential and use it only for the specific purposes we disclose it for.<\\/p>\\r\\n        <p>We will never share your personal information with any third parties for marketing purposes without your explicit consent.<\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Data Retention<\\/h4>\\r\\n        <p>We retain your personal information only for as long as necessary to fulfill the purposes it was collected for. We may retain it for longer periods only if required or permitted by law.<\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Security Measures<\\/h4>\\r\\n        <p>We take reasonable precautions to protect your information from unauthorized access, disclosure, alteration, or destruction. However, complete security cannot be guaranteed for any website or internet transmission.<\\/p>\\r\\n        <br \\/>\\r\\n        <h4>Changes to this Privacy Policy<\\/h4>\\r\\n        <p>We may update this Privacy Policy periodically. We will notify you of any changes by posting the revised policy on the Website. We recommend reviewing this policy regularly to stay informed of any updates.<\\/p>\\r\\n        <p><strong>Remember:<\\/strong>  This is a sample policy and may need adjustments to comply with specific laws and reflect your website\'s unique data practices. Consider consulting with a legal professional to ensure your policy is fully compliant.<\\/p>\"}','{\"image\":\"6635d5d9618e71714804185.png\",\"description\":null,\"social_title\":null,\"social_description\":null,\"keywords\":null}','basic','terms-of-service',0,'2021-06-09 08:51:18','2024-05-04 00:29:45'),
(44,'maintenance.data','{\"description\":\"<div class=\\\"mb-5\\\" style=\\\"font-family: Nunito, sans-serif; margin-bottom: 3rem !important;\\\" bis_skin_checked=\\\"1\\\"><h3 class=\\\"mb-3\\\" style=\\\"text-align: center; font-weight: 600; line-height: 1.3; font-size: 24px; font-family: Exo, sans-serif;\\\"><font color=\\\"#ff0000\\\">THE SITE IS UNDER MAINTENANCE<\\/font><\\/h3><p class=\\\"font-18\\\" style=\\\"color: rgb(111, 111, 111); text-align: center; margin-right: 0px; margin-left: 0px; font-size: 18px !important;\\\">We\'re just tuning up a few things.We apologize for the inconvenience but Front is currently undergoing planned maintenance. Thanks for your patience.<\\/p><\\/div>\",\"image\":\"6603c203472ad1711522307.png\"}',NULL,NULL,NULL,0,'2020-07-04 23:42:52','2026-09-13 14:46:30'),
(55,'counter.content','{\"heading\":\"Latest Newsss\",\"subheading\":\"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus necessitatibus repudiandae porro reprehenderit, beatae perferendis repellat quo ipsa omnis, vitae!\"}',NULL,'basic','',0,'2024-04-21 01:13:50','2024-04-21 01:13:50'),
(56,'counter.content','{\"heading\":\"Latest News\",\"subheading\":\"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus necessitatibus repudiandae porro reprehenderit, beatae perferendis repellat quo ipsa omnis, vitae!\"}',NULL,'basic','',0,'2024-04-21 01:13:52','2024-04-21 01:13:52'),
(64,'banner.content','{\"has_image\":\"1\",\"heading\":\"You are entering a Restricted zone, Proceed at your own Risk\",\"subheading\":\"Select your card. Enjoy the freedom to use it anytime, anywhere.\",\"image\":\"68e8201e857a41760043038.png\"}',NULL,'basic','',0,'2024-05-01 00:06:45','2025-10-09 20:50:38'),
(66,'register_disable.content','{\"has_image\":\"1\",\"heading\":\"Registration Currently Disabled\",\"subheading\":\"Page you are looking for doesn\'t exit or an other error occurred or temporarily unavailable.\",\"button_name\":\"Go to Home\",\"button_url\":\"#\",\"image\":\"663a0f20ecd0b1715080992.png\"}',NULL,'basic','',0,'2024-05-07 05:23:12','2024-05-07 05:28:09'),
(67,'authentication.content','{\"has_image\":\"1\",\"image\":\"6aa8004a103181789395018.jpg\"}',NULL,'basic','',0,'2024-05-22 23:50:33','2026-09-14 14:10:18'),
(68,'banned.content','{\"has_image\":\"1\",\"heading\":\"You Are banned !\",\"image\":\"6aa809838b3331789397379.png\"}',NULL,'basic','',0,'2024-05-22 23:51:06','2026-09-14 14:49:39'),
(73,'choose.content','{\"heading\":\"Who We Are\",\"subheading\":\"We have helped more than 50,000 people in global network\",\"button_text\":\"Get Started\",\"button_link\":\"login\"}',NULL,'basic','',0,'2024-05-22 23:57:09','2024-05-22 23:57:09'),
(74,'choose.element','{\"title\":\"Budget Friendly\",\"description\":\"Our prepaid card options are tailored to suit every budget. Enjoy premium services without overspending. Get more value for your money \\u2014 smart choices at affordable prices.\",\"icon\":\"<i class=\\\"fas fa-money-bill-wave\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:57:25','2025-10-09 20:53:42'),
(75,'choose.element','{\"title\":\"Outstanding Plan\",\"description\":\"Our plans are designed to offer maximum value with flexibility and ease. Whether you\'re buying one card or many, we have options to fit your needs. Enjoy unbeatable rates, instant delivery, and full control with every plan.\",\"icon\":\"<i class=\\\"fas fa-plane-arrival\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:57:40','2025-10-09 20:53:28'),
(76,'choose.element','{\"title\":\"Our Responsibility\",\"description\":\"We are committed to providing secure, fast, and transparent prepaid card services. Protecting customer data and ensuring safe transactions is our top priority. We take pride in delivering reliable service you can trust every step of the way.\",\"icon\":\"<i class=\\\"fab fa-phoenix-framework\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:57:52','2025-10-09 20:53:15'),
(77,'choose.element','{\"title\":\"Our Success\",\"description\":\"We\\u2019ve helped thousands get easy access to prepaid cards anytime, anywhere. Our secure platform and trusted service make transactions smooth and reliable. Customer satisfaction is at the heart of everything we do \\u2014 and it shows.\",\"icon\":\"<i class=\\\"fas fa-award\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:58:04','2025-10-09 20:53:04'),
(78,'counter.element','{\"heading\":\"13000\",\"subheading\":\"Satisfied Client\",\"icon\":\"<i class=\\\"fas fa-users\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:59:00','2026-09-14 16:38:10'),
(79,'counter.element','{\"heading\":\"2500\",\"subheading\":\"Award\",\"icon\":\"<i class=\\\"fas fa-award\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:59:14','2026-09-14 16:38:00'),
(80,'counter.element','{\"heading\":\"18000\",\"subheading\":\"Users\",\"icon\":\"<i class=\\\"las la-users-cog\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:59:40','2026-09-14 16:37:47'),
(81,'counter.element','{\"heading\":\"15000\",\"subheading\":\"Investment\",\"icon\":\"<i class=\\\"far fa-money-bill-alt\\\"><\\/i>\"}',NULL,'basic','',0,'2024-05-22 23:59:54','2026-09-14 16:37:36'),
(82,'featured.content','{\"title\":\"Featured Cards\",\"heading\":\"Our Featrued Cards\",\"subheading\":\"Discover our top-selling prepaid cards, handpicked for value and convenience. Trusted by users for security, flexibility, and instant activation.\"}',NULL,'basic','',0,'2024-05-23 00:00:38','2025-10-09 21:01:42'),
(83,'footer.content','{\"content\":\"Believe in yourself, even when no one else does. Every small step you take brings you closer to success. Stay focused, stay strong \\u2014 your time is coming. Best Regards: German Market\"}',NULL,'basic','',0,'2024-05-23 00:01:17','2026-09-14 16:38:51'),
(84,'how_to_work.content','{\"title\":\"How To Work\",\"heading\":\"How to Get Started\",\"subheading\":\"Sign up in minutes and browse our wide range of prepaid cards. Choose your card, complete the payment, and receive it instantly \\u2014 it\'s that easy!\"}',NULL,'basic','',0,'2024-05-23 00:01:42','2025-10-09 21:02:32'),
(88,'partner.element','{\"has_image\":\"1\",\"image\":\"664edc1071f0f1716444176.png\"}',NULL,'basic','',0,'2024-05-23 00:02:56','2024-05-23 00:02:56'),
(89,'partner.element','{\"has_image\":\"1\",\"image\":\"664edc1c10f961716444188.png\"}',NULL,'basic','',0,'2024-05-23 00:03:08','2024-05-23 00:03:08'),
(90,'partner.element','{\"has_image\":\"1\",\"image\":\"664edc22065171716444194.png\"}',NULL,'basic','',0,'2024-05-23 00:03:14','2024-05-23 00:03:14'),
(91,'partner.element','{\"has_image\":\"1\",\"image\":\"6aa823b9223e61789404089.jpg\"}',NULL,'basic','',0,'2024-05-23 00:03:21','2026-09-14 16:41:29'),
(93,'preloader.content','{\"has_image\":\"1\",\"image\":\"6aa7dfad22fd31789386669.png\"}',NULL,'basic','',0,'2024-05-23 00:07:12','2026-09-14 11:51:09'),
(94,'social_icon.element','{\"title\":\"Google\",\"social_icon\":\"<i class=\\\"fab fa-google\\\"><\\/i>\",\"url\":\"https:\\/\\/www.google.com\\/\"}',NULL,'basic','',0,'2024-05-23 00:07:59','2024-05-23 00:07:59'),
(95,'social_icon.element','{\"title\":\"Youtube\",\"social_icon\":\"<i class=\\\"fab fa-youtube\\\"><\\/i>\",\"url\":\"http:\\/\\/www.youtube.com\\/\"}',NULL,'basic','',0,'2024-05-23 00:08:18','2024-05-23 00:08:18'),
(96,'social_icon.element','{\"title\":\"Twitter\",\"social_icon\":\"<i class=\\\"fab fa-twitter\\\"><\\/i>\",\"url\":\"http:\\/\\/www.twitter.com\\/\"}',NULL,'basic','',0,'2024-05-23 00:08:45','2024-05-23 00:08:45'),
(97,'testimonial.content','{\"title\":\"Testimonials\",\"heading\":\"Testimonials What Our Clients Say\",\"subheading\":\"Objectively integrate enterprise-wide strategic theme areas with functionalized infrastructures. Interactively productize premium quality\"}',NULL,'basic','',0,'2024-05-23 00:09:08','2024-05-23 00:09:08'),
(98,'testimonial.element','{\"has_image\":\"1\",\"name\":\"Mr Ali\",\"designation\":\"Valued Client\",\"quote\":\"Excellent service, professional experience, and a platform I can confidently recommend to others.\",\"rating\":\"5\",\"image\":\"6aa8266d0ad1e1789404781.jpg\"}',NULL,'basic','',0,'2024-05-23 00:09:46','2026-09-14 16:53:01'),
(99,'testimonial.element','{\"has_image\":\"1\",\"name\":\"Ryan Mitchell\",\"designation\":\"Business Consultant, Mitchell Consulting\",\"quote\":\"Professional service, smooth experience, and great attention to detail. Definitely a platform worth recommending\",\"rating\":\"5\",\"image\":\"6aa825f488ca71789404660.jpg\"}',NULL,'basic','',0,'2024-05-23 00:10:07','2026-09-14 16:51:00'),
(100,'testimonial.element','{\"has_image\":\"1\",\"name\":\"Ethan Wilson\",\"designation\":\"Marketing Director, Wilson Digital\",\"quote\":\"A clean, professional platform with an excellent user experience. Everything feels simple and well organized.\",\"rating\":\"4.5\",\"image\":\"6aa825b6508e71789404598.jpg\"}',NULL,'basic','',0,'2024-05-23 00:10:54','2026-09-14 16:49:58'),
(101,'testimonial.element','{\"has_image\":\"1\",\"name\":\"Oliver Bennett\",\"designation\":\"CEO, Bennett Digital Solutions\",\"quote\":\"A professional platform with a smooth experience and excellent attention to detail. Highly recommended.\",\"rating\":\"4\",\"image\":\"6aa825558e4c21789404501.jpg\"}',NULL,'basic','',0,'2024-05-23 00:11:20','2026-09-14 16:48:21'),
(102,'testimonial.element','{\"has_image\":\"1\",\"name\":\"Trozan Dash\",\"designation\":\"Manager of German Markret\",\"quote\":\"A reliable and professional platform with a great user experience. Highly recommended.\",\"rating\":\"5\",\"image\":\"6aa824e5351fe1789404389.jpg\"}',NULL,'basic','',0,'2024-05-23 00:11:44','2026-09-14 16:46:29'),
(103,'top_sell.content','{\"title\":\"Top Selling\",\"heading\":\"Our Top Selling Cards\",\"subheading\":\"Discover the most popular prepaid and gift cards our customers love! These best-sellers are trusted, budget-friendly, and perfect for every occasion. Get yours today and experience instant activation with secure transactions.\"}',NULL,'basic','',0,'2024-05-23 00:12:07','2025-10-09 21:15:57'),
(105,'how_to_work.element','{\"text\":\"Create Your Account\",\"icon\":\"<i class=\\\"las la-user-check\\\"><\\/i>\"}',NULL,'basic','',0,'2025-10-09 21:04:20','2025-10-09 21:04:20'),
(106,'how_to_work.element','{\"text\":\"Go to Dashboard\",\"icon\":\"<i class=\\\"las la-home\\\"><\\/i>\"}',NULL,'basic','',0,'2025-10-09 21:04:54','2025-10-09 21:04:54'),
(107,'how_to_work.element','{\"text\":\"Buy A Card\",\"icon\":\"<i class=\\\"fas fa-credit-card\\\"><\\/i>\"}',NULL,'basic','',0,'2025-10-09 21:05:18','2025-10-09 21:05:18'),
(108,'blog.element','{\"has_image\":[\"1\"],\"title\":\"USA Debit Cards: Types, Benefits & How to Choose the Right Card\",\"description\":\"<h1>USA Debit Cards: Types, Benefits & How to Choose the Right Card<\\/h1><p>Debit cards are one of the most common ways people in the United States access and spend money from their bank accounts. They can be used for everyday purchases, online shopping, ATM withdrawals, bill payments, and many other transactions.<\\/p><p>For someone opening a first checking account, switching banks, or simply looking for a better payment option, choosing the right debit card can make everyday money management easier.<\\/p><p>However, not all cards are the same. Different banks and financial institutions can offer different account features, fees, ATM access, transaction limits, security tools, and other services.<\\/p><p>In this guide, we will explain <strong>USA debit cards<\\/strong>, the main types available, their benefits and possible fees, how debit cards work, the difference between debit and prepaid cards, and the important factors to consider when choosing the right card.<\\/p><h2>What Is a Debit Card?<\\/h2><p>A debit card is a payment card generally connected to a checking or savings account at a bank or credit union.<\\/p><p>When you use a debit card to make a purchase, the money normally comes from funds available in your account. This is different from a traditional credit card, where you are borrowing against a credit limit.<\\/p><p>The Consumer Financial Protection Bureau explains that debit cards generally use money already held in a bank or credit-union account, while credit cards involve borrowing money.<\\/p><p>Debit cards can also be used at compatible ATMs to withdraw cash.<\\/p><h2>How Do USA Debit Cards Work?<\\/h2><p>The basic process is straightforward.<\\/p><p>You open an eligible bank or credit-union account and receive a debit card associated with that account. After activating the card, you can use it for supported transactions.<\\/p><p>For example, when purchasing something at a store, you may tap, insert, or swipe your card depending on the payment terminal.<\\/p><p>For an ATM transaction, you generally insert or tap your card, enter your PIN, select the required service, and follow the instructions.<\\/p><p>The transaction is processed through the card network and financial institution, and the relevant amount is deducted from your available account balance.<\\/p><h2>Main Types of Debit Cards in the USA<\\/h2><p>There are several ways to categorize debit cards in the United States.<\\/p><h3>1. Traditional Bank Debit Cards<\\/h3><p>These are debit cards linked to ordinary checking accounts.<\\/p><p>They are commonly used for:<\\/p><ul><li><p>Shopping<\\/p><\\/li><li><p>Online purchases<\\/p><\\/li><li><p>ATM withdrawals<\\/p><\\/li><li><p>Bill payments<\\/p><\\/li><li><p>Everyday expenses<\\/p><\\/li><li><p>Cashless transactions<\\/p><\\/li><\\/ul><p>Many U.S. banks offer a debit card with their checking accounts.<\\/p><h3>2. Credit Union Debit Cards<\\/h3><p>Credit unions can also provide debit cards connected to eligible accounts.<\\/p><p>The exact features, fees, ATM access, and account requirements depend on the individual credit union.<\\/p><p>If you are comparing banks and credit unions, look at the complete account terms rather than choosing based only on the card design.<\\/p><h3>3. Online Bank Debit Cards<\\/h3><p>Online banks can provide debit cards even though customers primarily manage their accounts through websites and mobile applications.<\\/p><p>These accounts may offer features such as:<\\/p><ul><li><p>Mobile banking<\\/p><\\/li><li><p>Digital account management<\\/p><\\/li><li><p>Transaction notifications<\\/p><\\/li><li><p>Online transfers<\\/p><\\/li><li><p>ATM access<\\/p><\\/li><li><p>Direct deposit<\\/p><\\/li><\\/ul><p>The availability of specific features varies by financial institution.<\\/p><h3>4. Business Debit Cards<\\/h3><p>Business banking customers may receive debit cards connected to business checking accounts.<\\/p><p>A business debit card can help separate company spending from personal expenses and may provide account-management tools for businesses.<\\/p><h3>5. Prepaid Cards<\\/h3><p>Prepaid cards look similar to debit cards but work differently.<\\/p><p>A prepaid card generally is not linked directly to a traditional checking account. Instead, the user loads money onto the prepaid account and spends from that balance.<\\/p><p>The CFPB notes that prepaid cards can have different fee structures and features, so consumers should compare the terms before choosing one.<\\/p><h2>Debit Card vs. Prepaid Card<\\/h2><p>This is an important distinction.<\\/p><p>A traditional debit card is connected to a bank or credit-union account.<\\/p><p>A prepaid card generally involves money loaded onto the card or prepaid account.<\\/p><h3>Debit Card<\\/h3><ul><li><p>Linked to a bank account<\\/p><\\/li><li><p>Uses available account funds<\\/p><\\/li><li><p>Commonly provided with checking accounts<\\/p><\\/li><li><p>Can provide ATM access<\\/p><\\/li><li><p>Can be used for everyday purchases<\\/p><\\/li><\\/ul><h3>Prepaid Card<\\/h3><ul><li><p>Usually not linked to a traditional checking account<\\/p><\\/li><li><p>Money is loaded before spending<\\/p><\\/li><li><p>May have monthly or transaction fees<\\/p><\\/li><li><p>May offer ATM access depending on the product<\\/p><\\/li><li><p>Can have different consumer protections and insurance arrangements<\\/p><\\/li><\\/ul><p>The CFPB specifically advises consumers to compare prepaid-card fees and features before choosing one.<\\/p><h2>Benefits of USA Debit Cards<\\/h2><p>Debit cards offer several practical benefits.<\\/p><h3>1. Convenient Everyday Payments<\\/h3><p>Debit cards allow you to pay for products and services without carrying large amounts of cash.<\\/p><p>You can use them at participating stores, restaurants, service providers, and other merchants.<\\/p><h3>2. ATM Access<\\/h3><p>One of the biggest benefits of a debit card is the ability to access cash through compatible ATMs.<\\/p><p>Your own bank\'s ATM network may provide lower-cost access, while using another institution\'s ATM may involve additional fees depending on the account terms.<\\/p><h3>3. Online Shopping<\\/h3><p>Many debit cards can be used for online purchases where the merchant accepts the relevant card network.<\\/p><p>This makes debit cards useful for subscriptions, shopping websites, digital services, travel bookings, and other online transactions.<\\/p><h3>4. Spending From Available Funds<\\/h3><p>Because debit cards normally use money from an associated account, they can be useful for people who prefer not to use traditional credit for everyday spending.<\\/p><p>However, account overdraft settings can affect how transactions are handled.<\\/p><h3>5. Direct Deposit<\\/h3><p>Many U.S. checking accounts support direct deposit.<\\/p><p>This allows employers and other eligible organizations to send money electronically to your bank account instead of providing a physical check.<\\/p><p>The CFPB notes that bank accounts can support direct deposit and debit-card access as part of everyday banking.<\\/p><h3>6. Mobile Banking<\\/h3><p>Modern bank accounts commonly provide mobile or online banking tools that can help customers monitor balances and transactions.<\\/p><p>Some financial institutions also offer transaction alerts and card-management controls.<\\/p><h3>7. Less Need for Cash<\\/h3><p>Debit cards can reduce the need to carry cash for everyday purchases.<\\/p><p>This can be especially useful for people who frequently shop online or use merchants that primarily accept card payments.<\\/p><h2>USA Debit Card Fees<\\/h2><p>Not every debit card has the same fee structure.<\\/p><p>Depending on the bank and account, possible costs may include:<\\/p><ul><li><p>Monthly maintenance fees<\\/p><\\/li><li><p>ATM fees<\\/p><\\/li><li><p>Out-of-network ATM fees<\\/p><\\/li><li><p>Foreign transaction fees<\\/p><\\/li><li><p>Replacement-card fees<\\/p><\\/li><li><p>Certain account service fees<\\/p><\\/li><li><p>Overdraft-related fees<\\/p><\\/li><\\/ul><p>Some accounts may waive certain fees if specific requirements are met, such as maintaining a minimum balance or receiving qualifying direct deposits.<\\/p><p>The FDIC\'s recent consumer research found that most banks in its survey offered a debit card with their basic transaction account, and many included it at no additional cost, while some charged a fee.<\\/p><p>Because fees can change, always check the current fee schedule before opening an account.<\\/p><h2>What Is an ATM Fee?<\\/h2><p>An ATM fee is a charge that can apply when you use an ATM under certain circumstances.<\\/p><p>For example, your bank may provide free access to its own ATM network but charge a fee for certain out-of-network transactions.<\\/p><p>The ATM operator may also charge its own fee.<\\/p><p>Before completing a transaction, check the ATM screen for any displayed fee and review your bank\'s terms.<\\/p><h2>What Is an Overdraft?<\\/h2><p>An overdraft can happen when there is not enough money in an account to cover a transaction and the financial institution pays the transaction anyway.<\\/p><p>The CFPB explains that overdrafts can result in the customer owing the amount that was overdrawn and potentially paying an overdraft fee.<\\/p><p>Some account options are designed to reduce overdraft risk by declining transactions when sufficient funds are unavailable.<\\/p><p>If avoiding overdraft fees is important to you, ask the bank about its overdraft policies before opening an account.<\\/p><h2>How to Choose the Right USA Debit Card<\\/h2><p>Choosing a debit card should be about more than finding a card with attractive features.<\\/p><p>Consider the following factors.<\\/p><h3>1. Monthly Fees<\\/h3><p>Check whether the account has a monthly maintenance fee.<\\/p><p>Also check whether that fee can be waived by meeting certain requirements.<\\/p><h3>2. ATM Network<\\/h3><p>Consider how easy it will be to find fee-free or low-cost ATMs.<\\/p><p>If you regularly withdraw cash, ATM availability can make a significant difference.<\\/p><h3>3. Online Banking<\\/h3><p>A good mobile or online banking experience can make it easier to:<\\/p><ul><li><p>Check your balance<\\/p><\\/li><li><p>Review transactions<\\/p><\\/li><li><p>Transfer money<\\/p><\\/li><li><p>Manage payments<\\/p><\\/li><li><p>Monitor account activity<\\/p><\\/li><\\/ul><h3>4. Transaction Alerts<\\/h3><p>Security notifications can help you identify transactions that you do not recognize.<\\/p><p>If available, consider enabling alerts for card purchases, ATM withdrawals, transfers, and other important account activity.<\\/p><h3>5. Foreign Transactions<\\/h3><p>If you travel internationally, check whether the card charges foreign transaction fees or has other international-use restrictions.<\\/p><h3>6. Daily Limits<\\/h3><p>Some debit cards and accounts have limits for purchases or ATM withdrawals.<\\/p><p>If you expect to make larger transactions, check these limits in advance.<\\/p><h3>7. Account Requirements<\\/h3><p>Some checking accounts may have requirements related to:<\\/p><ul><li><p>Minimum opening deposits<\\/p><\\/li><li><p>Minimum balances<\\/p><\\/li><li><p>Direct deposits<\\/p><\\/li><li><p>Monthly activity<\\/p><\\/li><li><p>Identity verification<\\/p><\\/li><\\/ul><p>Compare these requirements with your own banking needs.<\\/p><h2>Debit Card Security<\\/h2><p>Debit card security should always be a priority.<\\/p><p>Because a debit card can be connected directly to your bank account, unauthorized access can potentially affect your available funds.<\\/p><p>Here are some basic safety practices.<\\/p><h3>Keep Your PIN Private<\\/h3><p>Never share your debit-card PIN with another person.<\\/p><p>Do not write the PIN on the card.<\\/p><h3>Monitor Your Transactions<\\/h3><p>Check your bank account regularly.<\\/p><p>If you notice a transaction you do not recognize, contact your financial institution using an official contact method.<\\/p><h3>Be Careful With Phishing<\\/h3><p>Scammers can pretend to represent banks and ask customers for card numbers, PINs, passwords, or verification codes.<\\/p><p>A legitimate bank representative should not require you to reveal sensitive authentication information through an unexpected message or suspicious link.<\\/p><h3>Protect Your Card Information<\\/h3><p>Avoid posting photographs of your debit card online.<\\/p><p>Do not unnecessarily share your card number, security code, PIN, or account credentials.<\\/p><h3>Report Lost Cards Quickly<\\/h3><p>If your card is lost or stolen, contact the financial institution as soon as possible.<\\/p><p>The CFPB advises consumers to act promptly when a card is missing or when unauthorized charges are discovered.<\\/p><h2>Debit Cards and Fraud Protection<\\/h2><p>U.S. consumers have certain protections relating to unauthorized electronic transactions, but the details can depend on the circumstances and how quickly the customer reports the problem.<\\/p><p>For that reason, monitoring your account and reporting suspicious transactions quickly is important.<\\/p><p>If you believe someone has obtained your card information, contact your bank through its official website, mobile app, or customer-service number.<\\/p><h2>USA Debit Cards for Online Shopping<\\/h2><p>Debit cards are widely used for online purchases.<\\/p><p>When shopping online, look for established merchants and make sure you are entering your information on the correct website.<\\/p><p>Before completing a purchase:<\\/p><ul><li><p>Verify the website address<\\/p><\\/li><li><p>Check the final price<\\/p><\\/li><li><p>Review shipping costs<\\/p><\\/li><li><p>Avoid suspicious payment pages<\\/p><\\/li><li><p>Never share your PIN with an online merchant<\\/p><\\/li><li><p>Monitor your account after the transaction<\\/p><\\/li><\\/ul><p>For additional security, some financial institutions provide virtual-card or card-control features, although availability varies.<\\/p><h2>Debit Cards for Travel<\\/h2><p>A debit card can be useful when traveling within the United States or internationally.<\\/p><p>Before traveling, consider checking:<\\/p><ul><li><p>ATM availability<\\/p><\\/li><li><p>International transaction fees<\\/p><\\/li><li><p>Foreign currency conversion<\\/p><\\/li><li><p>Daily ATM limits<\\/p><\\/li><li><p>Purchase limits<\\/p><\\/li><li><p>Card expiration date<\\/p><\\/li><li><p>Bank contact information<\\/p><\\/li><\\/ul><p>It is also a good idea to have a backup payment method in case your primary card is lost, blocked, or unavailable.<\\/p><h2>Debit Card vs. Credit Card<\\/h2><p>Debit cards and credit cards are not the same.<\\/p><h3>Debit Card<\\/h3><p>A debit card normally uses money already available in your bank account.<\\/p><h3>Credit Card<\\/h3><p>A credit card provides access to borrowed funds up to an approved credit limit, which you generally repay later.<\\/p><p>The CFPB describes debit and prepaid cards as spending methods that generally use money you already have, while credit cards involve borrowing.<\\/p><p>Neither option is automatically best for everyone. The right choice depends on your financial habits, goals, and the terms of the specific card.<\\/p><h2>Debit Card vs. Cash<\\/h2><p>Cash can be useful, but debit cards provide additional convenience.<\\/p><p>With a debit card, you can often:<\\/p><ul><li><p>Pay online<\\/p><\\/li><li><p>Shop in stores<\\/p><\\/li><li><p>Withdraw cash<\\/p><\\/li><li><p>Track transactions electronically<\\/p><\\/li><li><p>Receive banking alerts<\\/p><\\/li><li><p>Manage spending through an app<\\/p><\\/li><\\/ul><p>However, keeping a small amount of emergency cash can still be useful when a merchant does not accept cards or when electronic payment systems are unavailable.<\\/p><h2>Are USA Debit Cards Safe?<\\/h2><p>Debit cards can be used safely when customers follow good security practices.<\\/p><p>The most important steps include:<\\/p><ul><li><p>Protecting your PIN<\\/p><\\/li><li><p>Using trusted payment websites<\\/p><\\/li><li><p>Monitoring transactions<\\/p><\\/li><li><p>Reporting suspicious activity<\\/p><\\/li><li><p>Keeping your phone and banking app secure<\\/p><\\/li><li><p>Avoiding suspicious links<\\/p><\\/li><li><p>Contacting your bank quickly if your card is lost<\\/p><\\/li><\\/ul><p>Security also depends on the bank, account, card network, and specific protections associated with the product.<\\/p><h2>What Should You Look for in a Debit Card?<\\/h2><p>Before choosing a debit card, create a simple checklist:<\\/p><p><strong>Fees:<\\/strong> Are monthly and transaction fees reasonable?<\\/p><p><strong>ATM access:<\\/strong> Can you easily find compatible ATMs?<\\/p><p><strong>Mobile banking:<\\/strong> Is the banking app convenient?<\\/p><p><strong>Security:<\\/strong> Are transaction alerts and card controls available?<\\/p><p><strong>Online payments:<\\/strong> Does the card work for the websites and services you use?<\\/p><p><strong>International use:<\\/strong> Can you use it when traveling?<\\/p><p><strong>Limits:<\\/strong> Are purchase and ATM limits suitable for your needs?<\\/p><p><strong>Account requirements:<\\/strong> Can you comfortably meet the account\'s requirements?<\\/p><p>Comparing these factors can help you avoid choosing a card based only on advertising or appearance.<\\/p><h2>Frequently Asked Questions<\\/h2><h3>What is the most common type of debit card in the USA?<\\/h3><p>Traditional bank debit cards linked to checking accounts are among the most common types. Banks and credit unions may offer different account and card options.<\\/p><h3>Can I use a USA debit card online?<\\/h3><p>Many debit cards can be used for online purchases at participating merchants. Availability depends on the card, network, merchant, and account settings.<\\/p><h3>Can I withdraw money from any ATM?<\\/h3><p>Not necessarily. A debit card may work at many compatible ATMs, but fees, network restrictions, and availability can vary.<\\/p><h3>Are debit cards free in the USA?<\\/h3><p>Some bank accounts include a debit card without a separate card fee, while other accounts may charge fees. Always review the current account terms.<\\/p><h3>Is a debit card the same as a prepaid card?<\\/h3><p>No. A traditional debit card is generally linked to a bank or credit-union account, while a prepaid card generally uses money loaded onto a separate prepaid account.<\\/p><h3>Is a debit card the same as a credit card?<\\/h3><p>No. A debit card generally uses your existing funds, while a credit card involves borrowing money that must be repaid.<\\/p><h3>What should I do if my debit card is stolen?<\\/h3><p>Contact your financial institution immediately through an official channel, report the card as lost or stolen, and follow the bank\'s instructions for securing your account.<\\/p><h2>Final Thoughts<\\/h2><p>USA debit cards provide a convenient way to access and spend money held in a bank or credit-union account. They can be used for everyday purchases, online shopping, ATM withdrawals, and other financial transactions.<\\/p><p>However, the best debit card depends on your personal banking needs.<\\/p><p>Before choosing one, compare the account\'s fees, ATM network, transaction limits, online banking tools, security features, international-use policies, and account requirements.<\\/p><p>It is also important to remember that <strong>debit cards, credit cards, and prepaid cards are different financial products<\\/strong>. Understanding these differences can help you select a payment method that fits your spending habits.<\\/p><p>Finally, always check the latest terms directly with the bank or financial institution before opening an account, because fees, features, eligibility requirements, and card policies can change over time.<\\/p>\",\"image\":\"6aa822127d7021789403666.jpg\"}','{\"image\":\"6aa822850c6a21789403781.jpg\",\"description\":\"Learn about USA debit cards, including different types, benefits, fees, features, ATM access, security, and how to choose the right debit card for your needs.\",\"social_title\":\"USA Debit Cards: Types, Benefits, Fees & How to Choose\",\"social_description\":\"Discover the different types of USA debit cards, their benefits, fees, features, ATM access, security tips, and how to choose the right card.\",\"keywords\":[\"debit cards USA\",\"best debit cards USA\",\"American debit cards\",\"US debit card\",\"debit card types\",\"debit card benefits\",\"debit card fees\",\"debit card features\",\"checking account debit card\",\"prepaid cards USA\",\"online debit cards\",\"debit card security\",\"ATM debit cards\",\"usacards\",\"freecards\",\"carding\",\"giftcards\",\"germanmarket\"]}','basic','usa-debit-cards-types-benefits-how-to-choose-the-right-card',9,'2026-08-19 15:18:59','2026-09-14 16:36:21'),
(110,'blog.element','{\"has_image\":[\"1\"],\"title\":\"Stanbic Bank Debit Card: Features, Fees, Benefits & How to Get One\",\"description\":\"<h1>Stanbic Bank Debit Card: Features, Fees, Benefits & How to Get One<\\/h1><h1><\\/h1><p>A debit card is one of the easiest ways to access money in a bank account without carrying cash everywhere. Stanbic Bank offers debit card solutions that can help customers make purchases, withdraw cash, pay bills, and access their accounts through supported payment networks and banking channels.<\\/p><p>Whether you are opening a bank account for the first time or looking for a convenient way to manage everyday payments, understanding how a Stanbic Bank debit card works can help you choose the right banking option.<\\/p><p>In this guide, we will explain Stanbic Bank debit card features, benefits, possible fees, eligibility, application requirements, ATM withdrawals, online payments, security tips, and other important information.<\\/p><h2>What Is a Stanbic Bank Debit Card?<\\/h2><h1><\\/h1><p>A Stanbic Bank debit card is a payment card linked to an eligible bank account. When you use the card to make a purchase or withdraw cash, the transaction is generally connected to the available balance in your account.<\\/p><p>Unlike a traditional credit card, a debit card normally does not require you to borrow money from a credit facility for everyday transactions. Instead, payments are generally deducted from the available funds associated with your account.<\\/p><p>Depending on the country, account type, and card product, Stanbic Bank customers may have access to different debit card features and payment options.<\\/p><h2>Key Features of a Stanbic Bank Debit Card<\\/h2><h1><\\/h1><p>The exact features can vary depending on the Stanbic Bank market and card product, but common debit-card functions can include:<\\/p><ul><li><p>ATM cash withdrawals<\\/p><\\/li><li><p>In-store purchases<\\/p><\\/li><li><p>Online payments where supported<\\/p><\\/li><li><p>Contactless payments on eligible cards<\\/p><\\/li><li><p>Access to supported payment networks<\\/p><\\/li><li><p>PIN-based transactions<\\/p><\\/li><li><p>Account-linked spending<\\/p><\\/li><li><p>Cashless payments<\\/p><\\/li><li><p>Transaction monitoring<\\/p><\\/li><li><p>Card security controls<\\/p><\\/li><\\/ul><p>These features make a debit card useful for everyday spending and accessing funds without needing to carry large amounts of cash.<\\/p><h2>How Does a Stanbic Bank Debit Card Work?<\\/h2><h1><\\/h1><p>Using a debit card is relatively simple.<\\/p><p>First, you need an eligible bank account and an issued debit card. Once your card has been activated, you can use it at supported ATMs, stores, websites, and other payment locations.<\\/p><p>For an in-store purchase, you can normally insert, swipe, tap, or otherwise use the card according to the terminal\'s supported payment method. Depending on the transaction, you may be asked to enter your PIN or provide another form of verification.<\\/p><p>For an ATM withdrawal, you insert or tap the card where supported, enter your PIN, select the required transaction, and follow the instructions displayed on the ATM.<\\/p><p>The transaction is then processed against the available funds or limits associated with your account and card.<\\/p><h2>Stanbic Bank Debit Card Benefits<\\/h2><h1><\\/h1><p>A debit card can provide several advantages for everyday banking.<\\/p><h3>1. Convenient Payments<\\/h3><h1><\\/h1><p>Instead of carrying cash, you can use your debit card at supported merchants. This can make everyday purchases faster and more convenient.<\\/p><h3>2. ATM Access<\\/h3><h1><\\/h1><p>A debit card can provide access to cash through supported ATMs. This is particularly useful when you need physical cash for a purchase or service.<\\/p><h3>3. Easier Online Spending<\\/h3><h1><\\/h1><p>Where online transactions are supported and enabled, a debit card may be used for purchases on participating websites and digital services.<\\/p><p>Before making an online payment, always check whether the merchant accepts your particular card and whether online transactions are enabled.<\\/p><h3>4. Better Cash Management<\\/h3><h1><\\/h1><p>Because debit-card spending is connected to available funds, it can help users keep everyday spending connected to their bank balance.<\\/p><h3>5. Reduced Need for Cash<\\/h3><h1><\\/h1><p>Debit cards can reduce the need to carry cash for everyday purchases, especially in locations where card payments are widely accepted.<\\/p><h3>6. Transaction Tracking<\\/h3><h1><\\/h1><p>Banking apps, online banking, SMS alerts, statements, or other account services may help customers monitor card-related transactions, depending on the services available in their market.<\\/p><h2>Stanbic Bank Debit Card Fees<\\/h2><h1><\\/h1><p>One of the most important things to check before getting a debit card is the applicable fee structure.<\\/p><p>Debit card costs can vary based on the Stanbic Bank country, account type, card type, transaction method, and applicable banking terms.<\\/p><p>Possible charges may include:<\\/p><ul><li><p>Card issuance fees<\\/p><\\/li><li><p>Card replacement fees<\\/p><\\/li><li><p>Annual or periodic card fees<\\/p><\\/li><li><p>ATM withdrawal charges<\\/p><\\/li><li><p>International transaction fees<\\/p><\\/li><li><p>Foreign currency conversion charges<\\/p><\\/li><li><p>Other applicable banking service fees<\\/p><\\/li><\\/ul><p>Not every fee applies to every customer or card.<\\/p><p>For this reason, customers should check the official Stanbic Bank fee schedule for their specific country and account before relying on a particular price.<\\/p><h2>How to Get a Stanbic Bank Debit Card<\\/h2><h1><\\/h1><p>Getting a Stanbic Bank debit card generally starts with opening or having an eligible bank account.<\\/p><p>A typical process may involve the following steps:<\\/p><h3>Step 1: Choose an Eligible Account<\\/h3><h1><\\/h1><p>Review the available Stanbic Bank accounts and determine which one suits your banking needs.<\\/p><p>Different accounts can have different requirements, benefits, and card options.<\\/p><h3>Step 2: Complete the Account Application<\\/h3><h1><\\/h1><p>You may need to provide personal information and documentation required by the bank.<\\/p><p>Depending on the country and account type, requirements can include identification documents, proof of address, contact information, and other information required for customer verification.<\\/p><h3>Step 3: Request or Receive the Debit Card<\\/h3><h1><\\/h1><p>After the account is approved, the bank may provide or allow you to request an eligible debit card.<\\/p><p>The exact process can vary by market and account.<\\/p><h3>Step 4: Activate Your Card<\\/h3><h1><\\/h1><p>Once you receive your card, follow the bank\'s official activation instructions.<\\/p><p>Never share your card PIN, one-time passwords, or other confidential authentication information with another person.<\\/p><h3>Step 5: Start Using the Card<\\/h3><h1><\\/h1><p>After activation, you can use the card for supported transactions according to the terms and limits associated with your account.<\\/p><h2>What Documents May Be Required?<\\/h2><h1><\\/h1><p>The exact requirements depend on the country and type of account.<\\/p><p>Common banking verification requirements can include:<\\/p><ul><li><p>Government-issued identification<\\/p><\\/li><li><p>Proof of address<\\/p><\\/li><li><p>Phone number<\\/p><\\/li><li><p>Email address<\\/p><\\/li><li><p>Personal information<\\/p><\\/li><li><p>Additional documents where required<\\/p><\\/li><\\/ul><p>Business accounts and certain specialized banking products may have additional requirements.<\\/p><p>Always check the official Stanbic Bank website for your country before visiting a branch or submitting an application.<\\/p><h2>Can You Use a Stanbic Debit Card Online?<\\/h2><h1><\\/h1><p>Online card payments depend on the specific card, payment network, account settings, merchant, and country.<\\/p><p>If your card supports online payments, you may be able to use it at participating websites by entering the required card information and completing any security verification requested by the bank.<\\/p><p>For security reasons, avoid entering card details on websites that you do not trust.<\\/p><p>Before paying online, check:<\\/p><ul><li><p>The website uses a secure connection<\\/p><\\/li><li><p>The merchant is legitimate<\\/p><\\/li><li><p>The payment amount is correct<\\/p><\\/li><li><p>The website address is correct<\\/p><\\/li><li><p>You understand any additional fees<\\/p><\\/li><li><p>The transaction is authorized by you<\\/p><\\/li><\\/ul><h2>Can You Withdraw Money From an ATM?<\\/h2><h1><\\/h1><p>A supported Stanbic Bank debit card can generally be used for ATM transactions where the card and ATM network are supported.<\\/p><p>Depending on the card and account, ATM services may include:<\\/p><ul><li><p>Cash withdrawals<\\/p><\\/li><li><p>Balance inquiries<\\/p><\\/li><li><p>Other supported banking services<\\/p><\\/li><\\/ul><p>ATM availability and fees can differ by country and by whether you use a Stanbic Bank ATM or another bank\'s ATM.<\\/p><p>Always review the transaction screen and your bank\'s applicable fee information before confirming a transaction when possible.<\\/p><h2>Stanbic Debit Card for International Transactions<\\/h2><h1><\\/h1><p>Some debit cards can be used internationally, but international availability depends on the card type, payment network, account settings, destination, and applicable bank policies.<\\/p><p>International transactions can also involve currency conversion and additional fees.<\\/p><p>If you plan to travel, it is a good idea to check your card\'s international usage rules before leaving your country.<\\/p><p>You should also make sure that your contact information is up to date so that you can receive important security notifications if available.<\\/p><h2>Contactless Payments<\\/h2><h1><\\/h1><p>Some modern debit cards support contactless payments.<\\/p><p>With contactless technology, customers can pay at compatible payment terminals by bringing the card close to the terminal.<\\/p><p>Depending on the transaction amount and local rules, you may occasionally be asked to enter a PIN or provide another form of verification.<\\/p><p>If your Stanbic card supports contactless payments, follow the instructions provided by the bank and payment terminal.<\\/p><h2>Stanbic Bank Debit Card Security<\\/h2><h1><\\/h1><p>Card security is extremely important because your debit card can be connected directly to your bank account.<\\/p><p>Follow these basic security practices:<\\/p><h3>Keep Your PIN Private<\\/h3><h1><\\/h1><p>Never share your PIN with friends, strangers, merchants, callers, or anyone claiming to be a bank representative.<\\/p><h3>Protect Your Card Details<\\/h3><h1><\\/h1><p>Avoid sharing your card number, expiration date, CVV, PIN, or security codes unnecessarily.<\\/p><h3>Be Careful With Phishing Messages<\\/h3><h1><\\/h1><p>Fraudsters may send fake emails, SMS messages, social-media messages, or phone calls pretending to be from a bank.<\\/p><p>Do not click suspicious links or provide confidential information in response to unexpected messages.<\\/p><h3>Monitor Transactions<\\/h3><h1><\\/h1><p>Regularly check your account activity and report transactions that you do not recognize.<\\/p><h3>Use Trusted Websites<\\/h3><h1><\\/h1><p>When shopping online, use reputable websites and avoid entering card information into suspicious forms.<\\/p><h3>Report a Lost Card Quickly<\\/h3><h1><\\/h1><p>If your debit card is lost or stolen, contact the bank through an official channel as soon as possible and follow the bank\'s instructions for blocking or replacing the card.<\\/p><h2>What Is Carding and Why Should You Avoid It?<\\/h2><h1><\\/h1><p>The term \\\"carding\\\" is commonly associated with the illegal use of stolen payment-card information.<\\/p><p>Using someone else\'s card details without permission, purchasing stolen card data, or attempting unauthorized transactions is fraudulent and illegal.<\\/p><p>A legitimate debit card should only be used by its authorized cardholder and for transactions that the cardholder has permission to make.<\\/p><p>If you are studying cybersecurity, learning about card fraud should focus on prevention, detection, secure payment systems, and responsible security testing\\u2014not unauthorized transactions.<\\/p><h2>Stanbic Debit Card vs Credit Card<\\/h2><h1><\\/h1><p>A debit card and credit card work differently.<\\/p><p>A debit card generally uses money available in a linked bank account, while a credit card normally provides access to a credit facility that must be repaid according to the card agreement.<\\/p><h3>Debit Card<\\/h3><h1><\\/h1><ul><li><p>Linked to a bank account<\\/p><\\/li><li><p>Uses available funds<\\/p><\\/li><li><p>Useful for everyday purchases<\\/p><\\/li><li><p>Can provide ATM access<\\/p><\\/li><li><p>Usually does not work like a traditional borrowing facility<\\/p><\\/li><\\/ul><h3>Credit Card<\\/h3><h1><\\/h1><ul><li><p>Uses an approved credit limit<\\/p><\\/li><li><p>Requires repayment<\\/p><\\/li><li><p>May have interest charges depending on the account and payment behavior<\\/p><\\/li><li><p>Can offer additional credit-related features<\\/p><\\/li><\\/ul><p>The better option depends on your financial situation and how you intend to use the card.<\\/p><h2>How to Choose the Right Debit Card<\\/h2><h1><\\/h1><p>Before selecting a debit card, consider more than just the card\'s appearance.<\\/p><p>Look at:<\\/p><ol><li><p><strong>Fees<\\/strong> \\u2013 Check issuance, replacement, ATM, and international transaction charges.<\\/p><\\/li><li><p><strong>ATM access<\\/strong> \\u2013 Consider where you can withdraw cash.<\\/p><\\/li><li><p><strong>Online payments<\\/strong> \\u2013 Confirm whether online transactions are supported.<\\/p><\\/li><li><p><strong>International usage<\\/strong> \\u2013 Check whether the card works in countries where you plan to travel.<\\/p><\\/li><li><p><strong>Security features<\\/strong> \\u2013 Look for transaction alerts and other available controls.<\\/p><\\/li><li><p><strong>Mobile banking<\\/strong> \\u2013 Consider whether you can easily monitor your account.<\\/p><\\/li><li><p><strong>Daily limits<\\/strong> \\u2013 Understand ATM and purchase limits.<\\/p><\\/li><li><p><strong>Customer support<\\/strong> \\u2013 Know how to contact the bank if your card is lost or compromised.<\\/p><\\/li><\\/ol><h2>Tips for Using Your Stanbic Debit Card Safely<\\/h2><h1><\\/h1><p>Here are some practical tips for safer card usage:<\\/p><ul><li><p>Keep your card in a secure place.<\\/p><\\/li><li><p>Never write your PIN on the card.<\\/p><\\/li><li><p>Avoid sharing card information through social media.<\\/p><\\/li><li><p>Do not respond to suspicious banking messages.<\\/p><\\/li><li><p>Check your transactions regularly.<\\/p><\\/li><li><p>Use official banking apps and websites.<\\/p><\\/li><li><p>Contact the bank immediately if you notice suspicious activity.<\\/p><\\/li><li><p>Be careful when using ATMs in unfamiliar locations.<\\/p><\\/li><li><p>Do not allow strangers to \\\"help\\\" you with an ATM transaction.<\\/p><\\/li><li><p>Keep your contact information updated with the bank.<\\/p><\\/li><\\/ul><h2>Frequently Asked Questions<\\/h2><h3>Is a Stanbic Bank debit card free?<\\/h3><h1><\\/h1><p>Not necessarily. Fees depend on the country, account type, card product, and applicable banking terms. Check the current fee schedule for your local Stanbic Bank operation.<\\/p><h3>Can I use a Stanbic debit card online?<\\/h3><h1><\\/h1><p>Some Stanbic debit cards support online transactions. Availability depends on the specific card, account, payment network, merchant, and country.<\\/p><h3>Can I use a Stanbic debit card internationally?<\\/h3><h1><\\/h1><p>International usage depends on the card and applicable bank policies. Check the conditions for your specific card before traveling.<\\/p><h3>Can I withdraw cash using a Stanbic debit card?<\\/h3><h1><\\/h1><p>Yes, eligible debit cards can generally be used for supported ATM withdrawals. ATM availability and charges depend on the card and location.<\\/p><h3>What should I do if my Stanbic debit card is lost?<\\/h3><h1><\\/h1><p>Contact Stanbic Bank through an official customer-service channel as soon as possible and follow its instructions for blocking or replacing the card.<\\/p><h3>How do I know which Stanbic debit card is right for me?<\\/h3><h1><\\/h1><p>Compare the available card products based on fees, ATM access, online payments, international usage, limits, security features, and the type of bank account you need.<\\/p><h2>Final Thoughts<\\/h2><h1><\\/h1><p>A Stanbic Bank debit card can be a convenient way to manage everyday payments, access cash, and use money from an eligible bank account.<\\/p><p>Before applying, however, it is important to understand the specific card features, fees, transaction limits, eligibility requirements, and international or online usage rules that apply in your country.<\\/p><p>Banking products can change over time, so always verify the latest information directly with Stanbic Bank before opening an account or relying on a particular fee, feature, or eligibility requirement.<\\/p><p>Whether you need a debit card for everyday shopping, ATM withdrawals, online payments, or travel, comparing the available options carefully can help you choose a banking solution that fits your needs.<\\/p>\",\"image\":\"6aa820c221dc91789403330.jpg\"}','{\"image\":\"6aa821444268d1789403460.jpg\",\"description\":\"Learn about the Stanbic Bank debit card, including features, fees, benefits, eligibility, requirements, and how to apply for a card.\",\"social_title\":\"Stanbic Bank Debit Card: Features, Fees, Benefits & More\",\"social_description\":\"Discover Stanbic Bank debit card features, fees, benefits, requirements, and how to get a debit card in this complete guide.\",\"keywords\":[\"Stanbic debit card\",\"Stanbic Bank card\",\"Stanbic Bank debit card fees\",\"Stanbic debit card features\",\"Stanbic debit card benefits\",\"Stanbic Bank card requirements\",\"debit card\",\"bank debit cards\",\"carding\",\"giftcards\",\"germanmarket\"]}','basic','stanbic-bank-debit-card-features-fees-benefits-how-to-get-one',7,'2026-08-19 15:29:25','2026-09-14 16:31:00'),
(111,'blog.element','{\"has_image\":[\"1\"],\"title\":\"PayPal Debit Card Explained: Features, Benefits, Fees & Availability\",\"description\":\"<h1>PayPal Debit Card Explained: Features, Benefits, Fees & Availability<\\/h1><h1><\\/h1><p>PayPal is one of the most widely recognized names in online payments. Millions of people use PayPal to send money, receive payments, shop online, and manage digital transactions. For users who want to spend money from their PayPal balance more directly, a <strong>PayPal debit card<\\/strong> can be an interesting option.<\\/p><p>A PayPal debit card can provide a convenient way to make purchases without manually transferring money from PayPal to another account first. However, the exact card features, availability, fees, and eligibility requirements depend on the country and the specific PayPal product.<\\/p><p>In this complete guide, we will explain <strong>how the PayPal debit card works, its features, benefits, fees, availability, payment options, security, and important things to consider before using one<\\/strong>.<\\/p><h2>What Is a PayPal Debit Card?<\\/h2><h1><\\/h1><p>A <strong>PayPal debit card<\\/strong> is a payment card associated with an eligible PayPal account. It can allow users to spend available funds through a card wherever the applicable card network is accepted.<\\/p><p>Unlike a traditional bank debit card, which is normally connected directly to a bank account, a PayPal card is connected to the user\'s PayPal account and operates according to PayPal\'s terms and the card network\'s rules.<\\/p><p>PayPal offers different card products and services in different markets, so the exact features available to you may vary.<\\/p><p>Before applying for any PayPal card, check the official PayPal website for your country to confirm current availability and eligibility.<\\/p><h2>How Does a PayPal Debit Card Work?<\\/h2><h1><\\/h1><p>The basic idea behind a PayPal debit card is simple.<\\/p><p>Instead of using your PayPal account only through an app or website, an eligible card can allow you to use your available PayPal funds for supported purchases.<\\/p><p>A typical process may look like this:<\\/p><ol><li><p>Create or maintain an eligible PayPal account.<\\/p><\\/li><li><p>Complete any required identity or account verification.<\\/p><\\/li><li><p>Apply for an eligible PayPal card if the product is available in your region.<\\/p><\\/li><li><p>Receive or activate the card according to PayPal\'s instructions.<\\/p><\\/li><li><p>Use the card for eligible purchases.<\\/p><\\/li><li><p>Transactions are processed according to the card\'s terms and available funds.<\\/p><\\/li><\\/ol><p>The exact process can be different depending on the specific PayPal card product.<\\/p><h2>Key Features of a PayPal Debit Card<\\/h2><h1><\\/h1><p>The features of a PayPal debit card depend on the specific product and country.<\\/p><p>Potential features can include:<\\/p><ul><li><p>Direct spending from eligible PayPal funds<\\/p><\\/li><li><p>Online purchases<\\/p><\\/li><li><p>In-store card payments<\\/p><\\/li><li><p>Contactless payments on supported cards<\\/p><\\/li><li><p>Digital wallet compatibility<\\/p><\\/li><li><p>Transaction management<\\/p><\\/li><li><p>Security controls<\\/p><\\/li><li><p>Access to PayPal account information<\\/p><\\/li><li><p>Potential rewards or cashback on eligible products<\\/p><\\/li><\\/ul><p>Not every PayPal card includes every feature. Always check the current product details before signing up.<\\/p><h2>PayPal Debit Card Benefits<\\/h2><h1><\\/h1><p>There are several potential benefits to using a PayPal debit card.<\\/p><h3>1. Convenient Access to PayPal Funds<\\/h3><h1><\\/h1><p>One of the biggest advantages is convenience. Eligible users may be able to spend available PayPal funds directly using their card.<\\/p><p>This can be useful for people who already use PayPal regularly.<\\/p><h3>2. Online Shopping<\\/h3><h1><\\/h1><p>A PayPal debit card can be useful for online purchases at merchants that accept the applicable card network.<\\/p><p>Instead of entering your PayPal credentials at every website, you may be able to use the card like another payment card.<\\/p><h3>3. In-Store Payments<\\/h3><h1><\\/h1><p>Where supported, a physical PayPal debit card can also be used at eligible physical stores.<\\/p><p>This gives users another way to access their PayPal funds for everyday spending.<\\/p><h3>4. Digital Wallet Support<\\/h3><h1><\\/h1><p>Eligible PayPal cards may support digital wallets depending on the product, country, and device.<\\/p><p>Digital wallet support can make payments easier because users may be able to pay using a compatible smartphone or smartwatch.<\\/p><h3>5. Easy Transaction Management<\\/h3><h1><\\/h1><p>Because the card is connected to PayPal, users can generally manage relevant account information through the PayPal platform.<\\/p><p>This can make it easier to monitor transactions and identify unfamiliar activity.<\\/p><h2>PayPal Debit Card Fees<\\/h2><h1><\\/h1><p>Fees are one of the most important things to understand before using any payment card.<\\/p><p><strong>PayPal debit card fees vary depending on the specific product and market.<\\/strong><\\/p><p>Potential costs may include:<\\/p><ul><li><p>Card-related fees<\\/p><\\/li><li><p>ATM withdrawal fees<\\/p><\\/li><li><p>Foreign transaction or currency conversion costs<\\/p><\\/li><li><p>Certain transaction fees<\\/p><\\/li><li><p>Other service charges<\\/p><\\/li><\\/ul><p>Some services may have no monthly fee while others can have specific charges.<\\/p><p>Because PayPal regularly updates its products and pricing, users should always check the latest official fee information for their country rather than relying on an old article or social-media post.<\\/p><h2>Is the PayPal Debit Card Free?<\\/h2><h1><\\/h1><p>This is a common question.<\\/p><p>The answer depends on <strong>which PayPal card product you are talking about and where you live<\\/strong>.<\\/p><p>A product may have no regular monthly fee while still having other potential charges, such as ATM or international transaction costs.<\\/p><p>Therefore, \\\"free\\\" does not necessarily mean that every possible transaction is free.<\\/p><p>Before using a PayPal debit card, review the current fee schedule and cardholder terms.<\\/p><h2>PayPal Debit Card Availability<\\/h2><h1><\\/h1><p><strong>PayPal debit card availability varies by country.<\\/strong><\\/p><p>A card that is available to customers in one country may not be available to users in another.<\\/p><p>Availability can depend on:<\\/p><ul><li><p>Country of residence<\\/p><\\/li><li><p>PayPal account type<\\/p><\\/li><li><p>Verification status<\\/p><\\/li><li><p>Age requirements<\\/p><\\/li><li><p>Product availability<\\/p><\\/li><li><p>Local financial regulations<\\/p><\\/li><li><p>Eligibility requirements<\\/p><\\/li><\\/ul><p>This is particularly important for users searching for a <strong>PayPal debit card in the USA<\\/strong> or other countries.<\\/p><p>Always use the official PayPal website and your local PayPal account to determine whether a particular card is currently available.<\\/p><h2>PayPal Debit Card in the USA<\\/h2><h1><\\/h1><p>The United States has several PayPal payment products that may differ from products offered internationally.<\\/p><p>U.S. users should check their PayPal account and the official PayPal card pages for the latest eligibility requirements, fees, features, and application information.<\\/p><p>Do not assume that a PayPal card available in the United States can be ordered by someone living in another country.<\\/p><h2>Can You Use a PayPal Debit Card Internationally?<\\/h2><h1><\\/h1><p>International usage depends on the particular PayPal card and its terms.<\\/p><p>If international transactions are supported, currency conversion may be involved when making a purchase in another currency.<\\/p><p>Before traveling or making an international purchase, check:<\\/p><ul><li><p>International transaction availability<\\/p><\\/li><li><p>Currency conversion rates<\\/p><\\/li><li><p>Foreign transaction fees<\\/p><\\/li><li><p>Merchant acceptance<\\/p><\\/li><li><p>ATM availability<\\/p><\\/li><li><p>Daily or transaction limits<\\/p><\\/li><\\/ul><p>These details can significantly affect the cost of international spending.<\\/p><h2>PayPal Debit Card for Online Shopping<\\/h2><h1><\\/h1><p>Online shopping is one of the most common reasons people look for payment cards.<\\/p><p>A PayPal debit card can provide another way to pay for eligible online purchases.<\\/p><p>When using your card online, always verify the website before entering your card details.<\\/p><p>A secure online-shopping routine includes:<\\/p><ul><li><p>Checking the website address<\\/p><\\/li><li><p>Avoiding suspicious links<\\/p><\\/li><li><p>Using trusted merchants<\\/p><\\/li><li><p>Keeping card details private<\\/p><\\/li><li><p>Monitoring transactions<\\/p><\\/li><li><p>Using strong account security<\\/p><\\/li><\\/ul><p>Never provide your PayPal password or card security information to someone who contacts you unexpectedly.<\\/p><h2>PayPal Debit Card and ATM Withdrawals<\\/h2><h1><\\/h1><p>Some PayPal card products may support ATM access.<\\/p><p>However, ATM availability, withdrawal limits, and fees depend on the particular card and market.<\\/p><p>Before withdrawing cash, check:<\\/p><ol><li><p>Whether ATM withdrawals are supported.<\\/p><\\/li><li><p>Which ATMs can be used.<\\/p><\\/li><li><p>Whether PayPal charges a fee.<\\/p><\\/li><li><p>Whether the ATM operator charges an additional fee.<\\/p><\\/li><li><p>What your withdrawal limit is.<\\/p><\\/li><\\/ol><p>Using an ATM outside your normal country can also involve currency conversion costs.<\\/p><h2>PayPal Debit Card vs. Traditional Bank Debit Card<\\/h2><h1><\\/h1><p>A PayPal debit card and a traditional bank debit card can both be used for purchases, but they are not exactly the same.<\\/p><table><thead><tr><th>Feature<\\/th><th>PayPal Debit Card<\\/th><th>Traditional Bank Debit Card<\\/th><\\/tr><\\/thead><tbody><tr><td>Connected to<\\/td><td>PayPal account<\\/td><td>Bank account<\\/td><\\/tr><tr><td>Online payments<\\/td><td>Usually supported where eligible<\\/td><td>Usually supported<\\/td><\\/tr><tr><td>In-store payments<\\/td><td>Product-dependent<\\/td><td>Common<\\/td><\\/tr><tr><td>ATM access<\\/td><td>Product-dependent<\\/td><td>Common<\\/td><\\/tr><tr><td>Banking services<\\/td><td>Limited compared with a bank<\\/td><td>Full banking relationship<\\/td><\\/tr><tr><td>Digital payment platform<\\/td><td>PayPal<\\/td><td>Bank\'s platform<\\/td><\\/tr><tr><td>Availability<\\/td><td>Country\\/product dependent<\\/td><td>Depends on bank<\\/td><\\/tr><\\/tbody><\\/table><p>The best choice depends on your financial needs.<\\/p><p>Someone who wants a full bank account may prefer a traditional bank debit card. Someone who already uses PayPal extensively may find a PayPal card more convenient for eligible transactions.<\\/p><h2>PayPal Debit Card vs. PayPal Account<\\/h2><h1><\\/h1><p>It is also important to understand that a PayPal account and a PayPal debit card are different things.<\\/p><p>A PayPal account can be used to:<\\/p><ul><li><p>Send money<\\/p><\\/li><li><p>Receive eligible payments<\\/p><\\/li><li><p>Shop online<\\/p><\\/li><li><p>Manage payment methods<\\/p><\\/li><li><p>Connect eligible bank accounts or cards<\\/p><\\/li><\\/ul><p>A debit card adds another way to spend eligible funds through card payments.<\\/p><p>You do not necessarily need a debit card to use PayPal\'s basic online payment services.<\\/p><h2>PayPal Debit Card Security<\\/h2><h1><\\/h1><p>Security is an important part of using any financial account.<\\/p><p>Users should take several basic precautions to protect their PayPal account and card.<\\/p><h3>Use a Strong Password<\\/h3><h1><\\/h1><p>Your PayPal password should be unique and difficult for other people to guess.<\\/p><p>Avoid using the same password across multiple websites.<\\/p><h3>Enable Two-Factor Authentication<\\/h3><h1><\\/h1><p>If available for your account, two-factor authentication can provide an additional layer of protection.<\\/p><h3>Monitor Transactions<\\/h3><h1><\\/h1><p>Regularly check your PayPal account and card transactions.<\\/p><p>If you see an unfamiliar payment, investigate it immediately.<\\/p><h3>Avoid Phishing Messages<\\/h3><h1><\\/h1><p>Scammers sometimes send fake PayPal emails or messages that attempt to steal login information.<\\/p><p>Never click suspicious links or provide your password through an unexpected message.<\\/p><p>Instead, open PayPal through its official website or app.<\\/p><h2>PayPal Debit Card Scams<\\/h2><h1><\\/h1><p>PayPal users should also be aware of common payment scams.<\\/p><p>Scammers may pretend to be PayPal representatives and claim that:<\\/p><ul><li><p>Your account has been suspended.<\\/p><\\/li><li><p>Your payment is waiting.<\\/p><\\/li><li><p>Your card needs verification.<\\/p><\\/li><li><p>You need to pay a fee immediately.<\\/p><\\/li><li><p>Your account will be closed unless you act quickly.<\\/p><\\/li><\\/ul><p>These messages can be designed to create panic and make users reveal sensitive information.<\\/p><p>PayPal will have its own official communication and account-security procedures. If you receive a suspicious message, access your account through the official PayPal website or app rather than clicking an unknown link.<\\/p><h2>What Is Carding and Why Should You Avoid It?<\\/h2><h1><\\/h1><p>The word <strong>carding<\\/strong> is sometimes used online to describe the unauthorized use of stolen payment-card information.<\\/p><p>This is not a legitimate way to make money or obtain free purchases.<\\/p><p>Using stolen card details can result in financial losses, account restrictions, legal consequences, and harm to innocent cardholders.<\\/p><p>Never buy, sell, test, or use stolen payment-card information.<\\/p><p>Instead, learn about legitimate topics such as:<\\/p><ul><li><p>Payment security<\\/p><\\/li><li><p>Fraud prevention<\\/p><\\/li><li><p>Cybersecurity<\\/p><\\/li><li><p>Phishing awareness<\\/p><\\/li><li><p>Safe online shopping<\\/p><\\/li><li><p>Identity protection<\\/p><\\/li><\\/ul><p>Understanding how card fraud works from a defensive perspective can help users protect themselves.<\\/p><h2>How to Choose the Right Payment Card<\\/h2><h1><\\/h1><p>If you are comparing a PayPal debit card with other <strong>cards or debit cards<\\/strong>, do not choose based only on the brand name.<\\/p><p>Consider these factors:<\\/p><h3>Fees<\\/h3><h1><\\/h1><p>Check monthly fees, ATM fees, international fees, and other potential charges.<\\/p><h3>Acceptance<\\/h3><h1><\\/h1><p>Make sure the card works where you normally shop.<\\/p><h3>International Usage<\\/h3><h1><\\/h1><p>If you travel or purchase products from foreign websites, check international support and currency conversion costs.<\\/p><h3>Security<\\/h3><h1><\\/h1><p>Look for strong account-security features and transaction monitoring.<\\/p><h3>Convenience<\\/h3><h1><\\/h1><p>Consider whether you prefer a traditional bank card or a card connected to a digital payment account.<\\/p><h3>Availability<\\/h3><h1><\\/h1><p>Confirm that the product is actually available in your country.<\\/p><h2>Frequently Asked Questions<\\/h2><h3>What is a PayPal debit card?<\\/h3><h1><\\/h1><p>A PayPal debit card is a payment card associated with an eligible PayPal account. It can provide a way to spend eligible PayPal funds through supported card transactions.<\\/p><h3>Is a PayPal debit card available everywhere?<\\/h3><h1><\\/h1><p>No. PayPal card availability depends on the country, product, and eligibility requirements.<\\/p><h3>Can I use a PayPal debit card online?<\\/h3><h1><\\/h1><p>Eligible PayPal cards can generally be used for supported online purchases where the applicable card network is accepted.<\\/p><h3>Can I withdraw cash with a PayPal debit card?<\\/h3><h1><\\/h1><p>Some PayPal card products support ATM withdrawals. Availability, fees, and limits depend on the specific card and country.<\\/p><h3>Does a PayPal debit card have fees?<\\/h3><h1><\\/h1><p>Potential fees depend on the specific product and market. Users should check PayPal\'s current official fee information before applying or using the card.<\\/p><h3>Is PayPal the same as a bank?<\\/h3><h1><\\/h1><p>PayPal is a digital payment company and is not simply the same thing as a traditional bank. The services and protections available can differ from those associated with a conventional bank account.<\\/p><h3>Can I get a PayPal debit card outside the USA?<\\/h3><h1><\\/h1><p>Availability varies by country. A PayPal card offered in the United States may not be available in other countries.<\\/p><h3>Is carding legal?<\\/h3><h1><\\/h1><p>Unauthorized use of stolen payment-card information is illegal. Users should never participate in payment-card fraud.<\\/p><h2>Final Thoughts<\\/h2><h1><\\/h1><p>A <strong>PayPal debit card<\\/strong> can be a convenient payment option for eligible users who already use PayPal and want another way to spend available funds.<\\/p><p>However, the most important details \\u2014 including <strong>features, fees, availability, ATM access, international payments, and eligibility<\\/strong> \\u2014 can vary by product and country.<\\/p><p>Before applying for or using a PayPal debit card, review the latest official PayPal information for your location.<\\/p><p>Whether you are comparing PayPal with traditional <strong>debit cards<\\/strong>, prepaid cards, or other payment solutions, focus on the actual fees, security features, acceptance, and availability rather than choosing a card based only on its name.<\\/p><p>Most importantly, keep your PayPal account and card information secure, watch for scams, and never participate in unauthorized card use or payment fraud.<\\/p>\",\"image\":\"6aa81f6332e891789402979.jpg\"}','{\"image\":\"6aa81fe2b2b9c1789403106.jpg\",\"description\":\"Discover the PayPal debit card, including features, benefits, fees, availability, payment options, and how PayPal debit cards work in this complete guide.\",\"social_title\":\"PayPal Debit Card Explained: Features, Benefits, Fees & Availability\",\"social_description\":\"Explore PayPal debit card features, benefits, fees, availability, payment options, and security tips in this complete guide.\",\"keywords\":[\"PayPal card\",\"PayPal debit card explained\",\"PayPal debit card benefits\",\"PayPal debit card fees\",\"PayPal debit card availability\",\"PayPal card features\",\"PayPal virtual card\",\"PayPal payment card\",\"PayPal card USA\",\"debit cards\",\"payment cards\",\"online payment cards\",\"carding\",\"giftcards\"]}','basic','paypal-debit-card-explained-features-benefits-fees-availability',9,'2026-08-19 15:34:53','2026-09-14 16:31:51'),
(112,'blog.element','{\"has_image\":[\"1\"],\"title\":\"RedotPay Card Explained: Features, Fees, Benefits & How It Works\",\"description\":\"<h1>RedotPay Card Explained: Features, Fees, Benefits & How It Works<\\/h1><h1><\\/h1><p>Digital payments have changed the way people manage money and make online purchases. Today, users have access to different types of payment cards, including traditional debit cards, prepaid cards, virtual cards, and cards connected to digital payment platforms.<\\/p><p><strong>RedotPay<\\/strong> is one of the platforms that has gained attention among users looking for convenient digital payment solutions. Its card products are designed to provide users with another way to make payments and manage eligible digital assets through supported services.<\\/p><p>In this guide, we will explain the <strong>RedotPay card<\\/strong>, its features, potential fees, benefits, payment options, and how the RedotPay debit card works.<\\/p><h2>What Is RedotPay?<\\/h2><h1><\\/h1><p>RedotPay is a digital payment platform that provides payment-related services and card products. The platform is designed to connect digital assets with everyday payment use cases through supported services.<\\/p><p>Depending on the user\'s location, account status, and available product, RedotPay may provide access to virtual or physical card options.<\\/p><p>Because financial products and availability can vary by country, users should always check the latest information directly on the official RedotPay platform before applying for or using a card.<\\/p><h2>What Is a RedotPay Card?<\\/h2><h1><\\/h1><p>A <strong>RedotPay card<\\/strong> is a payment card associated with the RedotPay platform. Depending on the product available to a user, it may be offered as a virtual card or physical card.<\\/p><p>A virtual card can be useful for online payments, while a physical card can provide a more traditional card-payment experience where supported.<\\/p><p>The exact functionality depends on the card type, merchant, country, and current RedotPay terms.<\\/p><h2>RedotPay Card Features<\\/h2><h1><\\/h1><p>One reason people search for the <strong>RedotPay card<\\/strong> is its range of digital payment features.<\\/p><p>Depending on the specific product and current availability, features may include:<\\/p><ul><li><p>Virtual card functionality<\\/p><\\/li><li><p>Physical card options<\\/p><\\/li><li><p>Online payment support<\\/p><\\/li><li><p>Card management through the platform<\\/p><\\/li><li><p>Digital asset-related payment functionality<\\/p><\\/li><li><p>Transaction management<\\/p><\\/li><li><p>Security controls<\\/p><\\/li><li><p>Support for eligible merchants and payment services<\\/p><\\/li><\\/ul><p>Not every feature is necessarily available to every user. Availability can depend on regional restrictions and account verification.<\\/p><h2>RedotPay Debit Card<\\/h2><h1><\\/h1><p>The term <strong>RedotPay debit card<\\/strong> is commonly used when people search for the service online. However, users should understand the exact type of RedotPay card they are obtaining rather than assuming it works exactly like a conventional bank debit card.<\\/p><p>Traditional bank debit cards are normally linked directly to a bank account. Digital payment cards can have different funding mechanisms, transaction rules, and limitations.<\\/p><p>Before using a RedotPay card, users should review how their particular card is funded, where it can be used, and what transaction conditions apply.<\\/p><h2>How Does RedotPay Work?<\\/h2><h1><\\/h1><p>The general process starts with creating an account on the RedotPay platform.<\\/p><p>A typical user journey may involve:<\\/p><h3>1. Create an Account<\\/h3><h1><\\/h1><p>The first step is to register for an account using the information requested by the platform.<\\/p><h3>2. Complete Verification<\\/h3><h1><\\/h1><p>Depending on the service and applicable requirements, identity verification may be required.<\\/p><p>Users should provide accurate information and follow the platform\'s official verification process.<\\/p><h3>3. Review Available Card Products<\\/h3><h1><\\/h1><p>After setting up an account, users can check which card products are available to them.<\\/p><p>This may include virtual or physical card options depending on eligibility and region.<\\/p><h3>4. Fund or Manage the Account<\\/h3><h1><\\/h1><p>The user then follows RedotPay\'s supported methods for funding or managing their payment balance.<\\/p><p>Always check the current supported assets, networks, limits, and transaction conditions before transferring funds.<\\/p><h3>5. Use the Card<\\/h3><h1><\\/h1><p>Once the card is active and funded according to the applicable rules, it can be used for eligible transactions.<\\/p><p>Whether a particular merchant or transaction is supported depends on the card\'s terms and the merchant\'s payment network.<\\/p><h2>RedotPay Virtual Card<\\/h2><h1><\\/h1><p>A <strong>RedotPay virtual card<\\/strong> can be useful for users who mainly make online purchases.<\\/p><p>Unlike a physical card, a virtual card does not require a physical piece of plastic. Card information can instead be accessed through the relevant digital platform.<\\/p><p>Virtual cards can be convenient for:<\\/p><ul><li><p>Online shopping<\\/p><\\/li><li><p>Digital subscriptions where supported<\\/p><\\/li><li><p>Software purchases<\\/p><\\/li><li><p>Online services<\\/p><\\/li><li><p>Other eligible internet transactions<\\/p><\\/li><\\/ul><p>However, users should always confirm that the merchant accepts the card and that the transaction type is supported.<\\/p><h2>RedotPay Physical Card<\\/h2><h1><\\/h1><p>A physical RedotPay card provides a traditional card format for eligible users.<\\/p><p>Physical cards can be useful when a user needs to make payments at supported point-of-sale locations rather than only online.<\\/p><p>The availability, delivery options, supported countries, and applicable charges can change, so users should review the latest RedotPay information before ordering a physical card.<\\/p><h2>RedotPay Fees<\\/h2><h1><\\/h1><p>One of the most important things to check before using any payment card is its <strong>fee structure<\\/strong>.<\\/p><p>RedotPay fees can depend on the particular service or transaction. Potential charges may relate to areas such as:<\\/p><ul><li><p>Card issuance<\\/p><\\/li><li><p>Physical card delivery<\\/p><\\/li><li><p>Transactions<\\/p><\\/li><li><p>Withdrawals<\\/p><\\/li><li><p>Currency conversion<\\/p><\\/li><li><p>Network-related transactions<\\/p><\\/li><li><p>Other account or service operations<\\/p><\\/li><\\/ul><p>There is no reason to assume that one fee applies to every RedotPay card or every transaction.<\\/p><p><strong>Always check the current official fee schedule before making a payment or transferring funds.<\\/strong><\\/p><p>This is particularly important for international transactions because exchange rates and conversion-related costs can affect the final amount.<\\/p><h2>RedotPay Benefits<\\/h2><h1><\\/h1><p>There are several reasons users may consider a digital payment card.<\\/p><h3>Convenient Digital Payments<\\/h3><h1><\\/h1><p>A digital card can make online payments more convenient, particularly for people who frequently use internet-based services.<\\/p><h3>Virtual Card Availability<\\/h3><h1><\\/h1><p>A virtual card can provide quick access to card details without waiting for a physical card to arrive, where the product is available.<\\/p><h3>Digital Asset Payment Use Cases<\\/h3><h1><\\/h1><p>RedotPay is designed around payment use cases involving digital assets, making it relevant to users who want to connect eligible digital assets with supported payment services.<\\/p><h3>Card Management<\\/h3><h1><\\/h1><p>Digital platforms can make it easier to manage card-related information and transactions from one place.<\\/p><h3>Global Payment Potential<\\/h3><h1><\\/h1><p>Depending on the card, merchant, country, and applicable restrictions, users may be able to make payments across different locations.<\\/p><p>Users should not assume universal acceptance. Always verify the current supported countries and merchants.<\\/p><h2>Where Can You Use a RedotPay Card?<\\/h2><h1><\\/h1><p>The usability of a RedotPay card depends on the card type and payment network.<\\/p><p>Some users may use their cards for online purchases, while eligible physical cards may also be usable at supported point-of-sale terminals.<\\/p><p>Before attempting a transaction, check:<\\/p><ul><li><p>Whether the merchant accepts the relevant payment network<\\/p><\\/li><li><p>Whether your card is active<\\/p><\\/li><li><p>Whether sufficient funds are available<\\/p><\\/li><li><p>Whether the transaction category is supported<\\/p><\\/li><li><p>Whether geographic restrictions apply<\\/p><\\/li><\\/ul><p>A declined payment does not necessarily mean there is a problem with the account. Merchant restrictions, card settings, insufficient balance, or unsupported transaction types can all affect payment approval.<\\/p><h2>RedotPay and Online Shopping<\\/h2><h1><\\/h1><p>Online shopping is one of the common reasons people look for digital payment cards.<\\/p><p>A RedotPay card may be useful for eligible online merchants where the card and transaction type are supported.<\\/p><p>When shopping online, users should make sure that the website is legitimate and secure. Never enter card details on suspicious websites simply because they claim to offer discounts or free services.<\\/p><p>Look for secure checkout pages and verify the merchant before submitting payment information.<\\/p><h2>RedotPay Security<\\/h2><h1><\\/h1><p>Security should always be a priority when using a digital payment card.<\\/p><p>Users should:<\\/p><ul><li><p>Keep card details private<\\/p><\\/li><li><p>Never share security codes unnecessarily<\\/p><\\/li><li><p>Use strong account credentials<\\/p><\\/li><li><p>Avoid suspicious links<\\/p><\\/li><li><p>Enable available security features<\\/p><\\/li><li><p>Monitor transactions regularly<\\/p><\\/li><li><p>Contact official support if suspicious activity appears<\\/p><\\/li><\\/ul><p>Never give your account password or sensitive authentication information to another person.<\\/p><h2>RedotPay and Card Fraud<\\/h2><h1><\\/h1><p>Payment-card fraud is a major problem across the financial industry.<\\/p><p>The term <strong>carding<\\/strong> is sometimes used online to describe the unauthorized use of stolen card information. This activity is illegal and can cause financial losses to both cardholders and businesses.<\\/p><p>A legitimate RedotPay user should never buy, sell, test, or use stolen payment-card information.<\\/p><p>Instead, users should focus on learning about:<\\/p><ul><li><p>Card security<\\/p><\\/li><li><p>Fraud prevention<\\/p><\\/li><li><p>Safe online payments<\\/p><\\/li><li><p>Phishing protection<\\/p><\\/li><li><p>Account security<\\/p><\\/li><li><p>Recognizing fake payment websites<\\/p><\\/li><\\/ul><p>If you notice an unfamiliar transaction, contact the relevant payment provider through its official support channels.<\\/p><h2>RedotPay vs. Traditional Debit Cards<\\/h2><h1><\\/h1><p>A RedotPay card and a traditional bank <strong>debit card<\\/strong> may look similar when used for payments, but their underlying services can be different.<\\/p><table><thead><tr><th>Feature<\\/th><th>RedotPay Card<\\/th><th>Traditional Debit Card<\\/th><\\/tr><\\/thead><tbody><tr><td>Digital platform<\\/td><td>Yes<\\/td><td>Usually linked to a bank<\\/td><\\/tr><tr><td>Virtual card<\\/td><td>May be available<\\/td><td>Depends on bank<\\/td><\\/tr><tr><td>Physical card<\\/td><td>May be available<\\/td><td>Common<\\/td><\\/tr><tr><td>Bank account<\\/td><td>Product-dependent<\\/td><td>Usually required<\\/td><\\/tr><tr><td>Digital asset functionality<\\/td><td>Core part of the platform<\\/td><td>Usually not a core feature<\\/td><\\/tr><tr><td>Online payments<\\/td><td>Supported where eligible<\\/td><td>Common<\\/td><\\/tr><tr><td>ATM access<\\/td><td>Depends on product<\\/td><td>Common, subject to bank\\/network<\\/td><\\/tr><\\/tbody><\\/table><p>The right choice depends on what the user needs. Someone who primarily wants a conventional banking relationship may prefer a traditional bank debit card, while someone looking for specific digital payment functionality may consider a specialized payment platform.<\\/p><h2>Is RedotPay Right for You?<\\/h2><h1><\\/h1><p>There is no single payment card that is perfect for everyone.<\\/p><p>Before choosing a RedotPay card, consider:<\\/p><ol><li><p><strong>Your country<\\/strong> \\u2014 Make sure the service is available in your location.<\\/p><\\/li><li><p><strong>Your payment needs<\\/strong> \\u2014 Decide whether you need online, physical, or both types of payments.<\\/p><\\/li><li><p><strong>Fees<\\/strong> \\u2014 Review the latest fee schedule.<\\/p><\\/li><li><p><strong>Limits<\\/strong> \\u2014 Check transaction and account limits.<\\/p><\\/li><li><p><strong>Merchant acceptance<\\/strong> \\u2014 Confirm that the places you use support the card.<\\/p><\\/li><li><p><strong>Security<\\/strong> \\u2014 Understand the platform\'s security requirements.<\\/p><\\/li><li><p><strong>Terms<\\/strong> \\u2014 Read the current product terms before using the service.<\\/p><\\/li><\\/ol><h2>Frequently Asked Questions<\\/h2><h3>What is a RedotPay card?<\\/h3><h1><\\/h1><p>A RedotPay card is a payment card associated with the RedotPay digital payment platform. Depending on availability and eligibility, users may have access to virtual or physical card products.<\\/p><h3>Is RedotPay a traditional bank debit card?<\\/h3><h1><\\/h1><p>Not necessarily. Users should distinguish between RedotPay\'s payment-card products and conventional bank-issued debit cards because the services, funding mechanisms, and terms can differ.<\\/p><h3>Does RedotPay have a virtual card?<\\/h3><h1><\\/h1><p>RedotPay offers virtual-card functionality for eligible users and products. Availability can depend on current product offerings and regional requirements.<\\/p><h3>Does RedotPay charge fees?<\\/h3><h1><\\/h1><p>Fees can apply depending on the card and transaction. Users should check the latest official RedotPay fee information before using the service.<\\/p><h3>Can I use RedotPay for online payments?<\\/h3><h1><\\/h1><p>Eligible RedotPay cards may be used for supported online transactions. Acceptance depends on the merchant, card type, payment network, and applicable restrictions.<\\/p><h3>Is carding legal?<\\/h3><h1><\\/h1><p>Using stolen payment-card information without authorization is illegal. Users should never participate in card fraud or use someone else\'s payment information without permission.<\\/p><h2>Final Thoughts<\\/h2><h1><\\/h1><p>The <strong>RedotPay card<\\/strong> is a digital payment option that may appeal to users looking for flexible payment functionality and card-based access to supported services.<\\/p><p>Its features, fees, availability, and limits can vary depending on the specific product and the user\'s location. Before signing up or making a transaction, it is important to review the latest official information.<\\/p><p>Whether you are comparing <strong>RedotPay debit cards, virtual cards, prepaid cards, or traditional debit cards<\\/strong>, focus on fees, security, acceptance, limits, and the features that match your actual payment needs.<\\/p><p>Most importantly, use payment cards responsibly, protect your card information, and stay away from illegal activities such as card fraud and unauthorized card use.<\\/p>\",\"image\":\"6aa81d1b21a2f1789402395.jpg\"}','{\"image\":\"6aa81daf9b7e21789402543.jpg\",\"description\":\"Learn how the RedotPay card works, including its features, fees, benefits, virtual card options, payment methods, and security tips.\",\"social_title\":\"RedotPay Card Explained: Features, Fees, Benefits & More\",\"social_description\":\"Discover RedotPay card features, fees, benefits, virtual card options, payment methods, and essential security tips in this complete guide.\",\"keywords\":[\"RedotPay card\",\"RedotPay debit card\",\"RedotPay virtual card\",\"RedotPay fees\",\"RedotPay benefits\",\"RedotPay features\",\"RedotPay card explained\",\"digital payment cards\",\"prepaid cards\",\"debit cards\",\"virtual debit card\",\"payment cards\",\"carding\",\"giftcards\"]}','basic','redotpay-card-explained-features-fees-benefits-how-it-works',7,'2026-08-19 15:38:34','2026-09-14 16:19:38'),
(113,'blog.element','{\"has_image\":[\"1\"],\"title\":\"American Express Debit Card Explained: Features, Fees & Benefits\",\"description\":\"<h1>American Express Debit Card Explained: Features, Fees & Benefits<\\/h1><h1><\\/h1><p>American Express is a well-known name in the world of payment cards and financial services. When people search for <strong>American Express debit cards<\\/strong>, they may also come across prepaid cards, gift cards, business cards, and other American Express payment products.<\\/p><p>Understanding the difference between these <strong>cards, debit cards, and gift cards<\\/strong> is important before choosing a payment option. This guide explains the main features, benefits, fees, and common uses of American Express cards in simple terms.<\\/p><h2>What Is an American Express Debit Card?<\\/h2><h1><\\/h1><p>An <strong>American Express debit card<\\/strong> is a payment card that can be used for eligible purchases through the American Express network. Depending on the specific product, the card may be connected to an account or may work as a prepaid payment product.<\\/p><p>American Express also offers prepaid products and gift cards, which work differently from traditional debit cards. Therefore, it is important to check the exact card type and its terms before applying or purchasing one.<\\/p><h2>Key Features of American Express Cards<\\/h2><h1><\\/h1><p>American Express cards can offer different features depending on the specific product. Common features may include:<\\/p><ul><li><p>Convenient card payments<\\/p><\\/li><li><p>Online and in-store purchasing<\\/p><\\/li><li><p>Contactless payment on eligible cards<\\/p><\\/li><li><p>Digital wallet compatibility for eligible cards<\\/p><\\/li><li><p>Account or balance management<\\/p><\\/li><li><p>Fraud and security features<\\/p><\\/li><li><p>Different card options for personal and business needs<\\/p><\\/li><\\/ul><p>For example, American Express currently lists prepaid debit cards and gift cards as separate product categories.<\\/p><h2>American Express Debit Cards vs. Gift Cards<\\/h2><h1><\\/h1><p>One of the most important differences is that a <strong>debit card<\\/strong> and a <strong>gift card<\\/strong> are not necessarily the same thing.<\\/p><p>A traditional debit card is generally associated with a bank or payment account and allows the cardholder to spend available funds according to the account terms.<\\/p><p>An <strong>American Express Gift Card<\\/strong>, on the other hand, is a prepaid payment product with a specific dollar value. American Express states that its U.S. Gift Cards can be used at merchants that accept American Express, subject to the applicable terms and restrictions.<\\/p><p>Gift cards are therefore useful when someone wants to give another person a predetermined spending amount without giving access to a personal bank account.<\\/p><h2>Benefits of American Express Gift Cards<\\/h2><h1><\\/h1><p>American Express Gift Cards can be useful for birthdays, celebrations, employee rewards, and other occasions.<\\/p><p>According to American Express, its U.S. Gift Cards are available in multiple designs and values, and the funds do not expire. Purchase and shipping charges can apply, while there are no fees after purchase for the listed Gift Card product.<\\/p><p>Some potential benefits include:<\\/p><ul><li><p>Easy gifting<\\/p><\\/li><li><p>Multiple card designs<\\/p><\\/li><li><p>Different spending amounts<\\/p><\\/li><li><p>No access to the recipient\'s bank account<\\/p><\\/li><li><p>Wide acceptance where American Express is accepted<\\/p><\\/li><li><p>No post-purchase usage fees for the listed product<\\/p><\\/li><\\/ul><p>Always check the current terms before purchasing because features and restrictions can vary by card.<\\/p><h2>Where Can You Use an American Express Card?<\\/h2><h1><\\/h1><p>The places where you can use an American Express card depend on the specific product.<\\/p><p>Eligible American Express cards can generally be used at merchants that accept American Express. However, certain prepaid or gift cards may have restrictions. For example, American Express says its Gift Cards cannot be used at ATMs or for recurring billing.<\\/p><p>Before making a purchase, it is a good idea to check:<\\/p><ol><li><p>Your available balance<\\/p><\\/li><li><p>Whether the merchant accepts American Express<\\/p><\\/li><li><p>Whether the transaction type is allowed<\\/p><\\/li><li><p>The card\'s terms and conditions<\\/p><\\/li><\\/ol><h2>Are There Fees?<\\/h2><h1><\\/h1><p>Fees depend on the particular American Express card.<\\/p><p>Some cards can have application, purchase, shipping, monthly, or other fees, while certain Gift Card products have specific fee structures.<\\/p><p>For example, American Express currently states that purchase and shipping charges apply to its U.S. Gift Cards, while there are no fees after purchase for those Gift Cards.<\\/p><p>Because fees can change, users should always check the official product page and cardholder agreement before getting a card.<\\/p><h2>American Express and Digital Wallets<\\/h2><h1><\\/h1><p>Some eligible American Express cards can be added to supported digital wallets.<\\/p><p>American Express lists eligible products for services such as Apple Pay and Google Pay, although eligibility depends on the particular card and account.<\\/p><p>This can make everyday payments more convenient because users may be able to pay with a compatible smartphone or other supported device.<\\/p><h2>What About Card Security?<\\/h2><h1><\\/h1><p>Card security is an important part of using any payment card.<\\/p><p>Never share your complete card number, security code, PIN, password, or account login information with someone you do not trust. You should also be careful with messages or websites asking you to provide card details.<\\/p><p>Gift card scams are another important issue. American Express warns that scammers may trick people into purchasing gift cards and then revealing the card codes, allowing the scammer to take the funds.<\\/p><p>If someone asks you to buy a gift card and send them the card number or security code as payment, treat it as a major warning sign.<\\/p><h2>American Express Cards vs. Other Debit Cards<\\/h2><h1><\\/h1><p>There are many different <strong>debit cards<\\/strong> available from banks and financial companies. The right choice depends on what you need.<\\/p><p>When comparing cards, consider:<\\/p><ul><li><p>Fees<\\/p><\\/li><li><p>Acceptance<\\/p><\\/li><li><p>ATM access<\\/p><\\/li><li><p>Online payment support<\\/p><\\/li><li><p>Digital wallet support<\\/p><\\/li><li><p>International usage<\\/p><\\/li><li><p>Account requirements<\\/p><\\/li><li><p>Security features<\\/p><\\/li><li><p>Customer support<\\/p><\\/li><\\/ul><p>There is no single card that is best for everyone. Comparing the current terms of several cards can help you find an option that fits your needs.<\\/p><h2>Avoid Illegal Carding and Card Fraud<\\/h2><h1><\\/h1><p>The term <strong>carding<\\/strong> is sometimes used online to describe the unauthorized use of stolen payment-card information. This is illegal and can cause serious financial harm.<\\/p><p>Never buy, sell, test, or use stolen card information. Instead, learn about <strong>card security, fraud prevention, and safe online payments<\\/strong>.<\\/p><p>If you believe your card information has been compromised, contact the card issuer through its official customer-service channels and follow its security instructions.<\\/p><h2>Final Thoughts<\\/h2><h1><\\/h1><p>American Express offers several types of payment products, including debit-related products, prepaid cards, and <strong>gift cards<\\/strong>. Each card can have different features, fees, acceptance rules, and restrictions.<\\/p><p>Before choosing an American Express card, check the official product information and read the applicable terms. Understanding the difference between <strong>cards, debit cards, prepaid cards, and gift cards<\\/strong> can help you make a safer and more informed decision.<\\/p><p>For the latest product details, fees, and eligibility requirements, always verify the information directly with American Express.<\\/p>\",\"image\":\"6aa81c115ff781789402129.jpg\"}','{\"image\":\"6aa81b6caafcb1789401964.jpg\",\"description\":\"How To Use American Express debit cards, Carding, gift cards, features, fees, benefits, security, and how these payment cards work.\",\"social_title\":\"American Express Debit Card: Features, Fees & Benefits Explained\",\"social_description\":\"Discover the key features, fees, benefits, and security tips for American Express debit cards, prepaid cards,Carding and gift cards.\",\"keywords\":[\"American Express debit card\",\"American Express card\",\"American Express gift card\",\"debit cards\",\"prepaid cards\",\"gift cards\",\"American Express cards\",\"card benefits\",\"card fees\",\"carding\",\"card security\",\"payment cards\"]}','basic','american-express-debit-card-explained-features-fees-benefits',11,'2026-08-19 15:42:07','2026-09-14 16:13:19');
/*!40000 ALTER TABLE `frontends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gateway_currencies`
--

DROP TABLE IF EXISTS `gateway_currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gateway_currencies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `currency` varchar(40) DEFAULT NULL,
  `symbol` varchar(40) DEFAULT NULL,
  `method_code` int(11) DEFAULT NULL,
  `gateway_alias` varchar(40) DEFAULT NULL,
  `min_amount` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `max_amount` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `percent_charge` decimal(5,2) NOT NULL DEFAULT 0.00,
  `fixed_charge` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `rate` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `gateway_parameter` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateway_currencies`
--

LOCK TABLES `gateway_currencies` WRITE;
/*!40000 ALTER TABLE `gateway_currencies` DISABLE KEYS */;
INSERT INTO `gateway_currencies` VALUES
(1,'Binance Smart Chain BNB  Bep20','USD','',1000,'binance_smart_chain_bnb__bep20',30.00000000,1000.00000000,10.00,0.00000000,1.00000000,NULL,'2025-10-11 08:34:18','2026-09-14 17:58:42');
/*!40000 ALTER TABLE `gateway_currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gateways`
--

DROP TABLE IF EXISTS `gateways`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gateways` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `form_id` int(10) unsigned NOT NULL DEFAULT 0,
  `code` int(11) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `alias` varchar(40) NOT NULL DEFAULT 'NULL',
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>enable, 2=>disable',
  `gateway_parameters` text DEFAULT NULL,
  `supported_currencies` text DEFAULT NULL,
  `crypto` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: fiat currency, 1: crypto currency',
  `extra` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateways`
--

LOCK TABLES `gateways` WRITE;
/*!40000 ALTER TABLE `gateways` DISABLE KEYS */;
INSERT INTO `gateways` VALUES
(60,1,1000,'Binance Smart Chain BNB  Bep20','binance_smart_chain_bnb__bep20','6aa8336ccf7e21789408108.jpg',1,'[]','[]',0,NULL,'<div style=\"color: rgb(147, 180, 202); font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif; font-size: 1rem;\"><i>Send the amount to the below bank information</i></span></div><div style=\"color: rgb(147, 180, 202); font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif;\"><i><br></i></span></div><div style=\"font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif;\"><i style=\"\"><font color=\"#66ff33\">Bank Name</font><font color=\"#93b4ca\">: </font><font color=\"#ffff33\">Binance Crypto Chain</font></i></span></div><div style=\"background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><br></div><div style=\"font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif;\"><i style=\"\"><font color=\"#99ff00\">Network:</font><font color=\"#93b4ca\">&nbsp; </font><font color=\"#ffff00\">BNB SMART&nbsp; CHAIN (BEP20)</font></i></span></div><div style=\"font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif;\"><i style=\"\"><font color=\"#ffff00\">Address&nbsp;</font></i></span></div><div style=\"background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><font color=\"#ffffff\" face=\"Jost, sans-serif\"><b><i>0xF75fA32Da73a15CB6E1B622D5534649FB6592655</i></b></font></div><div style=\"background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><font face=\"Jost, sans-serif\" color=\"#ffff00\"><b style=\"\"><i style=\"\">Bitcoin</i></b></font></div><div style=\"background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><font face=\"Jost, sans-serif\"><i style=\"\"><font style=\"\" color=\"#ffffff\"><b style=\"\">1N15TzFdvsfrqW45ywMk3gK7ArM9mpCqwC</b></font></i></font></div><div style=\"background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><font face=\"Jost, sans-serif\" color=\"#ffff00\"><b style=\"\"><i style=\"\"><br></i></b></font></div><div style=\"background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><br></div><div style=\"color: rgb(147, 180, 202); font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif;\"><i><font size=\"4\">Please Confirm username Before Send Payment and Upload your Payment Screenshot and wait just 5 Mints.</font></i></span></div><div style=\"color: rgb(147, 180, 202); font-family: Montserrat, sans-serif; background-color: rgb(15, 25, 50); text-align: center;\" bis_skin_checked=\"1\"><span style=\"font-weight: bolder; font-family: Jost, sans-serif;\"><i><font size=\"4\">Thank You</font></i></span></div>','2025-10-11 08:34:18','2026-09-14 17:58:42');
/*!40000 ALTER TABLE `gateways` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_settings`
--

DROP TABLE IF EXISTS `general_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `general_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `site_name` varchar(40) DEFAULT NULL,
  `cur_text` varchar(40) DEFAULT NULL COMMENT 'currency text',
  `cur_sym` varchar(40) DEFAULT NULL COMMENT 'currency symbol',
  `email_from` varchar(40) DEFAULT NULL,
  `email_from_name` varchar(255) DEFAULT NULL,
  `email_template` text DEFAULT NULL,
  `sms_template` varchar(255) DEFAULT NULL,
  `sms_from` varchar(255) DEFAULT NULL,
  `push_title` varchar(255) DEFAULT NULL,
  `push_template` varchar(255) DEFAULT NULL,
  `base_color` varchar(40) DEFAULT NULL,
  `secondary_color` varchar(40) DEFAULT NULL,
  `mail_config` text DEFAULT NULL COMMENT 'email configuration',
  `sms_config` text DEFAULT NULL,
  `firebase_config` text DEFAULT NULL,
  `global_shortcodes` text DEFAULT NULL,
  `kv` tinyint(1) NOT NULL DEFAULT 0,
  `ev` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'email verification, 0 - dont check, 1 - check',
  `en` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'email notification, 0 - dont send, 1 - send',
  `sv` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'mobile verication, 0 - dont check, 1 - check',
  `sn` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'sms notification, 0 - dont send, 1 - send',
  `pn` tinyint(1) NOT NULL DEFAULT 1,
  `force_ssl` tinyint(1) NOT NULL DEFAULT 0,
  `in_app_payment` tinyint(1) NOT NULL DEFAULT 1,
  `maintenance_mode` tinyint(1) NOT NULL DEFAULT 0,
  `secure_password` tinyint(1) NOT NULL DEFAULT 0,
  `agree` tinyint(1) NOT NULL DEFAULT 0,
  `multi_language` tinyint(1) NOT NULL DEFAULT 1,
  `registration` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: Off	, 1: On',
  `active_template` varchar(40) DEFAULT NULL,
  `socialite_credentials` text DEFAULT NULL,
  `last_cron` datetime DEFAULT NULL,
  `available_version` varchar(40) DEFAULT NULL,
  `system_customized` tinyint(1) NOT NULL DEFAULT 0,
  `paginate_number` int(11) NOT NULL DEFAULT 0,
  `currency_format` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1=>Both\r\n2=>Text Only\r\n3=>Symbol Only',
  `dark_mode` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_settings`
--

LOCK TABLES `general_settings` WRITE;
/*!40000 ALTER TABLE `general_settings` DISABLE KEYS */;
INSERT INTO `general_settings` VALUES
(1,'German Market','USD','$','Supportteam@germanmarket','{{Web Team}}','<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n  <!--[if !mso]><!-->\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <!--<![endif]-->\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title></title>\r\n  <style type=\"text/css\">\r\n.ReadMsgBody { width: 100%; background-color: #ffffff; }\r\n.ExternalClass { width: 100%; background-color: #ffffff; }\r\n.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }\r\nhtml { width: 100%; }\r\nbody { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; margin: 0; padding: 0; }\r\ntable { border-spacing: 0; table-layout: fixed; margin: 0 auto;border-collapse: collapse; }\r\ntable table table { table-layout: auto; }\r\n.yshortcuts a { border-bottom: none !important; }\r\nimg:hover { opacity: 0.9 !important; }\r\na { color: #0087ff; text-decoration: none; }\r\n.textbutton a { font-family: \'open sans\', arial, sans-serif !important;}\r\n.btn-link a { color:#FFFFFF !important;}\r\n\r\n@media only screen and (max-width: 480px) {\r\nbody { width: auto !important; }\r\n*[class=\"table-inner\"] { width: 90% !important; text-align: center !important; }\r\n*[class=\"table-full\"] { width: 100% !important; text-align: center !important; }\r\n/* image */\r\nimg[class=\"img1\"] { width: 100% !important; height: auto !important; }\r\n}\r\n</style>\r\n\r\n\r\n\r\n  <table bgcolor=\"#414a51\" width=\"100%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n    <tbody><tr>\r\n      <td height=\"50\"></td>\r\n    </tr>\r\n    <tr>\r\n      <td align=\"center\" style=\"text-align:center;vertical-align:top;font-size:0;\">\r\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n          <tbody><tr>\r\n            <td align=\"center\" width=\"600\">\r\n              <!--header-->\r\n              <table class=\"table-inner\" width=\"95%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n                <tbody><tr>\r\n                  <td bgcolor=\"#0087ff\" style=\"border-top-left-radius:6px; border-top-right-radius:6px;text-align:center;vertical-align:top;font-size:0;\" align=\"center\">\r\n                    <table width=\"90%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n                      <tbody><tr>\r\n                        <td height=\"20\"></td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td align=\"center\" style=\"font-family: \'Open sans\', Arial, sans-serif; color:#FFFFFF; font-size:16px; font-weight: bold;\">This is a System Generated Email</td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td height=\"20\"></td>\r\n                      </tr>\r\n                    </tbody></table>\r\n                  </td>\r\n                </tr>\r\n              </tbody></table>\r\n              <!--end header-->\r\n              <table class=\"table-inner\" width=\"95%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                <tbody><tr>\r\n                  <td bgcolor=\"#FFFFFF\" align=\"center\" style=\"text-align:center;vertical-align:top;font-size:0;\">\r\n                    <table align=\"center\" width=\"90%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                      <tbody><tr>\r\n                        <td height=\"35\"></td>\r\n                      </tr>\r\n                      <!--logo-->\r\n                      <tr>\r\n                        <td align=\"center\" style=\"vertical-align:top;font-size:0;\">\r\n                          <a href=\"#\">\r\n                            <img style=\"display:block; line-height:0px; font-size:0px; border:0px;\" src=\"https://darkmart.store/assets/images/logo_icon/logo_dark.png\" width=\"220\" alt=\"img\">\r\n                          </a>\r\n                        </td>\r\n                      </tr>\r\n                      <!--end logo-->\r\n                      <tr>\r\n                        <td height=\"40\"></td>\r\n                      </tr>\r\n                      <!--headline-->\r\n                      <tr>\r\n                        <td align=\"center\" style=\"font-family: \'Open Sans\', Arial, sans-serif; font-size: 22px;color:#414a51;font-weight: bold;\">Hello {{fullname}} ({{username}})</td>\r\n                      </tr>\r\n                      <!--end headline-->\r\n                      <tr>\r\n                        <td align=\"center\" style=\"text-align:center;vertical-align:top;font-size:0;\">\r\n                          <table width=\"40\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n                            <tbody><tr>\r\n                              <td height=\"20\" style=\" border-bottom:3px solid #0087ff;\"></td>\r\n                            </tr>\r\n                          </tbody></table>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td height=\"20\"></td>\r\n                      </tr>\r\n                      <!--content-->\r\n                      <tr>\r\n                        <td align=\"left\" style=\"font-family: \'Open sans\', Arial, sans-serif; color:#7f8c8d; font-size:16px; line-height: 28px;\">{{message}}</td>\r\n                      </tr>\r\n                      <!--end content-->\r\n                      <tr>\r\n                        <td height=\"40\"></td>\r\n                      </tr>\r\n              \r\n                    </tbody></table>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td height=\"45\" align=\"center\" bgcolor=\"#f4f4f4\" style=\"border-bottom-left-radius:6px;border-bottom-right-radius:6px;\">\r\n                    <table align=\"center\" width=\"90%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                      <tbody><tr>\r\n                        <td height=\"10\"></td>\r\n                      </tr>\r\n                      <!--preference-->\r\n                      <tr>\r\n                        <td class=\"preference-link\" align=\"center\" style=\"font-family: \'Open sans\', Arial, sans-serif; color:#95a5a6; font-size:14px;\">\r\n                          © 2024 <a href=\"#\">{{site_name}}</a>&nbsp;. All Rights Reserved. \r\n                        </td>\r\n                      </tr>\r\n                      <!--end preference-->\r\n                      <tr>\r\n                        <td height=\"10\"></td>\r\n                      </tr>\r\n                    </tbody></table>\r\n                  </td>\r\n                </tr>\r\n              </tbody></table>\r\n            </td>\r\n          </tr>\r\n        </tbody></table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td height=\"60\"></td>\r\n    </tr>\r\n  </tbody></table>','hi {{fullname}} ({{username}}), {{message}}','{{site_name}}','{{site_name}}','hi {{fullname}} ({{username}}), {{message}}','f71e1e','0D0D0D','{\"name\":\"smtp\",\"host\":\"smtp.hostinger.com\",\"port\":\"465\",\"enc\":\"ssl\",\"username\":\"support@darkwebcards.sale\",\"password\":\"@Arslan302\"}','{\"name\":\"clickatell\",\"clickatell\":{\"api_key\":\"----------------\"},\"infobip\":{\"username\":\"------------8888888\",\"password\":\"-----------------\"},\"message_bird\":{\"api_key\":\"-------------------\"},\"nexmo\":{\"api_key\":\"----------------------\",\"api_secret\":\"----------------------\"},\"sms_broadcast\":{\"username\":\"----------------------\",\"password\":\"-----------------------------\"},\"twilio\":{\"account_sid\":\"-----------------------\",\"auth_token\":\"---------------------------\",\"from\":\"----------------------\"},\"text_magic\":{\"username\":\"-----------------------\",\"apiv2_key\":\"-------------------------------\"},\"custom\":{\"method\":\"get\",\"url\":\"https:\\/\\/hostname.com\\/demo-api-v1\",\"headers\":{\"name\":[\"api_key\"],\"value\":[\"test_api 555\"]},\"body\":{\"name\":[\"from_number\"],\"value\":[\"5657545757\"]}}}','{\"apiKey\":\"----------\",\"authDomain\":\"---------\",\"projectId\":\"--------\",\"storageBucket\":\"-------\",\"messagingSenderId\":\"--------\",\"appId\":\"--------\",\"measurementId\":\"------\",\"serverKey\":\"--------\"}','{\n    \"site_name\":\"Name of your site\",\n    \"site_currency\":\"Currency of your site\",\n    \"currency_symbol\":\"Symbol of currency\"\n}',0,0,1,0,1,0,0,0,0,1,1,1,1,'basic','{\"google\":{\"client_id\":\"------------\",\"client_secret\":\"-------------\",\"status\":0},\"facebook\":{\"client_id\":\"------\",\"client_secret\":\"------\",\"status\":0},\"linkedin\":{\"client_id\":\"-----\",\"client_secret\":\"-----\",\"status\":0}}','2024-05-25 06:22:03','3.0',0,20,1,1,NULL,'2026-09-14 14:48:33');
/*!40000 ALTER TABLE `general_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: not default language, 1: default language',
  `image` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES
(1,'English','en',1,'660b94fa876ac1712035066.png','2020-07-06 03:47:55','2024-04-01 23:17:46'),
(12,'Bangla','bn',0,'6652e0cc483251716707532.png','2024-05-26 01:12:13','2024-05-26 01:12:13'),
(13,'Hindi','hn',0,'6652e0d98d8ab1716707545.png','2024-05-26 01:12:25','2024-05-26 01:12:25'),
(14,'Spanish','sp',0,'6652e0e8708d01716707560.png','2024-05-26 01:12:40','2024-05-26 01:12:40'),
(15,'French','fn',0,'6652e0f760e4f1716707575.png','2024-05-26 01:12:55','2024-05-26 01:12:55');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_logs`
--

DROP TABLE IF EXISTS `notification_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `sender` varchar(40) DEFAULT NULL,
  `sent_from` varchar(40) DEFAULT NULL,
  `sent_to` varchar(40) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `notification_type` varchar(40) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=888 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_logs`
--

LOCK TABLES `notification_logs` WRITE;
/*!40000 ALTER TABLE `notification_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_templates`
--

DROP TABLE IF EXISTS `notification_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_templates` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `act` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `push_title` varchar(255) DEFAULT NULL,
  `email_body` text DEFAULT NULL,
  `sms_body` text DEFAULT NULL,
  `push_body` text DEFAULT NULL,
  `shortcodes` text DEFAULT NULL,
  `email_status` tinyint(1) NOT NULL DEFAULT 1,
  `email_sent_from_name` varchar(40) DEFAULT NULL,
  `email_sent_from_address` varchar(40) DEFAULT NULL,
  `sms_status` tinyint(1) NOT NULL DEFAULT 1,
  `sms_sent_from` varchar(40) DEFAULT NULL,
  `push_status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_templates`
--

LOCK TABLES `notification_templates` WRITE;
/*!40000 ALTER TABLE `notification_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `slug` varchar(40) DEFAULT NULL,
  `tempname` varchar(40) DEFAULT NULL COMMENT 'template name',
  `secs` text DEFAULT NULL,
  `seo_content` text DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES
(1,'HOME','/','templates.basic.','[\"choose\",\"about\",\"featured\",\"top_sell\",\"how_to_work\",\"counter\",\"testimonial\",\"blog\"]',NULL,1,'2020-07-11 06:23:58','2025-10-09 20:58:43'),
(2,'About','about','templates.basic.','[\"about\",\"choose\",\"counter\",\"blog\"]',NULL,0,'2020-10-22 01:14:43','2024-05-23 03:58:35'),
(4,'Blog','blog','templates.basic.',NULL,NULL,1,'2020-10-22 01:14:43','2024-06-01 02:55:18'),
(5,'Contact','contact','templates.basic.',NULL,NULL,1,'2020-10-22 01:14:53','2020-10-22 01:14:53'),
(27,'Card','card','templates.basic.','[\"choose\"]',NULL,1,'2020-10-22 01:14:43','2024-06-01 04:11:29');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(40) DEFAULT NULL,
  `token` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES
('kredfg105@gmail.com','230459','2025-12-03 06:12:51'),
('hiskalsn@gmail.com','894519','2025-12-04 13:30:09'),
('edark2257@gmail.com','329514','2025-12-08 02:09:46'),
('moosakhan323336@gmail.com','854014','2025-12-11 18:29:35'),
('hadixhere5@gmail.com','799185','2025-12-14 07:15:50'),
('samadbaba968@gmail.com','572630','2025-12-14 11:27:14'),
('qasimdark420@gmail.com','828716','2025-12-17 03:13:19'),
('shairafghanchadhar1122@gmail.com','568359','2025-12-20 04:01:50'),
('cdrive752@gmail.com','902233','2025-12-21 12:46:10'),
('forex165wb@gmail.com','249015','2025-12-22 14:01:18'),
('hassanmehrab436@gmail.com','798846','2025-12-22 16:00:45'),
('singhpanda1981@gmail.com','804421','2025-12-26 09:09:39'),
('jarikeygabil123@gmail.com','162402','2025-12-26 20:19:53'),
('foxsitrader@gmail.com','970076','2025-12-27 04:27:27'),
('ia5941164@gmail.com','768914','2025-12-28 03:25:22'),
('atiqaslam64@gmail.com','850377','2025-12-28 06:57:20'),
('ghowansab@gmail.com','420840','2025-12-31 13:17:44'),
('hotkuri980@gmail.com','201004','2026-01-01 05:50:26'),
('moumitamondal9897@gmail.com','687335','2026-01-01 07:43:04'),
('tigdamvloggers@gmail.com','808509','2026-01-01 11:17:35'),
('dpchor145@gmail.com','786035','2026-01-02 15:48:51'),
('mjbhaiplayer@gmail.com','620407','2026-01-04 13:44:17'),
('akash31520@gmail.com','735962','2026-01-05 19:51:19'),
('misbahiqbal4455@gmail.com','421150','2026-01-06 01:49:04'),
('amirkhanje007@gmail.com','518104','2026-01-06 06:00:22'),
('faizimhr2008@gmail.com','182216','2026-01-07 06:08:47'),
('turkeyturgut83@gmail.com','985789','2026-01-07 14:43:26'),
('market.magnet.80@gmail.com','716251','2026-01-09 02:54:37'),
('aloneboy4884725@gmail.com','316789','2026-01-09 05:30:45'),
('gamingsingh705@gmail.com','470753','2026-01-09 15:50:51'),
('ywow405@gmail.com','985917','2026-01-10 04:32:07'),
('ikrammehboob725@gmail.com','719959','2026-01-11 05:23:28'),
('laxmidipu78558@gmail.com','450704','2026-01-11 06:57:25'),
('saqii1250@gmail.com','444070','2026-01-11 09:12:04'),
('arhamrajpoot141@gmail.com','550697','2026-01-11 10:09:00'),
('qasimali.20272027@gmail.com','305311','2026-01-13 06:08:12'),
('farazali295787@gmail.com','465156','2026-01-13 07:14:44'),
('lxabhigaming@gmail.com','718914','2026-01-13 14:22:36'),
('caredont323@gmail.com','293767','2026-01-13 15:26:44'),
('grjd618@gmail.com','832753','2026-01-13 15:28:30'),
('j36219697@gmail.com','668649','2026-01-14 07:04:54'),
('muhazazali@gmail.com','120047','2026-01-14 12:39:51'),
('faraz4882@gmail.com','815071','2026-01-14 15:48:23'),
('shoryaff90@gmail.com','526889','2026-01-15 04:36:24'),
('kingcobra9841@gmail.com','433509','2026-01-15 05:41:42'),
('carderdark98@gmail.com','152555','2026-01-15 06:56:50'),
('faraazkhan670@gmail.com','903235','2026-01-16 20:17:26'),
('bilalhassan86000@gmail.com','196688','2026-01-17 08:50:43'),
('sc6259526@gmail.com','738352','2026-01-18 03:43:44'),
('aliahmed3331800@gmail.com','793411','2026-01-18 04:00:41'),
('ggsufyan97@gmail.com','719533','2026-01-18 09:54:08'),
('johnwick79pp@gmail.com','456667','2026-01-18 14:01:06'),
('harish5379000@gmail.com','611129','2026-01-19 09:14:33'),
('abhinavkrishna792011@gmail.com','701758','2026-01-19 10:24:28'),
('imperfectboy001@gmail.com','363623','2026-01-19 19:02:44'),
('kamaua082@gmail.com','462061','2026-01-21 17:22:44'),
('rjs221505@gmail.com','729986','2026-01-23 06:57:41'),
('fahadyft98@gmail.com','720473','2026-01-23 10:19:41'),
('mamoonali790@gmail.com','933777','2026-01-24 03:24:12'),
('jui.vip232@gmail.com','555526','2026-01-24 05:23:53'),
('q763219@gamil.com','380990','2026-01-24 10:43:22'),
('hammad13245768@gmail.com','318631','2026-01-25 08:20:33'),
('zxham50@gmail.com','980661','2026-01-26 03:40:29'),
('gkrcapcut@gmail.com','757474','2026-01-26 03:50:30'),
('gkrh92346@gmail.com','427400','2026-01-26 03:53:50'),
('alonehere7f@gmail.com','770620','2026-01-26 08:16:12'),
('farozminhas07@gmail.com','147682','2026-01-26 09:12:10'),
('vaigunda444@gmail.com','298267','2026-01-26 16:16:07'),
('pradeepmohali880@gmail.com','294916','2026-01-26 18:27:46'),
('harshajoger47@gmail.com','916187','2026-01-27 13:06:49'),
('tmeet1300@gmail.com','306407','2026-01-27 15:13:28'),
('muhammadshahzaibbutt522@gmail.com','199600','2026-01-28 01:18:02'),
('kazirifat389@gmail.com','837945','2026-01-28 14:16:31'),
('ustaadpoyonoil@gmail.com','423464','2026-08-04 11:05:12'),
('jhoonn11001@gmail.com','255222','2026-08-05 10:31:05'),
('balqeesmasoomaservices@gmail.com','824994','2026-08-20 17:02:57'),
('hajralahori3356@gmail.com','492994','2026-08-21 20:24:57'),
('yoyois12@gmail.com','690267','2026-08-22 18:22:49');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(40) DEFAULT NULL,
  `price` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `image` varchar(40) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES
(1,4,'J Trust Royal Bank (Minimum 3600$)',75.00000000,'6aa82dbd93b991789406653.png',1,'2025-10-11 08:15:44','2026-09-14 17:24:13'),
(2,5,'Mastercard ( Limit Minimum 2100$)',60.00000000,'6aa82d7383c101789406579.png',1,'2025-10-11 13:31:15','2026-09-14 17:22:59'),
(3,4,'Royal Trust Gaming(Minimim 1000$)',50.00000000,'6aa82fb6964181789407158.png',1,'2025-10-11 16:44:59','2026-09-14 17:32:38'),
(6,4,'Stanbic Visa Cards ( Minimum 3000$ )',70.00000000,'6aa82904ac34b1789405444.png',1,'2025-10-12 00:58:44','2026-09-14 17:04:04'),
(7,9,'Royal Bank Visa Cards ( Minimum 2000$)',60.00000000,'6aa82dcc58aea1789406668.png',1,'2025-10-12 01:00:29','2026-09-14 17:24:28'),
(8,9,'Trust Royal ( Minimum 2600$ )',70.00000000,'6aa82ecf158d91789406927.png',1,'2025-10-12 01:01:28','2026-09-14 17:28:47'),
(11,5,'PayPal American Express ( Minimum 1800$',60.00000000,'6aa829d28e6b51789405650.png',1,'2025-10-12 01:07:07','2026-09-14 17:07:30'),
(12,5,'Mastercard Western Union (Minimum 1400$)',60.00000000,'6aa82f5842fac1789407064.png',1,'2025-10-12 01:09:42','2026-09-14 17:31:04'),
(13,6,'Visa USA Banks (Minimum 2500$)',65.00000000,'6aa82e6a7b7f21789406826.png',1,'2025-10-12 01:11:38','2026-09-14 17:27:06'),
(14,12,'American Express Golden (Minimum 3000$)',100.00000000,'6aa6b5130f3b11789310227.png',1,'2025-10-12 01:12:51','2026-09-13 14:37:07'),
(15,8,'Austrlia Visa Cards (Minimum 1800$)',65.00000000,'6aa82d3e550f71789406526.png',1,'2025-10-12 01:14:22','2026-09-14 17:22:06'),
(17,10,'indian Banks Visa Card (Minimum 3000$)',60.00000000,'6aa82d520d3711789406546.png',1,'2025-10-12 01:21:23','2026-09-14 17:22:26'),
(18,1,'Binance CC ( Minimum 2500$ )',90.00000000,'6aa82817b89191789405207.png',1,'2025-10-12 01:23:08','2026-09-14 17:00:07'),
(19,8,'MasterCard ( Minimum 400$ )',44.00000000,'6aa82d827f78d1789406594.png',1,'2025-10-12 01:24:47','2026-09-14 17:23:14'),
(20,7,'Visa Titkok (Minimum 1800$)',40.00000000,'6aa82fdb163031789407195.png',1,'2025-10-12 01:25:58','2026-09-14 17:33:15'),
(21,11,'Redot Pay Visa (Minimum 4000$)',100.00000000,'6aa82861cba511789405281.jpeg',1,'2025-10-24 02:06:04','2026-09-14 17:01:21'),
(22,12,'American Express Black ( Balance 5000$)',120.00000000,'6aa6b3a95f9951789309865.jpeg',1,'2025-11-26 11:01:34','2026-09-13 14:31:05');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_attachments`
--

DROP TABLE IF EXISTS `support_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `support_attachments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `support_message_id` int(10) unsigned NOT NULL DEFAULT 0,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=715 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_attachments`
--

LOCK TABLES `support_attachments` WRITE;
/*!40000 ALTER TABLE `support_attachments` DISABLE KEYS */;
INSERT INTO `support_attachments` VALUES
(695,1353,'6a8bd9ae63c911787550126.jpg','2026-08-24 12:42:06','2026-08-24 12:42:06'),
(696,1353,'6a8bd9ae6e8131787550126.jpg','2026-08-24 12:42:06','2026-08-24 12:42:06'),
(697,1355,'6a8bd9f05f9781787550192.jpg','2026-08-24 12:43:12','2026-08-24 12:43:12'),
(698,1356,'6a8bf740d2c341787557696.jpeg','2026-08-24 14:48:16','2026-08-24 14:48:16'),
(699,1359,'6a8c85080d7ed1787593992.jpg','2026-08-25 00:53:12','2026-08-25 00:53:12'),
(700,1359,'6a8c8508241481787593992.jpg','2026-08-25 00:53:12','2026-08-25 00:53:12'),
(701,1360,'6a8d35cd7b51a1787639245.jpg','2026-08-25 13:27:25','2026-08-25 13:27:25'),
(702,1360,'6a8d35cd895c31787639245.jpg','2026-08-25 13:27:25','2026-08-25 13:27:25'),
(703,1361,'6a8d584056aed1787648064.jpg','2026-08-25 15:54:24','2026-08-25 15:54:24'),
(704,1363,'6a8d8ceedab601787661550.jpg','2026-08-25 19:39:10','2026-08-25 19:39:10'),
(705,1364,'6a8db5234744f1787671843.jpg','2026-08-25 22:30:43','2026-08-25 22:30:43'),
(706,1365,'6a8dc7fc066261787676668.jpeg','2026-08-25 23:51:08','2026-08-25 23:51:08'),
(707,1366,'6a8dd1f2064021787679218.jpg','2026-08-26 00:33:38','2026-08-26 00:33:38'),
(708,1366,'6a8dd1f20e3511787679218.jpg','2026-08-26 00:33:38','2026-08-26 00:33:38'),
(709,1366,'6a8dd1f2143401787679218.jpg','2026-08-26 00:33:38','2026-08-26 00:33:38'),
(710,1366,'6a8dd1f21a0b11787679218.jpg','2026-08-26 00:33:38','2026-08-26 00:33:38'),
(711,1366,'6a8dd1f21fe1c1787679218.jpg','2026-08-26 00:33:38','2026-08-26 00:33:38'),
(712,1367,'6a8dd236afc891787679286.jpg','2026-08-26 00:34:46','2026-08-26 00:34:46'),
(713,1369,'6a8df6d923a851787688665.jpeg','2026-08-26 03:11:05','2026-08-26 03:11:05'),
(714,1370,'6a8df710dc9541787688720.jpeg','2026-08-26 03:12:00','2026-08-26 03:12:00');
/*!40000 ALTER TABLE `support_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_messages`
--

DROP TABLE IF EXISTS `support_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `support_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `support_ticket_id` int(10) unsigned NOT NULL DEFAULT 0,
  `admin_id` int(10) unsigned NOT NULL DEFAULT 0,
  `message` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1371 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_messages`
--

LOCK TABLES `support_messages` WRITE;
/*!40000 ALTER TABLE `support_messages` DISABLE KEYS */;
INSERT INTO `support_messages` VALUES
(1350,806,0,'I buy 70$ card Stanbic for shopping but this is declined from online shopping  sites please refund my payment timely then I buy another card I attached declined proof and card detail below......','2026-08-24 01:13:05','2026-08-24 01:13:05'),
(1352,806,1,'Wellcome to the zwick web team Your Payment was added to your account \r\nZwick web Refund  policy 20%charges ditected to your account.\r\nRegard : Zwick Web Team','2026-08-24 07:47:24','2026-08-24 07:47:24'),
(1353,808,0,'Card is not valid Scrabble card','2026-08-24 12:42:06','2026-08-24 12:42:06'),
(1354,808,0,'Card is empty','2026-08-24 12:42:36','2026-08-24 12:42:36'),
(1355,808,0,'Please refund the cards','2026-08-24 12:43:12','2026-08-24 12:43:12'),
(1356,809,0,'Hello,\r\n\r\nThank you for adding the payment to my wallet. However, I paid **$110 USD**, but only **$80 USD** has been credited to my wallet.\r\n\r\nAccording to my transaction details, the total payment was **$110 USD** (including the $10 fee). Please check the transaction and credit the remaining **$30 USD** to my wallet.\r\n\r\n**Transaction ID:** JIXFCOHY8W9R\r\n**Total Paid:** $110 USD\r\n**Credited:** $80 USD\r\n**Remaining:** $30 USD\r\n\r\nI have attached the payment screenshot for verification. Please check and add the remaining amount to my wallet.\r\n\r\nThank you.','2026-08-24 14:48:16','2026-08-24 14:48:16'),
(1357,810,0,'These website for real','2026-08-24 17:07:03','2026-08-24 17:07:03'),
(1358,809,0,'Sorry, I made a mistake in my previous message. The missing amount is $20, not $30.\r\n\r\nThe $10 processing fee was already deducted, so please add the remaining $20 to my wallet.\r\n\r\nThank you.','2026-08-24 20:13:14','2026-08-24 20:13:14'),
(1359,811,0,'I purchase first card name Stanbic for online shopping at any site this is failed and I give refund but after refund I purchase another card name For Amazon both card are same and failed again I attached proved chk this and refund my payment and tell me why both card are same.....','2026-08-25 00:53:12','2026-08-25 00:53:12'),
(1360,812,0,'My card is not active I want refund','2026-08-25 13:27:25','2026-08-25 13:27:25'),
(1361,813,0,'Hi, \r\nI have deposited $70 and paid $77 along with the fees and received $65 only kindly update my dashboard and provide me with the complete deposit s','2026-08-25 15:54:24','2026-08-25 15:54:24'),
(1362,814,0,'Hello,\r\n\r\nI made a payment of $33 USD today ($30 payment + $3 processing fee) through Binance Smart Chain BNB BEP20, but the transaction has been marked as Rejected.\r\n\r\nTransaction ID: VXW8DUGXCPD5\r\nPayment Amount: $30 USD\r\nProcessing Fee: $3 USD\r\nTotal Paid: $33 USD\r\nStatus: Rejected\r\n\r\nPlease check why this payment was rejected. Since the payment has already been made, please either credit the $30 USD to my wallet or let me know how the payment will be refunded.\r\n\r\nI have attached the transaction screenshot for verification.\r\n\r\nThank you.','2026-08-25 17:30:27','2026-08-25 17:30:27'),
(1363,815,0,'I sent $77 and my deposit is rejected why? I need this money in my dashboard','2026-08-25 19:39:10','2026-08-25 19:39:10'),
(1364,816,0,'I am using this for daraz and this data is kept declining also there is no option of united states\' in daraz to add number as they are demanding the account holder number to verify so please refund it ass soon as possible','2026-08-25 22:30:43','2026-08-25 22:30:43'),
(1365,817,0,'Hi Team,\r\nI have deposited payment on the website but it is still showing \"Pending - Not Approved\".\r\nKindly approve it so I can complete my purchase.\r\nThank you','2026-08-25 23:51:08','2026-08-25 23:51:08'),
(1366,818,0,'This card is not working for me. I think there is something wrong with the card.','2026-08-26 00:33:38','2026-08-26 00:33:38'),
(1367,818,0,'This card is not working for me. I think there is something wrong with the card.','2026-08-26 00:34:46','2026-08-26 00:34:46'),
(1368,819,0,'Hi Team, \r\nI have deposited payment on the website but it is still showing \"Pending - Not Approved\".\r\nKindly approve it so I can complete my purchase. Thank you','2026-08-26 03:10:05','2026-08-26 03:10:05'),
(1369,819,0,'Hi Team, I have deposited payment on the website but it is still showing \"Pending - Not Approved\". Kindly approve it so I can complete my purchase. Thank you','2026-08-26 03:11:05','2026-08-26 03:11:05'),
(1370,819,0,'Hi Team, I have deposited payment on the website but it is still showing \"Pending - Not Approved\". Kindly approve it so I can complete my purchase. Thank you','2026-08-26 03:12:00','2026-08-26 03:12:00');
/*!40000 ALTER TABLE `support_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_tickets`
--

DROP TABLE IF EXISTS `support_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `support_tickets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT 0,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `ticket` varchar(40) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: Open, 1: Answered, 2: Replied, 3: Closed',
  `priority` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1 = Low, 2 = medium, 3 = heigh',
  `last_reply` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=820 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_tickets`
--

LOCK TABLES `support_tickets` WRITE;
/*!40000 ALTER TABLE `support_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `support_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `amount` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `charge` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `post_balance` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `trx_type` varchar(40) DEFAULT NULL,
  `trx` varchar(40) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `remark` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=799 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `update_logs`
--

DROP TABLE IF EXISTS `update_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `update_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(40) DEFAULT NULL,
  `update_log` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `update_logs`
--

LOCK TABLES `update_logs` WRITE;
/*!40000 ALTER TABLE `update_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `update_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_logins`
--

DROP TABLE IF EXISTS `user_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_logins` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `user_ip` varchar(40) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `country` varchar(40) DEFAULT NULL,
  `country_code` varchar(40) DEFAULT NULL,
  `longitude` varchar(40) DEFAULT NULL,
  `latitude` varchar(40) DEFAULT NULL,
  `browser` varchar(40) DEFAULT NULL,
  `os` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4593 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logins`
--

LOCK TABLES `user_logins` WRITE;
/*!40000 ALTER TABLE `user_logins` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(40) DEFAULT NULL,
  `lastname` varchar(40) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `dial_code` varchar(40) DEFAULT NULL,
  `mobile` varchar(40) DEFAULT NULL,
  `ref_by` int(10) unsigned NOT NULL DEFAULT 0,
  `balance` decimal(28,8) NOT NULL DEFAULT 0.00000000,
  `password` varchar(255) NOT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `country_code` varchar(40) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `addressss` text DEFAULT NULL COMMENT 'contains full address',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0: banned, 1: active',
  `ev` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: email unverified, 1: email verified',
  `sv` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: mobile unverified, 1: mobile verified',
  `profile_complete` tinyint(1) NOT NULL DEFAULT 0,
  `ver_code` varchar(40) DEFAULT NULL COMMENT 'stores verification code',
  `ver_code_send_at` datetime DEFAULT NULL COMMENT 'verification send time',
  `ts` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: 2fa off, 1: 2fa on',
  `tv` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0: 2fa unverified, 1: 2fa verified',
  `tsc` varchar(255) DEFAULT NULL,
  `ban_reason` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-14 18:16:28
