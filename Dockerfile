
## Install 
```sh
# configure .env
docker run -d --restart always --env-file .env -p 3048:3000 jimchen2/task-manager-nextjs:latest
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/task-manager-nextjs .
```
