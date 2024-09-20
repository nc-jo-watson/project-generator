#!/bin/bash
cd $1
npm init -y
npm i -D jest

if $2 ; then 
    git init
fi