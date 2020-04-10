# Trip Planner Application

Example Express app. Demonstrates using: Webpack, Bootstrap and SCSS

## Installation

To install dependencies:

```bash
npm i
```

## Usage

### External APIs

App using following external APIs:
- pixabay for images
- weather bit - for weather forecast if trip is scheduled for more than 1 week from today 
- geonames - translate city name to coordinates

### Required environment variables

Example **.env** file:
```bash
API_URL_PIXABAY=https://pixabay.com/api/
API_URL_GEONAMES=http://api.geonames.org
API_URL_WEATHERBIT=http://api.weatherbit.io/v2.0/forecast/daily
API_KEY_PIXABAY=####
API_KEY_WEATHERBIT=#####
API_USERNAME_GEONAMES=####
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