#!/bin/bash

docker run -ti \
  --env ELECTRON_CACHE="/root/.cache/electron" \
  --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
  --env GH_TOKEN \
  -v ${PWD}:/project \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder \
  bash -c 'apt-get update && apt-get install --no-install-recommends -y libopenjp2-tools && apt-get install --no-install-recommends -y rpm && npm install && npm run build:linux'
