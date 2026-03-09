// File for entering "seed" data in PostgresQL with the Prisma ORM
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    console.log('---Limpiando Base de Datos---');

    //We declare from the last table to the first to avoid problems with foreign keys
    const tables = [
        'equipos_med', 'emergencias', 'nomina_pers', 'recetas_med',
        'historias_clin', 'insumos_aseo', 'ambulancias', 'proveedores',
        'camas_hosp', 'laboratorio', 'facturas', 'medicos', 'medicamentos',
        'citas_medicas', 'pqr_quejas', 'pacientes', 'usuarios', 'rol'
    ]

    //We use for and not forEach because forEach doesn't work correctly with asynchronicity, while for does.
    for (const table of tables) {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`); //We execute SQL pure, because when you start container 2 o more times, the seed fail
    }

    //Create rols
    console.log('---Creando roles---');

    await prisma.rol.createMany({
        data: [
            { id_rol: 1, nombre_rol: 'administrador' },
            { id_rol: 2, nombre_rol: 'operativo' }
        ]
    });

    //Create users
    console.log('---Creando usuarios---');

    //All passwords are 12345
    await prisma.usuarios.createMany({
        data: [
            { nombre_completo: 'Ana Garcia', username: 'admin_ana', password: '12345', fk_rol: 1, fecha_registro: new Date('2024-01-10') },
            { nombre_completo: 'Luis Perez', username: 'oper_luis', password: '12345', fk_rol: 2, fecha_registro: new Date('2024-01-15') },
            { nombre_completo: 'Maria Lopez', username: 'admin_maria', password: '12345', fk_rol: 1, fecha_registro: new Date('2024-02-01') }
        ]
    });

    //Create patients
    console.log('---Creando pacientes---');

    await prisma.pacientes.createMany({
        data: [
            { nombre: 'Juanito Alimaña', edad: 5, genero: 'M', eps: 'Sura', fecha_ingreso: new Date('2024-03-01') },
            { nombre: 'Pepa Pig', edad: 25, genero: 'F', eps: 'Coomeva', fecha_ingreso: new Date('2024-03-02') },
            { nombre: 'Pedro Picapiedra', edad: 45, genero: 'M', eps: 'Sura', fecha_ingreso: new Date('2024-03-02') },
        ]
    });

    //Create pqrs
    console.log('---Creando PQRS---');
    await prisma.pqr_quejas.createMany({
        data: [
            { tipo: 'Queja', estado: 'Pendiente', id_paciente: 1, fecha: new Date('2024-03-05') },
            { tipo: 'Sugerencia', estado: 'Resuelto', id_paciente: 2, fecha: new Date('2024-03-06') },
        ]
    });

    //Create medical appointments
    console.log('---Creando citas medicas---');
    await prisma.citas_medicas.createMany({
        data: [
            { especialidad: 'Pediatría', estado_cita: 'Cumplida', fecha: new Date('2024-03-10'), id_paciente: 1 },
            { especialidad: 'Odontología', estado_cita: 'cancelada', fecha: new Date('2024-03-11'), id_paciente: 2 },
        ]
    });

    //Create medications
    console.log('---Creando medicamentos---');
    await prisma.medicamentos.createMany({
        data: [
            { nombre_med: 'Acetaminofen Jarabe', stock_actual: 50, stock_minimo: 100, precio: 15000.00 },
            { nombre_med: 'Ibuprofeno 500mg', stock_actual: 200, stock_minimo: 50, precio: 800.00 },
        ]
    });

    //Create doctors
    console.log('---Creando medicos---');
    await prisma.medicos.createMany({
        data: [
            { nombre_medico: 'Dr. House', especialidad: 'Diagnóstico', turno: 'Noche' },
            { nombre_medico: 'Dra. Polo', especialidad: 'Pediatría', turno: 'Mañana' },
        ]
    });

    //Create invoises
    console.log('---Creando facturas---');
    await prisma.facturas.createMany({
        data: [
            { metodo_pago: 'Efectivo', monto: 50000.00, fecha_pago: new Date('2024-03-01') },
            { metodo_pago: 'Tarjeta', monto: 120000.00, fecha_pago: new Date('2024-03-02') },
        ]
    });

    //Create laboratory
    console.log('---Creando laboratorios---');
    await prisma.laboratorio.createMany({
        data: [
            { tipo_examen: 'Sangre', resultado: 'Normal', fecha: new Date('2024-03-05') },
            { tipo_examen: 'Orina', resultado: 'Alterado', fecha: new Date('2024-03-06') },
        ]
    });

    //Create hospital beds
    console.log('---Creando camas del hospital---');
    await prisma.camas_hosp.createMany({
        data: [
            { piso: 1, estado_cama: 'Ocupada' },
            { piso: 2, estado_cama: 'Libre' },
        ]
    });

    //Create suppliers
    console.log('---Creando proveedores---');
    await prisma.proveedores.createMany({
        data: [
            { nombre_empresa: 'Meditech SA', monto_deuda: 5000000, calificacion: 5 },
            { nombre_empresa: 'Farmasur', monto_deuda: 200000, calificacion: 3 },
        ]
    });

    //Create ambulance
    console.log('---Creando ambulancias---');
    await prisma.ambulancias.createMany({
        data: [
            { placa: 'XYZ-123', km_recorrido: 15000, estado_mecanico: 'Bueno' },
            { placa: 'ABC-789', km_recorrido: 45000, estado_mecanico: 'Dañado' },
        ]
    });

    //Create cleaning supplies
    console.log('---Creando Insumos de Aseo---');
    await prisma.insumos_aseo.createMany({
        data: [
            { articulo: 'Jabon Quirúrgico', cantidad: 20, area_uso: 'Urgencias' },
            { articulo: 'Cloro', cantidad: 5, area_uso: 'Pisos' },
        ]
    });

    //Create clinical history
    console.log('---Creando historias clinicas---');
    await prisma.historias_clin.createMany({
        data: [
            { enfermedad: 'Gripa Aviar', alergias: 'Polvo', id_paciente: 1 },
            { enfermedad: 'Gastritis', alergias: 'Ninguna', id_paciente: 2 },
        ]
    });

    //Create medical recipies
    console.log('---Creando recetas medicas---');
    await prisma.recetas_med.createMany({
        data: [
            { id_medico: 1, cantidad_med: 3, fecha_receta: new Date('2024-03-08') },
            { id_medico: 2, cantidad_med: 1, fecha_receta: new Date('2024-03-09') },
        ]
    });

    //Crate payroll
    console.log('---Creando nominas de personal---');
    await prisma.nomina_pers.createMany({
        data: [
            { cargo: 'Enfermera', sueldo: 2500000, faltas: 0 },
            { cargo: 'Secretaria', sueldo: 1300000, faltas: 2 },
        ]
    });

    //Create emergencies
    console.log('---Creando emergencias---');
    await prisma.emergencias.createMany({
        data: [
            { triaje: 1, tiempo_espera_min: 5, fecha: new Date('2024-03-10') },
            { triaje: 4, tiempo_espera_min: 120, fecha: new Date('2024-03-10') },
        ]
    });

    //Create medical equipment
    console.log('---Creando equipamiento medico---');
    await prisma.equipos_med.createMany({
        data: [
            { nombre_equipo: 'Resonador Magnético', estado_uso: 'En Uso', dias_para_mantenimiento: 5 },
            { nombre_equipo: 'Monitor Signos', estado_uso: 'Disponible', dias_para_mantenimiento: 30 },
        ]
    });

    console.log('---¡Seed "Sembrada" con exito!---');
};

main() //execute the main function with data seed
    .catch((e) => {
        console.error(`Ha ocurrido un error con la semilla: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
