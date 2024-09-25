#!/bin/bash

# Run sqlite3 command to drop the 'users' table
sqlite3 database.sqlite "DROP TABLE IF EXISTS users;"

# Run node index.js
node index.js
