# Trip Planner Application

Example Express app. Demonstrates using: Webpack, Bootstrap and SCSS

## Installation

To install dependencies:

```bash
npm i
```

## Usage

### Required environment variables

Example **.env** file:
```bash

API_URL_PIXABAY=https://pixabay.com/api/
API_URL_WEATHERBIT=http://api.weatherbit.io/v2.0/forecast/daily
API_URL_OPEN_WEATHER=http://api.openweathermap.org/data/2.5/weather
API_URL_GEONAMES=http://api.geonames.org
API_USERNAME_GEONAMES=###
API_KEY_PIXABAY=###
API_KEY_OPEN_WEATHER=###
API_KEY_WEATHERBIT=###
```

### Preparing Webpack bundle:

For production use:
```bash
npm run build-prod
```

For dev use:
```bash
npm run build-dev
```

### Running server

For production use:
```bash
npm start
```

For dev use:
```bash
npm run dev-server
```
## API

#### GET /
Serves UI
#### GET /trip
Get all trips 
#### POST /trip
Create trip. Example request body:
```bash
{
  "date":"1/5/2020", 
  "destination":"Bangkok"
}
```

#### DELETE /trip/:ID
Remove trip by ID

## Author
**Damian Pagowski**


## License
[MIT](https://choosealicense.com/licenses/mit/)