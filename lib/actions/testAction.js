const uuid = require('uuid');

/* eslint consistent-return: "off" */
/* eslint max-len: 'off' */

/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* eslint no-invalid-this: 0 no-console: 0 */

const log = require('../logger');

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 */
async function processAction(msg, cfg) {
  try {
    log.info('processAction called with msg:', msg);

    // keep raw data by sending it to rds (raw data storage) before transforming it
    if (cfg.nodeSettings && cfg.nodeSettings.storeRawRecord) {
      // generate unique id (should be stored and sent to data hub)
      const rawRecordId = uuid.v4();

      this.emit('raw-record', {
        rawRecordId,
        payload: msg.data,
      });
    }

    this.emit('data', msg);
  } catch (e) {
    log.error(`ERROR: ${JSON.stringify(e, undefined, 2)}`);
    throw new Error(e);
  }
}

module.exports.process = processAction;
