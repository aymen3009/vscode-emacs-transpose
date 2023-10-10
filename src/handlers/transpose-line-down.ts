import * as vscode from 'vscode';

const transpose_lines_down_handler = (editor: vscode.TextEditor) : boolean => {
    if(editor.selection.isSingleLine) {
        return false;
    }
    const line = editor.selection.active.line;
    let nextLine = -1;
    let i = line + 1;
    while(i < editor.document.lineCount) {
        if(editor.document.lineAt(i).text.trim().length > 0) {
            nextLine = i;
            break;
        }
        i++;
    }
    if(nextLine >= 0) {
        const currentLine = editor.document.lineAt(line).text;
        editor.edit(edit => {
            edit.replace(new vscode.Range(nextLine, 0, nextLine, editor.document.lineAt(nextLine).text.length), currentLine);
            edit.replace(new vscode.Range(line, 0, line, currentLine.length), editor.document.lineAt(nextLine).text);
        });
        return true;
    }
    return false;
}

export default transpose_lines_down_handler;