#!/bin/bash

docker buildx build --platform linux/amd64,linux/arm64 -t jovizulfikar/user-crud:v1 --push .