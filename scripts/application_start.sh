#!/bin/bash

# Stop all servers and start the server as a daemon
forever stopall
forever start --workingDir /home/ec2-user/happygoat -c "yarn start" ./
