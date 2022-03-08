#!/bin/sh
# docker-entrypoint.sh

# Replace any environment variable references in server.xml.tmpl.
# (Assumes the image has the full GNU tool set.)

cat app/server.js

echo $DATABASE
echo $USERNAME
echo $PASSWORD
echo $HOST
echo $PORT

sed -i "s/##DATABASE##/${DATABASE}/" app/server.js
sed -i "s/##USERNAME##/${USERNAME}/" app/server.js
sed -i "s/##PASSWORD##/${PASSWORD}/" app/server.js
sed -i "s/##HOST##/${HOST}/" app/server.js
sed -i "s/##PORT##/${PORT}/" app/server.js

cat app/server.js

# Run the standard container command.
exec "$@"
