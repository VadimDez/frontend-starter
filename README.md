# Frontend Starter

### Uses
* [Angular](https://angular.io/)
* [IBM App ID](https://www.ibm.com/cloud/app-id)
* Typescript
* Express
* SCSS
* Karma
* Jasmine
* Protractor

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

### Kubernetes
Run:

```
ibmcloud ks cluster-config <cluster name>
```

Copy result, paste and hit enter


##### Build image

Build:
```
docker-compose build
```

Verify image is built:
```
docker images
```

tag the image:
```
docker tag backend-starter_web:latest registry.eu-de.bluemix.net/pr_firm/backend-starter_web:1
```

Ensure you're logged in before pushing
```
bx cr login
```

Push to the registry:
```
docker push registry.eu-de.bluemix.net/<namespace>/backend-starter_web:1
```

```
kubectl run backend-deployment --image=registry.eu-de.bluemix.net/pr_firm/backend-starter_web:1
```

Expose
```
kubectl expose deployment/backend-deployment --type=NodePort --port=80 --name=backend-service --target-port=80
```
