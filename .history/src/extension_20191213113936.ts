// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";
import { toInterface } from './transform';
import { Convert } from './quicktype';
import { GenSelector } from './generator-selector';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension jsontotype is now active!');

	let disposable = vscode.commands.registerTextEditorCommand('jsontotype.toselector', (textEditor, edit) => {
    const getText = textEditor.document.getText;
		// 选中的内容Range数组
    const selectRange = textEditor.selections;
    selectRange.forEach((range) => {
      const { start, end } = range;
      const text = getText(range);
      
			if (text) {
        const location = new vscode.Range(start, end);
        GenSelector(text);
				edit.replace(location, Convert(text));
			} else {
				vscode.window.showErrorMessage('未选择内容');
			}
		});
		vscode.window.showInformationMessage('Hello VS Code!');
	});

  context.subscriptions.push(disposable);
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('jsontotype.totype', (textEditor, edit) => {
    const getText = textEditor.document.getText;
		// 选中的内容Range数组
    const selectRange = textEditor.selections;
    selectRange.forEach((range) => {
      const { start, end } = range;
      const text = getText(range);
      
			if (text) {
        const location = new vscode.Range(start, end);
        Convert(text);
				// edit.replace(location, Convert(text));
				// edit.replace(location, toInterface(text));
			} else {
				vscode.window.showErrorMessage('未选择内容');
			}
		});
  }));
}

// this method is called when your extension is deactivated
export function deactivate() {}
