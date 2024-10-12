-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 12-10-2024 a las 17:08:02
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
  `device` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `receivingUser` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `moderator` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `loanDate` datetime NOT NULL,
  `deliveryDate` datetime DEFAULT NULL,
  `approval` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loan_devices`
--

CREATE TABLE `loan_devices` (
  `id` int NOT NULL,
  `loan_id` int NOT NULL,
  `device_serial` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('100023421', 'Ejemplo', 'Ejemplo', '$2b$10$pJIipFAe5aAB/eg09UvI6e3GP9n/9IKwe2cuRDHflKtCrDaln3jIO', 'student', 0),
('1022932004', 'Alejandro', 'Admin', '$2b$10$yst7DGpexS.dQ8jkcnnYReMGRLroUwvLjb8Jy/A8f7cdPLtYYL/XS', 'admin', 0),
('122034231', 'Ejemplo', 'Ejemplo2', '$2b$10$W97P/SxIqPIiRXyneo0Ku.6gxfqtnR2LQ1MxZVYEWXBstiJhMgSGy', 'moderator', 0);

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
  ADD KEY `loan_id` (`loan_id`),
  ADD KEY `device_serial` (`device_serial`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `loan_devices`
--
ALTER TABLE `loan_devices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `loan_devices`
--
ALTER TABLE `loan_devices`
  ADD CONSTRAINT `loan_devices_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`),
  ADD CONSTRAINT `loan_devices_ibfk_2` FOREIGN KEY (`device_serial`) REFERENCES `tools` (`serial`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
