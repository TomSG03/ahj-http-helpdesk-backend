const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Tickets = require('./src/hdesk-ticket');
const Router = require('koa-router');

const app = new Koa();
const tickets = new Tickets();
const router = new Router();

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(koaBody({
  json: true, 
  text: true, 
  urlencoded: true 
}));

router.get('/ahj-hdesk/tickets', async (ctx) => {
  const { method } = ctx.request.query;
  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets.allTickets();
      break;
    case 'ticketById':
      ctx.response.body = tickets.ticketById(ctx.request.query.id);
      break;
    default:
      ctx.response.status = 404;
      break;
  }
});

router.post('/ahj-hdesk/tickets', async (ctx) => {
  ctx.response.body = ctx.request.body;
  const { method } = ctx.request.query;
  if (method === 'createTicket') {
    const { name, description } = ctx.request.body;
    tickets.createTicket(name, description);
    ctx.response.status = 204;
  }
});

router.delete('/ahj-hdesk/tickets/:id', async (ctx) => {
  const ticketId = Number(ctx.params.id);
  tickets.deleteTicket(ticketId);
  ctx.response.status = 204;
});

router.put('/ahj-hdesk/tickets/:id', async (ctx) => {
  const ticketId = Number(ctx.params.id);
  const { name, description } = ctx.request.body;
  if (!name || !description) {
    tickets.changeStatus(ticketId);
  } else {
    tickets.editTicket(ticketId, name, description);
  }
  ctx.response.status = 204;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('Server started'));