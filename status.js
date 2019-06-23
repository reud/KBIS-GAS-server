var LOG_LINES = 100;
function checkStatus(ev) {
  var status = getStatus(ev);
  if (status=="clean") {
    return textReader(ev);
  } else if (status == "register") {

    return registerResultSend(ev);
  }
  return textReader(ev);
}

function getStatus(ev) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("statuses");
  for (var line=1 ;line<=LOG_LINES ;line++) {
    if (ev.source.userId == sheet.getRange(line,1).getValue()){
      return sheet.getRange(line,2).getValue();
    }
  } 
  return "clean";
}

function writeStatus(ev,status) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("statuses");
  for (var line=1 ;line<=LOG_LINES ;line++) {
    if (ev.source.userId == sheet.getRange(line,1).getValue()){
      sheet.getRange(line,2).setValue(status);
      return;
    }
  }
  sheet.appendRow([ev.source.userId,status]);
  return;
}

function registerResultSend(ev) {
  var li = lineFinder(ev.message.text);
  if (typeof li === 'undefined') {
    return txtReplyer(ev.replyToken,"あなたの名前は見つかりませんでした。　\n 無駄な空白とか入ってませんか？　\n 名字と名前の間に半角スペースを入れ忘れていませんか？ \n もう一度お試しください");
  }
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("users");
  writeStatus(ev,"clean");
  writeOnDatas(sheet.getRange(li,1).getValue(),ev.source.userId);
  return txtReplyer(ev.replyToken,"登録完了しました！ checkと打つと滞納額を確認できます！");
}
