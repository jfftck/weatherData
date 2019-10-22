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
    seattlePrecip: {
      name: 'Seattle precipitation',
      description: 'Past ten years Seattle precipitation'
    },
    seattleAvgTemp: {
      name: 'Seattle average temperature',
      description: 'Past ten years Seattle average temperature'
    },
    seattleMaxTemp: {
      name: 'Seattle maximum temperature',
      description: 'Past ten years Seattle maximum temperature'
    },
    seattleMinTemp: {
      name: 'Seattle minimum temperature',
      description: 'Past ten years Seattle minimum temperature'
    }
  }
}))

/**
 * Seattle precipitaion from weather data service provider.
 */
app.get('/api/seattlePrecip', ncei.getPrecip)

/**
 * Seattle average temperature from weather data service provider.
 */
app.get('/api/seattleAvgTemp', ncei.getAveTemp)

/**
 * Seattle average temperature from weather data service provider.
 */
app.get('/api/seattleMaxTemp', ncei.getMaxTemp)

/**
 * Seattle average temperature from weather data service provider.
 */
app.get('/api/seattleMinTemp', ncei.getMinTemp)


app.listen(3050, () => console.log('Listening on port 3050!'))