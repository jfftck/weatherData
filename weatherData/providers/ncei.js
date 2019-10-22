const request = require('request')

const isoDate = (date = new Date) => date.toISOString()
const decYears = (date, numberOfYears) => new Date(date.getFullYear() - numberOfYears, date.getMonth(), date.getDay())
const boundingBox = [
  47.714,
  -122.439,
  47.494,
  -122.219,
].join(',')

const uri = (dataType, startDate, endDate) => 
  `https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&stations=USW00024234&dataTypes=${dataType}&boundingBox=${boundingBox}&startDate=${startDate}&endDate=${endDate}&includeAttributes=true&format=json`

const getWeather = (dataType, res) => {
  let endDate = new Date(new Date().getFullYear() - 1, 11, 31)
  let startDate = decYears(endDate, 10)
  let nceiURI = uri(dataType, isoDate(startDate), isoDate(endDate))

  request(nceiURI, (e, r, body) => {
    if (e) {
      res.status(r.statusCode).send(body)
    } else {
      const data = JSON.parse(body)
      
      res.send({
        format: 'date',
        initialDataSet: data.map(row => [new Date(row.DATE, 0).valueOf(), parseFloat(row[dataType])])
      })
    }
  })
}

module.exports.getPrecip = (req, res) => getWeather('PRCP', res)
module.exports.getAveTemp = (req, res) => getWeather('TAVG', res)
module.exports.getMaxTemp = (req, res) => getWeather('TMAX', res)
module.exports.getMinTemp = (req, res) => getWeather('TMIN', res)
