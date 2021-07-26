-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Jul 2021 pada 06.29
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
-- Database: `db_basis`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kecamatans`
--

CREATE TABLE `kecamatans` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `kodePos` varchar(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data untuk tabel `kecamatans`
--

INSERT INTO `kecamatans` (`id`, `nama`, `nickname`, `kodePos`, `createdAt`, `updatedAt`) VALUES
(1, 'Telanaipura', 'TLP', '36122', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Kota Baru', 'KB', '36128', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'Jelutung', 'JLT', '36124', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'Pasar', 'PSR', '36133', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'Jambi Timur', 'K-JTM', '36146', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 'Jambi Selatan', 'K-JSL', '36132', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 'Danau Teluk', 'K-DTL', '36262', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 'Pelayangan', 'K-PLY', '36251', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 'Alam Barajo', 'K-ABR', '36129', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 'Paal Merah', 'KPMH', '36135', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 'Danau Sipin', 'K-DSP', '36121', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 'Kecamatan Demo', 'KDM', '87899', '2021-07-01 09:45:22', '2021-07-01 09:45:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelurahans`
--

CREATE TABLE `kelurahans` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `kodePos` varchar(10) DEFAULT NULL,
  `kecamatanId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data untuk tabel `kelurahans`
--

INSERT INTO `kelurahans` (`id`, `nama`, `nickname`, `kodePos`, `kecamatanId`, `createdAt`, `updatedAt`) VALUES
(1, 'Lingkar Selatan', 'LS', '36136', 65, '2021-06-30 20:49:05', '2021-06-30 20:58:04'),
(2, 'Simpang IV Sipin', 'S-IV-S', '36124', 1, NULL, NULL),
(3, 'Buluran Kenali', 'BULKEN', '36143', 1, NULL, NULL),
(4, 'Teluk Kenali', '', '', 1, NULL, NULL),
(5, 'Telanaipura', 'TLP', '36122', 1, NULL, NULL),
(6, 'Penyengat Rendah', 'PR', '36123', 1, NULL, NULL),
(7, 'Pematang Sulur', 'P. Sulur', '36124', 1, NULL, NULL),
(8, 'Selamat', 'SLMT', '36129', 70, NULL, NULL),
(9, 'Sungai Putri', 'SP', '36122', 70, NULL, NULL),
(11, 'Suka Karya', 'SKY', '36127', 10, NULL, NULL),
(12, 'Simpang III Sipin', 'S3S', '36126', 10, NULL, NULL),
(13, 'Paal Lima', 'PV', '36128', 10, NULL, NULL),
(14, 'Kenali Asam Bawah', '', '', 10, NULL, NULL),
(15, 'Kenali Asam Atas', 'KAA', '36128', 10, NULL, NULL),
(17, 'Jelutung', 'JTG', '36136', 16, NULL, NULL),
(18, 'Kebun Handil', '', '', 16, NULL, NULL),
(19, 'Cempaka Putih', '', '', 16, NULL, NULL),
(20, 'Talang Jauh', 'TJ', '36133', 16, NULL, NULL),
(21, 'Lebak Bandung', '', '', 16, NULL, NULL),
(22, 'Payo Lebar', '', '', 16, NULL, NULL),
(23, 'Handil Jaya', 'HJ', '36137', 16, NULL, NULL),
(25, 'Pasar Jambi', 'PSJ', '36113', 24, NULL, NULL),
(26, 'Beringin', 'BRG', '36112', 24, NULL, NULL),
(27, 'Sungai Asam', 'SA', '36123', 24, NULL, NULL),
(28, 'Orang Kayo Hitam', 'OKH', '36111', 24, NULL, NULL),
(30, 'Sijenjang', 'Sjj', '36149', 29, NULL, NULL),
(31, 'Kasang Jaya', 'KJ', '36141', 29, NULL, NULL),
(32, 'Talang Banjar', 'TLB', '36142', 29, NULL, NULL),
(33, 'Budiman', 'B', '36145', 29, NULL, NULL),
(34, 'Sulanjana', 'SLJ', '36144', 29, NULL, NULL),
(35, 'Kasang', 'KS', '36041', 29, NULL, NULL),
(36, 'Tanjung Sari', 'TGS', '36147', 29, NULL, NULL),
(37, 'Rajawali', 'RJW', '36142', 29, NULL, NULL),
(38, 'Tanjung Pinang', 'TP', '36146', 29, NULL, NULL),
(40, 'Pasir Putih', 'PP', '36139', 39, NULL, NULL),
(41, 'Tambak Sari', 'TS', '36138', 39, NULL, NULL),
(42, 'The Hok', 'THK', '36138', 39, NULL, NULL),
(43, 'Wijayapura', 'WP', '36137', 39, NULL, NULL),
(44, 'Pakuan Baru', 'PB', '36132', 39, NULL, NULL),
(45, 'Talang Bakung', 'TLB', '36135', 65, NULL, NULL),
(47, 'Pasir Panjang', 'PPJ', '36265', 46, NULL, NULL),
(48, 'Tanjung Raden', 'TR', '36264', 46, NULL, NULL),
(49, 'Olak Kemang', 'OK', '36262', 46, NULL, NULL),
(50, 'Tanjung Pasir', 'TP', '36263', 46, NULL, NULL),
(51, 'Ulu Gedong', 'UG', '36261', 46, NULL, NULL),
(53, 'Arab Melayu', 'AM', '36251', 52, NULL, NULL),
(54, 'Mudung Laut', 'ML', '36261', 52, NULL, NULL),
(55, 'Tengah', 'KT', '36254', 52, NULL, NULL),
(56, 'Tahtul Yaman', 'TY', '36255', 52, NULL, NULL),
(57, 'Jelmu', 'JM', '36253', 52, NULL, NULL),
(58, 'Tanjung Johor', 'TJ', '36256', 52, NULL, NULL),
(60, 'Kenali Besar', 'KB', '36129', 59, NULL, NULL),
(61, 'Rawasari', 'RS', '36125', 59, NULL, NULL),
(62, 'Beliung', 'BL', '36129', 59, NULL, NULL),
(63, 'Mayang Mangurai', 'MM', '36129', 59, NULL, NULL),
(64, 'Bagan Pete', 'BP', '36129', 59, NULL, NULL),
(66, 'Payo Selincah', 'PYS', '36148', 65, NULL, NULL),
(67, 'Eka Jaya', '', '', 65, NULL, NULL),
(69, 'Paal Merah', 'PM', '36139', 65, NULL, NULL),
(71, 'Murni', 'MN', '36121', 70, NULL, NULL),
(72, 'Solok Sipin', 'SS', '36121', 70, NULL, NULL),
(73, 'LEGOK', 'LGK', '36121', 70, NULL, NULL);

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
  `updatedAt` datetime NOT NULL,
  `role` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `createdAt`, `updatedAt`, `role`) VALUES
(31, 'User 1', 'user1', '$2b$10$Ukgh.Osj3VHCktqw8UcyRejWEJuz2Za4c.ZBWmnzgJp6Gn8IRRlaK', '2021-06-21 16:00:03', '2021-06-30 13:49:26', 1),
(36, 'User3', 'user3', '$2b$10$Ml1m6rDiurSi97pbS9jqw.K3YVwlVG4QGL22FDLPmpvbtKM9CJUKS', '2021-06-22 08:25:43', '2021-06-28 14:04:25', 0),
(71, 'User4', 'user4', '$2b$10$aEWsA2ojUbRmJ7bPJM0XXe54rsdVKHX1c5w6HS8.6malXv12rZrbe', '2021-06-24 09:38:21', '2021-06-24 09:38:21', 0),
(75, 'User5', 'User5', '$2b$10$uiCe39DtdHjMrFTqfqfWeOYMLTXT/I0sEbrb8Q9MCoeECJq3kSqh2', '2021-06-24 13:59:51', '2021-06-30 13:48:10', 1),
(88, 'Super Admin', 'superadmin', '$2b$10$N.o8R0MWlhOtslYH8orRu.aG1adJ9OVVyZA3iQtxkStyVe3FbbKly', '2021-06-24 16:03:22', '2021-07-01 09:51:49', 2),
(90, 'User 7', 'user7', '$2b$10$0Lg2WaRWDrCmWAgH2rKuSuaw7p6sjA04kh12.Urh9stKnhLR2zLS2', '2021-06-28 11:57:20', '2021-06-28 14:04:44', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kecamatans`
--
ALTER TABLE `kecamatans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`),
  ADD UNIQUE KEY `nama_2` (`nama`),
  ADD UNIQUE KEY `nama_3` (`nama`);

--
-- Indeks untuk tabel `kelurahans`
--
ALTER TABLE `kelurahans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

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
-- AUTO_INCREMENT untuk tabel `kecamatans`
--
ALTER TABLE `kecamatans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT untuk tabel `kelurahans`
--
ALTER TABLE `kelurahans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
