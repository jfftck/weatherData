const express = require('express')
const app = express()
const ncei = require('./providers/ncei')

/**
 * Return basic server info and available data.
 */
app.get('/', (req, res) => res.send({
  server: {
    name: 'API Starter Server',
    apiVersion: '0.2'
  },
  availableDataSeries: {
    globalPrecip: {
      name: 'Global precipitation',
      description: 'Past ten years global precipitation'
    },
    flatData: {
      name: 'Flat data values',
      description: 'Just the number 5'
    }
  }
}))

/**
 * Weather data service provider.
 */
app.get('/api/globalPrecip', ncei.getWeather)

/**
 * Hard code some flat data to simply give variety.
 */
app.get('/api/flatData', (req, res) => res.send({
  format: 'date',
  initialDataSet: [
    [Date.now(), 5],
    [Date.now() + 10, 5],
    [Date.now() + 20, 5],
    [Date.now() + 30, 5],
    [Date.now() + 40, 5],
  ]
}))

app.listen(3050, () => console.log('Listening on port 3050!'))