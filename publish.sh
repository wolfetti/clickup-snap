#!/bin/bash

CHANNEL="edge";
if [[ "--stable" == "$1" ]]; then
    CHANNEL="stable"
fi

SNAPCRAFT=$(which snapcraft)

if [[ "" == "$SNAPCRAFT" ]]; then
    echo "Please install snapcraft package";
    exit 1
fi

NPM=$(which npm)

if [[ "" == "$NPM" ]]; then
    echo "Please install npm package";
    exit 1
fi

$NPM install;
$NPM run dist;

$SNAPCRAFT upload --release=$CHANNEL dist/*.snap