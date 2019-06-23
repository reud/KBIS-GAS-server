
function lineFinder(name) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("users");
  for (var line=1 ;line<=SEARCH_LINES ;line++) {
    if (name == sheet.getRange(line,1).getValue()){
      return line
    }
  }
  return;
}

function getMoneySentence(line) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("users");
  return  (sheet.getRange(line,3).getValue() - 0) > 0 ? "滞納額は"+sheet.getRange(line,3).getValue()+"円です。" : sheet.getRange(line,3).getValue() * -1+"円の返金があります。"
}