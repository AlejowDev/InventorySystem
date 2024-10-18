-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 18-10-2024 a las 22:30:58
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventory_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loans`
--

CREATE TABLE `loans` (
  `id` int NOT NULL,
  `receivingUser` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `loanDate` datetime NOT NULL,
  `deliveryDate` datetime DEFAULT NULL,
  `approval` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loans`
--

INSERT INTO `loans` (`id`, `receivingUser`, `loanDate`, `deliveryDate`, `approval`, `state`) VALUES
(50, '100232447', '2024-10-17 14:24:53', '2024-10-20 14:24:00', 'Finalizado ', 'Disponible'),
(51, '312312331', '2024-10-17 14:41:13', '2024-10-20 14:41:00', 'Finalizado ', 'Disponible'),
(52, '100232447', '2024-10-17 15:07:18', '2024-10-19 15:07:00', 'Rechazado', 'Disponible'),
(53, '100232447', '2024-10-18 17:28:36', '2024-10-20 17:28:00', 'Pendiente', 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loan_devices`
--

CREATE TABLE `loan_devices` (
  `id` int NOT NULL,
  `loan_id` int DEFAULT NULL,
  `device_serial` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `device_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loan_devices`
--

INSERT INTO `loan_devices` (`id`, `loan_id`, `device_serial`, `device_name`) VALUES
(48, 50, '231232423', 'PC GAMER 50'),
(49, 50, '65643453', 'Notebook'),
(50, 51, '12323312312', 'Notebook Azus'),
(51, 52, '12323312312', 'Notebook Azus'),
(52, 53, '12312312', 'PALA'),
(53, 53, '12323312312', 'Notebook Azus');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tools`
--

CREATE TABLE `tools` (
  `serial` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `imagen` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tools`
--

INSERT INTO `tools` (`serial`, `nombre`, `descripcion`, `imagen`, `estado`) VALUES
('12312312', 'PALA', 'PALA DE CONTRUCCION', 'uploads\\1729287035333.jpg', 'Disponible'),
('12323312312', 'Notebook Azus', 'Azus i9 16gb RAM', 'uploads\\1728748350893.jpg', 'Disponible'),
('124234534', 'Thinkpad', 'ThinkPad ryzen 9', 'uploads\\1728748540076.jpg', 'Disponible'),
('231232423', 'PC GAMER 50', 'FULL SATCK PC', 'uploads\\1729089056361.jpg', 'Disponible'),
('65643453', 'Notebook', 'PC Notebook i9', 'uploads\\1728748403810.jpg', 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `document` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `studentNumber` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `isTemporaryPassword` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`document`, `name`, `email`, `phone`, `studentNumber`, `username`, `password`, `role`, `isTemporaryPassword`) VALUES
('0101010101', 'Moderador', '0', '0', '0', 'Moderador', '$2b$10$M8GVFTK3gmF0XQPqeUFBX.3EA4NdufsLMUNJMVH2S.Z8lw0cIwfcK', 'moderator', 0),
('100232447', 'Valentina Pruebas', 'estudiante@gmail.com', '3134267634', '082123434', 'Estudiante', '$2b$10$HirfvmkpOQhMHSULPe7DG.roECl9sJM2AKEwrUAGzMWSrbAx4bua.', 'student', 0),
('18102024', 'Administrador', '0', '0', '0', 'Administrator', '$2b$10$noLLvr532UvHDWUIQOjhi.nK.dfB4FNm9ZIwmthfxnIKpV.wOK5rm', 'admin', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `loan_devices`
--
ALTER TABLE `loan_devices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indices de la tabla `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`serial`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`document`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `loan_devices`
--
ALTER TABLE `loan_devices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `loan_devices`
--
ALTER TABLE `loan_devices`
  ADD CONSTRAINT `loan_devices_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
