<?php

$username = stripslashes(html_entity_decode($_GET['username'], ENT_QUOTES));
$password = html_entity_decode($_GET['password'], ENT_QUOTES);
$status   = stripslashes(html_entity_decode($_GET['status'], ENT_QUOTES));

$cmd = "curl --basic --user $username:$password --data \"status=$status\" http://twitter.com/statuses/update.xml?source=TwitterBowl";
exec($cmd);

$fp = fopen("log.txt", "a+");
fwrite($fp, "$cmd\n");
fclose($fp);

?>
