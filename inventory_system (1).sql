-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 16-10-2024 a las 19:56:33
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

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
  `moderator` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `loanDate` datetime NOT NULL,
  `deliveryDate` datetime DEFAULT NULL,
  `approval` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loans`
--

INSERT INTO `loans` (`id`, `receivingUser`, `moderator`, `loanDate`, `deliveryDate`, `approval`, `state`) VALUES
(46, '010010001', '0100101001', '2024-10-16 14:47:17', '2024-10-20 14:47:00', 'Pendiente', 'En inventario');

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
(42, 46, '231232423', 'PC GAMER 50'),
(43, 46, '12323312312', 'Notebook Azus');

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
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `isTemporaryPassword` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`document`, `name`, `username`, `password`, `role`, `isTemporaryPassword`) VALUES
('010010001', 'Estudiante', 'Estudiante', '$2b$10$HirfvmkpOQhMHSULPe7DG.roECl9sJM2AKEwrUAGzMWSrbAx4bua.', 'student', 0),
('0100101001', 'Moderador', 'Moderador', '$2b$10$SjyPWODW6wxAmSC1aFBZn.D2.MJD3EEWJOZYSVuvf3MPhrIQ6V/XC', 'moderator', 0),
('1022932004', 'Alejandro', 'Admin', '$2b$10$yst7DGpexS.dQ8jkcnnYReMGRLroUwvLjb8Jy/A8f7cdPLtYYL/XS', 'admin', 0);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `loan_devices`
--
ALTER TABLE `loan_devices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
