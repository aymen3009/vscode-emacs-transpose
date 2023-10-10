
import * as vscode from 'vscode';

import transpose_chars_handler from './handlers/transpose-chars';
import transpose_words_handler from './handlers/transpose-words';
import transpose_lines_up_handler from './handlers/transpose-lines-up';
import transpose_lines_down_handler from './handlers/transpose-line-down';

export function activate(context: vscode.ExtensionContext) {

	const transpose_chars = vscode.commands.registerCommand('emacs-transpose.transpose-chars', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor || !editor.selection.isEmpty) {
			return;
		}
		transpose_chars_handler(editor);
	}
	);
	
	const transpose_words = vscode.commands.registerCommand('emacs-transpose.transpose-words', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			return;
		}
		if(!editor.selection.isEmpty) {
			return;
		}
		transpose_words_handler(editor);


	}
	);
	const transpose_lines = vscode.commands.registerCommand('emacs-transpose.transpose-lines', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor || !editor.selection.isEmpty) {
			return;
		}
		if(!transpose_lines_up_handler(editor)) {
			transpose_lines_down_handler(editor);
		}
	}
	);
	const transpose_lines_up = vscode.commands.registerCommand('emacs-transpose.transpose-lines-up', () =>{ 
		const editor = vscode.window.activeTextEditor;
		if(!editor || !editor.selection.isEmpty) {
			return;
		}
		transpose_lines_up_handler(editor);
	}



	);
	const transpose_lines_down = vscode.commands.registerCommand('emacs-transpose.transpose-lines-down', () => 
	{
		const editor = vscode.window.activeTextEditor;
		if(!editor || !editor.selection.isEmpty) {
			return;
		}
		transpose_lines_down_handler(editor);
	}
	);
	const transpose_sexps = vscode.commands.registerCommand('emacs-transpose.transpose-sexps', () => {
		vscode.window.showInformationMessage('transpose-sexps: Not implemented yet');
	}
	);
	const transpose_sentences = vscode.commands.registerCommand('emacs-transpose.transpose-sentences', () => {
		vscode.window.showInformationMessage('transpose-sentences: Not implemented yet ');
	}
	);
	const transpose_paragraphs = vscode.commands.registerCommand('emacs-transpose.transpose-paragraphs', () => {
		vscode.window.showInformationMessage('transpose-paragraphs: Not implemented yet');
	}
	);
	const transpose_regions = vscode.commands.registerCommand('emacs-transpose.transpose-regions', () => {
		vscode.window.showInformationMessage('transpose-regions: Not implemented yet');
	}
	);
	context.subscriptions.push(transpose_chars);
	context.subscriptions.push(transpose_words);
	context.subscriptions.push(transpose_lines);
	context.subscriptions.push(transpose_lines_up);
	context.subscriptions.push(transpose_lines_down);
	context.subscriptions.push(transpose_sexps);
	context.subscriptions.push(transpose_sentences);
	context.subscriptions.push(transpose_paragraphs);
	context.subscriptions.push(transpose_regions);

}

export function deactivate() {}
