#!/bin/bash

SERVICE_NAME=api-server-boilerplate
echo "-----------------------------------------"
DATE_YEST=`date -d "1 day ago" '+%Y-%m-%d'`
DATE_TODAY=`date '+%Y-%m-%d'`
CURRENT_HOUR=`date +"%H"`
SERVICE_DIR=/opt/gameskraft/$SERVICE_NAME/
HOSTNAME=`hostname`
cd $SERVICE_DIR;

# Invoke Shutdown API if needed
# If any shutdown API need to be Triggered on the Server

# Upload Current day logs
i=$CURRENT_HOUR
while [ $i -gt -1 ]
do
    CURR_HOUR=`date -d "${i} hour ago" +"%H"`
    echo "Uploading ... ${DATE_TODAY}_${CURR_HOUR} logs"
    if ls bin/logs/*${DATE_TODAY}_${CURR_HOUR}* 1> /dev/null 2>&1; then
        tar cvzf ${DATE_TODAY}_${CURR_HOUR}.tar.gz bin/logs/*${DATE_TODAY}_${CURR_HOUR}*
        aws s3 cp ${DATE_TODAY}_${CURR_HOUR}.tar.gz s3://logs.alphateam.com/prod/$SERVICE_NAME/$DATE_TODAY/$HOSTNAME/

        if [ $? -eq 0 ]
        then
            truncate -s 0 ${DATE_TODAY}_${CURR_HOUR}.tar.gz
            mkdir s3_upload_logs
            mv bin/logs/*${DATE_TODAY}_${CURR_HOUR}* s3_upload_logs/
            truncate -s 0 s3_upload_logs/*${DATE_TODAY}_${CURR_HOUR}*
            rm -rf s3_upload_logs/
            rm ${DATE_TODAY}_${CURR_HOUR}.tar.gz
            echo "Success: Log upload for ${DATE_TODAY}_${CURR_HOUR}.tar.gz"
        else
            echo "Failure: Unable to upload ${DATE_TODAY}_${CURR_HOUR}.tar.gz"
        fi
        echo "-----------------------------------------"
    else
        echo "files do not exist"
        echo "-----------------------------------------"
    fi

    i=$[$i-1]
done

# Upload Yesterday's remaining logs
i=$[$CURRENT_HOUR+1]

while [ $i -lt 24 ]
do
    CURR_HOUR=`date -d "${i} hour ago" +"%H"`
    echo "Uploading ... ${DATE_YEST}_${CURR_HOUR} logs"
    if ls bin/logs/*${DATE_YEST}_${CURR_HOUR}* 1> /dev/null 2>&1; then
        tar cvzf ${DATE_YEST}_${CURR_HOUR}.tar.gz bin/logs/*${DATE_YEST}_${CURR_HOUR}*
        aws s3 cp ${DATE_YEST}_${CURR_HOUR}.tar.gz s3://logs.alphateam.com/prod/$SERVICE_NAME/$DATE_YEST/$HOSTNAME/

        if [ $? -eq 0 ]
        then
            truncate -s 0 ${DATE_YEST}_${CURR_HOUR}.tar.gz
            mkdir s3_upload_logs
            mv bin/logs/*${DATE_YEST}_${CURR_HOUR}* s3_upload_logs/
            truncate -s 0 s3_upload_logs/*${DATE_YEST}_${CURR_HOUR}*
            rm -rf s3_upload_logs/
            rm ${DATE_YEST}_${CURR_HOUR}.tar.gz
            echo "Success: Log upload for ${DATE_YEST}_${CURR_HOUR}.tar.gz"
        else
            echo "Failure: Unable to upload ${DATE_YEST}_${CURR_HOUR}.tar.gz"
        fi
        echo "-----------------------------------------"
    else
        echo "files do not exist"
        echo "-----------------------------------------"
    fi

    i=$[$i+1]
done

# Upload any remaining files

aws s3 cp bin/logs/ s3://logs.alphateam.com/prod/$SERVICE_NAME/$DATE_TODAY/$HOSTNAME/ --recursive
