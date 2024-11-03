import * as vscode from "vscode";

const getNextWord = (text: string) => {
  const words = text.match(/\b\w+\b/g);
  return words && words.length > 0 ? words[0] : "";
};
const getPreviousWord = (text: string) => {
  const words = text.match(/\b\w+\b/g);
  return words && words.length > 0 ? words[words.length - 1] : "";
};


const isString = (input: unknown): input is string => typeof input === "string";

const replaceLastOccurrence = (
  input: string,
  find: string,
  replaceWith: string
) => {
  if (!isString(input) || !isString(find) || !isString(replaceWith)) {
    // returns input on invalid arguments
    return input;
  }

  const lastIndex = input.lastIndexOf(find);
  if (lastIndex < 0) {
    return input;
  }

  return (
    input.substr(0, lastIndex) +
    replaceWith +
    input.substr(lastIndex + find.length)
  );
};

const transpose_words_handler = (editor: vscode.TextEditor) => {
  const position = editor.selection.active;
  const currentLine = editor.document.lineAt(position.line).text;
  const cursorPosition = position.character;
  const lineText = editor.document.lineAt(position.line).text;

  const textBeforeCursor = lineText.slice(0, cursorPosition);
  const textAfterCursor = lineText.slice(cursorPosition);
  if (textBeforeCursor.trim() === "" ) {
    if (position.line === 0) {
      return;
    }
     const lastLine = editor.document.lineAt(position.line - 1).text || "";
     if (lastLine.trim() === "" ) {
       return;
     }
     const lastLineLastWord = getPreviousWord(lastLine);
     const currentLineFirstWord = getNextWord(lineText);
      const newLastLine = replaceLastOccurrence(lastLine, lastLineLastWord, currentLineFirstWord);
      const newCurrentLine = lineText.replace(currentLineFirstWord, lastLineLastWord);
      const newCursorPosition = Math.max(
        0,
        newCurrentLine.length
      );
     editor.edit((edit) => {
        edit.replace(
          new vscode.Range(position.line - 1, 0, position.line, currentLine.length),
          newLastLine + "\n" + newCurrentLine
        );
      }).then(() => {
        if (vscode.window.activeTextEditor)
          vscode.window.activeTextEditor.selection = new vscode.Selection(
            position.line,
            newCursorPosition,
            position.line,
            newCursorPosition
          );
      });
      return;
  }

  if (textAfterCursor.trim() === "") {
    const count = editor.document.lineCount;
    if (position.line + 1 === count) {
      return;
    }
    const nextLine = editor.document.lineAt(position.line + 1).text || "";
    if (nextLine.trim() === "") {
      return;
    }
    const nextLineFirstWord = getNextWord(nextLine);
    const currentLineLastWord = getPreviousWord(lineText);
    const newNextLine = nextLine.replace(nextLineFirstWord, currentLineLastWord);
    const newCurrentLine = replaceLastOccurrence(lineText, currentLineLastWord, nextLineFirstWord);
    const newCursorPosition = Math.max(
      0,
      newCurrentLine.length
    );
     editor.edit((edit) => {
      edit.replace(
        new vscode.Range(position.line, 0, position.line + 1, nextLine.length),
        newCurrentLine + "\n" + newNextLine
      );
    }).then(() => {
      if (vscode.window.activeTextEditor)
        vscode.window.activeTextEditor.selection = new vscode.Selection(
          position.line,
          newCursorPosition,
          position.line,
          newCursorPosition
        );
    });
    return;
  }
  const emptySpaceBeforeCursor = textBeforeCursor.match(/\s+$/);
  const emptySpaceAfterCursor = textAfterCursor.match(/^\s+/);
  const emptySpaceBeforeCursorLength = emptySpaceBeforeCursor
    ? emptySpaceBeforeCursor[0].length
    : 0;
  const emptySpaceAfterCursorLength = emptySpaceAfterCursor
    ? emptySpaceAfterCursor[0].length
    : 0;


  const previousWord = getPreviousWord(textBeforeCursor).trimEnd();
  const nextWord = getNextWord(textAfterCursor).trimStart();

  const newTextBeforeCursor = replaceLastOccurrence(
    textBeforeCursor.trimEnd(),
    previousWord,
    nextWord
  );
  const newTextAfterCursor = textAfterCursor
    .trimStart()
    .replace(nextWord, previousWord);
  const newLineText =
    newTextBeforeCursor +
    " ".repeat(emptySpaceBeforeCursorLength + emptySpaceAfterCursorLength) +
    newTextAfterCursor;
  const newCursorPosition = Math.max(
    0,
    newTextBeforeCursor.length + emptySpaceBeforeCursorLength
  );

  editor
    .edit((edit) => {
      edit.replace(
        new vscode.Range(position.line, 0, position.line, currentLine.length),
        newLineText
      );
    })
    .then(() => {
      if (vscode.window.activeTextEditor)
        vscode.window.activeTextEditor.selection = new vscode.Selection(
          position.line,
          newCursorPosition,
          position.line,
          newCursorPosition
        );
    });
};

export default transpose_words_handler;
