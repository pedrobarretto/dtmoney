import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela de Sistema',
          type: 'deposit',
          category: 'Dev',
          amount: 3400,
          createdDate: new Date('2021-04-14 09:00:00')
        },
        {
          id: 2,
          title: 'Conta de Luz',
          type: 'withdraw',
          category: 'Casa',
          amount: 200,
          createdDate: new Date('2021-04-10 12:30:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
