#!/bin/sh

# Exit with error on failure
set -e

env=$1
DATE_TODAY=`date '+%Y-%m-%d'`
SERVICE_NAME=api-server-boilerplate

if [ "${env}" = "stage" ] || [ "${env}" = "prod" ]
then
    aws s3 cp zion.tar s3://artifactory.at.gameskraft.in/${SERVICE_NAME}/${env}/${SERVICE_NAME}-${DATE_TODAY}.tar --acl bucket-owner-full-control
    aws s3 cp zion.tar s3://artifactory.at.gameskraft.in/${SERVICE_NAME}/${env}/${SERVICE_NAME}.tar --acl bucket-owner-full-control
else
    echo "The environment specified is invalid"
fi