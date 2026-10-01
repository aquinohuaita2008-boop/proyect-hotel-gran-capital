CREATE TABLE clientes (
    id_cliente INTEGER,
    nombre_completo VARCHAR(120),
    correo VARCHAR(150),
    contrasena VARCHAR(255),
    documento VARCHAR(30),
    sexo VARCHAR(20),
    telefono VARCHAR(30),
    direccion VARCHAR(180),
    fecha_registro TIMESTAMP,
    activo BOOLEAN
);

CREATE TABLE personal (
    id_personal INTEGER,
    nombre_completo VARCHAR(120),
    nombre_usuario VARCHAR(60),
    correo VARCHAR(150),
    contrasena VARCHAR(255),
    rol VARCHAR(30),
    telefono VARCHAR(30),
    fecha_registro TIMESTAMP,
    activo BOOLEAN
);

CREATE TABLE habitaciones (
    id_habitacion INTEGER,
    numero_habitacion VARCHAR(10),
    tipo VARCHAR(80),
    descripcion VARCHAR(500),
    capacidad INTEGER,
    precio_noche NUMERIC(10,2),
    imagen_url VARCHAR(500),
    caracteristicas TEXT,
    estado VARCHAR(30)
);

CREATE TABLE reservas (
    id_reserva INTEGER,
    codigo_reserva VARCHAR(30),
    id_cliente INTEGER,
    id_habitacion INTEGER,
    fecha_entrada DATE,
    fecha_salida DATE,
    cantidad_huespedes INTEGER,
    costo_total NUMERIC(10,2),
    estado VARCHAR(30),
    fecha_creacion TIMESTAMP,
    fecha_hora_checkin TIMESTAMP,
    fecha_hora_checkout TIMESTAMP
);

CREATE TABLE pagos (
    id_pago INTEGER,
    id_reserva INTEGER,
    monto_total NUMERIC(10,2),
    monto_pagado NUMERIC(10,2),
    saldo_pendiente NUMERIC(10,2),
    estado VARCHAR(30),
    metodo VARCHAR(30),
    fecha_registro TIMESTAMP
);

CREATE TABLE servicios_adicionales (
    id_servicio INTEGER,
    nombre VARCHAR(100),
    descripcion VARCHAR(500),
    precio NUMERIC(10,2),
    disponible BOOLEAN,
    fecha_creacion TIMESTAMP
);

CREATE TABLE solicitudes_servicio (
    id_solicitud INTEGER,
    id_reserva INTEGER,
    id_cliente INTEGER,
    id_servicio INTEGER,
    cantidad INTEGER,
    precio_aplicado NUMERIC(10,2),
    estado VARCHAR(30),
    fecha_solicitud TIMESTAMP
);
