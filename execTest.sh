#!/bin/bash
# Abort on Error
set -e

export PING_SLEEP=30s
export WORKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export BUILD_OUTPUT=$WORKDIR/build.out

touch $BUILD_OUTPUT

dump_output() {
   echo Tailing the last 500 lines of output:
   tail -10000 $BUILD_OUTPUT  
}
error_handler() {
  echo ERROR: An error was encountered with the build.
  dump_output
  exit 1
}
# If an error occurs, run our error handler to output a tail of the build
trap 'error_handler' ERR

# Set up a repeating loop to send some output to Travis.

bash -c "while true; do echo \$(date) - building ...; sleep $PING_SLEEP; done" &
PING_LOOP_PID=$!

# My build is using maven, but you could build anything with this, E.g.
# your_build_command_1 >> $BUILD_OUTPUT 2>&1
# your_build_command_2 >> $BUILD_OUTPUT 2>&1
npm install >> $BUILD_OUTPUT 2>&1
APPLITOOLS_API_KEY=wPVBepqUxtQg50EnvQYiyLa7FQx6qA2bXSASZqWfUQI110 APPLITOOLS_SERVER_URL=https://atlassianeyesapi.applitools.com APPLITOOLS_BATCH_NAME=Yarden_24_7_tests APPLITOOLS_APP_NAME=Jira APPLITOOLS_SHOW_LOGS=true APPLITOOLS_STORYBOOK_URL=https://jira-storybook.staging.atl-paas.net/?path=/story/* npm run eyes-storybook:configured >> $BUILD_OUTPUT 2>&1
git remote set-url origin https://$1@github.com/applitools/eyes-storybook.git >> $BUILD_OUTPUT 2>&1
git commit --amend --no-edit >> $BUILD_OUTPUT 2>&1
git push --force-with-lease origin HEAD:perf-storybook-api >> $BUILD_OUTPUT 2>&1

# The build finished without returning an error so dump a tail of the output
dump_output

# nicely terminate the ping output loop
kill $PING_LOOP_PID