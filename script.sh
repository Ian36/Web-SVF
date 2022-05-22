#!/bin/bash

wget https://github.com/SVF-tools/SVF-example/archive/refs/heads/master.zip
unzip -o master.zip
rm -rf master.zip
cd SVF-example-master

PROJECTHOME=$(pwd)
sysOS=`uname -s`
LLVMHome="llvm-13.0.0.obj"
Z3Home="z3.obj"
install_path=`npm root`
export LLVM_DIR=$install_path/$LLVMHome
export Z3_DIR=$install_path/$Z3Home
export PATH=$LLVM_DIR/bin:$PATH
export PATH=$PROJECTHOME/bin:$PATH
echo "export LLVM_DIR=$install_path/$LLVMHome" >> ~/.bashrc
echo "export Z3_DIR=$install_path/$Z3Home" >> ~/.bashrc
echo "export PATH=$LLVM_DIR/bin:$PROJECTHOME/bin:$PATH" >> ~/.bashrc
export SVF_DIR=$install_path/SVF/

echo "LLVM_DIR="$LLVM_DIR
echo "SVF_DIR="$SVF_DIR
echo "Z3_DIR="$Z3_DIR

cmake . && make

mv bin/svf-ex ..