# The Google App Engine Flexible Environment base Docker image can
# also be used on Google Container Engine, or any other Docker host.
# This image is based on Debian Jessie and includes nodejs and npm
# installed from nodejs.org. The source is located in
# https://github.com/GoogleCloudPlatform/nodejs-docker
#FROM gcr.io/google_appengine/nodejs

#FROM gcr.io/google-appengine/nodejs:latest
FROM node:8 as builder
MAINTAINER Santanu Mitra <santamit@in.ibm.com>


# We label our stage as 'builder'

RUN mkdir -p /ng-app
ADD . /ng-app/
WORKDIR /ng-app/
COPY package*.json /ng-app/
RUN cd /ng-app
#RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm install npm@latest -g
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install
#&& cp -R ./node_modules ./ng-app

RUN npm install -g @angular/cli
RUN npm link @angular/cli
#COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN ng build --prod
#RUN ng build --prod

### STAGE 2: Setup ###
#FROM node:8


## Copy our default nginx config
#COPY default.conf /etc/nginx/conf.d/
#COPY proxy.conf.json /etc/nginx/conf.d/

## Remove default nginx website
#RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
#COPY --from=builder /ng-app/dist /usr/share/nginx/html
#COPY --from=builder /package*.json ./ng-app/
#COPY --from=builder ./ng-app ./
#COPY /ng-app/dist /usr/share/nginx/html

#command: /control-panel/node_modules/.bin/ng serve --host 0.0.0.0
#RUN $(npm bin)/ng serve --proxy-config proxy.conf.json --host 0.0.0.0 --port 4600
#"start": "ng serve --proxy-config proxy.conf.json --host 0.0.0.0 --port 4600",
CMD ["npm","start"]
#CMD ["nginx", "-g", "daemon off;"]
EXPOSE 4600
