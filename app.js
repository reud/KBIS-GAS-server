function doPost(e) {
  try {
    var lss =  SpreadsheetApp.getActiveSpreadsheet();
    var lsheet = lss.getSheetByName("loggs");
    var jsonString = e.postData.getDataAsString('utf8');
    lsheet.appendRow([new Date(),jsonString]);
    var data = JSON.parse(jsonString);
    if (typeof data.members === 'undefined'){
      // LINE BOT
      return linebot(e)
    } else {
      writeUsers(data.members);
      writeGroups(data.groups);
      return getSendOK();
    }
  } catch(e) {
    var ss =  SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("loggs");
    sheet.appendRow([e]);
  }
  
}
function writeUsers(members) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("users");
  var size = Object.keys(members).length;
  var line=1;
  for (var i=0;i<size;i++) {
    sheet.getRange(line,1).setValue(members[i].name);
    sheet.getRange(line,2).setValue(members[i].gen);
    sheet.getRange(line,3).setValue(members[i].money);
    sheet.getRange(line,4).setValue(members[i].bikou);
    line++;
  }
}
function writeGroups(groups) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("groups");
  var size = Object.keys(groups).length;
  var line=1;
  for (var i=0;i<size;i++) {
    sheet.getRange(line,1).setValue(groups[i].name);
    sheet.getRange(line,2).setValue(groups[i].money);
    line++;
  }
}


function getSendOK() {
  var res = {};
  res["result"] = "OK";
  payload = JSON.stringify(res)
  ContentService.createTextOutput()
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);
  // return response-data
  return output;
}
