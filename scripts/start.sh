#!/bin/bash

pm2 delete all;
pm2 start -i 0 /opt/gameskraft/api-server-boilerplate/build/index.js --name "api-server-boilerplate" --output /dev/null
