import React, { Component } from 'react';
import "./markdown-parser.css";

class Markdown extends Component
{
  constructor(props)
  {
    super(props);
    console.log("here");
    
  }

  parseParagraph(lines, lastParagraphLine, curLineNum)
  {
    var paragraphText = "";
    for(let a=lastParagraphLine; a<curLineNum; a++)
    {
      paragraphText += lines[a] + "\n";
    }

    return (
      <p>{paragraphText.trim()}</p>
    );
  }

  parseCode(codeText, lang)
  {
    //todo: links, images and videos that are inline the text
    var result = [];
    var keywords = [
      "and", "break", "do", "else", "elseif", 
      "end", "false", "for", "function", "goto",
      "if", "in", "local", "nil", "not", "or",
      "repeat", "return", "then", "true", "until", "while", "_G"
    ];

    var altKeywords = [
      "nil", "false", "true"
    ];

    var lines = codeText.split("\n");
    for(var i=0; i<lines.length; i++)
    {
      var indentationMatch = lines[i].match(/\s+/);
      var indentationText = "";
      if(indentationMatch !== null && indentationMatch.index == 0)
      {
        indentationText = indentationMatch[0];
      }
      var codeEls = lines[i].split("--");
      var codeLine = codeEls[0];
      codeEls.shift(); //remove first element
      var commentText = codeEls.join(" ").trim();
      var words = codeLine.split(/\s+/);
      var lineText = indentationText;
      for(var a=0; a<words.length; a++)
      {
        if(keywords.includes(words[a]))
        {
          if(lineText.length > 0)
          {
            result.push(<span>{lineText}</span>);
          }
          var cls = "code-keyword";
          if(altKeywords.includes(words[a]))
          {
            cls = "code-keyword-alt";
          }
          result.push(<span className={cls}>{words[a]}</span>)
          if(a < words.length -1)
          {
            lineText = " ";
          }
          else
          {
            lineText = "";
          }
        }
        else
        {
          lineText += words[a];
          if(a < words.length - 1)
          {
            lineText += " ";
          }
        }
      }
      if(lineText.length > 0)
      {
        result.push(<span>{lineText}</span>);
      }
      if(commentText.length > 0)
      {
        result.push(<span className="code-comment">--{commentText}</span>);
      }
      if(i < lines.length - 1)
      {
        result.push(<br></br>);
      }
    }


    return(
      <code className="code-block">{result}</code>
    );
  }

  parse()
  {
    var text = this.props.children;
    var result = [];

    const LINE_NONE = 0;
    const LINE_PARAGRAPH = 1;
    const LINE_HEADING = 2;
    const LINE_LIST = 3;
    const LINE_CODE = 4;
    const LINE_CODE_END = 5;
    const LINE_BREAK = 6;
    const LINE_EMPTY = 7;
    
    var lines = text.split("\n");
    var lastParagraphLine = 0;
    var codeLineStart=-1;
    var lastLineType = LINE_NONE;
    for(let i=0; i<lines.length; i++)
    {
      var line = lines[i].trim();
      //heading
      if(line.startsWith("#") && lastLineType !== LINE_CODE)
      {
        if(lastLineType === LINE_PARAGRAPH)
        {
          var paragraph = this.parseParagraph(lines, lastParagraphLine, i);
          result.push(paragraph);
        }

        lastLineType = LINE_HEADING;

        let hashCount = 1;
        for(let a=1; a<=5; a++)
        {
          if(line[a] !== "#")
          {
            hashCount = a;
            break;
          }
        }
        var headingText = line.substr(hashCount).trim();
        switch(hashCount)
        {
          case 1 : result.push(<h1>{headingText}</h1>); break;
          case 2 : result.push(<h2>{headingText}</h2>); break;
          case 3 : result.push(<h3>{headingText}</h3>); break;
          case 4 : result.push(<h4>{headingText}</h4>); break;
          case 5 : result.push(<h5>{headingText}</h5>); break;
        }
      }
      else if(line.startsWith("---") && lastLineType !== LINE_CODE)
      {
        if(lastLineType === LINE_PARAGRAPH)
        {
          var paragraph = this.parseParagraph(lines, lastParagraphLine, i);
          result.push(paragraph);
        }
        console.log("line break")
        result.push(<hr></hr>);
        lastLineType = LINE_BREAK;
      }
      //list
      else if((line.startsWith("-")) && lastLineType !== LINE_CODE)
      {
        if(lastLineType === LINE_PARAGRAPH)
        {
          var paragraph = this.parseParagraph(lines, lastParagraphLine, i);
          result.push(paragraph);
        }
        lastLineType = LINE_LIST;
      }
      //code
      else if(line.startsWith("```"))
      {
        if(lastLineType !== LINE_CODE)
        {
          codeLineStart = i;
          lastLineType = LINE_CODE;
        }
        else
        {
          var codeText = "";
          for(let a=codeLineStart+1; a<i; a++)
          {
            codeText+= lines[a] + "\n";
          }
          result.push(this.parseCode(codeText, "lua"));
          lastLineType = LINE_CODE_END;
        }
      }
      //paragraph
      else if(lastLineType !== LINE_PARAGRAPH && lastLineType !== LINE_CODE && line.length > 0)
      {
        lastParagraphLine = i;
        lastLineType = LINE_PARAGRAPH;
      }
      else
      {
        if(lastLineType !== LINE_CODE && line.length == 0)
        {
          if(lastLineType == LINE_PARAGRAPH)
          {
            var paragraph = this.parseParagraph(lines, lastParagraphLine, i);
            result.push(paragraph);
          }
          lastLineType = LINE_EMPTY
        }
      }
    }

    //paragraph text at the end
    if(lastLineType === LINE_PARAGRAPH)
    {
      var paragraph = this.parseParagraph(lines, lastParagraphLine, lines.length);
      result.push(paragraph);
    }

    return result;
  }

  render()
  {
    return(
      <div>{this.parse()}</div>
    );
  }
}

export default Markdown;