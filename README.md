## Running
* Install Dependencies
  - `> npm install`
* Run server
  - `> npm start`
* Run Backend Server
  - [https://github.com/norestlabs/lendroid-portal-server](https://github.com/norestlabs/lendroid-portal-server)

## Development
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
It is a react-app and requires knowledge of ReactJS.

### Design
The styling is done using Twitter Bootstrap 4.0 with the help of reactstrap library components. Please see
below for guides and help on how to use reactstrap.
* [Icons (Font Awesome)](https://fontawesome.com/icons?d=gallery&m=free)
* [Reactstrap Layout Guide](https://reactstrap.github.io/components/layout/)
* [Reactstrap Component Guide](https://reactstrap.github.io/components/alerts/)

### Routing
Adding a Router
Create React App doesn't prescribe a specific routing solution, but React Router is the most popular one.

To add it, run:
`npm install --save react-router-dom`

Alternatively you may use yarn:
`yarn add react-router-dom`

To try it, delete all the code in src/App.js and replace it with any of the examples on its website. The Basic Example is a good place to get started.

Note that you may need to configure your production server to support client-side routing before deploying your app.

## Building Project
#### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

#### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
By default, it also [includes a service worker](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

Your app is ready to be deployed.
