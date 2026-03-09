-- CreateEnum
CREATE TYPE "generos" AS ENUM ('M', 'F', 'Otro');

-- CreateTable
CREATE TABLE "rol" (
    "id_rol" INTEGER NOT NULL,
    "nombre_rol" VARCHAR(50) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_user" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "fk_rol" INTEGER NOT NULL,
    "fecha_registro" DATE NOT NULL,
    "refresh_token" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "edad" INTEGER NOT NULL,
    "genero" "generos" NOT NULL,
    "eps" VARCHAR(50) NOT NULL,
    "fecha_ingreso" DATE NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "pqr_quejas" (
    "id_pqr" SERIAL NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(20) NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "pqr_quejas_pkey" PRIMARY KEY ("id_pqr")
);

-- CreateTable
CREATE TABLE "citas_medicas" (
    "id_cita" SERIAL NOT NULL,
    "especialidad" VARCHAR(50) NOT NULL,
    "estado_cita" VARCHAR(20) NOT NULL,
    "fecha" DATE NOT NULL,
    "id_paciente" INTEGER NOT NULL,

    CONSTRAINT "citas_medicas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "medicamentos" (
    "id_med" SERIAL NOT NULL,
    "nombre_med" VARCHAR(100) NOT NULL,
    "stock_actual" INTEGER NOT NULL,
    "stock_minimo" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "medicamentos_pkey" PRIMARY KEY ("id_med")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id_medico" SERIAL NOT NULL,
    "nombre_medico" VARCHAR(100) NOT NULL,
    "especialidad" VARCHAR(50) NOT NULL,
    "turno" VARCHAR(20) NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id_facura" SERIAL NOT NULL,
    "metodo_pago" VARCHAR(50) NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fecha_pago" DATE NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id_facura")
);

-- CreateTable
CREATE TABLE "laboratorio" (
    "id_lab" SERIAL NOT NULL,
    "tipo_examen" VARCHAR(50) NOT NULL,
    "resultado" VARCHAR(20) NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "laboratorio_pkey" PRIMARY KEY ("id_lab")
);

-- CreateTable
CREATE TABLE "camas_hosp" (
    "id_cama" SERIAL NOT NULL,
    "piso" INTEGER NOT NULL,
    "estado_cama" VARCHAR(20) NOT NULL,

    CONSTRAINT "camas_hosp_pkey" PRIMARY KEY ("id_cama")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id_prov" SERIAL NOT NULL,
    "nombre_empresa" VARCHAR(100) NOT NULL,
    "monto_deuda" DECIMAL(10,2) NOT NULL,
    "calificacion" INTEGER NOT NULL,

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id_prov")
);

-- CreateTable
CREATE TABLE "ambulancias" (
    "id_amb" SERIAL NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "km_recorrido" INTEGER NOT NULL,
    "estado_mecanico" VARCHAR(20) NOT NULL,

    CONSTRAINT "ambulancias_pkey" PRIMARY KEY ("id_amb")
);

-- CreateTable
CREATE TABLE "insumos_aseo" (
    "id_aseo" SERIAL NOT NULL,
    "articulo" VARCHAR(50) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "area_uso" VARCHAR(50) NOT NULL,

    CONSTRAINT "insumos_aseo_pkey" PRIMARY KEY ("id_aseo")
);

-- CreateTable
CREATE TABLE "historias_clin" (
    "id_hist" SERIAL NOT NULL,
    "enfermedad" VARCHAR(100) NOT NULL,
    "alergias" VARCHAR(100) NOT NULL,
    "id_paciente" INTEGER NOT NULL,

    CONSTRAINT "historias_clin_pkey" PRIMARY KEY ("id_hist")
);

-- CreateTable
CREATE TABLE "recetas_med" (
    "id_receta" SERIAL NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "cantidad_med" INTEGER NOT NULL,
    "fecha_receta" DATE NOT NULL,

    CONSTRAINT "recetas_med_pkey" PRIMARY KEY ("id_receta")
);

-- CreateTable
CREATE TABLE "nomina_pers" (
    "id_nom" SERIAL NOT NULL,
    "cargo" VARCHAR(50) NOT NULL,
    "sueldo" DECIMAL(10,2) NOT NULL,
    "faltas" INTEGER NOT NULL,

    CONSTRAINT "nomina_pers_pkey" PRIMARY KEY ("id_nom")
);

-- CreateTable
CREATE TABLE "emergencias" (
    "id_em" SERIAL NOT NULL,
    "triaje" INTEGER NOT NULL,
    "tiempo_espera_min" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "emergencias_pkey" PRIMARY KEY ("id_em")
);

-- CreateTable
CREATE TABLE "equipos_med" (
    "id_equipo" SERIAL NOT NULL,
    "nombre_equipo" VARCHAR(100) NOT NULL,
    "estado_uso" VARCHAR(20) NOT NULL,
    "dias_para_mantenimiento" INTEGER NOT NULL,

    CONSTRAINT "equipos_med_pkey" PRIMARY KEY ("id_equipo")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_fk_rol_fkey" FOREIGN KEY ("fk_rol") REFERENCES "rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pqr_quejas" ADD CONSTRAINT "pqr_quejas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas_medicas" ADD CONSTRAINT "citas_medicas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias_clin" ADD CONSTRAINT "historias_clin_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recetas_med" ADD CONSTRAINT "recetas_med_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE RESTRICT ON UPDATE CASCADE;
