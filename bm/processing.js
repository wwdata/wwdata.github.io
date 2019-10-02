/* 注意
・IE rgba使えないので\9
・ソース取得して抽出→表示タイプは、document.writeが混入していないか
・'"とスペースタブ判定
・HTML5で<script>に属性なし
・IE でgetElementsByClassName使えないのでjQuery書式で
・ループ処理で値を書き換えて、そのまま値がリセットされずにひきずっていないか確認！
*/
/*プロセス系課題メモ
・マウスオーバーイベント⇒trigger()はbindされたイベントしか呼び出せない
・style取得書き換え⇒@importはたどれない
・エリアタグ⇒DOM利用ではないので親の<map>を探せない
・該当テキストの該当箇所のみの装飾
・lication.hashがどこかで誤作動？
・孤島チェック
・テストサーバーパス STG
*/

/* ---------------------------------------------
言語コード
--------------------------------------------- */
function p_lang(){
  var name = '言語コード';
  var description = '言語コードが正しく指定してあるか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 値取得
  value = document.getElementsByTagName("html")[0].getAttribute('lang');
  if (!value){
    value = 'none';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  } else {
    if (value === 'none'){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
文字コード
--------------------------------------------- */
function p_charset(){
  var name = '文字コード';
  var description = '文字コードが正しく指定してあるか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 値取得
  jQuery('meta').each(function(){
    if(jQuery(this).attr('http-equiv') === 'Content-Type' || jQuery(this).attr('http-equiv') === 'content-type'){
      value = jQuery(this).attr('content').replace("text/html; charset=", "");
    } else if(jQuery(this).attr('charset')) {
      value = jQuery(this).attr('charset');
    }
  });
  if (!value){
    value = 'none';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  } else {
    if (value === 'none'){
      ng = 1;
    }
  }
  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
改行コード　※判定が正確ではないので調査中
--------------------------------------------- */
function p_LineFeedCode(){
  var name = '改行コード';
  var description = '改行コードが正しく指定してあるか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 値取得
  var html = getHtml('html');

  if(html.match(/\r\n/g)){
    var CRLF = html.match(/\r\n/g).length;
    var LF = html.match(/\n/g).length;
    var CR = html.match(/\r/g).length;
    console.log(CRLF,LF,CR);
    if(CRLF === LF && CRLF === CR){
      value = 'CR+LF';
    }else if(CRLF < LF){
      value = '主にLF（CR+LFが混在しています）';
    }else{
      value = '主にCR（CR+LFが混在しています）';
    }
  }else if(html.match(/\n/g)){
    value = 'LF';
  }else{
    value = 'CR';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
title
--------------------------------------------- */
function p_title(){
  var name = 'title';
  var description = '&lt;TITLE&gt;タグは設定されているか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG 2:有 3:無

  // 値取得
  value = jQuery('title').text();

  if (!value){
    value = 'none';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  } else {
    if (value === 'none'){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
description
--------------------------------------------- */
function p_description(){
  var name = 'description';
  var description = 'ディスクリプションは設定されているか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG 2:有 3:無

  // 値取得
  jQuery('meta').each(function(){
    if(jQuery(this).attr('name') === 'description' || jQuery(this).attr('name') === 'Description'){
      value = jQuery(this).attr('content');
    }
  });
  if (!value){
    value = 'none';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  } else {
    if (value === 'none'){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
Keywords
--------------------------------------------- */
function p_keywords(){
  var name = 'keywords';
  var description = 'キーワードは設定されているか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG 2:有 3:無

  // 値取得
  jQuery('meta').each(function(){
    if(jQuery(this).attr('name') === 'keywords' || jQuery(this).attr('name') === 'Keywords'){
      value = jQuery(this).attr('content');
    }
  });
  if (!value){
    value = 'none';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  } else {
    if (value === 'none'){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
canonical
--------------------------------------------- */
function p_canonical(){
  var name = 'canonical';
  var description = 'canonicalタグを設定しているか、値は正しいか';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 値取得
  jQuery('link').each(function(){
    if(jQuery(this).attr('rel') === 'canonical'){
      value = jQuery(this).attr('href');
    }
  });
  if (!value){
    value = 'none';
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
H1
--------------------------------------------- */
function p_head1(html){
  var name = 'H1';
  var description = 'H1タグを設定しているか、H1は1つか';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 値取得
  if(html.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)){
    var htmlS = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/ig);
    var len = htmlS.length;
    for(var i=0; i<len; i++){
      value += htmlEscape(htmlS[i].replace(/<h1[^>]*>/ig, '').replace(/<\/h1>/ig, '')) + '<br>';
    }
    if(len > 1){ng = 1}
  }

  if (value == ''){
    value = 'none';
    ng = 1;
  }

  // NGチェック
  var regulation;
  if (regulation){
    if (value !== regulation){
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
H2
--------------------------------------------- */
function p_head2(html){
  var name = 'H2';
  var description = 'H2タグを設定しているか';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 値取得
  if(html.match(/<h2[^>]*>[\s\S]*?<\/h2>/i)){
    var htmlS = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/ig);
    var len = htmlS.length;
    for(var i=0; i<len; i++){
      if (i === len-1){
        value += htmlEscape(htmlS[i].replace(/<h2[^>]*>/ig, '').replace(/<\/h2>/ig, '')) + '<br>';
      }else{
        value += htmlEscape(htmlS[i].replace(/<h2[^>]*>/ig, '').replace(/<\/h2>/ig, '')) + '<hr>';
      }
    }
  }

  if (value == ''){
    value = 'none';
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------
画像ALT　NGチェック用
--------------------------------------------- */
function ng_alt(){
  var name = '画像';
  var description = 'altのない画像はないか';
  var value = new Array();
  var ng = 0; // NGフラグ 0:OK 1:NG

  var datTags = document.getElementsByTagName('img');
  var len = datTags.length - jQuery('#debagBar img').length - jQuery('#debagBarSub img').length;

  // タグを順番にチェック
  for(var i=0; i<len; i++){
    var datT = String(datTags[i].getAttribute('alt'));
    // 値抽出
    if (datT == 'null'){
      value.push(datTags[i].getAttribute('src').replace(/.*\//, '').replace(/\?.*/, '?').replace(/\&.*/, '&'));
      ng = 1;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
画像ALT　個別表示
--------------------------------------------- */
function c_alt(){
  var ID = 'checkValue_alt';

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  var datTags = document.getElementsByTagName('img');
  var len = datTags.length - jQuery('#debagBar img').length - jQuery('#debagBarSub img').length - jQuery('#debagBarInfo img').length - jQuery('#debagBarInfoL img').length - jQuery('#debagBarInfoSS img').length;

  // タグを順番にチェック
  for(var i=0; i<len; i++){
    var datT = String(datTags[i].getAttribute('alt'));
    // 値抽出
    if (datT == ''){
      datT = 'alt=""';
      ID = 'checkValue_alt';
    } else if(datT == 'null'){
      datT = 'altがありません';
      ID = 'checkValue_alt checkValue_ng2';
    }else{
      ID = 'checkValue_alt';
    }
    var datV = datT;
    // 何番目のタグか確定
    var datN = datTags[i];
    // 該当箇所に表示
    insertHtml(datN,datV,ID);
  }

  checkValueOv();
}

/* ---------------------------------------------
画像ALT一括抜き出し
--------------------------------------------- */
function ex_alt(){
  toolClearInfoL();

  // 情報エリア表示
  infoViewImg();
  jQuery('#debagBarInfoL').addClass('imgPanel');
  jQuery('#debagBarInfoL .infoHead li').eq(0).addClass('active');

  var html = getHtml('body');

  // imgタグ抽出
  if(html.match(/<img[^>]*>/i)){
    var imgs = document.getElementsByTagName('img');

    // tr生成、thにimg出力
    jQuery('#debagBarInfoL #infoTableL').addClass('alt');
    var len = imgs.length;

    for(var i=0; i<len; i++){
      if (imgs[i].src.match(JS_DIRECTRY)){
        break;
      }

      var tableObj = document.getElementById('infoTableL');
      var tr = document.createElement('tr');
      tr.innerHTML = '<th></th>';
      tableObj.appendChild(tr);
      tableObj.childNodes[i+1].childNodes[0].appendChild(imgs[i].cloneNode(true));

      $(tableObj).find('th').eq(i).after('<td></td>')
    }

    // imgからid削除しclass付与、tdにalt出力
    var len = jQuery('#debagBarInfoL #infoTableL th').length;
    var datTags = document.getElementsByTagName('img');
    var i=0;
    jQuery('#debagBarInfoL #infoTableL th').each(function(){
      var imgID =  jQuery(this).children('img').attr('id');
      var datE = jQuery(datTags[i]);
      if(typeof imgID !== 'undefined' && imgID !== ''){
        jQuery(this).children('img').attr('id', '');
      }
      jQuery(this).children('img').attr('class', 'imgList'+i);

      // 非表示画像抽出
      if(datE.is(':hidden')){
        jQuery(this).addClass('hiddenImg');
      }

      // alt抽出
      var alt = jQuery(this).children('img').attr('alt');
      if(alt == ''){
        alt = 'alt=""';
      } else if(typeof alt == 'undefined'){
        alt = 'altがありません';
        jQuery(this).next('td').addClass('attrNG');
      }

      jQuery(this).next('td').text(alt);
      i++;
    });
  }

  // 高さ調整
  debagBarInfoHeightF('#debagBarInfoL');

  // 一覧の画像クリックで該当に移動
  jQuery('#infoTableL.alt th').click(function(){
    var imgNum = jQuery(this).children('img').attr('class').replace(/imgList/, '');
    var datTags = document.getElementsByTagName('img');
    var datE = jQuery(datTags[imgNum]);

    if(datE.attr('id') == '' || datE.attr('id') == 'undefined' || typeof datE.attr('id') == 'undefined'){
      imgID = 'imgList'+imgNum;
      datE.attr('id', imgID);
    }else{
      imgID = datE.attr('id');
    }

    if(datE.is(':visible')){// 表示されている画像なら
      window.location.hash = '#'+imgID;
      if (location.hash && location.hash.match(/#imgList/)) {
        if ('replaceState' in history)
        history.replaceState('',document.title, window.location.pathname + location.search);
        else window.location.hash = '';
      }
    }else{
      alert('非表示画像です。');
    }
  });
}

/* ---------------------------------------------
画像パス一括抜き出し
--------------------------------------------- */
function ex_imgPass(){
  toolClearInfoL();

  // 情報エリア表示
  infoViewImg();
  jQuery('#debagBarInfoL').addClass('imgPanel');
  jQuery('#debagBarInfoL .infoHead li').eq(1).addClass('active');

  var html = getHtml('body');

  // imgタグ抽出
  if(html.match(/<img[^>]*>/i)){
    var imgs = document.getElementsByTagName('img');

    // tr生成、thにimg出力
    jQuery('#debagBarInfoL #infoTableL').addClass('alt');
    var len = imgs.length;

    for(var i=0; i<len; i++){
      if (imgs[i].src.match(JS_DIRECTRY)){
        break;
      }

      var tableObj = document.getElementById('infoTableL');
      var tr = document.createElement('tr');
      tr.innerHTML = '<th></th>';
      tableObj.appendChild(tr);
      tableObj.childNodes[i+1].childNodes[0].appendChild(imgs[i].cloneNode(true));

      $(tableObj).find('th').eq(i).after('<td></td>')
    }

    // imgからid削除しclass付与、tdにパス出力
    var len = jQuery('#debagBarInfoL #infoTableL th').length;
    var datTags = document.getElementsByTagName('img');
    var i=0;
    jQuery('#debagBarInfoL #infoTableL th').each(function(){
      var imgID =  jQuery(this).children('img').attr('id');
      var datE = jQuery(datTags[i]);
      if(typeof imgID !== 'undefined' && imgID !== ''){
        jQuery(this).children('img').attr('id', '');
      }
      jQuery(this).children('img').attr('class', 'imgList'+i);

      // 非表示画像抽出
      if(datE.is(':hidden')){
        jQuery(this).addClass('hiddenImg');
      }

      // src抽出してパス変換
      var path = passConversion(jQuery(this).children('img').attr('src'));

      jQuery(this).next('td').text(path);
      i++;
    });
  }

  // 高さ調整
  debagBarInfoHeightF('#debagBarInfoL');

  // 一覧の画像クリックで該当に移動
  jQuery('#infoTableL.alt th').click(function(){
    var imgNum = jQuery(this).children('img').attr('class').replace(/imgList/, '');
    var datTags = document.getElementsByTagName('img');
    var datE = jQuery(datTags[imgNum]);

    if(datE.attr('id') == '' || datE.attr('id') == 'undefined' || typeof datE.attr('id') == 'undefined'){
      imgID = 'imgList'+imgNum;
      datE.attr('id', imgID);
    }else{
      imgID = datE.attr('id');
    }

    if(datE.is(':visible')){// 表示されている画像なら
      window.location.hash = '#'+imgID;
      if (location.hash && location.hash.match(/#imgList/)) {
        if ('replaceState' in history)
        history.replaceState('',document.title, window.location.pathname + location.search);
        else window.location.hash = '';
      }
    }else{
      alert('非表示画像です。');
    }
  });
}

/* ---------------------------------------------
画像サイズ一括抜き出し　※サイズが取得できないケース調査中
--------------------------------------------- */
function ex_imgSize(){
  toolClearInfoL();

  // 情報エリア表示
  infoViewImg();
  jQuery('#debagBarInfoL').addClass('imgPanel');
  jQuery('#debagBarInfoL .infoHead li').eq(2).addClass('active');

  var html = getHtml('body');

  // imgタグ抽出
  if(html.match(/<img[^>]*>/i)){
    var imgs = document.getElementsByTagName('img');

    // tr生成、thにimg出力
    jQuery('#debagBarInfoL #infoTableL').addClass('imgSize');
    var len = imgs.length;

    for(var i=0; i<len; i++){
      if (imgs[i].src.match(JS_DIRECTRY)){
        break;
      }

      var tableObj = document.getElementById('infoTableL');
      var tr = document.createElement('tr');
      tr.innerHTML = '<th></th>';
      tableObj.appendChild(tr);
      tableObj.childNodes[i+1].childNodes[0].appendChild(imgs[i].cloneNode(true));

      $(tableObj).find('th').eq(i).after('<td></td>')
    }

    // imgからid削除しclass付与、tdにwidth,height出力
    var len = jQuery('#debagBarInfoL #infoTableL th').length;
    var datTags = document.getElementsByTagName('img');
    var i=0;
    jQuery('#debagBarInfoL #infoTableL th').each(function(){
      var imgID =  jQuery(this).children('img').attr('id');
      var datE = jQuery(datTags[i]);
      if(typeof imgID !== 'undefined' && imgID !== ''){
        jQuery(this).children('img').attr('id', '');
      }

      jQuery(this).children('img').attr('class', 'imgList'+i);

      // 非表示画像抽出
      if(datE.is(':hidden')){
        jQuery(this).addClass('hiddenImg');
      }

      // 指定サイズ取得後、属性値削除
      var width = jQuery(this).children('img').attr('width');
      var height = jQuery(this).children('img').attr('height');

      // 実物サイズ取得
      var img = new Image();
      if(typeof img.naturalWidth !== 'undefined'){
        var width_v = document.getElementsByTagName('img')[i].naturalWidth;
        var height_v = document.getElementsByTagName('img')[i].naturalHeight;
      }else{
        img.src = jQuery(this).children('img').attr('src');
        var width_v = img.width;
        var height_v = img.height;
      }

      if(typeof width == 'undefined'){width = '指定なし'}
      if(typeof height == 'undefined'){height = '指定なし'}

      var wh = '指定　width：' + width + ' height：' + height + '<br>' + '実物　width：' + width_v + ' height：' + height_v;

      jQuery(this).next('td').append(wh);

      if(width !== '指定なし' && Number(width) !== Number(width_v) || height !== '指定なし' && Number(height) !== Number(height_v)){
        jQuery(this).next('td').addClass('sizeNg')
      }
      i++;
    });
  }

  // 高さ調整
  debagBarInfoHeightF('#debagBarInfoL');

  // 一覧の画像クリックで該当に移動
  jQuery('#infoTableL.imgSize th').click(function(){
    console.log('koko');
    var imgNum = jQuery(this).children('img').attr('class').replace(/imgList/, '');
    var datTags = document.getElementsByTagName('img');
    var datE = jQuery(datTags[imgNum]);
    if(datE.attr('id') == '' || datE.attr('id') == 'undefined' || typeof datE.attr('id') == 'undefined'){
      imgID = 'imgList'+imgNum;
      datE.attr('id', imgID);
    }else{
      imgID = datE.attr('id');
    }
    if(datE.is(':visible')){// 表示されている画像なら
      window.location.hash = '#'+imgID;
      if (location.hash && location.hash.match(/#imgList/)) {
        if ('replaceState' in history)
        history.replaceState('',document.title, window.location.pathname + location.search);
        else window.location.hash = '';
      }
    }else{
      alert('非表示画像です。');
    }
  });
}

/* ---------------------------------------------
マウスオーバー(img)
--------------------------------------------- */
function c_imghover(){
  var ID = 'checkValue_imghover';

  var datTags = document.getElementsByTagName('img');
  var len = datTags.length - jQuery('#debagBar img').length - jQuery('#debagBarSub img').length;
  var allStyle;
  var cssimport = new Array();
  var importPath = new Array();
  var importStyle = '';
  var changeStyle = '';
  var hoverStyle = new Array();

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == true || jQuery('#'+ID).attr('checked') == 'checked'){
    // imgにID付与
    for(var i=0; i<len; i++){
      // imgにIDがない場合のみID付与※
      if(typeof jQuery(datTags[i]).attr('id') == 'undefined' || jQuery(datTags[i]).attr('id') == ''){
        datTags[i].setAttribute('id','c_hover'+i);
      }
    }

    // imgにマウスオーバーイベント付与
    // ※個別にIDがある画像はイベント設定されていて誤作動する場合があるので、イベント付与しない
    for(var i=0; i<len; i++){
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('mouseover',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
      var n = document.getElementById('c_hover'+i);
      if(n !== null){
        n.dispatchEvent(e);
      }
    }

    // styleの取得
    allStyle = getAllStyleRule();

    // @importファイルの取得
    cssimport = allStyle.match(/@import[^\)]*\)/ig);
    var ii = 0;
    for(var i=0; i<cssimport.length; i++){
      $.get(passConversion(cssimport[i].replace(/@import( )*url/, '').replace(/['"]|[\(\)]|\s/ig, '')) ,function(data){
        ii++;
        importStyle += data;
        if(ii == i){
          console.log(importStyle.replace(/\/\*[\s\S]*?\*\//ig,'').replace(/[\n\r]/g,'').replace(/}/g,'}\n'));
        }
      })
    }



    // :hover style取得してhoverなしとして書き込み
    //hoverStyle = allStyle.match(/.*:hover.*/ig);
    //for(var i=0; i<hoverStyle.length; i++){
    //  changeStyle += hoverStyle[i].replace(/:hover/ig, ':link').replace(/;/g, ' !important;').replace(/ !important/ig, '');
    //}
    //var datO = document.createElement('style');
    //var div = document.getElementById('debagBarSub');
    //datO.setAttribute('type','text/css');
    //datO.setAttribute('id','changeStyle');
    //datO.innerHTML = changeStyle;
    //div.appendChild(datO);

  } else {
    // imgにマウスアウトイベント付与
    for(var i=0; i<len; i++){
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

    // style削除
    /*var datO = document.getElementById('changeStyle');
    var div = document.getElementById('debagBarSub');
    div.removeChild(datO);*/
  }
}

/* ---------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------
テストサーバーパス　NGチェック用
--------------------------------------------- */
function ng_dummyLink(){
  var name = 'リンク';
  var description = 'テストサーバーのパスは使われていないか（emarketing,web-works）';
  var value = new Array();
  var ng = 0; // NGフラグ 0:OK 1:NG

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'link',
    'form',
    'img',
    'script'
  );

  // チェックするURL ckUrlsで定義

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area' || Tags[t]=='link'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各URLを順番にチェック
      for (var u=0;u<ckUrls.length;u++) {
        var key = ckUrls[u];
        var re = new RegExp(key,"i");

        if(datT.match(re) && !datT.match(/googleadservices/i) && !datT.match(/advg\.jp/i) && !datT.match(/c\.iogous\.com/i) && !datT.match(/VL\/Trace\?/i) && !datT.match(/g\.doubleclick\.net/i) && !datT.match(/club_t-www\.baynote\.net/i) && !datT.match(/trck\.dlpo\.jp/i)){
          // 値抽出
          value.push(datT);
          ng = 1;
        }
      }
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
テストサーバーパス　個別表示
--------------------------------------------- */
function c_dummyLink(){
  var ID = "checkValue_dummyLink";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'link',
    'form',
    'img',
    'script'
  );

  // チェックするURL ckUrlsで定義

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area' || Tags[t]=='link'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各URLを順番にチェック
      for (var u=0;u<ckUrls.length;u++) {
        var key = ckUrls[u];
        var re = new RegExp(key,"i");

        if(datT.match(re) && !datT.match(/googleadservices\.com/i) && !datT.match(/advg\.jp/i) && !datT.match(/c\.iogous\.com/i) && !datT.match(/VL\/Trace\?/i) && !datT.match(/g\.doubleclick\.net/i) && !datT.match(/club_t-www\.baynote\.net/i) && !datT.match(/trck\.dlpo\.jp/i)){
          ID = "checkValue_dummyLink checkValue_ng2";
          // 何番目のタグか確定
          var datN = datTags[i];
          // 該当箇所に表示
          insertHtml(datN,datT,ID);
        }
      }
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
httpリンク　NGワードチェック乃壱
--------------------------------------------- */
function c_testcheckA(){
  var ID = "c_testcheckA";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'link',
    'form',
    'img',
    'script'
  );

  // チェックするURL ckUrlsで定義

  var scriptLength = 0;
  console.log(Tags);
  console.log(ckUrls);
  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area' || Tags[t]=='link'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各URLを順番にチェック
      for (var u=0;u<ckUrls.length;u++) {
        var key = ckUrls[u];
        var re = new RegExp(key,"i");

        if(datT.match(re) && !datT.match(/googleadservices\.com/i) && !datT.match(/advg\.jp/i) && !datT.match(/c\.iogous\.com/i) && !datT.match(/VL\/Trace\?/i) && !datT.match(/g\.doubleclick\.net/i) && !datT.match(/club_t-www\.baynote\.net/i) && !datT.match(/trck\.dlpo\.jp/i)){
          ID = "checkValue_dummyLink checkValue_ng2";
          // 何番目のタグか確定
          var datN = datTags[i];
          // 該当箇所に表示
          insertHtml(datN,datT,ID);
        }
      }
    }
  }

  checkValueOv();
}
/* ---------------------------------------------
httpリンク　NGワードチェック乃弐
--------------------------------------------- */
function c_testcheckB(){
  var ID = "c_testcheckB";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'link',
    'form',
    'img',
    'script'
  );

  // チェックするURL ckUrlsで定義

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area' || Tags[t]=='link'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各URLを順番にチェック
      for (var u=0;u<ckUrls.length;u++) {
        var key = ckUrls[u];
        var re = new RegExp(key,"i");

        if(datT.match(re) && !datT.match(/googleadservices\.com/i) && !datT.match(/advg\.jp/i) && !datT.match(/c\.iogous\.com/i) && !datT.match(/VL\/Trace\?/i) && !datT.match(/g\.doubleclick\.net/i) && !datT.match(/club_t-www\.baynote\.net/i) && !datT.match(/trck\.dlpo\.jp/i)){
          ID = "checkValue_dummyLink checkValue_ng2";
          // 何番目のタグか確定
          var datN = datTags[i];
          // 該当箇所に表示
          insertHtml(datN,datT,ID);
        }
      }
    }
  }

  checkValueOv();
}
/* ---------------------------------------------
httpリンク　NGワードチェック乃参
--------------------------------------------- */
function c_testcheckC(){
  var ID = "c_testcheckC";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'link',
    'form',
    'img',
    'script'
  );

  // チェックするURL ckUrlsで定義

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area' || Tags[t]=='link'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各URLを順番にチェック
      for (var u=0;u<ckUrls.length;u++) {
        var key = ckUrls[u];
        var re = new RegExp(key,"i");

        if(datT.match(re) && !datT.match(/googleadservices\.com/i) && !datT.match(/advg\.jp/i) && !datT.match(/c\.iogous\.com/i) && !datT.match(/VL\/Trace\?/i) && !datT.match(/g\.doubleclick\.net/i) && !datT.match(/club_t-www\.baynote\.net/i) && !datT.match(/trck\.dlpo\.jp/i)){
          ID = "checkValue_dummyLink checkValue_ng2";
          // 何番目のタグか確定
          var datN = datTags[i];
          // 該当箇所に表示
          insertHtml(datN,datT,ID);
        }
      }
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
httpリンク　NGチェック用
--------------------------------------------- */
function ng_httpsLink(){
  var name = 'リンク';
  var description = 'httpsページ内で、httpで読み込んでいるファイルはないか';
  var value = new Array();
  var ng = 0; // NGフラグ 0:OK 1:NG

  // チェックするタグ
  Tags = new Array(
    'link',
    'img',
    'script'
  );

  var getProtocol = document.location.href;

  // https:にアクセスしているときのみチェック
  if(getProtocol.indexOf('https:')>-1){

    // 検索するタグ分繰り返す
    for (var t=0;t<Tags.length;t++) {
      var datTags = document.getElementsByTagName(Tags[t]);
      var TagsLength = jQuery('#debagBar').find(Tags[t]).length;

      var len = datTags.length - TagsLength;
      // タグによって取得する属性変更
      if(Tags[t]=='link'){
        var atb = 'href';
      }else if(Tags[t]=='img' || Tags[t]=='script'){
        var atb = 'src';
      }

      // タグを順番にチェック
      for(var i=0; i<len; i++){
        var datT = String(datTags[i].getAttribute(atb));

        if(datT.match(/http:/i)){
          // 値抽出
          value.push(datT);
          ng = 1;
        }
      }
    }

  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
httpリンク　個別表示
--------------------------------------------- */
function c_httpsLink(){
  var ID = "checkValue_httpsLink";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  // チェックするタグ
  Tags = new Array(
    'link',
    'img',
    'script'
  );

  var getProtocol = document.location.href;

  // https:にアクセスしているときのみチェック
  if(getProtocol.indexOf('https:')>-1){

    // 検索するタグ分繰り返す
    for (var t=0;t<Tags.length;t++) {
      var datTags = document.getElementsByTagName(Tags[t]);
      var TagsLength = jQuery('#debagBar').find(Tags[t]).length;

      var len = datTags.length - TagsLength;
      // タグによって取得する属性変更
      if(Tags[t]=='link'){
        var atb = 'href';
      }else if(Tags[t]=='img' || Tags[t]=='script'){
        var atb = 'src';
      }

      // タグを順番にチェック
      for(var i=0; i<len; i++){
        var datT = String(datTags[i].getAttribute(atb));

        if(datT.match(/http:/i)){
          ID = "checkValue_httpsLink checkValue_ng2";

          // 何番目のタグか確定
          var datN = datTags[i];
          // 該当箇所に表示
          insertHtml(datN,datT,ID);
        }
      }
    }

  }

  checkValueOv();
}

/* ---------------------------------------------
リンク　個別表示
--------------------------------------------- */
function c_link(){
  var ID = "checkValue_link";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    return false;
  }

  // チェックするタグ
  Tags = new Array(
    'a',
    'area'
  );

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    var len = datTags.length;
    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute('href'));
      // 値抽出
      if (datT == ''){
        datT = 'href=""';
      } else if(datT == 'null'){
        datT = 'hrefがありません';
      }

      var datV = datT;

      // 何番目のタグか確定
      var datN = datTags[i];
      // 該当箇所に表示
      insertHtml(datN,datV,ID);
    }
  }

  checkValueOv();
}

// デコード
function c_link2(){
  var ID = "checkValue_link2";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    return false;
  }

  // チェックするタグ
  Tags = new Array(
    'a',
    'area'
  );

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    var len = datTags.length;
    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute('href'));
      // 値抽出
      if (datT == ''){
        datT = 'href=""';
      } else if(datT == 'null'){
        datT = 'hrefがありません';
      }

      UnescapeAutoDetect=function(str){
        return window["Unescape"+GetEscapeCodeType(str)](str)
      };
      var datV = UnescapeAutoDetect(datT);
      //var datV = decodeURI(datT);

      // 何番目のタグか確定
      var datN = datTags[i];
      // 該当箇所に表示
      insertHtml(datN,datV,ID);
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
リンクパラメーター
--------------------------------------------- */
// 通常
function c_parameter(){
  var ID = "checkValue_parameter";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    return false;
  }

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'form',
    'script'
  );

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // ?があったら
      if(datT.match(/\?/i)){
        // 値抽出
        var datV = datT.match(/\?.*/i)[0].replace(/\?/, '');
        // 何番目のタグか確定
        var datN = datTags[i];
        // 該当箇所に表示
        insertHtml(datN,datV,ID);
      }
    }
  }

  checkValueOv();
}

// 改行表示
function c_parameter_kai(){
  var ID = "checkValue_parameter_kai";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    return false;
  }

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'form',
    'script'
  );

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // ?があったら
      if(datT.match(/\?/i)){
        // 値抽出
        var datV = datT.match(/\?.*/i)[0].replace(/\?/, '').replace(/&/g, '<br>');
        // 何番目のタグか確定
        var datN = datTags[i];
        // 該当箇所に表示
        insertHtml(datN,datV,ID);
      }
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
アンカーリンク／#パラメーター
--------------------------------------------- */
function c_anchor(){
  var ID = "checkValue_anchor";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'form',
    'script'
  );

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='a' || Tags[t]=='area'){
      var atb = 'href';
    }else if(Tags[t]=='img' || Tags[t]=='script'){
      var atb = 'src';
    }else{
      var atb = 'action';
    }

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // #があったら
      if(datT.match(/#/i)){

        // #が先頭だったら
        if(datT.match(/^#/) && datT !== '#'){
          // 値抽出
          var datV = datT.match(/#.*/)[0].replace(/#/, '');

          // ID有無判定
          if(document.getElementById(datV) == null){
            ID = "checkValue_anchor checkValue_ng2";
          }else{
            ID = "checkValue_anchor";
          };
        }

        // 値抽出
        var datV = datT.match(/#.*/i)[0];
        // 何番目のタグか確定
        var datN = datTags[i];
        // 該当箇所に表示
        insertHtml(datN,datV,ID);
      }
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
アンカーリンク　NGチェック用
--------------------------------------------- */
function ng_anchor(){
  var name = 'リンク';
  var description = 'ページ内リンクに対応したIDはあるか（アンカー対応チェック）';
  var value = new Array();
  var ng = 0; // NGフラグ 0:OK 1:NG 22:!

  // チェックするタグ
  Tags = new Array(
    'a',
    'area'
  );

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    var len = datTags.length;
    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute('href'));

      // #があったら
      if(datT.match(/^#/) && datT !== '#'){
        // 値抽出
        var datV = datT.match(/#.*/)[0].replace(/#/, '');

        // ID有無判定
        if(document.getElementById(datV) == null){
          value.push('#' + datV);
          ng = 22;
        };
      }
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
target属性
--------------------------------------------- */
function c_blank(){
  var ID = "checkValue_blank";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    return false;
  }

  // チェックするタグ
  Tags = new Array(
    'a',
    'area',
    'form'
  );

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    var len = datTags.length;

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute('target'));

      // target属性があったら
      if(datT !== 'null'){
        // 値抽出
        var datV = datT;
        // 何番目のタグか確定
        var datN = datTags[i];
        // 該当箇所に表示
        insertHtml(datN,datV,ID);
      }
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
リンク一括抜き出し
--------------------------------------------- */
function ex_link2(){
  toolClearInfoL();

  // 情報エリア表示
  infoView();
  jQuery('#debagBarInfoL .infoHead p').text('リンク一覧');

  var html = getHtml('body');
  var datHtml = html;
  var htmlS = new Array();
  var datS,dat0;

  if(html.match(/<a [^>]*>|<area [^>]*>/i)){
    // aタグ抽出
    if(html.match(/<a [^>]*>/i)){
      var len = html.match(/<a [^>]*>/ig).length;
      for(var i=0; i<len; i++){
        datS = datHtml.replace(/[\s\S]*?(?=<a [^>]*>)/i, '');
        dat0 = datS.match(/[\s\S]*?(?=<\/a>)/)[0] + '</a>';
        datHtml = datS.replace(dat0, '');
        if(dat0.match(/document.write/i)){
          dat0 = 'document.writeを含むのでので抽出できません';
        }
        htmlS.push(dat0);
      }

      // tr生成、thにa出力
      var len = html.match(/<a [^>]*>/ig).length;
      jQuery('#debagBarInfoL #infoTableL').addClass('link');
      for(var i=0; i<len; i++){
        var td = '<tr><th>'+ htmlS[i] +'</th><td class="href"></td><td class="target"></td></tr>';
        jQuery('#debagBarInfoL #infoTableL').append(td);
      }
    }
    // areaタグ抽出
    if(html.match(/<area [^>]*>/i)){
      datS = html.match(/<area [^>]*>/ig);
      for(var i=0; i<datS.length; i++){
        dat0 = datS[i].match(/href=[\'\"][^\'\"]*[\'\"]/i);
        var td = '<tr><th>areaタグです'+ datS[i] +'<td class="href"></td><td class="target"></td></tr>';
        jQuery('#debagBarInfoL #infoTableL').append(td);
      }
    }

    // aからid削除、tdにhref出力
    var len = jQuery('#debagBarInfoL #infoTableL th').length;
    jQuery('#debagBarInfoL #infoTableL th').each(function(){
      var aID =  jQuery(this).children('a').attr('id');
      if(typeof aID !== 'undefined' && aID !== ''){
        jQuery(this).children('a').attr('id', '');
      }

      if(jQuery(this).children('a').size() > 0){
        var href = jQuery(this).children('a').attr('href');
        var target = jQuery(this).children('a').attr('target');
      }else{
        var href = jQuery(this).children('area').attr('href');
        var target = jQuery(this).children('area').attr('target');
      }
      if(typeof href == 'undefined'){
        href = 'hrefがありません';
        //jQuery(this).next('td').addClass('attrNG');
      }
      jQuery(this).next('td').text(href);
      jQuery(this).next('td').next('td').text(target);
    });
  }

  // 高さ調整
  debagBarInfoHeightF('#debagBarInfoL');

  // 一覧のリンククリックで該当に移動
  var len = jQuery('#infoTable th a').length;
  var i=0;
  jQuery('#infoTable th a').each(function(){
    jQuery(this).attr('class', 'aList'+i);
    i++;
  });
  var len = jQuery('#infoTable th area').length;
  var i=0;
  jQuery('#infoTable th area').each(function(){
    jQuery(this).attr('class', 'aList'+i);
    i++;
  });

  jQuery('#infoTable .href').click(function(){
    var aNum = jQuery(this).prev().children().attr('class').replace(/aList/, '');
    if(jQuery(this).prev().children().get(0).tagName == 'A'){
      var datTags = document.getElementsByTagName('a')
    }else{
      var datTags = document.getElementsByTagName('area');
    }
    var datE = jQuery(datTags[aNum]);
    if(datE.attr('id') == '' || datE.attr('id') == 'undefined' || typeof datE.attr('id') == 'undefined'){
      aID = 'aList'+aNum;
      datE.attr('id', aID);
    }else{
      aID = datE.attr('id');
    }
    window.location.hash = '#'+aID;
    if (location.hash && location.hash.match(/#aList/)) {
      if ('replaceState' in history)
      history.replaceState('',document.title, window.location.pathname + location.search);
      else window.location.hash = '';
    }
  });
}

/* ---------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------
半角カナ　NGチェック用
--------------------------------------------- */
function ng_kana(){
  var name = 'コンテンツ';
  var description = '半角カナを使用していないか（ｰﾞﾟ｡｢｣､･を含みます）';
  var value = new Array();
  var ng = 0; //NGフラグ 0:OK 1:NG 20:有?

  _ex_textValue = new Array();// テキスト配列初期化
  _ex_textParent = new Array();// テキスト_親 配列初期化
  searchWithinNodeText(document.body);

  var len = _ex_textValue.length;
  for(var i=0; i<len; i++){
    if(_ex_textValue[i][1].match(/[｡-ﾟ]/)){
      value.push(_ex_textValue[i][1]);
      ng = 20;
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
半角カナ　個別表示
--------------------------------------------- */
function c_kana(){
  var ID = 'checkValue_kana';

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValueClass(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  _ex_textValue = new Array();// テキスト配列初期化
  _ex_textParent = new Array();// テキスト_親 配列初期化
  searchWithinNodeText(document.body);

  var len = _ex_textValue.length;
  for(var i=0; i<len; i++){
    if(_ex_textValue[i][1].match(/[｡-ﾟ]/)){
      jQuery(_ex_textParent[i]).addClass(ID);
    }
  }
}

/* ---------------------------------------------
テキスト一括抜き出し
--------------------------------------------- */
function ex_text(){
  toolClearInfoL();

  _ex_textValue = new Array();// テキスト配列初期化
  _ex_textParent = new Array();// テキスト_親 配列初期化
  searchWithinNodeText(document.body);

  // 情報エリア表示
  infoView();
  jQuery('#debagBarInfoL .infoHead p').text('テキスト一覧');
  jQuery('#debagBarInfoL .infoHead span').remove();
  jQuery('#debagBarInfoL').addClass('debagBarInfoS');
  var tr = '<tr><td></td></tr>';
  jQuery('#debagBarInfoL #infoTableL').append(tr);

  var len = _ex_textValue.length;
  for(var i=0; i<len; i++){
    var text = _ex_textValue[i][1] + '<br>';
    jQuery('#debagBarInfoL #infoTableL td').append(text);
  }

  // 高さ調整
  debagBarInfoHeightF('#debagBarInfoL');
}

/* ---------------------------------------------
ダミーテキスト　NGチェック用
--------------------------------------------- */
function ng_dummyText(){
  var name = 'コンテンツ';
  var description = 'ダミーの文章はないか（ダミー,テスト,テキスト,yyyy.mm.ddなど）';
  var value = new Array();
  var ng = 0; // NGフラグ 0:OK 1:NG

  _ex_textValue = new Array();// テキスト配列初期化
  _ex_textParent = new Array();// テキスト_親 配列初期化
  searchWithinNodeText(document.body);

  // チェックするダミーテキスト ckDummysで定義

  var len = _ex_textValue.length;
  for(var i=0; i<len; i++){
    // 検索するテキスト分繰り返す
    for (var t=0;t<ckDummys.length;t++) {
      re = new RegExp(ckDummys[t], 'ig');
      if(_ex_textValue[i][1].match(re)){
        value.push(_ex_textValue[i][1]);
        ng = 1;
      }
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
ダミーテキスト　個別表示
--------------------------------------------- */
function c_dummyText(){
  var ID = 'checkValue_dummyText';

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValueClass(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  ngTooltip(ID);

  _ex_textValue = new Array();// テキスト配列初期化
  _ex_textParent = new Array();// テキスト_親 配列初期化
  searchWithinNodeText(document.body);

  // チェックするダミーテキスト ckDummysで定義

  var len = _ex_textValue.length;
  for(var i=0; i<len; i++){
    // 検索するテキスト分繰り返す
    for (var t=0;t<ckDummys.length;t++) {
      re = new RegExp(ckDummys[t], 'ig');
      if(_ex_textValue[i][1].match(re)){
        jQuery(_ex_textParent[i]).addClass(ID);
      }
    }
  }
}

/* ---------------------------------------------
ダミーファイル　NGチェック用
--------------------------------------------- */
function ng_dummyFile(){
  var name = 'コンテンツ';
  var description = 'ダミー・テストのファイルを使用していないか（dummy,test,sample）';
  var value = new Array();
  var ng = 0; // NGフラグ 0:OK 1:NG

  // チェックするファイル名
  testFile = new Array(
    'dummy',
    'test',
    'sample'
  );

  // チェックするタグ
  Tags = new Array(
    'link',
    'img',
    'script'
  );

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='link'){var atb = 'href'}else{var atb = 'src'}

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各ファイル名を順番にチェック
      for (var u=0;u<testFile.length;u++) {
        var key = testFile[u];
        var re = new RegExp(key,"i");

        if(datT.match(re)){
          // 値抽出
          value.push(datT.replace(/.*[^\/]\//, ''));
          ng = 1;
        }
      }
    }
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
ダミーファイル　個別表示
--------------------------------------------- */
function c_dummyFile(){
  var ID = "checkValue_dummyFile";

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');
    return false;
  }

  // チェックするファイル名
  testFile = new Array(
    'dummy',
    'test',
    'sample'
  );

  // チェックするタグ
  Tags = new Array(
    'link',
    'img',
    'script'
  );

  ngTooltip(ID);

  var scriptLength = 0;

  // 検索するタグ分繰り返す
  for (var t=0;t<Tags.length;t++) {
    var datTags = document.getElementsByTagName(Tags[t]);
    if (Tags[t] == 'script'){
      scriptLength = jQuery('#debagBar script').length;
    }
    var len = datTags.length - scriptLength;
    // タグによって取得する属性変更
    if(Tags[t]=='link'){var atb = 'href'}else{var atb = 'src'}

    // タグを順番にチェック
    for(var i=0; i<len; i++){
      var datT = String(datTags[i].getAttribute(atb));

      // 各ファイル名を順番にチェック
      for (var u=0;u<testFile.length;u++) {
        var key = testFile[u];
        var re = new RegExp(key,"i");

        if(datT.match(re)){
          ID = "checkValue_dummyFile checkValue_ng2";
          // 値抽出
          var datV = datT.replace(/.*[^\/]\//, '');
          // 何番目のタグか確定
          var datN = datTags[i];
          // 該当箇所に表示
          insertHtml(datN,datV,ID);
        }
      }
    }
  }

  checkValueOv();
}

/* ---------------------------------------------
空タグ　個別表示
--------------------------------------------- */
function c_emptyTag(){
  var ID = 'checkValue_emptyTag';

  // チェックボックスチェック
  if (jQuery('#'+ID).attr('checked') == false || typeof jQuery('#'+ID).attr('checked') == 'undefined'){
    ClearCheckValue(ID);
    ClearCheckValue(ID+'_ng');

    var objD = jQuery('.'+ID+'_c');
    jQuery(objD).removeClass(ID+'_c');
    /*var objD = document.getElementsByClassName(ID+'_c');
    while(objD.length > 0){
      jQuery(objD[0]).removeClass(ID+'_c');
    }*/

    return false;
  }

  searchWithinNodeEmpty_c(document.body);

  ngTooltip(ID);

}

function searchWithinNodeEmpty_c(node){
  if( node.nodeType==1 &&
    node.childNodes &&
    node.tagName.toUpperCase()!="SCRIPT" &&
    node.tagName.toUpperCase!="STYLE" &&
    node.tagName !== 'LINK' &&
    node.tagName !== 'IFRAME' &&
    node.tagName !== 'BR' &&
    node.tagName !== 'IMG' &&
    node.tagName !== 'AREA' &&
    node.tagName !== 'INPUT' &&
    node.tagName !== 'HR' &&
    node.tagName !== 'EMBED' &&
    node.tagName !== 'COL' &&
    node.getAttribute('id') !== 'debagBar' && node.getAttribute('id') !== 'debagBarSub' && node.getAttribute('id') !== 'debagBarInfo' && node.getAttribute('id') !== 'debagBarInfoL' && node.getAttribute('id') !== 'debagBarInfoSS'
  ){
    if(node.childNodes.length == 0){// NG
      node.setAttribute('class', 'checkValue_emptyTag_c');
    }
    // 子ノードについて繰り返し処理
    for (var child=0;child < node.childNodes.length;child++){
      searchWithinNodeEmpty_c(node.childNodes[child]);
    }
  }
  return;
}

/* ---------------------------------------------
空タグ　NGチェック用
--------------------------------------------- */
function ng_emptyTag(){
  var name = 'ソース検証';
  var description = '空タグの有無（JSで使用していても発見したら有と表示されます）';
  var value;
  _emptyTagNG = 13; //NGフラグ初期化 0:OK 1:NG 13:無OK 20:有?

  // domTemp作成
  var div = document.getElementById('debagBar');
  var dat0 = document.createElement('div');
  dat0.setAttribute('id','domTemp');
  div.appendChild(dat0);

  searchWithinNodeEmpty(document.body);

  // domTempに格納された空タグクローンを取得
  value = htmlEscape(dat0.innerHTML);

  var rv = [name, description, value, _emptyTagNG];
  dat0.parentNode.removeChild(dat0);
  return rv;
}

function searchWithinNodeEmpty(node){
  if( node.nodeType==1 &&
    node.childNodes &&
    node.tagName.toUpperCase()!="SCRIPT" &&
    node.tagName.toUpperCase!="STYLE" &&
    node.tagName !== 'LINK' &&
    node.tagName !== 'IFRAME' &&
    node.tagName !== 'BR' &&
    node.tagName !== 'IMG' &&
    node.tagName !== 'AREA' &&
    node.tagName !== 'INPUT' &&
    node.tagName !== 'HR' &&
    node.tagName !== 'EMBED' &&
    node.tagName !== 'COL' &&
    node.getAttribute('id') !== 'debagBar' && node.getAttribute('id') !== 'debagBarSub' && node.getAttribute('id') !== 'debagBarInfo' && node.getAttribute('id') !== 'debagBarInfoL' && node.getAttribute('id') !== 'debagBarInfoSS'
  ){
    if(node.childNodes.length == 0){// NG
      // 空タグのクローンをdomTempに作成
      var dat0 = node.cloneNode();
      document.getElementById('domTemp').appendChild(dat0);
      _emptyTagNG = 20;
    }
    // 子ノードについて繰り返し処理
    for (var child=0;child < node.childNodes.length;child++){
      searchWithinNodeEmpty(node.childNodes[child]);
    }
  }
  return;
}

/* ---------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------
ADPLAN　※複数抽出対応済み
--------------------------------------------- */
function t_adplan(html){
  var name = 'ADPLAN';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/o\.advg\.jp\/ojs\?/i)){
    var tags = html.match(/o\.advg\.jp\/ojs\?/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※ADPLAN タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/o\.advg\.jp\/ojs\?/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
CAMPワンタグ　※複数抽出対応済み
--------------------------------------------- */
function t_camp(html){
  var name = 'CAMPワンタグ';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/ot\.ca-mpr\.jp/i)){
    var tags = html.match(/ot\.ca-mpr\.jp/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※CAMPワンタグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/ot\.ca-mpr\.jp/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
DLPO　※複数抽出対応済み
--------------------------------------------- */
function t_dlpo(html){
  var name = 'DLPO';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // 必要JSファイル
  if(html.match(/DLPO\.js/i)){
    var tags = html.match(/DLPO\.js/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※必要JSファイルが複数セットされています</span><br>';
    }

    if(html.match(/<script [^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script [^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/DLPO\.js/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }
  // タグ用記述
  if(html.match(/DLPOCreate/i)){
    var tags = html.match(/DLPOCreate/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※DLPO タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/DLPOCreate/i)){
          ii++;
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }
  // DLPOが配信されないときの表示内容を出す領域
  if(html.match(/<div [^>]*>/i)){
    var htmlS = html.match(/<div [^>]*>/ig);
    var len = htmlS.length;
    var ii = 0;
    for(var i=0; i<len; i++){
      if(htmlS[i].match(/DLPODefault/i)){
        value += htmlEscape(htmlS[i]) + '…&lt;/div&gt;<br>';
        ii++;
      }
    }
    // 検出出来ない場合
    if(html.match(/DLPO\.js/i) && html.match(/DLPOCreate/i) && ii == 0){
      value += '<span class="cautions_red">※DLPOが配信されているか、DLPOが配信されないときの表示エリアが設置されていません</span><br>';
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
GENEE　※複数抽出対応済み
--------------------------------------------- */
function t_genee(html){
  var name = 'GENEE';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/http:\/\/ad\.yieldmanager\.com\/pixel\?id=/i)){
    var tags = html.match(/http:\/\/ad\.yieldmanager\.com\/pixel\?id=/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※GENEE タグが複数セットされています</span><br>';
    }

    if(html.match(/<script [^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script [^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/http:\/\/ad\.yieldmanager\.com\/pixel\?id=/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
Google リマーケティング タグ　※複数抽出対応済み
--------------------------------------------- */
function t_remarketing(html){
  var name = 'Google AdWords<br>リマーケティング タグ';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/google_conversion_id( *)=/i)){
    var tags = html.match(/google_conversion_id( *)=/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※リマーケティング タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/google_conversion_id( *)=/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }
  // 必要JSファイル
  if(html.match(/googleadservices\.com\/pagead\/conversion\.js/i)){
    var tags = html.match(/googleadservices\.com\/pagead\/conversion\.js/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※必要JSファイルが複数セットされています</span><br>';
    }

    if(html.match(/<script [^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script [^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/googleadservices\.com\/pagead\/conversion\.js/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
Google Analytics タグ　※複数抽出対応済み
--------------------------------------------- */
function t_ga(html){
  var name = 'Google Analytics';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // 通常のタグの場合
  if(html.match(/_gaq.push\(\[[\'\"’”]_setAccount[\'\"’”]/i)){
    var tags = html.match(/_gaq.push\(\[[\'\"’”]_setAccount[\'\"’”]/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※Google Analytics タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/_gaq.push\(\[[\'\"’”]_setAccount[\'\"’”]/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }
  // 古いタグの場合
  if(html.match(/pageTracker.*=.*_gat._getTracker\(['"’”][^'"’”]*['"’”]\)/i)){
    value += '<span class="cautions_red">※古いタグが使われています</span><br>';

    // 必要JSファイル
    var tags = html.match(/pageTracker.*=.*_gat._getTracker\(['"’”][^'"’”]*['"’”]\)/ig);
    var len = tags.length;
    var ii = 0;
    if(len>1){
      value += '<span class="cautions_red">※必要JSファイルが複数セットされています</span><br>';
    }
    if(html.match(/<script [^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script [^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/gaJsHost \+ ['"]google-analytics\.com\/ga\.js/i) && !htmlS[i].match(/_gaq.push\(\[[\'\"’”]_setAccount[\'\"’”]/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }

    // タグ用記述
    if(html.match(/_getTracker/i)){
      var tags = html.match(/_getTracker/ig);
      var taglen = tags.length;

      if(taglen>1){
        value += '<span class="cautions_red">※古い Google Analytics タグが複数セットされています</span><br>';
      }

      if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
        var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
        var len = htmlS.length;
        var ii = 0;
        for(var i=0; i<len; i++){
          if(htmlS[i].match(/_getTracker/i)){
            ii++;
            var fw_ck = FullWidth(htmlS[i]);
            if(fw_ck[1] == 1){
              value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
            }
            if(ii !== taglen){
              value += htmlEscape(htmlS[i]) + '<hr>';
            }else{
              value += htmlEscape(htmlS[i]) + '<br>';
            }
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
Google タグマネージャ　※複数抽出対応済み
--------------------------------------------- */
function t_gtm(html){
  var name = 'Google タグマネージャ';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/googletagmanager\.com\/gtm\.js\?id=[ '"’”]*\+i\+dl/i)){
    var tags = html.match(/googletagmanager\.com\/gtm\.js\?id=[ '"’”]*\+i\+dl/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※Google タグマネージャが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/googletagmanager\.com\/gtm\.js\?id=[ '"’”]*\+i\+dl/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
MicroAd BLADE　※複数抽出対応済み
--------------------------------------------- */
function t_blade(html){
  var name = 'MicroAd BLADE';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/var blade_co_account_id( *)=/i)){
    var tags = html.match(/var blade_co_account_id( *)=/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※MicroAd BLADE タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/var blade_co_account_id( *)=/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }
  // 必要JSファイル
  if(html.match(/<script [^>]*>/i)){
    var htmlS = html.match(/<script [^>]*>[\s\S]*?<\/script>/ig);
    var len = htmlS.length;
    for(var i=0; i<len; i++){
      if(htmlS[i].match(/d-cache\.microad\.jp\/js\/bl_track\.js/i)){
        var fw_ck = FullWidth(htmlS[i]);
        if(fw_ck[1] == 1){
          value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
        }
        value += htmlEscape(htmlS[i]) + '<br>';
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
RTmetrics　※複数抽出するがアラート無し
--------------------------------------------- */
function t_rtmetrics(html){
  var name = 'RTmetrics';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  if(html.match(/<meta name=['"’”]RT_[^>]*>/i)){
    var htmlS = html.match(/<meta name=['"’”]RT_[^>]*>/ig);
    var len = htmlS.length;
    for(var i=0; i<len; i++){
      var fw_ck = FullWidth(htmlS[i]);
      if(fw_ck[1] == 1){
        value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
      }
      value += htmlEscape(htmlS[i]) + '<br>';
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
SiteCatalyst
--------------------------------------------- */
function t_sitecatalyst(html){
  var name = 'SiteCatalyst(β版)';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value;
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  if(html.match(/<!--[^>]*SiteCatalyst code/i)){
    value = 'SiteCatalystを導入している可能性があります';
  }else if(html.match(/<!--[^>]*SiteCatalyst/i)){
    value = 'SiteCatalystを導入しているかもしれません';
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
ビジョナリストタグ　※複数抽出対応済み
--------------------------------------------- */
function t_visionalist(html){
  var name = 'ビジョナリスト';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/<script[^>]*VL\/Trace\?/i)){
    var tags = html.match(/<script[^>]*VL\/Trace\?/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※ビジョナリスト タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;

      for(var i=0; i<len; i++){
        if(htmlS[i].match(/VL\/Trace\?/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
YDN　※複数抽出対応済み
--------------------------------------------- */
function t_ydn(html){
  var name = 'YDN<br>サイトリターゲティング';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/yahoo_retargeting_id/i)){
    var tags = html.match(/yahoo_retargeting_id/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※サイトリターゲティング タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/yahoo_retargeting_id/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }
  // 必要JSファイル
  if(html.match(/b92\.yahoo\.co\.jp\/js\/s_retargeting\.js/i)){
    var tags = html.match(/b92\.yahoo\.co\.jp\/js\/s_retargeting\.js/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※必要JSファイルが複数セットされています</span><br>';
    }

    if(html.match(/<script [^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script [^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/b92\.yahoo\.co\.jp\/js\/s_retargeting\.js/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

    var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
Yahoo!タグマネージャー　※複数抽出対応済み
--------------------------------------------- */
function t_ytm(html){
  var name = 'Yahoo!タグマネージャー';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/tagjs\.src( )*=( )*['"’”]\/\/s\.(yjtag\.jp|btstatic\.com)\/tag\.js#site=/i)){
    var tags = html.match(/tagjs\.src( )*=( )*['"’”]\/\/s\.(yjtag\.jp|btstatic\.com)\/tag\.js#site=/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※Yahoo!タグマネージャーが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/tagjs\.src( )*=( )*['"’”]\/\/s\.(yjtag\.jp|btstatic\.com)\/tag\.js#site=/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
WebAntennaタグ　※複数抽出対応済み
--------------------------------------------- */
function t_webAntenna(html){
  var name = 'WebAntenna';
  var description = '必要な設定を正しく記述しているか（指示と一致しているか）';
  var value = '';
  var ng = 0; // NGフラグ 0:OK 1:NG

  // 抽出
  // タグ用記述
  if(html.match(/webantenna\(\);/i)){
    var tags = html.match(/webantenna\(\);/ig);
    var taglen = tags.length;

    if(taglen>1){
      value += '<span class="cautions_red">※WebAntenna タグが複数セットされています</span><br>';
    }

    if(html.match(/<script[^>]*>[\s\S]*?<\/script>/i)){
      var htmlS = html.match(/<script[^>]*>[\s\S]*?<\/script>/ig);
      var len = htmlS.length;
      var ii = 0;
      for(var i=0; i<len; i++){
        if(htmlS[i].match(/webantenna\(\);/i)){
          ii++;
          var fw_ck = FullWidth(htmlS[i]);
          if(fw_ck[1] == 1){
            value += '<span class="cautions_red">全角の'+ fw_ck[0] +'が入っています</span><br>';
          }
          if(ii !== taglen){
            value += htmlEscape(htmlS[i]) + '<hr>';
          }else{
            value += htmlEscape(htmlS[i]) + '<br>';
          }
        }
      }
    }
  }

  if (!value){
    value = 'none';
  }

  var rv = [name, description, value, ng];
  return rv;
}

/* ---------------------------------------------
全角チェック
--------------------------------------------- */
function FullWidth(html){
  var ng = 0; // NGフラグ 0:OK 1:NG
  var value = '';

  if(html.match(/’/i)){
    ng = 1;
    value += '’';
  }
  if(html.match(/”/i)){
    ng = 1;
    value += '”';
  }

  var rv = [value, ng];
  return rv;
}

/* ---------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------
ソース取得
--------------------------------------------- */
function getHtml(type){
  switch(type){
    case 'html':
      var htmlAll = document.getElementsByTagName("html")[0].innerHTML;
      var htmlS = htmlAll.replace(/<![\s\S]*?-->/ig,'').replace(/\/\*[\s\S]*?\*\//ig,'').replace(/<div id=\"debagBar.*/,'');
      return htmlS;
    case 'html2':
      var htmlAll = document.getElementsByTagName("html")[0].innerHTML;
      var htmlS = htmlAll.replace(/<div id=\"debagBar.*/,'');// コメントreplaceしない。scriptチェック用。
      return htmlS;
    case 'head':
      var headAll = document.getElementsByTagName("head")[0].innerHTML;
      var headS = headAll.replace(/<![\s\S]*?-->/ig,'').replace(/\/\*[\s\S]*?\*\//ig,'');
      return headS;
    case 'body':
      var bodyAll = document.getElementsByTagName("body")[0].innerHTML;
      var bodyS = bodyAll.replace(/<![\s\S]*?-->/ig,'').replace(/\/\*[\s\S]*?\*\//ig,'').replace(/<div id=\"debagBar.*/,'');
      return bodyS;
  }
}

/* ---------------------------------------------
ノード巡回してテキスト取得
--------------------------------------------- */
function searchWithinNodeText(node){
  var pos;
  if( node.nodeType==1 ){
    if( node.tagName == 'IMG' ){// imgのalt抽出
      var alt = node.getAttribute('alt');
      if(alt !== "" && alt !== null){
        _ex_textValue.push(['alt', alt]);
        _ex_textParent.push(node.parentNode);
      }
    }

    if( node.childNodes && node.tagName.toUpperCase()!="SCRIPT" && node.tagName.toUpperCase()!="NOSCRIPT" && node.tagName.toUpperCase!="STYLE" && node.getAttribute('id') !== 'debagBar' && node.getAttribute('id') !== 'debagBarSub' && node.getAttribute('id') !== 'debagBarInfo' && node.getAttribute('id') !== 'debagBarInfoL' && node.getAttribute('id') !== 'debagBarInfoSS' ){
      // 子ノードについて3になるまで繰り返し処理
      for (var child=0;child < node.childNodes.length;child++){
        searchWithinNodeText(node.childNodes[child]);
      }
    }
  }else if( node.nodeType==3 ){ // テキストノード
    if(node.data.match(/[^ \f\n\r\t\v]/)){// 空ではなかったらテキスト抽出
      _ex_textValue.push(['text', node.data]);
      _ex_textParent.push(node.parentNode);
    }
  }
  return;
}

/* ---------------------------------------------
style一括取得
--------------------------------------------- */
function getAllStyleRule() {
  var styleSheets = document.styleSheets;
  var str = '';
  var len = styleSheets.length - 1;// debagツールのcss除外
  for (var i = 0; i < len ; i++) {
    var styleSheet = styleSheets[i];
    var rules = styleSheet.rules || styleSheet.cssRules;
    str += "[" + styleSheet.href + "]\n";

    for (var j = 0; j < rules.length; j++) {
      var rule = rules[j];
      /*str += rule.selectorText + " {\n";*/
      str += rule.cssText + "\n";
      /*str += "}\n";*/
    }
  }
  return(str);
}

/* ---------------------------------------------
パス変換
--------------------------------------------- */
function passConversion(src){
  var protocol = window.location.protocol;
  var location = window.location.host;
  var locationH = window.location.href.match(/.*\//);
  var lpass = window.location.pathname.match(/.*\//);
  var locationP = lpass[0].replace(/^\//, '').replace(/\/$/, '');
  var locationArray = locationP.split('/');
  var pass;

  if (src == '' || src == null || typeof src == 'undefined') {
    pass = '';
  }else if (src.match(/http/)){
    pass = src;
  }else if (src.match(/^(\/\/)/)) {
    pass = protocol + src;
  }else if (src.match(/^(\/)/)){
    pass = protocol +'//'+ location + src;
  }else if (src.match(/^(\.\/)/)){
    pass = locationH[0] + src.replace(/^(\.\/)/, '');
  }else if (src.match(/^(\.\.\/)/)){
    var srclen = src.match(/\.\.\//g).length;
    pass = protocol +'//'+ location;
    for (var i=0; i<locationArray.length - srclen; i++){
      pass += locationArray[i] + '/';
    }
    if(locationArray.length == 1){pass += '/'}
    pass += src.replace(/\.\.\//g, '');
  }else if (src.match(/^[^\.]/)){
    pass = locationH[0] + src;
  }else{
    pass = src;
  }

  return pass;
}

/* ---------------------------------------------
HTMLのエスケープ処理
--------------------------------------------- */
function htmlEscape(s){
  s=s.replace(/&/g,'&amp;');
  s=s.replace(/>/g,'&gt;');
  s=s.replace(/</g,'&lt;');
  s=s.replace(/\"/g,'&quot;');
  s=s.replace(/\'/g,'&nbsp;');
  s=s.replace(/\n/g,'<br>');
  return s;
}

