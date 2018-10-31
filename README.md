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
