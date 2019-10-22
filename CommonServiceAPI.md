# Common Microservice API

## Server Info
> `GET /`

Returns

* `server` `<Object>`
    * `name` `<string>`
    * `apiVersion` `<string>`
* `availableDataSeries` `<Object>`
    * `seriesName` `<Object>`
        * `name` `<string>`
        * `description` `<string>`

The root URL returns information on the microservice that can be used for future queries. `apiVersion` should be set to `0.2`


## Time Series Resources
> `GET /api/:seriesName`

Returns

* `format` `<string>`
* `initialDataSet` `[][]` - Array of tuples
    * `tuple[0]` `<number>` - epoch time of data
    * `tuple[1]` `<number>` - data value

Provides the time series data. `format` should be always set to `'date'`.
