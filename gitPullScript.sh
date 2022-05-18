sudo apt-get install zlib1g-dev unzip cmake gcc g++ nodejs
npm i --silent svf-lib --prefix ${HOME}
wget https://github.com/SVF-tools/SVF-example/archive/refs/heads/master.zip
unzip -o master.zip
cd SVF-example-master
source ./env.sh
cmake . && make