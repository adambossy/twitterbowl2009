<script language="JavaScript" type="text/javascript">
<!--
var howManyMinutes = 2; // set your interval here;
var oneMinute = 5000;  // 1 minute = 60,000 milliseconds;
refreshFreq = oneMinute * howManyMinutes;
WhereNext = location.href;
setTimeout("window.open(WhereNext,'_top');",refreshFreq);
//-->
//</script>

<div style="font-size: 72px;">
<?php

echo "Total: " . ` grep "GET / " /var/log/apache2/www.twitterbowl2009.com.access.log | wc -l `;
echo "Unique: " . `grep "GET / " /var/log/apache2/www.twitterbowl2009.com.access.log | cut -c1-15 | sort | uniq | wc -l `;

?>
</div>
