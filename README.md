
## Install 
```sh
# configure .env
docker run -d --restart always --env-file .env -p 3048:3000 jimchen2/markdown-parser:latest
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/markdown-parser .
```

1. Build backend with image pasting options
