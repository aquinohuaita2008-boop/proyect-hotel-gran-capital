\c hotelgrancapitaldb;

-- ============================================================
-- PRIMARY KEY
-- ============================================================
ALTER TABLE clientes ADD CONSTRAINT pk_clientes PRIMARY KEY (id_cliente);
ALTER TABLE personal ADD CONSTRAINT pk_personal PRIMARY KEY (id_personal);
ALTER TABLE habitaciones ADD CONSTRAINT pk_habitaciones PRIMARY KEY (id_habitacion);
ALTER TABLE reservas ADD CONSTRAINT pk_reservas PRIMARY KEY (id_reserva);
ALTER TABLE pagos ADD CONSTRAINT pk_pagos PRIMARY KEY (id_pago);
ALTER TABLE servicios_adicionales ADD CONSTRAINT pk_servicios PRIMARY KEY (id_servicio);
ALTER TABLE solicitudes_servicio ADD CONSTRAINT pk_solicitudes PRIMARY KEY (id_solicitud);
-- ============================================================
-- UNIQUE
-- ============================================================
ALTER TABLE clientes ADD CONSTRAINT uq_cliente_correo UNIQUE (correo);
ALTER TABLE clientes ADD CONSTRAINT uq_cliente_documento UNIQUE (documento);
ALTER TABLE personal ADD CONSTRAINT uq_personal_usuario UNIQUE (nombre_usuario);
ALTER TABLE personal ADD CONSTRAINT uq_personal_correo UNIQUE (correo);
ALTER TABLE habitaciones ADD CONSTRAINT uq_numero_habitacion UNIQUE (numero_habitacion);
ALTER TABLE reservas ADD CONSTRAINT uq_codigo_reserva UNIQUE (codigo_reserva);
ALTER TABLE reservas ADD CONSTRAINT uq_reserva_cliente_compuesta UNIQUE (id_reserva, id_cliente);
ALTER TABLE pagos ADD CONSTRAINT uq_pago_por_reserva UNIQUE (id_reserva);

-- ============================================================
-- FOREIGN KEY
-- ============================================================
ALTER TABLE reservas ADD CONSTRAINT fk_reserva_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente);
ALTER TABLE reservas ADD CONSTRAINT fk_reserva_habitacion FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion);
ALTER TABLE pagos ADD CONSTRAINT fk_pago_reserva FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva);
ALTER TABLE solicitudes_servicio ADD CONSTRAINT fk_solicitud_reserva_cliente FOREIGN KEY (id_reserva, id_cliente) REFERENCES reservas(id_reserva, id_cliente);
ALTER TABLE solicitudes_servicio ADD CONSTRAINT fk_solicitud_servicio FOREIGN KEY (id_servicio) REFERENCES servicios_adicionales(id_servicio);

-- ============================================================
-- CHECK
-- ============================================================
ALTER TABLE personal ADD CONSTRAINT ck_rol_personal CHECK (rol IN ('ADMINISTRADOR', 'RECEPCIONISTA'));
ALTER TABLE clientes ADD CONSTRAINT ck_sexo CHECK (sexo IN ('FEMENINO', 'MASCULINO'));
ALTER TABLE habitaciones ADD CONSTRAINT ck_estado_habitacion CHECK (estado IN ('DISPONIBLE', 'RESERVADA', 'OCUPADA', 'LIMPIEZA', 'MANTENIMIENTO'));
ALTER TABLE habitaciones ADD CONSTRAINT ck_capacidad_positiva CHECK (capacidad >= 1);
ALTER TABLE habitaciones ADD CONSTRAINT ck_precio_habitacion CHECK (precio_noche >= 0);
ALTER TABLE reservas ADD CONSTRAINT ck_estado_reserva CHECK (estado IN ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'));
ALTER TABLE reservas ADD CONSTRAINT ck_huespedes CHECK (cantidad_huespedes >= 1);
ALTER TABLE reservas ADD CONSTRAINT ck_fechas_reserva CHECK (fecha_salida > fecha_entrada);
ALTER TABLE reservas ADD CONSTRAINT ck_total_reserva CHECK (costo_total >= 0);
ALTER TABLE pagos ADD CONSTRAINT ck_estado_pago CHECK (estado IN ('PENDIENTE', 'PARCIAL', 'PAGADO', 'REEMBOLSADO'));
ALTER TABLE pagos ADD CONSTRAINT ck_metodo_pago CHECK (metodo IN ('EFECTIVO', 'TARJETA', 'TRANSFERENCIA'));
ALTER TABLE pagos ADD CONSTRAINT ck_montos_pago CHECK (monto_total >= 0 AND monto_pagado >= 0 AND saldo_pendiente >= 0 AND monto_pagado <= monto_total);
ALTER TABLE servicios_adicionales ADD CONSTRAINT ck_precio_servicio CHECK (precio >= 0);
ALTER TABLE solicitudes_servicio ADD CONSTRAINT ck_estado_solicitud CHECK (estado IN ('PENDIENTE', 'EN PROCESO', 'COMPLETADA', 'CANCELADA'));
ALTER TABLE solicitudes_servicio ADD CONSTRAINT ck_cantidad_solicitud CHECK (cantidad >= 1);
ALTER TABLE solicitudes_servicio ADD CONSTRAINT ck_precio_aplicado CHECK (precio_aplicado >= 0);

-- ============================================================
-- DEFAULT
-- ============================================================
ALTER TABLE clientes ALTER COLUMN fecha_registro SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE clientes ALTER COLUMN activo SET DEFAULT TRUE;
ALTER TABLE personal ALTER COLUMN fecha_registro SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE personal ALTER COLUMN activo SET DEFAULT TRUE;
ALTER TABLE habitaciones ALTER COLUMN estado SET DEFAULT 'DISPONIBLE';
ALTER TABLE reservas ALTER COLUMN fecha_creacion SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE reservas ALTER COLUMN estado SET DEFAULT 'PENDIENTE';
ALTER TABLE pagos ALTER COLUMN fecha_registro SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE solicitudes_servicio ALTER COLUMN fecha_solicitud SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE solicitudes_servicio ALTER COLUMN estado SET DEFAULT 'PENDIENTE';

-- Índices para consultas operativas y disponibilidad
CREATE INDEX ix_reservas_fechas ON reservas (fecha_entrada, fecha_salida);
CREATE INDEX ix_reservas_estado ON reservas (estado);
CREATE INDEX ix_habitaciones_estado ON habitaciones (estado);
