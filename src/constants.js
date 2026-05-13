/**
 * @typedef {Object} Band
 * @property {string} id
 * @property {string} name
 * @property {string} city
 * @property {string} style
 * @property {string} bio
 * @property {string} imageUrl
 * @property {Object} stats
 * @property {number} stats.power
 * @property {number} stats.attitude
 * @property {number} stats.sound
 */

/**
 * @typedef {Object} Vote
 * @property {string} id
 * @property {string} bandId
 * @property {string} voterId
 * @property {any} timestamp - Firebase Timestamp
 */

/**
 * @typedef {Object} GlobalSettings
 * @property {boolean} isVotingOpen
 * @property {string} eventTitle
 */

export const OperationType = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
});
