#!/bin/bash

docker build -t user-crud:v1 .
docker tag user-crud:v1 jovizulfikar/user-crud:v1
docker login
docker push jovizulfikar/user-crud:v1