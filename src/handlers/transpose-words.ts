import * as vscode from "vscode";
const swapWord = (lineText: string, cursorPosition: number) => {
  const textBeforeCursor = lineText.slice(0, cursorPosition);
  const textAfterCursor = lineText.slice(cursorPosition);
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
  const newTextBeforeCursor = textBeforeCursor
    .trimEnd()
    .replace(previousWord, nextWord);
  const newTextAfterCursor = textAfterCursor
    .trimStart()
    .replace(nextWord, previousWord);
  const newLineText =
    newTextBeforeCursor +
    " ".repeat(emptySpaceBeforeCursorLength + emptySpaceAfterCursorLength) +
    newTextAfterCursor;
  return newLineText;
};
const getNextWord = (text: string) => {
  const words = text.match(/\b\w+\b/g);
  return words && words.length > 0 ? words[0] : "";
};
const getPreviousWord = (text: string) => {
  const words = text.match(/\b\w+\b/g);
  return words && words.length > 0 ? words[words.length - 1] : "";
};

const transpose_words_handler = (editor: vscode.TextEditor) => {
  const position = editor.selection.active;
  const currentLine = editor.document.lineAt(position.line).text;
  const newLine = swapWord(currentLine, position.character);
  editor.edit(edit => {
    edit.replace(new vscode.Range(position.line, 0, position.line, currentLine.length), newLine);
  });
}

export default transpose_words_handler;
