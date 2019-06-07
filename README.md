# Frontend Starter

### Uses

- [Angular](https://angular.io/)
- [IBM App ID](https://www.ibm.com/cloud/app-id)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [SCSS](https://sass-lang.com/)
- [Karma](https://karma-runner.github.io)
- [Jasmine](https://jasmine.github.io/)
- [Protractor](https://www.protractortest.org/#/)
- [Puppeteer](https://pptr.dev/)

### Prepare

Environment variables

1. Navigate to `server/` folder
1. Create a copy of `.env.example`
1. Rename it to `.env`
1. Replace values with yours

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

```
npm test
```

run with watcher

```
npm run tdd
```

### CI/CD pipeline

- Build pipeline:

  - use custom dockerimage: `node:10`
  - with script:

  ```
  npm install
  ```

- Test pipeline:

  - use custom dockerimage: `node:10`
  - with script:

  ```
  apt-get update
  apt-get install -y gconf-service libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxss1 libxtst6 libappindicator1 libnss3 libasound2 libatk1.0-0 libc6 ca-certificates fonts-liberation lsb-release xdg-utils wget
  npm test
  ```

- Deploy pipeline:

  - as first job - add "Build" job

    - use custom dockerimage: `node:10`
    - with script:

    ```
    nom run build
    ```

    - *Set env varibale `NG_ENV` to be `production`*

  - as second job - use "Rolling Deploy"
    - with script:
    ```
    cf push $CF_APP
    export CF_APP_NAME="$CF_APP"
    export APP_URL=http://$(cf app $CF_APP_NAME | grep -e urls: -e routes: | awk '{print $2}')
    ```

- Don't forget to add runtime environment variables afterwards to the cloud foundry app

### Run in production

_Make sure .env is created_

Before running in production you'll have to build the app by running

```
npm run build
```

and then run the app:

```
npm start
```

### Docker

To build image run:

```
bash build.sh
```

To run image:

```
bash run.sh
```

### Kubernetes

Run:

```
ibmcloud ks cluster-config <cluster name>
```

Copy result, paste and hit enter

##### Build image

Build:

```
// docker build --tag registry.<region>.bluemix.net/<my_namespace>/<repo_name>:<tag> .
docker build --tag registry.eu-de.bluemix.net/<my_namespace>/frontend-starter:1 .
```

Verify image is built:

```
docker images
```

Ensure you're logged in before pushing

```
bx cr login
```

Push to the registry:

```
docker push registry.eu-de.bluemix.net/<namespace>/frontend-starter:1
```

Verify that the image was pushed successfully by running the following command.

```
ibmcloud cr image-list
```

Start by running your image as a deployment

```
kubectl run frontend-deployment --image=registry.eu-de.bluemix.net/<namespace>/frontend-starter:1
```

Expose

```
kubectl expose deployment/frontend-deployment --type=NodePort --port=3000 --name=frontend-service --target-port=3000
```

To find the port used on that worker node, examine your new service:

```
kubectl describe service frontend-service
```

Take note of the "NodePort:" line as <nodeport>

Run `bx cs workers <name-of-cluster>`, and note the public IP as <public-IP>.

### Licence

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)
