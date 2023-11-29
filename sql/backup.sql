-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 26-11-2023 a las 16:04:35
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_mevak`
--
CREATE DATABASE IF NOT EXISTS `app_mevak` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `app_mevak`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estamontado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `nombre`, `descripcion`, `estamontado`) VALUES
(1, 'Sillas Comedor', 'Sillas para comedor y similares', 1),
(2, 'Sillas Escritorio', 'Sillas de escritorio y de trabajo', 0),
(3, 'Cómodas', 'Cómodas, cajoneras y cajones', 0),
(4, 'Sillones', 'Sillones, mecedoras y butacas', 1),
(5, 'Estanterías y Librerías', 'Estantes de pared, estanterías de pie y librerías', 0),
(6, 'Escritorios', 'Escritorios y mesas de trabajo', 0),
(7, 'Mesas Comedor', 'Mesas para comedor, grandes y pequeñas', 1),
(8, 'Sofás', 'Sofás, canapé y chaise longe', 1),
(9, 'Mesas Auxiliares', 'Mesas auxiliares y mesillas', 1),
(10, 'Mesillas de noche', 'Mesillas de noche de todos los estilos', 1),
(11, 'Zapateros', 'Zapateros de pie, de cajones y abiertos', 0),
(12, 'Armarios Vestidores', 'Vestidores abiertos', 0),
(13, 'Armarios Batientes', 'Armarios de puertas batientes', 0),
(14, 'Armarios Correderos', 'Armarios de puertas correderas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` double NOT NULL,
  `idcategoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `nombre`, `descripcion`, `precio`, `idcategoria`) VALUES
(1, 'Sillón París', 'Sillón bajo de cuero marrón con incrustaciones en dorado', 230.6, 4),
(2, 'Sillón Suiza', 'Sillón de tela de calidad y embellecimientos de madera', 354.5, 4),
(3, 'Silla Elegance', 'Silla de comedor de metal con cojín en tono perla', 45.5, 1),
(4, 'Estantería Alejandría', 'Estantería con capacidad para 600 libros. En color blanco, pino y roble.', 458.6, 5),
(5, 'Escritorio All4Games', 'Escritorio para juegos online. Con soporte para bebida, micrófono y cascos.', 189.99, 6),
(6, 'Zapatero Piececitos', 'Zapatero para niños. En colores vivos y llamativos', 65.2, 11),
(7, 'Vestidor Atenea', 'Vestidor abierto en color blanco y embellecimientos en oro', 240.3, 12),
(8, 'Vestidor Narciso', 'Vestidor abierto en color roble oscuro y remates en negro', 320.1, 12),
(9, 'Mesilla 70 revival', 'Mesa auxiliar al estilo de los años 70', 38.5, 9),
(10, 'Mesita de té', 'Mesa auxiliar para tomar el té', 88.99, 9),
(11, 'Mesa Derringer', 'Mesa para comedor con hasta 8 plazas de asiento', 140.3, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `fk_categoria` (`idcategoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
