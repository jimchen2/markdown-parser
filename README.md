# Markdown Parser

A simple, clean note-taking and markdown converting tool built with NextJS, featuring a backend with MongoDB & S3 Bucket for media storage. Web-based with PWA support for mobile.

## Release v0.1

[![GitHub release](https://img.shields.io/github/v/release/jimchen2/markdown-parser?include_prereleases&logo=github)](https://github.com/jimchen2/markdown-parser/releases/tag/v0.1)
[![Docker Image](https://img.shields.io/badge/Docker-jimchen2%2Fmarkdown--parser-blue?logo=docker)](https://hub.docker.com/r/jimchen2/markdown-parser)

## Improvements ToDo

1. Address performance concerns: Optimize dynamic updating to handle large content more efficiently.
2. Implement subpages: Convert categories into subpages (e.g., `/page/1`) instead of rendering directly on the main page.
3. Enhance code formatting: Add syntax highlighting and a copy button for code blocks in HTML output.
4. Implement S3 backup: Add option to backup MongoDB data to S3, similar to snapshots for full recovery.
5. Support video input: Allow users to embed video content.
6. Introduce private notes: Implement a three-tier password system (public view, private view, admin) for different access levels.
7. Enable file input: Allow users to upload and embed various file types.
8. Support LaTeX input: Implement rendering of LaTeX equations.
9. Improve image placement: Ensure images are inserted at the cursor position, not at the end of the page.
10. Use a dedicated S3 bucket: Set up a separate bucket for this project to prevent overwriting and conflicts with the public S3 bucket.

## Install

```sh
# configure .env
docker run -d --restart always --env-file .env -p 3048:3000 jimchen2/markdown-parser:latest
```

## Build

```sh
# add Dockerfile
docker build --no-cache -t jimchen2/markdown-parser .
```
