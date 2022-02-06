#!/bin/bash

build_result_dir=/dist

cd ..
echo "##### currentDirectory : `pwd` #####"

echo "##### build start #####"
npm run build
echo "##### build end #####"

cd docker
echo "##### currentDirectory : `pwd` #####"

if [[ -d `pwd`${build_result_dir} ]]; then
    echo "exist";
else
    echo "non-exist";
fi




