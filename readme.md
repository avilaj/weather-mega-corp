# Weather
This project consist of two parts
- A nodejs api
- A react app

## NodeJs api
### Routes:
- /api/v1/location
- /api/v1/city/:city
- /api/v1/forecast/:city

Using axios we gather weather information and ip base location from openweathermap.org and ip-api.com. We then normalize them with the help of dotfree functions thanks to ramda.

We do e2e (happy path) test with supertest on the 3 routes.

## React app
We used an isomorphic architecture with the help of nextjs for this case.
Redux was not contemplated as it didn't fit the use case for it.
- first time is server side rendered
- client side app after first rendered
- Loading indicator

We used snapshots testing for presentational components.