
class KVChecker{

  static getErrMsg(lineNum, msg) 
  {
    if (lineNum > -1)
    {
      return "Error Line " + lineNum + ": " + msg;
    }
  return "Error: " + msg;
  }

  static validate(text) 
  {
    var lines = text.split("\n");

    const LINE_NULL = -1;
    const LINE_CONTAINER_NAME = 0;
    const LINE_CONTAINER_OPEN = 1;
    const LINE_KEY_VALUE = 2;

    var errors = [];

    var hasBracketOnLine = false;

    var depth = 0;
    var openedBracketOnce = false;
    var closedAllBrackets = false;
    var lastLineType = LINE_NULL;

    for (var a = 0; a < lines.length; a++)
    {
      var line = lines[a];

      hasBracketOnLine = false;

      //remove comment from line
      var commentIndex = line.indexOf("\/\/");
      if (commentIndex > -1)
      {
        line = line.substr(0, commentIndex);
      }


      var hasNonSpaceChar = /\S/.test(line);

      //quote count
      var quoteCount = 0;
      let matchQuotes = line.match(/\"/g);
      if (matchQuotes != null)
      {
        quoteCount = matchQuotes.length;
      }
      var prevCh = null;

      if (hasNonSpaceChar)
      {
        if(line.startsWith("#base"))
        {
          if(openedBracketOnce)
          {
            errors.push(KVChecker.getErrMsg(a + 1, "#base should be at the top of your file"));
          }
          else
          {
            var match = line.match(/\S+/g);
            if(match != null)
            {
              if(match.length == 1)
              {
                errors.push(KVChecker.getErrMsg(a + 1, "#base file path was not declared"));
              }
              else if(match.length > 2)
              {
                errors.push(KVChecker.getErrMsg(a + 1, "invalid file path name"));
              }
            }
          }
        }
        else
        {
          for (var b = 0; b < line.length; b++)
          {
            var ch = line[b];



            if (ch == "{")
            {
              depth++;

              openedBracketOnce = true;
              hasBracketOnLine = true;

              if (lastLineType != LINE_CONTAINER_NAME)
              {
                errors.push(KVChecker.getErrMsg(a + 1, "container requires a name on the line before the opening bracket"));
              }
            }
            else if (ch == "}")
            {
              depth--;

              hasBracketOnLine = true;

              if (depth == 0)
              {
                closedAllBrackets = true;
              }
            }

            prevCh = ch;
          }//end of line loop

          //incorrect number of quotes
          if (quoteCount > 0 && quoteCount != 2 && quoteCount != 4)
          {
            if (quoteCount < 4)
            {
              errors.push(KVChecker.getErrMsg(a + 1, "missing a quote"));
            }
            else
            {
              errors.push(KVChecker.getErrMsg(a + 1, "too many quotes"));
            }
          }
          else if(quoteCount == 0 && !hasBracketOnLine)
          {
            errors.push(KVChecker.getErrMsg(a + 1, "expected quotes on this line"));
          }

          if(hasBracketOnLine)
          {
            //matching non space chars
            var match = line.match(/\S/g);
            if(match != null && match.length > 1)
            {
              errors.push(KVChecker.getErrMsg(a + 1, "unexpected characters near bracket"));
            }
          }

          if (quoteCount == 4)
          {
            var usedErrorOnce = false;


            var temp = line;

            var quoteIndex = temp.indexOf("\"");
            var beforeText = temp.substr(0, quoteIndex);
            if (/\S/.test(beforeText)) 
            {
              errors.push(KVChecker.getErrMsg(a + 1, "invalid text before the 1st quote"));
            }


            temp = temp.substr(quoteIndex + 1); //cursor in key text
            quoteIndex = temp.indexOf("\"");
            temp = temp.substr(quoteIndex + 1); //cursor between key and value quotes
            quoteIndex = temp.indexOf("\"");
            var betweenText = temp.substr(0, quoteIndex);
            if (/\S/.test(betweenText))
            {
              errors.push(KVChecker.getErrMsg(a + 1, "invalid text between the 2nd and 3rd quote"));
            }

            temp = temp.substr(quoteIndex + 1); //cursor start of value
            quoteIndex = temp.indexOf("\"");
            var endText = temp.substr(quoteIndex + 1); //cursor after value
            if (/\S/.test(endText))
            {
              errors.push(KVChecker.getErrMsg(a + 1, "invalid text after the 4th quote"));
            }
          }
          else if(quoteCount == 2)
          {
            var temp = line;
            var quoteIndex = temp.indexOf("\"");
            var beforeText = temp.substr(0, quoteIndex);
            if (/\S/.test(beforeText)) 
            {
              errors.push(KVChecker.getErrMsg(a + 1, "invalid text before the 1st quote"));
            }
            temp = temp.substr(quoteIndex + 1);
            quoteIndex = temp.indexOf("\"");
            var afterText = temp.substr(quoteIndex + 1); //cursor after container name
            if (/\S/.test(afterText)) 
            {
              errors.push(KVChecker.getErrMsg(a + 1, "invalid text after the 2nd quote"));
            }

          }

          //previous data
          if (quoteCount == 2)
          {
            lastLineType = LINE_CONTAINER_NAME;
          }
          else if (quoteCount == 4)
          {
            lastLineType = LINE_KEY_VALUE;
          }
          else if (ch == "{")
          {
            lastLineType = LINE_CONTAINER_OPEN;
          }
        }
      }//end of if(hasNonSpaceChars)
    }//end of all lines loop

    

    if (depth != 0)
    {
      if (depth > 0)
      {
        errors.push(KVChecker.getErrMsg(-1, "missing a closing bracket at end of file"));
      }
      else
      {
        errors.push(KVChecker.getErrMsg(-1, "too many closing brackets at end of file"));
      }
    }


    if (openedBracketOnce == false)
    {
      errors.push(KVChecker.getErrMsg(-1, "brackets never opened"));
    }

    return errors;
  }
}

export default KVChecker;
