/* 注意

*/
/*表示系課題メモ
・情報ウィンドウ操作、ソースが3つあるのを効率的にできないか？
*/

/* ---------------------------------------------
必要なファイルの読込
--------------------------------------------- */
var pageUrl = document.location.href;
if(pageUrl.indexOf('http')>-1){
  this.JS_DIRECTRY = "//suteki-discovery.work/bm/";
}else{
  this.JS_DIRECTRY = "https://suteki-discovery.work/bm/";
}


(function(){
  var div = document.getElementById('debagBar');

  var c = document.createElement('link');
  c.setAttribute('rel','stylesheet');
  c.setAttribute('type','text/css');
  c.href =JS_DIRECTRY+'style.css?x='+Math.floor(Math.random()*1000000000);
  div.appendChild(c);

  if(typeof jQuery !== 'undefined'){
    var s = document.createElement('script');
    s.src = JS_DIRECTRY+'jquery-1.8.3.min.js';
    div.appendChild(s);
    FileImport();
  } else {
    var s = document.createElement('script');
    s.src = JS_DIRECTRY+'jquery-1.8.3.min.js';
    div.appendChild(s);
    setTimeout(function(){FileImport()}, 1000);
  }

  function FileImport(){
    // 読み込むJavaScriptファイル名
    var jsFile = [
      'ecl',
      'tool_ng',
      'tool_info',
      'tool_check',
      'tool_extraction',
      'tool_tag',
      'tool_setup',
      'processing'
    ];

    var len = jsFile.length;
    for(var i=0; i<len; i++){
      var s = document.createElement('script');
      s.setAttribute('charset','UTF-8');
      s.src = JS_DIRECTRY+jsFile[i]+'.js?x='+Math.floor(Math.random()*1000000000);
      div.appendChild(s);
    }

    // 必要JS読み込み後、ツールバー表示
    toolbar();
  }
})();


/* ---------------------------------------------
設定
--------------------------------------------- */
// チェックするURL
ckUrls = new Array(
  'emarketing.ne.jp',
  'web-works.ne.jp'
);

// チェックするダミーテキスト
ckDummys = new Array(
  '(ダミー)+',
  '(ﾀﾞﾐｰ)+',
  '(dummy)+',
  '(テスト)+',
  '(ﾃｽﾄ)+',
  '(test)+',
  'テキスト(テキスト)+',
  'ﾃｷｽﾄ(ﾃｷｽﾄ)+',
  'text(text)+',
  'ああああ*',
  '(あいうえお)+',
  '○○○*',
  'yyyy.mm.dd',
  'dd.mm.yyyy'
);

var _emptyTagNG = 0;// 空タグチェック用
_ex_textValue = new Array();// テキスト一括抜き用
_ex_textParent = new Array();// テキスト一括抜き用_親
_windowObj = new Array();// 情報ウィンドウ

/* NGチェック
ng：表示文字
0：OK
1：NG
10：有OK
11：無NG
12：有NG
13：無OK
20：有?
21：無?
22：!
23：?
99：-
*/

/* ---------------------------------------------
画面初期化
--------------------------------------------- */
// 全初期化セット
function allClear(){
  // サブバー初期化
  toolClearSub();

  // 情報ウィンドウ初期化
  toolClearInfo();
  toolClearInfoL();
  toolClearInfoSS();

  // 設定画面初期化
  toolClearSetup();

  // 個別チェック初期化
  ClearCheckValue('checkValue');

  // 個別チェックマウスオーバーclass初期化
  ClearCheckValueClass('checkValueOv');

  // 空タグClass初期化
  ClearCheckValueClass('checkValue_emptyTag_c');

  // 半角カナClass初期化
  ClearCheckValueClass('checkValue_kana');

  // ダミーテキストClass初期化
  ClearCheckValueClass('checkValue_dummyText');

  // マウスオーバー用初期化
  ClearMouseOver();
}

// 個別チェック初期化セット
function checkClear(){
  // サブバー初期化
  toolClearSub();

  // 個別チェック初期化
  ClearCheckValue('checkValue');

  // 個別チェックマウスオーバーclass初期化
  ClearCheckValueClass('checkValueOv');

  // 空タグClass初期化
  ClearCheckValueClass('checkValue_emptyTag_c');

  // 半角カナClass初期化
  ClearCheckValueClass('checkValue_kana');

  // ダミーテキストClass初期化
  ClearCheckValueClass('checkValue_dummyText');

  // マウスオーバー用初期化
  ClearMouseOver();
}

// サブバー初期化
function toolClearSub(){
  if(document.getElementById('debagBarSub')){
    document.body.removeChild(document.getElementById('debagBarSub'));
  }
}

// 情報ウィンドウ初期化
function toolClearInfo(){
  if(document.getElementById('debagBarInfo')){
    document.body.removeChild(document.getElementById('debagBarInfo'));
  }
}
function toolClearInfoL(){
  if(document.getElementById('debagBarInfoL')){
    document.body.removeChild(document.getElementById('debagBarInfoL'));
  }
}
function toolClearInfoSS(){
  if(document.getElementById('debagBarInfoSS')){
    document.body.removeChild(document.getElementById('debagBarInfoSS'));
  }
}

// 設定画面初期化
function toolClearSetup(){
  if(document.getElementById('debagBarSetup')){
    document.body.removeChild(document.getElementById('debagBarSetup'));
  }
}

// 個別チェック初期化　要素指定型
function ClearCheckValue(element){
  if(jQuery('.'+element)){
    var objD = jQuery('.'+element);
    objD.remove();
  }
}

// 個別チェックスタイルClassのみ初期化　要素指定型
function ClearCheckValueClass(element){
  if(jQuery('.'+element)){
    var objD = jQuery('.'+element);
    for(var i=0; i<objD.length; i++){
      objD.eq(i).removeClass(element);
    }
  }
}

// マウスオーバー用初期化
function ClearMouseOver(){
  if(document.getElementById('c_hover0') !== null){
    var datTags = document.getElementsByTagName('img');
    var len = datTags.length - jQuery('#debagBar img').length - jQuery('#debagBarSub img').length;
    // imgにマウスアウトイベント付与
    for(i=0; i<len; i++){
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('mouseout',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
      var n = document.getElementById('c_hover'+i);
      if(n !== null){
        n.dispatchEvent(e);
      }
    }
    // imgからID削除
    for(var i=0; i<len; i++){
      datTags[i].removeAttribute('id','c_hover'+i);
    }
  }
}

/* ---------------------------------------------
ツールバー表示
--------------------------------------------- */
function toolbar(){
  // 画面初期化
  allClear();

  // ツールバー表示
  var div = document.getElementById('debagBar');
  var bar = document.createElement('div');
  bar.setAttribute('id','debagBarMain');
  bar.innerHTML = '\
<form id="debagFormMain" name="debagFormMain">\
<ul>\
  <li><label><input type="radio" onclick="tool_ng();" name="tool">NGチェックサマリー</label></li>\
  <li><label><input type="radio" onclick="tool_info();" name="tool">ページの情報</label></li>\
  <li><label><input type="radio" onclick="tool_tag();" name="tool">計測タグ・広告タグ</label></li>\
  <li><label><input type="radio" onclick="tool_check();" name="tool">個別チェック</label></li>\
  <li><label><input type="radio" onclick="tool_extraction();" name="tool">一括抜き出し</label></li>\
</ul>\
</form>\
<div class="setup"><img src="'+JS_DIRECTRY+'setup.png" alt="設定" onclick="tool_setup();"></div>\
<div class="close"><img src="'+JS_DIRECTRY+'close.png" alt="閉じる" onclick="closeBar();" id="closetoolBar"></div>\
';
  div.appendChild(bar);

  // ツールバー表示エリア確保
  document.body.setAttribute('style','padding-bottom:35px');
}


/* ---------------------------------------------
ツールバー閉じる
--------------------------------------------- */
function closeBar(){
  allClear();
  document.body.removeChild(document.getElementById('debagBar'));
  jQuery('body').removeAttr('style');
}

/* ---------------------------------------------
情報ウィンドウ高さ調整
※ID書いているの改修
--------------------------------------------- */
function debagBarInfoHeight(){
  var height = window.innerHeight;
  if(jQuery('#debagBarInfo').outerHeight()+14 > height - jQuery('#debagBarMain').outerHeight()){
    height -= jQuery('#debagBarMain').outerHeight() + jQuery('#debagBarSub').outerHeight() +50;
    jQuery('#debagBarInfo').css('height', height+'px');
    jQuery('#debagBarInfo .debagBarInfoInner').css('height', height - 35);
  }
}
function debagBarInfoHeightL(){
  var height = window.innerHeight;
  if(jQuery('#debagBarInfoL').outerHeight()+14 > height - jQuery('#debagBarMain').outerHeight()){
    height -= jQuery('#debagBarMain').outerHeight() + jQuery('#debagBarSub').outerHeight() +50;
    jQuery('#debagBarInfoL').css('height', height+'px');
    jQuery('#debagBarInfoL .debagBarInfoInner').css('height', height - 35);
  }
}
function debagBarInfoHeightF(elm){
  var height = window.innerHeight;
  if(jQuery(elm).outerHeight()+14 > height - jQuery('#debagBarMain').outerHeight()){
    height -= jQuery('#debagBarMain').outerHeight() + jQuery('#debagBarSub').outerHeight() +50;
    jQuery(elm).css('height', height+'px');
    jQuery(elm +' .debagBarInfoInner').css('height', height - 35);
  }
}

/* ---------------------------------------------
情報ウィンドウドラッグ/開閉
※3つ処理を書いているが1つにできないか
--------------------------------------------- */
(function(){
  infoDrag = function() {
    var ex, ey, kaiheiElm;
    var elm = jQuery('#debagBarInfo');

    // 保存した位置参照
    if(window.sessionStorage){
      ex = sessionStorage.getItem('elementX');
      ey = sessionStorage.getItem('elementY');
      if(ex !== 'null' && ey !== 'null'){
        elm.css({top: ey+'px', left: ex+'px'});
      }
    }

    ex = Number(elm.css('left').replace(/px/, ''));
    ey = Number(elm.css('top').replace(/px/, ''));

    // クリックで前面
    infoFront(elm);

    // クリック開閉
    kaiheiElm = '#debagBarInfo .debagBarInfoInner, #debagBarInfo .kaihei .kai, #debagBarInfo .kaihei .hei, #debagBarInfo .infoHeadbtm, #debagBarInfo .infoHeadbtm2';
    jQuery('#debagBarInfo .infoHead .kaihei').bind('click', function(e){
      jQuery(kaiheiElm).toggle();
      elm.css('height', 'auto');
      debagBarInfoHeightF('#debagBarInfo');
    });
    // ダブルクリック開閉
    jQuery('#debagBarInfo .infoHead').bind('dblclick', function(e){
      jQuery(kaiheiElm).toggle();
      elm.css('height', 'auto');
      debagBarInfoHeightF('#debagBarInfo');
    });

    // ドラッグ移動
    jQuery('#debagBarInfo .infoHead, #debagBarInfo .infoHeadbtm').bind('mousedown', function(e){
      var x = e.pageX;
      var y = e.pageY;
      jQuery(document).bind('mousemove.infoDrag', function(e){
        ex += e.pageX - x;
        ey += e.pageY - y;
        elm.css({top: ey, left: ex});
        x = e.pageX;
        y = e.pageY;
        return false;
      }).one('mouseup', function(){
        // ウィンドウ外に置かれた場合、位置初期化
        var height = window.innerHeight;
        var width = window.innerWidth;
        height -= jQuery('#debagBarMain').outerHeight() + jQuery('#debagBarSub').outerHeight() +50;
        if(ex<0){ex = 20}
        if(ex>width-100){ex = 20}
        if(ey<0 || ey>height){ey = 20}
        // 表示位置の保存
        if(window.sessionStorage){
          sessionStorage.setItem('elementX', ex);
          sessionStorage.setItem('elementY', ey);
        }
        // イベント初期化
        jQuery(document).unbind('mousemove.infoDrag');
      });
      return false;
    });
  }

  infoDrag2 = function() {
    var ex2, ey2, kaiheiElm2;
    var elm = jQuery('#debagBarInfoL');

    ex2 = Number(elm.css('left').replace(/px/, ''));
    ey2 = Number(elm.css('top').replace(/px/, ''));

    // クリックで前面
    infoFront(elm);

    // クリック開閉
    kaiheiElm2 = '#debagBarInfoL .debagBarInfoInner, #debagBarInfoL .kaihei .kai, #debagBarInfoL .kaihei .hei, #debagBarInfoL .infoHeadbtm, #debagBarInfoL .infoHeadbtm2';
    jQuery('#debagBarInfoL .infoHead .kaihei').bind('click', function(e){
      jQuery(kaiheiElm2).toggle();
      elm.css('height', 'auto');
      debagBarInfoHeightF('#debagBarInfoL');
    });
    // ダブルクリック開閉
    jQuery('#debagBarInfoL .infoHead').bind('dblclick', function(e){
      jQuery(kaiheiElm2).toggle();
      elm.css('height', 'auto');
      debagBarInfoHeightF('#debagBarInfoL');
    });

    // ドラッグ移動
    jQuery('#debagBarInfoL .infoHead, #debagBarInfoL .infoHeadbtm').bind('mousedown', function(e){
      var x = e.pageX;
      var y = e.pageY;
      jQuery(document).bind('mousemove.infoDrag2', function(e){
        ex2 += e.pageX - x;
        ey2 += e.pageY - y;
        elm.css({top: ey2, left: ex2});
        x = e.pageX;
        y = e.pageY;
        return false;
      }).one('mouseup', function(){
        // イベント初期化
        jQuery(document).unbind('mousemove.infoDrag2');
      });
      return false;
    });
  }

  infoDrag3 = function() {
    var ex3, ey3, kaiheiElm3;
    var elm = jQuery('#debagBarInfoSS');

    // 保存した位置参照
    if(window.sessionStorage){
      ex3 = sessionStorage.getItem('elementX3');
      ey3 = sessionStorage.getItem('elementY3');
      if(ex3 !== 'null' && ey3 !== 'null'){
        elm.css({top: ey3+'px', left: ex3+'px'});
      }
    }

    ex3 = Number(elm.css('left').replace(/px/, ''));
    ey3 = Number(elm.css('top').replace(/px/, ''));

    // クリックで前面
    infoFront(elm);

    // クリック開閉
    kaiheiElm = '#debagBarInfoSS .debagBarInfoInner, #debagBarInfoSS .kaihei .kai, #debagBarInfoSS .kaihei .hei, #debagBarInfoSS .infoHeadbtm, #debagBarInfoSS .infoHeadbtm2';
    jQuery('#debagBarInfoSS .infoHead .kaihei').bind('click', function(e){
      jQuery(kaiheiElm).toggle();
      elm.css('height', 'auto');
      debagBarInfoHeightF('#debagBarInfoSS');
    });
    // ダブルクリック開閉
    jQuery('#debagBarInfoSS .infoHead').bind('dblclick', function(e){
      jQuery(kaiheiElm).toggle();
      elm.css('height', 'auto');
      debagBarInfoHeightF('#debagBarInfoSS');
    });

    // ドラッグ移動
    jQuery('#debagBarInfoSS .infoHead, #debagBarInfoSS .infoHeadbtm').bind('mousedown', function(e){
      var x = e.pageX;
      var y = e.pageY;
      jQuery(document).bind('mousemove.infoDrag3', function(e){
        ex3 += e.pageX - x;
        ey3 += e.pageY - y;
        elm.css({top: ey3, left: ex3});
        x = e.pageX;
        y = e.pageY;
        return false;
      }).one('mouseup', function(){
        // ウィンドウ外に置かれた場合、位置初期化
        var height = window.innerHeight;
        var width = window.innerWidth;
        height -= jQuery('#debagBarMain').outerHeight() + jQuery('#debagBarSub').outerHeight() +50;
        if(ex3<0){ex3 = 20}
        if(ex3>width-100){ex3 = 20}
        if(ey3<0 || ey3>height){ey3 = 20}
        // 表示位置の保存
        if(window.sessionStorage){
          sessionStorage.setItem('elementX3', ex3);
          sessionStorage.setItem('elementY3', ey3);
        }
        // イベント初期化
        jQuery(document).unbind('mousemove.infoDrag3');
      });
      return false;
    });
  }
})();

/* ---------------------------------------------
情報ウィンドウ前後入れ替え
--------------------------------------------- */
// NGクリック用イベント付与
function infoFront(elm){
  elm.bind('click', function(e){
    var elmID = elm.attr('id');
    if(elmID == 'debagBarInfo'){elmID = 'debagBarInfoO'}// ユニークな名前に変更

    infoFrontAchange(elmID);
  });
}

// 前後入れ替え
function infoFrontAchange(elmID){
  if(elmID == 'debagBarInfo'){elmID = 'debagBarInfoO'}// ユニークな名前に変更

  // ウィンドウ配列調べて、あったら削除
  for(var i=0; i<_windowObj.length; i++){
    if(_windowObj[i].match(elmID)){
      _windowObj.splice(i,1);
    }
  }
  // 末尾に追加
  _windowObj.push(elmID);

  // 配列の順にz-index指定
  var elmID, elmZ;
  for(var i=0; i<_windowObj.length; i++){
    if(_windowObj[i] == 'debagBarInfoO'){
      elmID = 'debagBarInfo';
    }else{
      elmID = _windowObj[i];
    }
    elmZ = 1000010 + 10*i;
    jQuery('#'+elmID).css('z-index', elmZ);
  }
}

/* ---------------------------------------------
該当箇所に表示
--------------------------------------------- */
function insertHtml(element,value,style) {
  var datO = document.createElement('div');
  datO.setAttribute('class','checkValue '+style);
  datO.setAttribute('title', value);
  datO.innerHTML = value;

  if(element.parentNode.tagName == 'HEAD'){
    jQuery('body').prepend(datO);
  }else{
    //element.parentNode.appendChild(datO);// 親要素内の最後に追加
    //element.parentNode.insertBefore(datO, element);// 親要素内の先頭に追加
    jQuery(element).before(datO);// 該当要素の前に追加
    //jQuery(element).after(datO);// 該当要素の次に追加
  }
}

/* ---------------------------------------------
該当箇所マウスオーバー
--------------------------------------------- */
(function(){
  checkValueOv = function() {

    jQuery('.checkValue').bind('mouseover', function(e){
      jQuery(this).next().addClass('checkValueOv');
    });

    jQuery('.checkValue').bind('mouseout', function(e){
      jQuery(this).next().removeClass('checkValueOv');
    });
  }
})();

/* ---------------------------------------------
SubBar NGツールチップ表示
--------------------------------------------- */
function ngTooltip(ID,html){
  var value, title, classname;
  var fn = ID.replace(/checkValue/, 'ng');
  var ele = document.getElementById(ID);
  var ngClass = ID + '_ng';

  // NGチェック
/*  if(fn == 'ng_dummyText'){
    var ngCheck = ng_dummyText(html)[3];
  }else{
    var ngCheck = eval(fn+'()[3]');
  }*/
  var ngCheck = eval(fn+'()[3]');
  var ngValue = eval(fn+'()[2]');

  switch(ngCheck){
    case 0:
      value = 'OK';
      title = '';
      classname = value;
      break;
    case 1:
      value = 'NG';
      title = ngValue;
      classname = value;
      break;
    case 13:
      value = '無';
      title = '';
      classname = 'OK';
      break;
    case 20:
      value = '有';
      title = ngValue;
      classname = 'Doubt';
      break;
    case 22:
      value = '！';
      title = ngValue;
      classname = 'Doubt';
      break;
  }

  // ツールチップ表示
  var datO = document.createElement('div');
  datO.setAttribute('class','ngTooltip ngTooltip'+ classname +' '+ ngClass);
  datO.setAttribute('_title', title);
  datO.innerHTML = value;
  ele.parentNode.appendChild(datO);
}

/* ---------------------------------------------
bookマークレット保管
--------------------------------------------- */
/*
https://checkdemo.web-works.ne.jp/debag/
http://localhost:8080/debag/
*/
/*
javascript:function loadScript(sU){var d=document;if(d.getElementById('debagBar')){d.body.removeChild(document.getElementById('debagBar'));}var div=d.createElement('div');div.setAttribute('id','debagBar');d.body.appendChild(div);var sE=d.createElement('SCRIPT');sE.setAttribute('src',sU);sE.setAttribute('charset','UTF-8');div.appendChild(sE);}loadScript('https://checkdemo.web-works.ne.jp/debag/base.js?x='+Math.floor(Math.random()*1000000000));
*/