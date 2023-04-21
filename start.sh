cd artifacts/channel

./create-artifacts.sh

sleep 3

cd ..

docker-compose up -d

sleep 5

cd ..

./createChannel.sh

sleep 2

./deployChaincode.sh

sleep 2

cd api

node app.js


cd artifacts

docker-compose down

sleep 2

docker volume prune

sleep 2

docker network prune

cd ..