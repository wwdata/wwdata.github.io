// ページの情報JS

function tool_info(){

/* ---------------------------------------------
画面初期化
--------------------------------------------- */
//allClear();
toolClearInfo();
toolClearSub();


/* ---------------------------------------------
ツールバー表示エリア調整
--------------------------------------------- */
var h2 = jQuery('#debagBarMain').outerHeight();
var s2 = 'padding-bottom:'+ h2 +'px';
document.body.setAttribute('style', s2);


/* ---------------------------------------------
情報エリア表示
--------------------------------------------- */
var div = document.createElement('div');
div.setAttribute('id','debagBarInfo');
div.setAttribute('class','debagBarInfoLength');
div.innerHTML = '\
<div class="infoHead">\
<ul>\
<li onclick="tool_ng();">NGチェックサマリー</li>\
<li class="active">ページの情報</li>\
<li onclick="tool_tag();">計測タグ</li>\
</ul>\
<div class="kaihei"><img src="'+JS_DIRECTRY+'close4.png" alt="" class="hei"><img src="'+JS_DIRECTRY+'close3.png" alt="" class="kai"></div>\
<div class="close"><img src="'+JS_DIRECTRY+'close2.png" alt="閉じる" onclick="toolClearInfo();"></div>\
</div>\
<div class="debagBarInfoInner">\
<table id="infoTable">\
</table>\
</div>\
<div class="infoHeadbtm"></div><div class="infoHeadbtm2"></div>\
';
document.body.appendChild(div);

infoDrag();
infoFrontAchange('debagBarInfo');


/* ---------------------------------------------
処理実行／表示
--------------------------------------------- */
var html = getHtml('html');
var processList = [p_lang(), p_charset(), p_title(), p_description(), p_keywords(), p_canonical(), p_head1(html), p_head2(html)];

var len = processList.length;
for(var i=0; i<len; i++){
	if (processList[i][3] == 1){
		var ng = 'NG';
	} else {
		var ng = '';
	}
	var td = '<tr><th>'+ processList[i][0] +'</th><td>'+ processList[i][2] +'</td></tr>';
	
	jQuery('#debagBarInfo #infoTable').append(td);
}
debagBarInfoHeightF('#debagBarInfo');


// tool_info end
}
