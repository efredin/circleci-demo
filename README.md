This is a contrived demo application for the purposes of a live demo on CircleCI.

# Running Locally
## Environment setup
Install & run mongo via docker
```sh
docker pull mongo
docker run -d -p 27017:27017 -v ~/data:/data/db mongo
```

## Starting the App
```sh
yarn # install dependencies
yarn start
```
