const location = require("../../location/locations");
const coordinacion = require("../area/coordinacion");
const gerencia = require("../area/gerencia");
const vicepresidencia = require("../area/vicepresidencia");
const vicepresidenciaEjecutiva = require("../area/vicepresidenciaEjecutiva");
const cargos = require("../cargo/cargos");

const employee = [
    {
        id: '8c9b3ea7-8e31-4c0c-8614-6ed2f026f379',
        userName: "BNC\amaneiro",
        name: 'Andres',
        lastName: 'Maneiro',
        cedula: 18647881,
        locationId: location.filter(location => location.name === 'Torre BNC Piso 2')[0].id,
        email: 'anmaneiro@bnc.com.ve',
        cargoId: cargos.filter(cargo => cargo.name === 'Especialista Senior')[0].id,
        extension: '7348',
        phoneNumber: '04146627870',
        vicepresidenciaEjecutivaId: vicepresidenciaEjecutiva.filter(vicepresidenciaEjecutiva => vicepresidenciaEjecutiva.name === 'Vicepresidencia Ejecutiva')[0].id,
        vicepresidenciaId: vicepresidencia.filter(vicepresidencia => vicepresidencia.name === 'Vicepresidencia ')[0].id,
        gerenciaId: gerencia.filter(gerencia => gerencia.name === 'Gerencia')[0].id,
        coordinacionId: coordinacion.filter(coordinacion => coordinacion.name === 'Coordinacion')[0].id
    }
]

console.log(employee)

module.exports = employee