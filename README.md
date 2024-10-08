# Markdown Parser

A simple, clean note-taking and markdown converting tool built with NextJS, featuring a backend with MongoDB & S3 Bucket for media storage. Web-based with PWA support for mobile.

Please use seperate IAM credentials for the S3 bucket to avoid destroying everything!

## Future (Hopeful) Features

## Release v0.3

- [x] TreeNode Ugly and Buggy
- [x] Introduce private notes: Implement a three-tier password system (public view, private view, admin) for different access levels.
- [x] Instead of editing types edit the access in the edit header
- [x] Customize Fonts
- [x] Change New Document function as the MongoDB Model changed
- [x] Add Renaming
- [x] Fix Type Bug (useeffect dependency Bug causing the bounce to not run)


[![GitHub release](https://img.shields.io/github/v/release/jimchen2/markdown-parser?include_prereleases&logo=github)](https://github.com/jimchen2/markdown-parser/releases/tag/v0.3)
[![Docker Image](https://img.shields.io/badge/Docker-jimchen2%2Fmarkdown--parser-blue?logo=docker)](https://hub.docker.com/r/jimchen2/markdown-parser)

## Release v0.2

- [x] Improve Layout: Page Too Ugly
- [x] Support video input: Allow users to embed video content.
- [x] Support LaTeX input: Implement rendering of LaTeX equations.
- [x] Improve image placement: Ensure images are inserted at the cursor position, not at the end of the page.

[GitHub release v0.2](https://github.com/jimchen2/markdown-parser/releases/tag/v0.2)


## Release v0.1

[GitHub release v0.1](https://github.com/jimchen2/markdown-parser/releases/tag/v0.1)

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
