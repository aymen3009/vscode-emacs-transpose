import * as vscode from 'vscode';

const transpose_chars_handler = (editor: vscode.TextEditor) => {
    const position = editor.selection.active;
    if(position.character === 0) {
        return;
    }
    const next_char = editor.document.getText(new vscode.Range(position, position.translate(0, 1)));
    const previous_char = editor.document.getText(new vscode.Range(position.translate(0, -1), position));
    
    editor.edit(edit => {
        edit.delete(new vscode.Range(position.translate(0, -1), position.translate(0, 1)));
        edit.insert(position.translate(0, -1), next_char);
        edit.insert(position.translate(0,1), previous_char);
    });
}

export default transpose_chars_handler;
