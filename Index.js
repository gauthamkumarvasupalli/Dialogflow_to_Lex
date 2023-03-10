const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');

// Intents which will be trained
trainIntents=["Intent_name1","Intent_name2"] // Give the names of Intents you want to train in Lex from dialogflow into this array.

// create a new Excel workbook and add a new worksheet
const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('Datamain');

// add headers to the worksheet
worksheet.columns = [
  { header: 'Intent', key: 'intent' },
  { header: 'Text', key: 'text' },
];


// reading Lex data
let rawdata = fs.readFileSync('./Lex_json.json');
let azdpsdata= JSON.parse(rawdata);

let z=[]
for(i=0;i<azdpsdata["resource"]["intents"].length;i++)
{
z.push(azdpsdata["resource"]["intents"][i]["name"])
}


//reading files of dialogflow
const directoryPath = './intents';
g = [];
let pk = fs.readdirSync(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
});

for (i = 0; i < pk.length; i++) {
  file = pk[i];

  if (file.includes('usersays_en')) {
    file = file.replace("_usersays_en.json", "");
    g.push(file);
  }
}

// common Intents in both Dialogflow and Lex
const commonElements = g.filter(x => z.indexOf(x) !== -1);
for(i=0;i<trainIntents.length;i++)
{
  if(commonElements.includes(trainIntents[i]))
  {
    let filename = "./intents/" + trainIntents[i] + "_usersays_en.json";
    let fileData = fs.readFileSync(filename);
    let data = JSON.parse(fileData);

    //reading the data from dialogflow
    let values=[]
    for (j = 0; j < data.length; j++) {
      let s = '';
      for (k = 0; k< data[j]['data'].length; k++) {
        s = s.concat(data[j]['data'][k]['text']);
      }
       t=s
      .replace(/[^.\sa-zA-Z0-9]/g, '') // Remove special characters
      .trim(); // Remove leading/trailing spaces
      values.push(t)
    }
    //updating the utterances in Lex agent

    for(t=0;t<azdpsdata["resource"]["intents"].length;t++)
      {
        if(azdpsdata["resource"]["intents"][t]["name"]==trainIntents[i])
        {
          for(p=0;p<values.length;p++)
          {
          azdpsdata["resource"]["intents"][t]["sampleUtterances"].push(values[p])
          worksheet.addRow({
            intent:trainIntents[i],
            text: values[p],
          });
          }
        }
      }
      
   
      fs.writeFileSync('./data2.json',JSON.stringify(azdpsdata), 'utf-8')


  }
  else{
    console.log("Intent is not present:"+trainIntents[i])
  }
}

workbook.xlsx.writeFile('./datamain.xlsx')
  .then(() => {
    console.log('Data written to the Excel file');
  })
  .catch(err => {
    console.error(err);
  });
