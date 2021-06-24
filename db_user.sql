-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Jun 2021 pada 11.03
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_antrian`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(31, 'User1', 'user8', '$2b$10$Ukgh.Osj3VHCktqw8UcyRejWEJuz2Za4c.ZBWmnzgJp6Gn8IRRlaK', '2021-06-21 16:00:03', '2021-06-24 15:41:18'),
(36, 'User3', 'user3', '$2b$10$7Kz3MlxcHSEsetKQVPcnz.r7qtjG2.xvYy96X9m8O/xhLwsM9AgaS', '2021-06-22 08:25:43', '2021-06-24 15:39:48'),
(58, 'User6', 'user6', '$2b$10$IxgtU5RcyZrOzGf8DPtdh.myM0cq0Iw1w.4OXRTu5vow4WRif0p52', '2021-06-22 09:41:38', '2021-06-24 15:42:46'),
(71, 'User4', 'user4', '$2b$10$aEWsA2ojUbRmJ7bPJM0XXe54rsdVKHX1c5w6HS8.6malXv12rZrbe', '2021-06-24 09:38:21', '2021-06-24 09:38:21'),
(75, 'User5', 'User5', '$2b$10$uiCe39DtdHjMrFTqfqfWeOYMLTXT/I0sEbrb8Q9MCoeECJq3kSqh2', '2021-06-24 13:59:51', '2021-06-24 13:59:51'),
(87, 'User2', 'user2', '$2b$10$YHFgSr1MgjWEqdGdW6yf7.4rh2/VeBb1lLpP3cFLYl4ahKAmsjoz.', '2021-06-24 15:43:11', '2021-06-24 15:43:11'),
(88, 'admin', 'admin', '$2b$10$Q8Uy8ON84.IZkgIObGPA6.zbKVwX4d7ulduoHCd0ABNZpBrr0kgDS', '2021-06-24 16:03:22', '2021-06-24 16:03:22');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
