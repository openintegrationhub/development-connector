
FILE=ferryman/runGlobal.js
if [ -f "$FILE" ]; then
    echo "Custom ferryman found starting...."
    node ./ferryman/runGlobal.js
else
    echo "Custom ferryman not found using existing npm module."
    node ./node_modules/@openintegrationhub/ferryman/runGlobal.js
fi
