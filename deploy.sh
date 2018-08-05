#!/bin/sh
HOST='ftp.kodhus.com'
LOCALPATH='dist'
REMOTEPATH='/kodhus-ui'

ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
lcd $LOCALPATH
cd $REMOTEPATH
prompt
mput *
quit
END_SCRIPT
exit 0