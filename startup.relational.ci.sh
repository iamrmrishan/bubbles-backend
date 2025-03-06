#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
npm run migration:run
npm run seed:run:relational
npm run start:prod > prod.log 2>&1 &
/opt/wait-for-it.sh maildev:1080
/opt/wait-for-it.sh localhost:3000 -t 60 || echo "localhost:3000 not responding, checking 0.0.0.0:3000 instead..." && /opt/wait-for-it.sh 0.0.0.0:3000 -t 60
npm run lint
npm run test:e2e -- --runInBand
