function jtw_urlencode(str) {
str = escape(str);

str = str.replace(/\+/g, '%2B');
str = str.replace(/%20/g, '+');
str = str.replace(/\*/g, '%2A');
str = str.replace(/\//g, '%2F');
str = str.replace(/@/g, '%40');
str = str.replace(/#/g, '%23');
return str;
}


var __d = function(msg) {
  if (document.getElementById("jtw_debug")) {
	document.getElementById("jtw_debug").innerHTML = document.getElementById("jtw_debug").innerHTML + "<br>" + msg;
	document.getElementById("jtw_debug").scrollTop = document.getElementById("jtw_debug").scrollHeight;
  }
}

var jtw_getdatediff = function (now_ms, gmt)
{
  var dt_ms = Date.parse(gmt);

  var delta = now_ms - dt_ms;
  delta = Math.floor(delta / 1000);  // turn into seconds

  if (delta > 86400) {
    return '' + Math.floor(delta/86400) + ' days ago';
  } else if (delta > 3600) {
    return '' + Math.floor(delta/3600) + ' hours ' + Math.floor(delta/60) + ' minutes ago';
  } else if (delta > 60) {
    return '' + Math.floor(delta/60) + ' minutes ' + (delta % 60) + ' seconds ago';
  } else { // seconds
    return '' + (delta % 60) + ' seconds ago';
  }

}

var jtw_cleanup = function () 
{
  if (jtw_widget_refresh_interval > 0) {
    clearTimeout(jtw_settings[jtw_curidx]['jtw_timer']);
	jtw_settings[jtw_curidx]['jtw_timer'] = setTimeout("jtw_refresh_clbk(" + jtw_curidx + ");", (jtw_widget_refresh_interval * 1000) + Math.floor(Math.random() * 2000));
  }
  jtw_widget_refresh_interval='';
  jtw_divname='';
  jtw_width='';jtw_height='';jtw_scroll='';jtw_widget_background='';jtw_widget_border='';jtw_tweet_textcolor='';jtw_tweet_linkcolor='';jtw_tweet_background='';jtw_tweet_border='';jtw_tweet_margin='';jtw_tweet_fontsize='';jtw_tweet_lang='';jtw_hide_img='';jtw_num_tweets='';jtw_search='';jtw_pre_html='';jtw_post_html='';jtw_mid_html='';jtw_center_widget='';
  jtw_tweet_newbackground='';
  jtw_lastsearch='';
  __d(jtw_curidx + " RELEASED the lock...");
  jtw_lock = -1;
}

var jtw_searchfunc_pre1 = function(arr){var x = 1;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre2 = function(arr){var x = 2;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre3 = function(arr){var x = 3;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre4 = function(arr){var x = 4;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre5 = function(arr){var x = 5;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre6 = function(arr){var x = 6;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre7 = function(arr){var x = 7;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre8 = function(arr){var x = 8;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre9 = function(arr){var x = 9;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}
var jtw_searchfunc_pre10 = function(arr){var x = 10;	if (x != jtw_lock) {__d(x + ": i don't have the lock! aborting!!");return false;}jtw_searchfunc(arr);}


var jtw_searchfunc = function (arr) 
{

  //if (jtw_lock == -1) {
  //  __d("!!!!> lock was FORCIBLY unlocked, aborting...");
  //	return false;
  //}  
  
  
  
//__d(jtw_curidx + " entering SEARCHFUNC...");
  clearTimeout(jtw_lock_timeout_timer);
  var ret = jtw_pre_html;
  var i = 0;
  var bg;
  var wasnew = 0;
//
  var now = new Date();
  var now_ms = now.getTime();
//  
  if ((!arr || !arr.results[0]) && jtw_settings[jtw_curidx]['jtw_lastid'] == 0) {document.getElementById(jtw_divname).innerHTML='0 Results to display.  Enter new search terms.';jtw_cleanup(); return false;}
  if ((!arr || !arr.results[0]) && (jtw_lastsearch == jtw_search)) {__d(jtw_curidx + " --no new tweets--"); jtw_cleanup(); return false;}
  ret = ret + '<div style="color:' + jtw_tweet_textcolor + ';padding:0px 5px 0px 5px;' + jtw_results_style_misc + '">';

  var num_newtweets;
  if (!arr || !arr.results[0]) {
	num_newtweets = 0;
  } else {
	num_newtweets = arr.results.length;
}
  var newptr = (jtw_settings[jtw_curidx]['jtw_ringptr'] - num_newtweets + 100) % 100;
  jtw_settings[jtw_curidx]['jtw_ringptr'] = newptr;
  __d(jtw_curidx + " num_newtweets " + num_newtweets);
  __d(jtw_curidx + " newptr " + newptr);
  for (i = 0; i < num_newtweets; i++) {
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100] = new Array(6);
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['user'] = arr.results[i].from_user;
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tweet'] = arr.results[i].text;
	//jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tstamp'] = arr.results[i].created_at;
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tstamp'] = new Date(arr.results[i].created_at);
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tstamp'] = jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tstamp'].toLocaleString();
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['img'] = arr.results[i].profile_image_url;
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['id'] = arr.results[i].id;
	jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['search'] = jtw_search;
  }
  for (i = 0; i < jtw_num_tweets; i++) {
	if (!jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100] || jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['search'] != jtw_search) break;
    var user =   jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['user'];
    var tweet =  jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tweet'];
    var tstamp = jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['tstamp'];
    var img =    jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['img'];
	var tid =    jtw_settings[jtw_curidx]['jtw_tweets'][(newptr + i) % 100]['id'];

	if (tid > jtw_settings[jtw_curidx]['jtw_lastid'] && jtw_settings[jtw_curidx]['jtw_lastid'] != 0) {bg = jtw_tweet_newbackground; wasnew = 1;} else {bg = jtw_tweet_background}
	//tstamp = tstamp.substr(0, tstamp.length-5) + " GMT";
	//var re = new RegExp("(([a-zA-Z]+:\/\/)([a-z][a-z0-9_\.-]*[a-z]{2,6})([a-zA-Z0-9#\/*-_\?&%]*))", "g");
	//var re = new RegExp("(([a-zA-Z]+:\/\/)([a-z][a-z0-9_\.-]*[a-z]{2,6})([a-zA-Z0-9#\/*-_\?&%]*))[\.]*", "g");
	var re = new RegExp("(([a-zA-Z]+:\/\/)([a-zA-Z][a-zA-Z0-9_\.-]*[a-zA-Z]{2,6})([a-zA-Z0-9~\#\/\._\?\&%-=]*[a-zA-Z0-9~\#\/_\?\&%-=]))", "g");
	tweet = tweet.replace(re, '<a style="' + jtw_tweet_linkcolor + 'text-decoration:none;" target="_new" href=$1 >$1</a>');
	re = new RegExp("@([a-zA-Z0-9_]+)", "g");
	tweet = tweet.replace(re, '@<a style="' + jtw_tweet_linkcolor + 'text-decoration:none;" target="_new" href=http://twitter.com/$1>$1</a>');
        tweet = tweet.replace(/&/g, '&');
    ret = ret + '<div style="background:' + bg + ';font-size:' + jtw_tweet_fontsize + ';border:' + jtw_tweet_border + ';padding:2px;margin:' + jtw_tweet_margin + ';' + jtw_tweet_style_misc;
	if (tid > jtw_settings[jtw_curidx]['jtw_lastid'] && jtw_settings[jtw_curidx]['jtw_lastid'] != 0 && typeof(jQuery) == 'function') 
	    {ret = ret + 'display:none;';}
	ret = ret + '" ';
	if (tid > jtw_settings[jtw_curidx]['jtw_lastid'] && jtw_settings[jtw_curidx]['jtw_lastid'] != 0)
    	{ret = ret + ' class="jtw_new_tweet" ';}
	ret = ret + '>';
	if (!jtw_hide_img) {ret = ret + '<img src=' + img + ' height=' + jtw_img_size + ' width=' + jtw_img_size + ' align=left style="padding:2px;">';}
	ret = ret + '<b><a style="' + jtw_tweet_linkcolor + 'text-decoration:none;" target="_new" href=http://twitter.com/' + user + '>' + user + '</a></b>: ' + tweet + '<br><span style=\"font-size:10px;\">' + tstamp; //+ jtw_getdatediff(now_ms, tstamp); //+ tstamp;
	ret = ret + '</span>';
	ret = ret + '</div>';
	//if (i < arr.results.length - 1) ret = ret + jtw_mid_html;
	if (i < jtw_num_tweets - 1) ret = ret + jtw_mid_html;
  }
  ret = ret + jtw_post_html;
  ret = ret + '<center><small style="background:#fff; color:#000; border: 1px solid #000; padding: 1px; font-size: 10px; margin:2px;">Widget by <a href=http://tweetgrid.com/>TweetGrid</a> - <a href=http://tweetgrid.com/widget/>Add one to your site</a></small></center>';
  ret = ret + '</div>';
  jtw_settings[jtw_curidx]['jtw_lastid'] = (arr.results[0] ? arr.results[0].id : jtw_settings[jtw_curidx]['jtw_lastid']);
  jtw_settings[jtw_curidx]['jtw_lastsearch'] = (wasnew ? '' : jtw_search);
  
  document.getElementById(jtw_divname).innerHTML = ret;
  //if (typeof(jQuery) == 'function') {$('#'+jtw_divname+' .jtw_new_tweet').hide(1,function(){$(this).slideDown("slow");});}
  //if (typeof(jQuery) == 'function') {$('#'+jtw_divname+' .jtw_new_tweet').hide(1,function(){$(this).fadeIn("slow");});}
  if (typeof(jQuery) == 'function') {$('#'+jtw_divname+' .jtw_new_tweet').fadeIn("slow");}
  jtw_cleanup();
}

jtw_refresh_clbk = function(i) {

	if (jtw_lock != -1) {
		if (jtw_lock == i) {
			__d(i + ": trying to double lock!! aborting...");
			return false;
		}	
__d(i + ": " + jtw_lock + " already has lock, backing off...");
	setTimeout("jtw_refresh_clbk(" + i + ");", 1000 + Math.floor(Math.random() * 1000));
		return false;
	}
__d(i + " GRABBED lock...");	
	jtw_lock = i;
	jtw_lock_timeout_timer = setTimeout("jtw_lock_timeout(" + i + ");", 6500);
	if (jtw_lock != i) {
		setTimeout("jtw_refresh_clbk(" + i + ");", 1000 + Math.floor(Math.random() * 1000));
		return false;
	}
	jtw_divname = jtw_settings[i]['jtw_divname'];
	jtw_curidx = jtw_settings[i]['jtw_curidx'];
	jtw_width = jtw_settings[i]['jtw_width'];
	jtw_height = jtw_settings[i]['jtw_height'];
	jtw_scroll = jtw_settings[i]['jtw_scroll'];
	jtw_widget_background = jtw_settings[i]['jtw_widget_background'];
	jtw_widget_border = jtw_settings[i]['jtw_widget_border'];
	jtw_widget_refresh_interval = jtw_settings[i]['jtw_widget_refresh_interval'];
	jtw_tweet_textcolor = jtw_settings[i]['jtw_tweet_textcolor'];
	jtw_tweet_linkcolor = jtw_settings[i]['jtw_tweet_linkcolor'];
	jtw_tweet_background = jtw_settings[i]['jtw_tweet_background'];
	jtw_tweet_newbackground = jtw_settings[i]['jtw_tweet_newbackground'];
	jtw_tweet_border = jtw_settings[i]['jtw_tweet_border'];
	jtw_tweet_margin = jtw_settings[i]['jtw_tweet_margin'];
	jtw_tweet_fontsize = jtw_settings[i]['jtw_tweet_fontsize'];
	jtw_tweet_lang = jtw_settings[i]['jtw_tweet_lang'];
	jtw_hide_img = jtw_settings[i]['jtw_hide_img'];
	jtw_big_img = jtw_settings[i]['jtw_big_img'];
	jtw_img_size = jtw_settings[i]['jtw_img_size'];
	jtw_num_tweets = jtw_settings[i]['jtw_num_tweets'];
	jtw_search = jtw_settings[i]['jtw_search'];
	jtw_lastsearch = jtw_settings[i]['jtw_lastsearch'];
	jtw_pre_html = jtw_settings[i]['jtw_pre_html'];
	jtw_post_html = jtw_settings[i]['jtw_post_html'];
	jtw_mid_html = jtw_settings[i]['jtw_mid_html'];
	jtw_center_widget = jtw_settings[i]['jtw_center_widget'];
	jtw_widget_style_misc = jtw_settings[i]['jtw_widget_style_misc'];
	jtw_results_style_misc = jtw_settings[i]['jtw_results_style_misc'];
	jtw_tweet_style_misc = jtw_settings[i]['jtw_tweet_style_misc'];
	if (jtw_lock != i) {
__d(i + " failed 2nd lock check..." + jtw_lock + " has it...");	
		setTimeout("jtw_refresh_clbk(" + i + ");", 1000 + Math.floor(Math.random() * 1000));
		return false;
	}
__d(i + " lastid is " + jtw_settings[i].jtw_lastid);
	var sc = document.createElement('script');
	var h = document.getElementsByTagName('head')[0];
	sc.language = 'javascript';
	sc.type = 'text/javascript';
	//sc.src = 'http://search.twitter.com/search.json?callback=jtw_searchfunc&' + jtw_tweet_lang + 'q=' + jtw_urlencode(jtw_search) + '&rpp=' + jtw_num_tweets + '&since_id=' + jtw_settings[i].jtw_lastid + '&rand=' + Math.floor(Math.random() * 10000000);
	sc.src = 'http://search.twitter.com/search.json?callback=jtw_searchfunc_pre'+ jtw_curidx + '&' + jtw_tweet_lang + 'q=' + jtw_urlencode(jtw_search) + '&rpp=' + jtw_num_tweets + '&since_id=' + jtw_settings[i].jtw_lastid + '&rand=' + Math.floor(Math.random() * 10000000);
	h.appendChild(sc);
}

function jtw_lock_timeout(i) {
__d("!!! forcing UNLOCK for " + i + "");
	jtw_cleanup();


}

var jtw_idx;
var jtw_curidx;
var jtw_lock;
var jtw_lock_timeout_timer;
var jtw_settings;
var jtw_divname;
var jtw_width;
var jtw_height;
var jtw_scroll;
var jtw_widget_background;
var jtw_widget_border;
var jtw_widget_refresh_interval;
var jtw_tweet_textcolor;
var jtw_tweet_linkcolor;
var jtw_tweet_background;
var jtw_tweet_newbackground;
var jtw_tweet_border;
var jtw_tweet_margin;
var jtw_tweet_fontsize;
var jtw_tweet_lang;
var jtw_hide_img;
var jtw_big_img;
var jtw_img_size;
var jtw_num_tweets;
var jtw_search;
var jtw_lastsearch;
var jtw_pre_html;
var jtw_post_html;
var jtw_mid_html;
var jtw_center_widget;
var jtw_widget_style_misc;
var jtw_results_style_misc;
var jtw_tweet_style_misc;


//set defaults;
if (!jtw_settings) jtw_settings = new Array(0);
if (!jtw_idx) jtw_idx = 0;
if (!jtw_lock) jtw_lock = -1;
if (!jtw_divname)
	jtw_divname = 'jtw_widget';
if (!jtw_width)
	jtw_width = '300px';
if (!jtw_height)
	jtw_height = '400px';
if (!jtw_scroll || jtw_scroll == 'yes')
	jtw_scroll = 'overflow:auto;';
else
	jtw_scroll = '';
if (!jtw_widget_background)
	jtw_widget_background = '#fff';
if (!jtw_widget_border)
	jtw_widget_border = '1px solid #aaa';
if (!jtw_widget_refresh_interval)
	jtw_widget_refresh_interval = 10;
if (jtw_widget_refresh_interval < 8 && jtw_widget_refresh_interval != 0)
	jtw_widget_refresh_interval = 8;
if (!jtw_tweet_textcolor)
	jtw_tweet_textcolor = '#000';
if (!jtw_tweet_linkcolor)
	jtw_tweet_linkcolor = 'color:#00f;';
else
	jtw_tweet_linkcolor = 'color:' + jtw_tweet_linkcolor + ';';
if (!jtw_tweet_background)
	jtw_tweet_background = '#f8f8f8';
if (!jtw_tweet_newbackground)
	jtw_tweet_newbackground = jtw_tweet_background;
if (!jtw_tweet_border)
	jtw_tweet_border = '1px solid #aaa';
if (!jtw_tweet_margin)
	jtw_tweet_margin = '1px';
if (!jtw_tweet_fontsize)
	jtw_tweet_fontsize = '14px';
if (!jtw_search)
	jtw_search = 'twitter';
else
	jtw_search = jtw_search;
if (!jtw_num_tweets)
	jtw_num_tweets = 20;
if (!jtw_pre_html)
	jtw_pre_html = '<center><b>Twitter Search Widget</b></center>';
if (!jtw_post_html)
	jtw_post_html = '';
if (!jtw_mid_html)
	jtw_mid_html = '';
if (jtw_center_widget == 'yes')
	jtw_center_widget = 'margin: 0 auto;';
else
	jtw_center_widget = '';
if (!jtw_tweet_lang) 
    jtw_tweet_lang = '';
else
    jtw_tweet_lang = 'lang=' + jtw_tweet_lang + '&';
if (!jtw_widget_style_misc)
	jtw_widget_style_misc = '';
if (!jtw_results_style_misc)
	jtw_results_style_misc = '';
if (!jtw_tweet_style_misc)
	jtw_tweet_style_misc = '';
if (jtw_big_img == 'yes')
   jtw_img_size = 48;
else
   jtw_img_size = 24;
if (jtw_hide_img == 'yes')
	jtw_hide_img = 1;
else 
	{jtw_hide_img = 0; jtw_tweet_style_misc = jtw_tweet_style_misc + ';min-height:' + (jtw_img_size + 4) + 'px;';}

jtw_idx++;	

jtw_curidx = jtw_idx;
jtw_settings[jtw_idx] = new Array(40);
jtw_settings[jtw_idx]['jtw_divname'] =jtw_divname;
jtw_settings[jtw_idx]['jtw_curidx'] =jtw_curidx;
jtw_settings[jtw_idx]['jtw_width'] =jtw_width;
jtw_settings[jtw_idx]['jtw_height'] =jtw_height;
jtw_settings[jtw_idx]['jtw_scroll'] =jtw_scroll;
jtw_settings[jtw_idx]['jtw_widget_background'] =jtw_widget_background;
jtw_settings[jtw_idx]['jtw_widget_border'] =jtw_widget_border;
jtw_settings[jtw_idx]['jtw_widget_refresh_interval'] =jtw_widget_refresh_interval;
jtw_settings[jtw_idx]['jtw_tweet_textcolor'] =jtw_tweet_textcolor;
jtw_settings[jtw_idx]['jtw_tweet_linkcolor'] =jtw_tweet_linkcolor;
jtw_settings[jtw_idx]['jtw_tweet_background'] =jtw_tweet_background;
jtw_settings[jtw_idx]['jtw_tweet_newbackground'] =jtw_tweet_newbackground;
jtw_settings[jtw_idx]['jtw_tweet_border'] =jtw_tweet_border;
jtw_settings[jtw_idx]['jtw_tweet_margin'] =jtw_tweet_margin;
jtw_settings[jtw_idx]['jtw_tweet_fontsize'] =jtw_tweet_fontsize;
jtw_settings[jtw_idx]['jtw_tweet_lang'] =jtw_tweet_lang;
jtw_settings[jtw_idx]['jtw_hide_img'] =jtw_hide_img;
jtw_settings[jtw_idx]['jtw_big_img'] =jtw_big_img;
jtw_settings[jtw_idx]['jtw_img_size'] =jtw_img_size;
jtw_settings[jtw_idx]['jtw_num_tweets'] =jtw_num_tweets;
jtw_settings[jtw_idx]['jtw_search'] =jtw_search;
jtw_settings[jtw_idx]['jtw_lastsearch'] =jtw_search;
jtw_settings[jtw_idx]['jtw_pre_html'] =jtw_pre_html;
jtw_settings[jtw_idx]['jtw_post_html'] =jtw_post_html;
jtw_settings[jtw_idx]['jtw_mid_html'] =jtw_mid_html;
jtw_settings[jtw_idx]['jtw_center_widget'] =jtw_center_widget;
jtw_settings[jtw_idx]['jtw_widget_style_misc'] =jtw_widget_style_misc;
jtw_settings[jtw_idx]['jtw_results_style_misc'] =jtw_results_style_misc;
jtw_settings[jtw_idx]['jtw_tweet_style_misc'] =jtw_tweet_style_misc;
jtw_settings[jtw_idx]['lastid'] = 0;
jtw_settings[jtw_idx]['jtw_timer'] = '';
jtw_settings[jtw_idx]['jtw_tweets'] = new Array(100);
jtw_settings[jtw_idx]['jtw_ringptr'] = 0;
	
	
document.write('<div id=' + jtw_divname + ' style="' + jtw_scroll + '' +  jtw_center_widget + 'width:' + jtw_width + ';height:' + jtw_height + ';background:' + jtw_widget_background + ';border:' + jtw_widget_border + ';' + jtw_widget_style_misc + '">');
document.write('<a href="http://whos.amung.us/stats/3iffs50u4co5/"><img src="http://whos.amung.us/widget/3iffs50u4co5.png" width="1" height="1" border="0" title="" /></a>');
document.write('</div>');
if (jtw_search != '-') {
	document.write('<script src="http://search.twitter.com/search.json?callback=jtw_searchfunc&' + jtw_tweet_lang + 'q=' + jtw_urlencode(jtw_search) + '&rpp=' + jtw_num_tweets + '" type="text/javascript"></script>');
	//jtw_refresh_clbk(jtw_curidx);
}
else {
	//document.write('');
	//document.getElementById(jtw_divname).innerHTML = '<center><div style="background:#fff;border:1px solid #000;padding:3px;width:135px;margin-top:5px;">Sponsored by:<br><a href="http://idek.net/_q" target="_blank"><img src="/img/ad/125x125_tweetshirts.png" border=0 height=125 width=125></a></div></center>';
	//pageTracker._trackPageview('/action/adbug');
}

