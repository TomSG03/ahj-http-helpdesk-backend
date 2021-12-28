const faker = require('faker');

module.exports =  class Polling {
  constructor() {
    this.unRead = {
      status: "ok",
      timestamp: faker.datatype.datetime(),
      messages: [],
    };
  }

  allUnRead() {
    this.unRead.messages = [];
    const count = this.getRandomInRange(1, 3);
    for (let i = 0; i < count; i += 1) {
      this.unRead.messages.push({
        id: faker.datatype.uuid(),
        from: faker.internet.email(),
        subject: faker.lorem.words(),
        body: faker.lorem.text(),
        received: faker.datatype.datetime(),
      })
    }
    return JSON.stringify(this.unRead);
  }

  getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
