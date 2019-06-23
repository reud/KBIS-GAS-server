var ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
var SEARCH_LINES = 300;

function linebot(e) {
  // WebHookで受信した応答用Token
  var ev = JSON.parse(e.postData.contents).events[0];
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  return checkStatus(ev);

}

function textReader(ev) {
  var txt = ev.message.text;
  if (txt == "check") {
    var name = nameSearcher(ev);
    if (typeof name === 'undefined') {
      return txtReplyer(ev.replyToken,"あなたの名前は見つかりませんでした。　\n 未登録の可能性があります。 registerと打って登録を開始してください");
    }
    var line = lineFinder(name);
    return txtReplyer(ev.replyToken,getMoneySentence(line));
  } else if (txt == "id") {
    return txtReplyer(ev.replyToken,ev.source.userId);
  } else if (txt == "group_check") {
    return txtReplyer(ev.replyToken,getGroupMessage());
  } else if (txt == "register") {
    writeStatus(ev,"register");
    return txtReplyer(ev.replyToken,"登録モードに移行します。 \n あなたの名前を<苗字 名前>の形で入れてください。 例:\n法政 太郎");
  }
  return txtReplyer(ev.replyToken,"Hello");
}

function txtReplyer(replyToken,message) {
  var url = 'https://api.line.me/v2/bot/message/reply';

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function nameSearcher(ev) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("datas");
  for (var line=1 ;line<=SEARCH_LINES ;line++) {
    if (ev.source.userId == sheet.getRange(line,2).getValue()){
      return sheet.getRange(line,1).getValue()
    }
  }
}
