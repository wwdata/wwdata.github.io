// NGチェックJS

function tool_ng(){

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
div.setAttribute('class','debagBarInfoS');
div.innerHTML = '\
<div class="infoHead">\
<ul>\
<li class="active">NGチェックサマリー</li>\
<li onclick="tool_info();">ページの情報</li>\
<li onclick="tool_tag();">計測タグ</li>\
</ul>\
<div class="kaihei"><img src="'+JS_DIRECTRY+'close4.png" alt="" class="hei"><img src="'+JS_DIRECTRY+'close3.png" alt="" class="kai"></div>\
<div class="close"><img src="'+JS_DIRECTRY+'close2.png" alt="閉じる" onclick="toolClearInfo();toolClearInfoSS();"></div>\
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
var ng,title,classname;
var processList = [p_title(), p_description(), p_keywords(), p_head1(html), ng_alt(), ng_dummyLink(), ng_httpsLink(), ng_anchor(), ng_kana(), ng_dummyText(), ng_dummyFile(), ng_emptyTag()];

var len = processList.length;;
for(var i=0; i<len; i++){
	switch(processList[i][3]){
		case 0:
			ng = 'OK';
			title = '';
			classname = ng;
			break;
		case 1:
			ng = 'NG';
			title = processList[i][2];
			classname = ng;
			break;
		case 13:
			ng = '無';
			title = '';
			classname = 'OK';
			break;
		case 20:
			ng = '有';
			title = processList[i][2];
			classname = 'Doubt';
			break;
		case 22:
			ng = '！';
			title = processList[i][2];
			classname = 'Doubt';
			break;
	}
	
	var td = '<tr _title="'+ title +'"><th>'+ processList[i][0] +'</th><td>'+ processList[i][1] +'</td><td class="'+ classname +'">'+ ng +'</td></tr>';
	
	jQuery('#debagBarInfo #infoTable').append(td);
}

// NGクリックイベント付与
jQuery('#debagBarInfo td.NG, #debagBarInfo td.Doubt').bind('click', function(e){
	var ngValue = $(this).parent().attr('_title');
	setTimeout(function(){
		infoNG(ngValue);
	}, 100);//元のウィンドウが前面になるため遅延表示
});

debagBarInfoHeightF('#debagBarInfo');


// tool_ng end
}


/* ---------------------------------------------
NG内容表示ウィンドウ
--------------------------------------------- */
function infoNG(ngValue){
	toolClearInfoSS();
	
	var elm = 'debagBarInfoSS';
	
	var div = document.createElement('div');
	div.setAttribute('id', elm);
	div.setAttribute('class','debagBarInfoLength');
	div.innerHTML = '\
	<div class="infoHead">\
	<p>エラー内容抽出</p>\
	<div class="kaihei"><img src="'+JS_DIRECTRY+'close4.png" alt="" class="hei"><img src="'+JS_DIRECTRY+'close3.png" alt="" class="kai"></div>\
	<div class="close"><img src="'+JS_DIRECTRY+'close2.png" alt="閉じる" onclick="toolClearInfoSS();"></div>\
	</div>\
	<div class="debagBarInfoInner">\
	<table id="infoTable">\
	</table>\
	</div>\
	<div class="infoHeadbtm"></div><div class="infoHeadbtm2"></div>\
	';
	document.body.appendChild(div);
	
	var ngText = htmlEscape(ngValue.replace(/><(?!\/)/g, '>,<')).replace(/,/g, '<br>').replace(/&lt;br&gt;/g, '<br>');
	
	var td = '<tr><td>'+ ngText +'</td></tr>';
	jQuery('#'+elm).find('#infoTable').append(td);
	
	debagBarInfoHeightF('#'+elm);
	infoDrag3();
	infoFrontAchange(elm);
}
