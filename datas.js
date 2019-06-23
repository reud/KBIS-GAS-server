function myFunction() {
  
}


function writeOnDatas(name,id) {
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("datas");
  sheet.appendRow([name,id]);
}