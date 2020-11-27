-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2020 at 06:08 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodblog`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `restaurantid` varchar(10) NOT NULL,
  `menuid` varchar(10) NOT NULL,
  `comment` text NOT NULL,
  `commentby` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `restaurantid`, `menuid`, `comment`, `commentby`, `date`, `time`) VALUES
(1, '1', '2', 'nice food..', 'Rakibul', '2020-11-25', '1:32:48 AM'),
(2, '1', '2', 'good..', 'admin', '2020-11-25', '1:52:40 AM'),
(3, '1', '2', 'testing from user account..', 'rakibul', '2020-11-27', '7:21:41 PM'),
(4, '1', '3', 'nice', 'rakibul', '2020-11-27', '9:44:31 PM'),
(5, '2', '4', 'great food', 'admin', '2020-11-27', '11:06:1 PM');

-- --------------------------------------------------------

--
-- Table structure for table `foodexp`
--

CREATE TABLE `foodexp` (
  `id` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `post` text NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `foodexp`
--

INSERT INTO `foodexp` (`id`, `author`, `post`, `date`) VALUES
(1, 'admin', 'Fortuna Fried Chicken is a fast food chain and famous for it\'s fried chicken. Been there few times and last time we had spicy chicken bucket. The chickens were tasty and value for money. 12 pieces bucket cost 1000 taka. FFC gives so many offers and usually I have found them from their facebook page.', '2020-11-26'),
(2, 'admin', 'Lorem ipsum dolor sit amet, enim porro probatus mel an, per eu vivendum corrumpit, no nec dicit consequat. Id has postulant efficiendi. Eu sententiae consectetuer signiferumque nam, mea cu omnes convenire. Aliquip aperiam ne nam, pro at solum vidisse, clita assentior ex mei. Vocibus tibique principes ad mel, has ferri clita at.\r\n\r\nAeterno suscipit pri ne, quo aeterno vidisse cu. Solet aliquid gubergren ad duo. Cu cum mazim quodsi debitis, virtute detracto scaevola ex qui. Te vis solum posse, ut nihil feugait voluptua mel.\r\n\r\nEt vocibus sapientem expetendis cum, et sea quot dissentiunt. Cum posse voluptatum te, tota oportere vix ad, dico tincidunt incorrupte sed cu. Vis ei nonumy utamur iuvaret, has ex nusquam perfecto eloquentiam. Est id cibo eloquentiam. Et vel pericula deterruisset, soluta possim mentitum sed cu.\r\n\r\nDuo sanctus commune ea. Oblique scripserit vel ex. Utinam luptatum te sed. Eu nostro scripta oportere qui, sed te dicat graecis tacimates, an alii solum cetero sit.\r\n', '2020-11-27'),
(3, 'rakibul', 'Best Fuska in Dhaka\r\nThe cafe is located on the very busy Gulshan Avenue. Their food is delicious. I really love their delicious crispy Fuchka, Chotpati and chat. The puffed balls (Fuchka) were crispy, light, fine and without smell of old oil. There are a few sitting arrangements outside beside the road. They have sitting arrangement inside as well with AC. The space is not for a big crowd. Their fresh juices were also refreshing. Prices are also reasonable. They are open everyday from 11 am to 11 pm.\r\n', '2020-11-27');

-- --------------------------------------------------------

--
-- Table structure for table `foodexpcomment`
--

CREATE TABLE `foodexpcomment` (
  `id` int(11) NOT NULL,
  `postid` varchar(10) NOT NULL,
  `commentby` varchar(20) NOT NULL,
  `comment` text NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `foodexpcomment`
--

INSERT INTO `foodexpcomment` (`id`, `postid`, `commentby`, `comment`, `date`, `time`) VALUES
(1, '1', 'admin', 'yes, it\'s true...', '2020-11-26', '12'),
(2, '1', 'admin', 'thanks for sharing your experience.', '2020-27-11', '12:38:59 AM'),
(3, '3', 'rakibul', 'nice place to have some fuchka', '2020-27-11', '7:24:17 PM');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '123', 'admin'),
(3, 'rakibul', '123', 'user'),
(5, 'rakibul', '12345', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `restaurantid` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `price` varchar(10) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `restaurantid`, `title`, `details`, `price`, `image`) VALUES
(3, '1', 'Fried chicken', 'Fried chicken, also known simply as fried chicken, is a dish consisting of chicken pieces which have been coated in a seasoned batter and pan-fried, deep fried, or pressure fried. The breading adds a crisp coating or crust to the exterior of the chicken while retaining juices in the meat. Broiler chickens are most commonly used.\r\n\r\nThe first dish known to have been deep fried was fritters, which were popular in the European Middle Ages. However, it was the Scottish who were the first Europeans to deep fry their chicken in fat (though without seasoning). Meanwhile, a number of West African peoples had traditions of seasoned fried chicken (though battering and cooking the chicken in palm oil).', '160', '1606496628119.jpg'),
(4, '2', 'Yumcha Box', '1 piece of Prawn Har Gow.1 Piece of Beef and Chive Sui Mai.', '550', '1606496192576.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `goal` text NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `location`, `phone`, `goal`, `description`, `image`) VALUES
(1, 'Burger King', 'Gazipur', '01943798593', 'Our main goal is to provide good quality of food..', 'Well-known fast-food chain serving grilled burgers, fries & shakes, plus breakfast.', '1606470280739.jpg'),
(2, 'Istanbul Restaurant', 'Gulshan Circle-2', '01943798593', 'Our main mission is to create a pleasant atmosphere in which our guests can relax, enjoy themselves and perhaps also spend one of the most important days in their lives – their wedding day.  We pride ourselves in offering each of our guests our full attention. We closely supervise all events taking place in our establishment. We will always strive to satisfy your requests and any special wishes you may have.', 'Founded in 1971, ISTANBUL RESTAURANT DHAKA is a destination for delicious food that’s both healthy for you and aligned with your values; we source local and organic ingrediants from farmes we know and partners. We trust, supporting our communities and creating meningful relationships with those around us, we exist to created experiences where passion and purpose come together.', '1606485006052.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `email`, `phone`, `address`, `image`, `role`) VALUES
(1, 'Rakibul Islam', 'admin', '123', 'rakibul@gmail.com', '01943798593', 'Dhaka', '1606313825629.png', 'admin'),
(2, 'Rakibul', 'rakibul', '123', 'rakibul2@gmail.com', '01943798593', 'Dhaka', '1606483511036.png', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foodexp`
--
ALTER TABLE `foodexp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foodexpcomment`
--
ALTER TABLE `foodexpcomment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `foodexp`
--
ALTER TABLE `foodexp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `foodexpcomment`
--
ALTER TABLE `foodexpcomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
