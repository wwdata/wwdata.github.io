// 個別チェックJS

function tool_check(){

/* ---------------------------------------------
画面初期化
--------------------------------------------- */
//allClear();
checkClear();


/* ---------------------------------------------
ツールバー表示
--------------------------------------------- */
var h = jQuery('#debagBarMain').outerHeight();
var s = 'bottom:'+ h +'px';

var div = document.createElement('div');
div.setAttribute('id','debagBarSub');
div.setAttribute('style', s);
document.body.appendChild(div);
var div = document.getElementById('debagBarSub');
var bar = document.createElement('div');
bar.setAttribute('id','debagBarSubMain');
bar.innerHTML = '\
<form name="debagFormSub">\
<ul id="set_checkValue">\
  <li><label><input type="checkbox" onclick="c_alt();" id="checkValue_alt">画像ALT</label></li>\
  <li><label><input type="checkbox" onclick="c_imghover();" id="checkValue_imghover">マウスオーバー(img)(β版)</label></li>\
  <li><label><input type="checkbox" onclick="c_link();" id="checkValue_link">リンク</label></li>\
  <li><label><input type="checkbox" onclick="c_link2();" id="checkValue_link2">リンク(デコード済み)</label></li>\
  <li><label><input type="checkbox" onclick="c_parameter();" id="checkValue_parameter">リンクパラメーター</label></li>\
  <li><label><input type="checkbox" onclick="c_parameter_kai();" id="checkValue_parameter_kai">リンクパラメーター(改行表示)</label></li>\
  <li><label><input type="checkbox" onclick="c_anchor();" id="checkValue_anchor">アンカーリンク</label></li>\
  <li><label><input type="checkbox" onclick="c_blank();" id="checkValue_blank">target属性</label></li>\
  <li><label><input type="checkbox" onclick="c_dummyLink();" id="checkValue_dummyLink">テストサーバーパス</label></li>\
  <li><label><input type="checkbox" onclick="c_httpsLink();" id="checkValue_httpsLink">https時のhttpパス</label></li>\
  <li><label><input type="checkbox" onclick="c_kana();" id="checkValue_kana">半角カナ(β版)</label></li>\
  <li><label><input type="checkbox" onclick="c_dummyText();" id="checkValue_dummyText">ダミーテキスト(β版)</label></li>\
  <li><label><input type="checkbox" onclick="c_dummyFile();" id="checkValue_dummyFile">ダミーファイル</label></li>\
  <li><label><input type="checkbox" onclick="c_emptyTag();" id="checkValue_emptyTag">空タグ</label></li>\
  <li><label><input type="checkbox" onclick="c_testcheckA();" id="checkValue_testcheckA">テストチェック1</label></li>\
  <li><label><input type="checkbox" onclick="c_testcheckB();" id="checkValue_testcheckB">テストチェック2</label></li>\
  <li><label><input type="checkbox" onclick="c_testcheckC();" id="checkValue_testcheckC">テストチェック3</label></li>\
</ul>\
</form>\
<div class="close"><img src="'+JS_DIRECTRY+'close.png" alt="閉じる" onclick="allClear();" id="closetoolBarSub"></div>\
';
div.appendChild(bar);

// ツールバー表示エリア確保
var h2 = h + jQuery('#debagBarSub').outerHeight();
var s2 = 'padding-bottom:'+ h2 +'px';
document.body.setAttribute('style', s2);

// 読み込み時、保存反映
if(window.localStorage && localStorage.getItem('set_checkValue') !== null){
  // いったん消す
  jQuery('#set_checkValue li').css('display', 'none');

  // 保存した値取得
  var ck_val = localStorage.getItem('set_checkValue').split(',');

  // チェック
  for(var i=0; i<ck_val.length; i++){
    jQuery('#'+ ck_val[i]).parents('li').css('display', 'inline-block');
  }
}

// tool_check end
}

//