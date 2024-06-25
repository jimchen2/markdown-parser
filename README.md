
## Install 
```sh
# configure .env
docker run -d --restart always --env-file .env -p 3048:3000 markdown-parser:latest
```

## Build

```sh
# add Dockerfile
docker build -t markdown-parser .
```