# MinIO SDK Front

React Web App to test MinIO SDK

## Docker Image

### Env Variable

- REACT_APP_API_HOST
- REACT_APP_API_PORT

### Example

#### Windows

```
docker run --name minio-sdk-front `
 -e REACT_APP_API_HOST=minio-sdk-back `
 -e REACT_APP_API_PORT=8080
 -d -p 3000:3000 `
 nafisrf/minio-sdk-front
```