#!/bin/bash
chain_directory1="eth_chain1/"
chain_docker_name1="ccscethchain1"
chain_directory2="eth_chain2/"
chain_docker_name2="ccscethchain2"
chain_directory3="eth_chain3/"
chain_docker_name3="ccscethchain3"

# stopping docker containers if they are running
# shellcheck disable=SC2006
#CONTAINERS=`sudo docker ps | grep ${chain_docker_name1}||${chain_docker_name2}`
#if [[ -n ${CONTAINERS} ]]; then
#    echo "Stopping test chain containers..."
#    sudo docker stop ${chain_docker_name1} ${chain_docker_name2}
#    echo "Done."
#fi

sudo docker stop ${chain_docker_name1} ${chain_docker_name2} ${chain_docker_name3}
# remove chain data
echo "Removing chain data from test chains..."
rm -rf ${chain_directory1}chain-data
rm -rf ${chain_directory2}chain-data
rm -rf ${chain_directory3}chain-data
echo "Done."

# start chains
echo "Starting test chains..."
# shellcheck disable=SC2164
cd ${chain_directory1}
sudo docker compose up -d
# shellcheck disable=SC2164
cd ../${chain_directory2}
sudo docker compose up -d
cd ../${chain_directory3}
sudo docker compose up -d
cd ../
echo "Done."
