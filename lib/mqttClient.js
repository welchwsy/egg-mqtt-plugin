'use strict';

const mqtt = require('async-mqtt');

module.exports = config => {
  const mqttClient = mqtt.connect(config.host, {
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    clientId: config.clientId,
    ...config.options,
  });
  return mqttClient;
};
