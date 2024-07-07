# Markdown Parser

A simple, clean note-taking and markdown converting tool built with NextJS, featuring a backend with MongoDB & S3 Bucket for media storage. Web-based with PWA support for mobile.

## Improvements ToDo

<!-- - [ ] Address performance concerns: Optimize dynamic updating to handle large content more efficiently.
Deferred -->
- [ ] Implement subpages: Convert categories into subpages (e.g., `/page/1`) instead of rendering directly on the main page.
<!-- - [ ] Add Renameing
Deferred -->
- [x] Improve Layout: Page Too Ugly
<!-- - [ ] Enhance code formatting: Add syntax highlighting and a copy button for code blocks in HTML output.
Deferred -->
- [x] Support video input: Allow users to embed video content.
<!-- - [ ] Introduce private notes: Implement a three-tier password system (public view, private view, admin) for different access levels.
Deferred -->
- [x] Support LaTeX input: Implement rendering of LaTeX equations.
- [x] Improve image placement: Ensure images are inserted at the cursor position, not at the end of the page.


## Release v0.1

[![GitHub release](https://img.shields.io/github/v/release/jimchen2/markdown-parser?include_prereleases&logo=github)](https://github.com/jimchen2/markdown-parser/releases/tag/v0.1)
[![Docker Image](https://img.shields.io/badge/Docker-jimchen2%2Fmarkdown--parser-blue?logo=docker)](https://hub.docker.com/r/jimchen2/markdown-parser)

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
