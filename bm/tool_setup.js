// 設定JS

function tool_setup(){

/* ---------------------------------------------
画面初期化
--------------------------------------------- */
allClear();


/* ---------------------------------------------
設定画面表示
--------------------------------------------- */
var div = document.createElement('div');
div.setAttribute('id','debagBarSetup');
div.innerHTML = '\
<div id="debagBarSetupInner">\
<p>個別チェックの表示／非表示 切り替え</p>\
<div class="close"><img src="'+JS_DIRECTRY+'close.png" alt="閉じる" onclick="toolClearSetup();"></div>\
<ul id="select_checkValue">\
  <li><label><input type="checkbox" id="checkValue_alt" checked="checked">画像ALT</label></li>\
  <li><label><input type="checkbox" id="checkValue_imghover" checked="checked">マウスオーバー(img)(β版)</label></li>\
  <li><label><input type="checkbox" id="checkValue_link" checked="checked">リンク</label></li>\
  <li><label><input type="checkbox" id="checkValue_link2" checked="checked">リンク(デコード済み)</label></li>\
  <li><label><input type="checkbox" id="checkValue_parameter" checked="checked">リンクパラメーター</label></li>\
  <li><label><input type="checkbox" id="checkValue_parameter_kai" checked="checked">リンクパラメーター(改行表示)</label></li>\
  <li><label><input type="checkbox" id="checkValue_anchor" checked="checked">アンカーリンク</label></li>\
  <li><label><input type="checkbox" id="checkValue_blank" checked="checked">target属性</label></li>\
  <li><label><input type="checkbox" id="checkValue_dummyLink" checked="checked">テストサーバーパス</label></li>\
  <li><label><input type="checkbox" id="checkValue_httpsLink" checked="checked">https時のhttpパス</label></li>\
  <li><label><input type="checkbox" id="checkValue_kana" checked="checked">半角カナ(β版)</label></li>\
  <li><label><input type="checkbox" id="checkValue_dummyText" checked="checked">ダミーテキスト(β版)</label></li>\
  <li><label><input type="checkbox" id="checkValue_dummyFile" checked="checked">ダミーファイル</label></li>\
  <li><label><input type="checkbox" id="checkValue_emptyTag" checked="checked">空タグ</label></li>\
  <li><label><input type="checkbox" id="checkValue_testcheckA" checked="checked">テストチェック1</label></li>\
  <li><label><input type="checkbox" id="checkValue_testcheckB" checked="checked">テストチェック2</label></li>\
  <li><label><input type="checkbox" id="checkValue_testcheckC" checked="checked">テストチェック3</label></li>\
</ul>\
<div class="st_btm"><button id="submit_checkValue">保存して閉じる</button></div>\
<div class="st_btm"><button id="clear_checkValue">設定クリア</button></div>\
</div>\
';
document.body.appendChild(div);

var height = jQuery('body').outerHeight()
jQuery('#debagBarSetup').css('height', height + 'px');

// 読み込み時、保存反映
if(window.localStorage && localStorage.getItem('set_checkValue') !== null){
  // いったん消す
  jQuery('#select_checkValue input').attr('checked', false);

  // 保存した値取得
  var ck_val = localStorage.getItem('set_checkValue').split(',');

  // チェック
  for(var i=0; i<ck_val.length; i++){
    jQuery('#'+ ck_val[i]).attr('checked', true);
  }
}

/* ---------------------------------------------
設定保存
--------------------------------------------- */
jQuery('#submit_checkValue').click(function(){
  // チェックの確認
  var ck_obj = jQuery('#select_checkValue input:checked');
  var ck_val = '';

  for (var i=0; i<ck_obj.length; i++){
    ck_val += jQuery(ck_obj[i]).attr('id') + ',';
  }
  ck_val = ck_val.replace(/,$/, '');

  // localStorageに保存
  if(window.localStorage){
    localStorage.setItem('set_checkValue', ck_val);
  }

  // 閉じる
  toolClearSetup();
});

/* ---------------------------------------------
設定クリア
--------------------------------------------- */
jQuery('#clear_checkValue').click(function(){
  // すべてチェック
  jQuery('#select_checkValue input').attr('checked', true);

  // localStorageのデータ削除
  if(window.localStorage){
    localStorage.removeItem('set_checkValue');
  }
});

// tool_setup end
}
