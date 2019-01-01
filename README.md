<p align="center">
  <h2 align="center">Angular Full Stack</h2>
  <p align="center">The frontend is generated with <a href="https://github.com/angular/angular-cli">Angular CLI</a>. The backend is made from scratch. Whole stack in <a href="https://www.typescriptlang.org">TypeScript</a>.</p>
  <p align="center">
    <a href="https://travis-ci.org/me-io/angular-2-starter">
      <img src="https://img.shields.io/travis/me-io/angular-2-starter/master.svg?style=flat-square" alt="Travis Status">
    </a>
    <a href="LICENSE.md">
      <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License">
    </a>
    <a href="https://david-dm.org/me-io/angular-2-starter">
      <img src="https://img.shields.io/david/me-io/angular-2-starter.svg?style=flat-square" alt="Dependencies">
    </a> 
    <a href="https://david-dm.org/me-io/angular-2-starter?type=dev">
      <img src="https://img.shields.io/david/dev/me-io/angular-2-starter.svg?style=flat-square" alt="devDependencies">
    </a> 
    <a href="https://www.paypal.me/meabed">
      <img src="https://img.shields.io/badge/paypal-donate-179BD7.svg?style=flat-squares" alt="Donate">
    </a>
  </p>
</p>

## Prerequisite

* [PHP >= 7](https://nodejs.org): runtime environment
* [MongoDB](https://www.mongodb.com): database
* [Slim API](https://github.com/me-io/slim-api): backend framework
* [Angular CLI](https://cli.angular.io): frontend scaffolding

## Uses

* [Angular 7+](https://angular.io): frontend framework
* [Bootstrap](http://www.getbootstrap.com): layout and styles
* [Font Awesome](http://fontawesome.io): icons

## Prerequisites

1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI by running the following command:
  ```bash
  npm i -g @angular/cli
  ```
3. From project root folder install all the dependencies by running the following command inside your terminal:
  ```bash
  npm install
  ```

## Run the app

### Development mode

By running the following command a window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

```bash
npm run dev
```

### Production mode

To run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) run the following command:

```bash
npm run prod
```

## Deploy to Heroku

1. Go to Heroku and create a new app
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
3. Run the following command to login to heroku:
  ```bash
  heroku login
  ```
4. Open the root directory of the project inside your terminal by running:
  ```bash
  cd my-project/
  ```
5. Inside of the project running the following command will creates a new Git repository
  ```bash
  git init
  ```
6. Update your heroku app name by running the following command: 
  ```bash
  heroku git:remote -a your-app-name
  ```
7. Download this repo and copy all files into `my-project` folder
8. Now Edit `.gitignore` and remove line with `/dist` text.
9. Edit `.env` and replace the MongoDB URI with a real remote MongoDB server. You can create a MongoDB server with Heroku or mLab.
10. Install the dependencies by running the following command:
  ```bash
  npm install
  ```
11. Now build your app by running one of the following command:
  ```bash
  ng build -prod 
  >> or 
  ng build -aot -prod
  ```
12. Run the following command
  ```bash
  tsc -p server
  ```
13. Make a new commit and push the changes to heroku by running the following commands:
  ```bash
  git add . 
  git commit -m "Going to Heroku"
  git push heroku master
  ```
14. Now following command will open with your app inside your browser:
  ```bash
  heroku open
  ```

## Running tests

Run the following command inside your terminal to execute the unit tests via [Karma](https://karma-runner.github.io/).

```bash
npm run test
```

## Contributors

A huge thanks to all of our contributors:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/45731?v=3" width="100px;"/><br /><sub><b>Mohamed Meabed</b></sub>](https://github.com/Meabed)<br />[💻](https://github.com/me-io/angular-2-starter/commits?author=Meabed "Code") [📢](#talk-Meabed "Talks") | [<img src="https://avatars2.githubusercontent.com/u/16267321?v=3" width="100px;"/><br /><sub><b>Zeeshan Ahmad</b></sub>](https://github.com/ziishaned)<br />[💻](https://github.com/me-io/angular-2-starter/commits?author=ziishaned "Code") [🐛](https://github.com/me-io/angular-2-starter/issues?q=author%3Aziishaned "Bug reports") [⚠️](https://github.com/me-io/angular-2-starter/commits?author=ziishaned "Tests") [📖](https://github.com/me-io/angular-2-starter/commits?author=ziishaned "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

The code is available under the [MIT license](LICENSE.md).
