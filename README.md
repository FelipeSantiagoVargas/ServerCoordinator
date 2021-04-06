# ServerCoordinator

docker network create --driver bridge clocks

docker build -t servercoordinator .

docker run -dit --rm --name servercoordinator -p 4000:3000 --network clocks servercoordinator
