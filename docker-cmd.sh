docker run --name minio-sdk-front-prod-user_support-surrounding-dev `
 -e REACT_APP_API_HOST="http://172.17.0.6:4929" `
 -d -p 1234:3000 `
 nafisrf/minio-sdk-front

 docker run --name minio-sdk-front-local-admin2 `
 -e REACT_APP_API_HOST=minio-sdk-back-local-admin `
 -e REACT_APP_API_PORT=8002 `
 -d -p 3003:3000 `
 nafisrf/minio-sdk-front

docker run --name minio-sdk-front-local-admin3 `
    -e REACT_APP_API_HOST=fa2912fe25d8 `
    -e REACT_APP_API_PORT=8003 `
    -d -p 3007:3000 `
    nafisrf/minio-sdk-front

docker run --name minio-sdk-front-local-admin `
    -e REACT_APP_API_HOST=http://localhost `
    -e REACT_APP_API_PORT=8001 `
    -d -p 3001:3000 `
    nafisrf/minio-sdk-front