module.exports =  class Tickets {
  constructor() {
    this.tickets = [];
    this.id = 1;

    this.init();
  }

  allTickets() {
    return this.tickets.map(({
      id, name, status, created,
    }) => ({
      id, name, status, created,
    }));
  }

  ticketById(id) {
    return this.tickets.find((ticket) => ticket.id === +id);
  }

  createTicket(name, description) {
    this.tickets.push(
      {
        id: this.id,
        name,
        description,
        status: 0,
        created: new Date(),
      },
    );
    this.id += 1;
  }

  deleteTicket(id) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);
    this.tickets.splice(ticketIndex, 1);
  }

  changeStatus(id) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    ticket.status = !ticket.status;
  }

  editTicket(id, name, description) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    ticket.name = name;
    ticket.description = description;
  }


  init() {
    const example = [
      {
        id: 0,
        name: 'Поменять краску в принтере',
        description: 'Кабинет 404. Справа за углом',
        status: false,
        created: '2012-11-13T01:18:10.592Z',
      },
      {
        id: 0,
        name: 'Переустановить Windows',
        description: 'Была замена диска.',
        status: true,
        created: '2020-12-25T10:15:30.592Z',
      },
      {
        id: 0,
        name: 'Установить обновление',
        description: 'Или удалить. Не печатает принтер',
        status: false,
        created: '2021-12-30T12:10:00.592Z',
      },
    ]

    for (let i = 0; i < example.length; i += 1) {
      // example[i].created = new Date();
      example[i].id = this.id;
      this.tickets.push(example[i]);
      this.id += 1;
    }
  }
}