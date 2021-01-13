/* eslint no-param-reassign: "off" */

/**
 * Copyright 2019 Wice GmbH

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

const log = require('../logger');
// const { getEntries } = require('./../utils/helpers');
// const { getToken } = require('./../utils/authentication');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param msg - incoming message object that contains ``body`` with payload
 * @param cfg - configuration that is account information and configuration field values
 * @param snapshot - saves the current state of integration step for the future reference
 */
async function processTrigger(msg, cfg, snapshot = {}) {
  try {
    log.info('processTrigger called!');

    log.info('Received msg:', msg);
    log.info('Received cfg:', cfg);
    log.info('Received snapshot:', snapshot);

    log.info('About to emit data');

    const message = {
      metadata: {
        testMeta: 'Some Meta',
      },
      data: {
        testData: 'Some Data',
      },
    };

    log.info('Created message:', message);
    this.emit('data', message);

    log.info('Finished emitting data');

    snapshot.testSnapshot = new Date();

    log.info('About to emit snapshot:', snapshot);

    this.emit('snapshot', snapshot);

    console.log('Finished execution');
    this.emit('end');
  } catch (e) {
    log.error(e);
    log.error('About to emit error!');
    this.emit('error', e);
  }
}

module.exports = {
  process: processTrigger,
};
