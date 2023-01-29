function connectionString() {
    return 'data source=localhost;database=mappers;user id=projectmappers;password=kecske123;trustServerCertificate=true'
}

function selectAll() {
    return `SELECT blips.blipid, blips.x As 'x', blips.y As 'y', blips.blip_desc_id, blip_types.type_name, blip_types.path_to_img 
    FROM blips INNER JOIN blip_types ON blips.blip_type = blip_types.typeid`
}

function selectAllTypes() {
    return `SELECT * FROM blip_types`
}

function selectAllDetails() {
    return `SELECT * FROM blip_details` 
}

function insertIntoDetails(title, desc) {
    return `INSERT INTO blip_details (title, details_desc) VALUES ('${title}', '${desc}');`
}

function lastCreatedDetailID() {
    return `SELECT @@IDENTITY As 'id';`
}

function insertIntoBlips(x, y, type, id) {
    return `INSERT INTO blips (x, y, blip_type, blip_desc_id, district_id) VALUES (${x}, ${y}, ${type}, ${id}, 0)`
}

function deleteBlip(blipid) {
    return `DELETE FROM blips WHERE blipid = ${blipid}`
}

function selectOneBlip(blipid) {
    `SELECT * FROM blips WHERE blipid = ${blipid}`
}

function selectOneDetails(blip_desc_id) {
    return `SELECT * FROM blip_details WHERE detailsid = ${blip_desc_id}`
}

function updateBlipType(blipType, blipid) {
    return `UPDATE blips SET blip_type = ${blipType} WHERE blipid = ${blipid}`
}

function updateBlipDetails(title, desc, detailsid) {
    return `UPDATE blip_details SET title = '${title}', details_desc = '${desc}', WHERE detailsid = ${detailsid}`
}

module.exports = {
    connectionString,
    selectAll,
    selectAllDetails,
    selectAllTypes,
    insertIntoDetails,
    lastCreatedDetailID,
    insertIntoBlips,
    deleteBlip,
    selectOneBlip,
    selectOneDetails,
    updateBlipType,
    updateBlipDetails
}