#!/usr/bin/env bash

set -xeu

version=$(jq -r '.version' package.json)
commit=$(git rev-parse --short HEAD)

commitVersion="$version-commit-$commit"
if [[ -n $(git status -s) ]]; then
  commitVersion="$commitVersion-dirty-$(date '+%Y-%m-%d-%H-%M-%S')"
fi

npm version $commitVersion --no-git-tag-version
npm publish --tag $commit
