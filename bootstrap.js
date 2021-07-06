'use strict';

const { v4 } = require('uuid');

class Mqtt {

  constructor(app) {
    this.app = app;
    this.pid = process.pid;
  }


  async publish(topic, message, options) {
    const action = `mqtt-publish:${v4()}`;
    const data = { topic, message, options, action, pid: this.pid };
    return await this.action('mqtt-publish', data, action);
  }

  async subscribe(topic, options) {
    const action = `mqtt-subscribe:${v4()}`;
    const data = { topic, options, action, pid: this.pid };
    return await this.action('mqtt-subscribe', data, action);
  }

  async unsubscribe(topic, options) {
    const action = `mqtt-unsubscribe:${v4()}`;
    const data = { topic, options, action, pid: this.pid };
    return await this.action('mqtt-unsubscribe', data, action);
  }

  async message() {
    this.app.messenger.on('mqtt-subscribe', data => {
      return data;
    });
  }


  /**
   * 进程间通讯
   * @param {string} name
   * @param {*} data
   * @param {string} action
   */
  async action(name, data, action) {

    this.app.messenger.sendToAgent(name, data);

    // 提供回调函数
    this.app.messenger.once(action, data => {
      if (data.granted) {
        return data.granted;
      }
      return data;
    });
  }

}

module.exports = Mqtt;
