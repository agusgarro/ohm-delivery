const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})()

async function getOhmById(id) {
  const ohm = await findOhmById(id)
  return ohm.value();
}

async function getOhmByTrackingId (trackingId) {
  const _db = await db;
  const ohm = _db.get('ohms')
      .find({ trackingId })
      .value()

  return ohm;
}

async function updateOhm(trackingId, ohmInfo) {
  const _db = await db;
  const ohm = _db.get('ohms')
    .find({ trackingId })
    .assign({ ...ohmInfo })
    .value()

  await _db.write()
  return ohm

}
  /*ohm delivery assignment, create a constant with the different statuses 
  to be able to call them in next function.
  */

let STATUS_CHANGE = {
  CREATED: 'PREPARING',
  PREPARING: 'READY',
  READY: 'IN_DELIVERY',
  IN_DELIVERY: ['DELIVERED', 'REFUSED']
}

//to change the state of the status for the immediate next one, except in_delivery: 

function letStatusChange (oldStatus, newStatus) {
  if (!STATUS_CHANGE[oldStatus] || !newStatus) {
      return false
    }
  
    if (typeof STATUS_CHANGE[oldStatus] == 'string' && STATUS_CHANGE[oldStatus] != newStatus) {
      return false
    }
  
    if (typeof STATUS_CHANGE[oldStatus] == 'object' && STATUS_CHANGE[oldStatus].includes(newStatus)) {
        console.log(STATUS_CHANGE);
      return false
    }
  
    return true
   
  }
  
module.exports = { getOhmById , getOhmByTrackingId , updateOhm, letStatusChange}