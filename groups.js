var GROUP_LINES = 8;


function getGroupMoneySentence(line) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("groups");
  return " "+sheet.getRange(line,1).getValue()+": "+sheet.getRange(line,2).getValue()+"円";
}

function getGroupMessage() {
  retText = ""
  for (var line = 1 ; line<=GROUP_LINES; line++){
    retText+=getGroupMoneySentence(line)+"\n";
  } 
  return retText;
}