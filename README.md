## git-tag-from-changelog 

Create Git tag from Changelog

This action automatically creates a Git tag from the changelog. It expects the changelog to be in the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

The action does the following:

1. Gets the latest tag from the Git repository
2. Parses the Changelog and gets the latest tag
3. If the latest tag from the Changelog is newer than the latest tag from Git, it creates a new tag in master branch and pushes it to the repository


### Usage
```yml
name: Tag from changelog

on: 
  push:
    branches:
      - master
    paths:
      - 'CHANGELOG.md'


permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Create tag from changelog
        id: git-tag-from-changelog
        uses: actions/git-tag-from-changelog
```

### License
This action is licensed under some specific terms. Check [here](LICENSE) for more information.
