#!/bin/bash

# Stop all servers and start the server as a daemon
sudo forever stopall
sudo forever start --workingDir /home/ec2-user/happygoat -c "yarn start" ./
