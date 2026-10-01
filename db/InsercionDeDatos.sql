\c hotelgrancapitaldb;

INSERT INTO clientes (id_cliente, nombre_completo, correo, contrasena, documento, sexo, telefono, direccion) VALUES
(1, 'Ana Martínez', 'ana@hotel.com', '$2b$08$.MCkG8/HYuwrvbAd4cJzG.QwR.kr2SSH4EXvCZ787bezVG45GjTPu', '45871236', 'FEMENINO', '+51 900 111 222', 'Av. Primavera 123'),
(2, 'Carlos Ramírez', 'carlos@correo.com', '$2b$08$.MCkG8/HYuwrvbAd4cJzG.QwR.kr2SSH4EXvCZ787bezVG45GjTPu', '70234567', 'MASCULINO', '+51 900 222 333', 'Jr. Los Olivos 456'),
(3, 'Sofía Torres', 'sofia@correo.com', '$2b$08$.MCkG8/HYuwrvbAd4cJzG.QwR.kr2SSH4EXvCZ787bezVG45GjTPu', '71234568', 'FEMENINO', '+51 900 333 444', 'Calle Central 789'),
(4, 'Diego Fernández', 'diego@correo.com', '$2b$08$.MCkG8/HYuwrvbAd4cJzG.QwR.kr2SSH4EXvCZ787bezVG45GjTPu', '72345678', 'MASCULINO', '+51 900 444 555', 'Av. La Marina 321');

INSERT INTO personal (id_personal, nombre_completo, nombre_usuario, correo, contrasena, rol, telefono) VALUES
(1, 'Moros Dev', 'morosdev', 'morosdev@hotel.com', '$2b$08$mKMeo1RcQ1ipgrPJ9mkt9.GDSvb.mbJDmfZC6MezRFduv21lvBpHG', 'ADMINISTRADOR', '+51 900 000 001'),
(2, 'Laura Recepción', 'recepcion', 'recepcion@hotel.com', '$2b$08$.MCkG8/HYuwrvbAd4cJzG.QwR.kr2SSH4EXvCZ787bezVG45GjTPu', 'RECEPCIONISTA', '+51 900 000 002'),
(3, 'Pedro Salas', 'psalas', 'psalas@hotel.com', '$2b$08$.MCkG8/HYuwrvbAd4cJzG.QwR.kr2SSH4EXvCZ787bezVG45GjTPu', 'RECEPCIONISTA', '+51 900 000 003');

INSERT INTO habitaciones (id_habitacion, numero_habitacion, tipo, descripcion, capacidad, precio_noche, imagen_url, caracteristicas, estado) VALUES
(1, '101', 'ESTÁNDAR', 'Habitación acogedora con luz natural y escritorio.', 2, 95, 'habitacion-estandar.jpg', 'WiFi, TV, Aire acondicionado', 'DISPONIBLE'),
(2, '202', 'DELUXE', 'Confort superior, cama king y vista privilegiada.', 2, 145, 'habitacion-deluxe.jpg', 'WiFi, Desayuno, Minibar', 'RESERVADA'),
(3, '305', 'SUITE EJECUTIVA', 'Suite amplia para viajes de negocios.', 4, 220, 'suite-ejecutiva.jpg', 'WiFi, Sala, Minibar, Bañera', 'OCUPADA'),
(4, '410', 'SUITE FAMILIAR', 'Amplia y funcional para toda la familia.', 5, 260, 'suite-familiar.jpg', 'WiFi, 2 habitaciones, Desayuno', 'LIMPIEZA'),
(5, '501', 'PRESIDENCIAL', 'La experiencia más exclusiva del hotel.', 3, 390, 'suite-presidencial.jpg', 'WiFi, Terraza, Jacuzzi, Room service', 'MANTENIMIENTO'),
(6, '106', 'ESTÁNDAR', 'Habitación cómoda y práctica.', 2, 95, 'habitacion-estandar-2.jpg', 'WiFi, TV', 'DISPONIBLE');

INSERT INTO reservas (id_reserva, codigo_reserva, id_cliente, id_habitacion, fecha_entrada, fecha_salida, cantidad_huespedes, costo_total, estado) VALUES
(1, 'HGC-1001', 1, 2, '2026-10-12', '2026-10-15', 2, 435, 'CONFIRMADA'),
(2, 'HGC-1002', 1, 1, '2026-08-02', '2026-08-04', 1, 190, 'COMPLETADA'),
(3, 'HGC-1003', 2, 3, '2026-09-20', '2026-09-23', 3, 660, 'CONFIRMADA'),
(4, 'HGC-1004', 3, 4, '2026-11-05', '2026-11-08', 4, 780, 'PENDIENTE'),
(5, 'HGC-1005', 4, 6, '2026-07-10', '2026-07-12', 2, 190, 'CANCELADA');

INSERT INTO pagos (id_pago, id_reserva, monto_total, monto_pagado, saldo_pendiente, estado, metodo) VALUES
(1, 1, 435, 200, 235, 'PARCIAL', 'TARJETA'),
(2, 2, 190, 190, 0, 'PAGADO', 'EFECTIVO'),
(3, 3, 660, 0, 660, 'PENDIENTE', 'TRANSFERENCIA'),
(4, 4, 780, 0, 780, 'PENDIENTE', 'TARJETA'),
(5, 5, 190, 190, 0, 'REEMBOLSADO', 'TRANSFERENCIA');

INSERT INTO servicios_adicionales (id_servicio, nombre, descripcion, precio, disponible) VALUES
(1, 'DESAYUNO', 'Desayuno buffet servido en el restaurante.', 18, TRUE),
(2, 'SERVICIO A LA HABITACIÓN', 'Atención gastronómica directamente en su habitación.', 12, TRUE),
(3, 'LAVANDERÍA', 'Lavado y planchado de prendas.', 20, TRUE),
(4, 'TRANSPORTE', 'Traslado privado desde o hacia el aeropuerto.', 35, TRUE),
(5, 'LIMPIEZA ADICIONAL', 'Limpieza especial bajo solicitud.', 15, TRUE),
(6, 'CAMA EXTRA', 'Cama adicional preparada en la habitación.', 30, TRUE);

INSERT INTO solicitudes_servicio (id_solicitud, id_reserva, id_cliente, id_servicio, cantidad, precio_aplicado, estado) VALUES
(1, 1, 1, 1, 2, 18, 'PENDIENTE'),
(2, 1, 1, 4, 1, 35, 'EN PROCESO'),
(3, 2, 1, 3, 1, 20, 'COMPLETADA'),
(4, 3, 2, 2, 2, 12, 'PENDIENTE'),
(5, 4, 3, 6, 1, 30, 'EN PROCESO');
