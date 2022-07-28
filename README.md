# MinIO SDK Front

React Web App to test MinIO SDK

## Docker Image

### Env Variable

- REACT_APP_API_HOST

### Example

```
docker run --name minio-sdk-front `
 -e REACT_APP_API_HOST="http://172.17.0.6:8000" `
 -d -p 3000:3000 `
 nafisrf/minio-sdk-front
```