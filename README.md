# Frontend Starter

### Uses
* [Angular](https://angular.io/)
* [IBM App ID](https://www.ibm.com/cloud/app-id)
* [Typescript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/)
* [SCSS](https://sass-lang.com/)
* [Karma](https://karma-runner.github.io)
* [Jasmine](https://jasmine.github.io/)
* [Protractor](https://www.protractortest.org/#/)

### Prepare

Environment variables

* Navigate to `server/` folder
* Create a copy of `.env.example`
* Rename it to `.env`
* Replace values with yours

Install dependencies

```
npm i
```

### Develop locally

To start serving on https://localhost:4200 run:
```
npm run serve
```

### Tests

Run tests

run with watcher
```
npm run test
```

### Run in production

*Make sure .env is created*

Before running in production you'll have to build the app by running

```
npm run build
```

and then run the app:

```
npm start
```
