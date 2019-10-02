// 計測タグJS

function tool_tag(){

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
<li onclick="tool_info();">ページの情報</li>\
<li class="active">計測タグ</li>\
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

jQuery('#debagBarInfo #infoTable').addClass('tag');
infoDrag();
infoFrontAchange('debagBarInfo');


/* ---------------------------------------------
処理実行／表示
--------------------------------------------- */
var html = getHtml('html2');
var head = getHtml('head');
var processList = [t_adplan(html), t_camp(html), t_dlpo(html), t_genee(html), t_remarketing(html), t_ga(html), t_gtm(html), t_blade(html), t_rtmetrics(head), t_sitecatalyst(html), t_visionalist(html), t_ydn(html), t_ytm(html), t_webAntenna(html)];

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

// tool_tag end
}
