const request = require('request')

const isoDate = (date = new Date) => date.toISOString()
const decYears = (date, numberOfYears) => new Date(date.getYear() - numberOfYears, date.getMonth())
const boundingBox = [
  47.714,
  -122.439,
  47.494,
  -122.219,
].join(',')

const uri = (startDate, endDate) => 
  `https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&stations=USW00024234&dataTypes=PRCP&boundingBox=${boundingBox}&startDate=${startDate}&endDate=${endDate}&includeAttributes=true&format=json`

module.exports.getWeather = (req, res) => {
  let endDate = new Date()
  let startDate = decYears(endDate, 10)
  let nceiURI = uri(isoDate(startDate), isoDate(endDate))

  request(nceiURI, (e, r, body) => {
    if (e) {
      res.status(r.statusCode).send(body)
    } else {
      const data = JSON.parse(body)

      console.log(nceiURI, body, data)
      
      res.send({
        format: 'date',
        initialDataSet: data.map(row => [new Date(row.DATE, 0).valueOf(), row.PRCP])
      })
    }
  })
}