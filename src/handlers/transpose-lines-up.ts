import * as vscode from 'vscode';

const transpose_lines_up_handler = (editor: vscode.TextEditor): boolean => {
    if(editor.selection.isSingleLine) {
        return false;
    }
    const line = editor.selection.active.line;
    let previousLine = -1;
    let i = line - 1;
    while(i >= 0) {
        if(editor.document.lineAt(i).text.trim().length > 0) {
            previousLine = i;
            break;
        }
        i--;
    }
    if(previousLine >= 0) {
        const currentLine = editor.document.lineAt(line).text;
        editor.edit(edit => {
            edit.replace(new vscode.Range(previousLine, 0, previousLine, editor.document.lineAt(previousLine).text.length), currentLine);
            edit.replace(new vscode.Range(line, 0, line, currentLine.length), editor.document.lineAt(previousLine).text);
        });
        return true;
    }
    return false;
}

export default transpose_lines_up_handler;