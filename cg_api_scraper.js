/*
this code generates a json object by srcaping data from the custom games api at:
https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API#CBaseAnimating

starting from <b></b> tag
*/
console.log("beginning task...")
var body = document.getElementsByTagName("BODY")[0];

var content = body.childNodes[0].childNodes;

var classes = [];
var heading = "";
var desc = "";
var extendsClass = "";
var accessor = "";
var functions = {};
var i=0;
var flag = true;

//classes
for (i = 0; i < content.length && flag; i++)
{
  var tagName = content[i].tagName;

  if(tagName != undefined)
  {
    //title
    if (tagName == "H3")
    {
      heading = content[i].firstChild.textContent;
      console.log("parsing: " + heading)
    }
    //description
    else if (tagName == "P")
    {
      desc = content[i].firstChild.textContent;
      if (desc == "No Description Set")
      {
        desc = "";
      }
      else if (desc.startsWith("Global accessor"))
      {
        accessor = content[i].getElementsByTagName("code")[0].textContent.trim();
        desc = "";
      }
    }
    //functions
    else if (tagName == "TABLE")
    {

      //tr nodes in table
      var rows = content[i].getElementsByTagName("tbody")[0].getElementsByTagName("TR");

      //index 0 is heading of table
      for(var a = 1; a < rows.length; a++)
      {
        var rowData = rows[a].getElementsByTagName("TD")
        var funcName = rowData[0].getElementsByTagName("a")[0].textContent.trim()
        var signature = rowData[1].getElementsByTagName("code")[0].textContent.trim()
        var funcDesc = rowData[2].textContent.trim()

        functions[funcName] = {
          signature : signature,
          description : funcDesc
        };
      }
      
      classes.push({
        title : heading,
        description : desc,
        funcs : functions,
        extends : extendsClass,
        accessor : accessor
      });

      heading = "";
      desc = "";
      extendsClass = "";
      accessor = "";
      functions = {};
    }
    //start of constants tables
    else if (tagName == "H4") 
    {
      flag = false;
    }
    //extends
    else if(tagName == "DL")
    {
      var res = content[i].querySelector("a");
      if(res !== undefined)
      {
        extendsClass = res.textContent.trim();
      }
    }
    else
    {
      console.log(content[i].tagName)
    }
  }
}

//constants
var constants = [];
var title = "";
i-=1;
while (i < content.length)
{
  var tagName = content[i].tagName;
  
  //title
  if(tagName == "H4")
  {
    title = content[i].getElementsByTagName("span")[0].textContent.trim();
    console.log("parsing: " + title)
  }
  //table
  else if(tagName == "TABLE")
  {
    var values = [];
    var rows = content[i].getElementsByTagName("TBODY")[0].getElementsByTagName("TR"); //each row node

    let headingsElements = rows[0].getElementsByTagName("TH");
    let columns = [];
    for(let z=0; z<headingsElements.length; z++)
    {
      let text = headingsElements[z].textContent.trim().toLowerCase()
      columns.push(text)
    }
    

    for(var a=1; a<rows.length; a++)
    {
      var tData = rows[a].getElementsByTagName("TD");
      var entry = {};
      
      if(columns.length == 3)
      {
        entry.name = tData[0].textContent.trim();
        entry.value = tData[1].textContent.trim();
        entry.description = tData[2].textContent.trim();
      }
      else
      {
        entry.name = tData[0].textContent.trim();
        entry.value = tData[1].textContent.trim();
        entry.luafunction = tData[2].textContent.trim();
        entry.description = tData[3].textContent.trim();
      }
      

      values.push(entry);
    }

    constants.push({
      title : title,
      values : values
    });

    title = "";
    values = [];
  }

  i++;
}

console.log("generating json string")

function sortArr(arr, key)
{
  const n = arr.length
  for (var i = 0; i < n-1; i++)      
  {
    for (var j = 0; j < n-i-1; j++) 
    {
      if (arr[j][key] > arr[j+1][key])
      {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
//order objects
const orderedClasses = sortArr(classes, "title");
const orderedConstants = sortArr(constants, "title");

var obj = {
  classes: orderedClasses,
  constants: orderedConstants
};


var stringObj = JSON.stringify(obj, undefined, 2)
console.log(stringObj);


function download() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(stringObj));
  element.setAttribute('download', "output.json");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
//download();