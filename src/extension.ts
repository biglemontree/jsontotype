// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";
import { toInterface } from './transform';
import { GenSelector } from './generator-selector';
import { GenPrettierSelector } from './prettier';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension jsonToType is now active!');

	let disposable = vscode.commands.registerTextEditorCommand('jsonToType.toSelector', (textEditor, edit) => {
    const getText = textEditor.document.getText;
		// 选中的内容Range数组
    const selectRange = textEditor.selections;
    selectRange.forEach((range) => {
      const { start, end } = range;
      const text = getText(range);
      
			if (text) {
        const location = new vscode.Range(start, end);
        GenSelector(text);
				edit.replace(location, GenPrettierSelector(text));
			} else {
				vscode.window.showErrorMessage('未选择内容');
			}
		});
	});

  context.subscriptions.push(disposable);
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('jsonToType.toType', (textEditor, edit) => {
    const getText = textEditor.document.getText;
		// 选中的内容Range数组
    const selectRange = textEditor.selections;
    selectRange.forEach((range) => {
      const { start, end } = range;
      const text = getText(range);
      
			if (text) {
        const location = new vscode.Range(start, end);
				edit.replace(location, toInterface(text));
			} else {
				vscode.window.showErrorMessage('未选择内容');
			}
		});
  }));
}

// this method is called when your extension is deactivated
export function deactivate() {}
