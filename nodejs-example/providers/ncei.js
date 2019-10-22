const request = require('request')

const getDate = (startDate = Date.now()) => startDate.toISOString()
const decDay = (date, numberOfDays) => new Date(date.getDate() - numberOfDays)
const incDay = (date, numberOfDays) => new Date(date.getDate() + numberOfDays)
const validPastDate = date => Date.now() > date

const encodeDate = date => getDate(date).replace('+', '%2B')

const url = (startDate, endDate) => `https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&dataTypes=DP01,DP05,DP10,DSND,DSNW,DT00,DT32,DX32,DX70,DX90,SNOW,PRCP&stations=ASN00084027&startDate=${startDate}&endDate=${endDate}&includeAttributes=true&format=json`

module.exports.getWeather = (req, res) => {
  let endDate
  let startDate

  if ('endDate' in req.params) {
    endDate = new Date(req.params.endDate)

    if (!validPastDate(endDate)) {
      endDate = undefined;
    }
  } else if ('startDate' in req.params) {
    startDate = new Date(req.params.startDate)

    if (!validPastDate(startDate)) {
      startDate = undefined;
    }
  }

  if (endDate === undefined && startDate === undefined) {
    endDate = Date.now()
    startDate = decDay(endDate, 365 * 10)
  } else {
    endDate = incDay(startDate, 365 *10)

    if (!validPastDate(endDate)) {
      endDate = Date.now()
    }
  }


  request(url(encodeDate(getDate(startDate)), encodeDate(getDate(endDate))), (e, r, body) => {
    if (e) {
      res.status(r.statusCode).send(body)
    } else {
      const data = JSON.parse(body)
      
      res.send({
        format: 'date',
        initialDataSet: data.map(row => [new Date(row.DATE, 0), row.PRCP])
      })
    }
  })
}