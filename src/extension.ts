// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { toHump, logWarn, logInfo, deleteQuote, toBottomLine } from './common';

import { toInterface } from './transform';
import { GenSelector } from './generator-selector';
import { GenPrettierSelector } from './prettier-selector';
import { jsonToBottomLine, jsonToHump } from './prettier';

function replaceFactory(handler:Function, name:string) {
	// 注册编辑器事件
	return vscode.commands.registerTextEditorCommand(name, (textEditor, edit) => {
		const getText = textEditor.document.getText;
		// 选中的内容Range数组
		const selectRange = textEditor.selections;
		selectRange.forEach((range) => {
			const { start, end } = range;
			const text = getText(range);
			if (text) {
				const location = new vscode.Range(start, end);
				edit.replace(location, handler(text));
			} else {
				logWarn('未选中任何文字！');
			}
		});
	});
}
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension jsonToType is now active!');

	context.subscriptions.push(replaceFactory(toBottomLine, 'varnameChanger.toBottomLine'));
	context.subscriptions.push(replaceFactory(toHump, 'varnameChanger.toHump'));
	context.subscriptions.push(replaceFactory(jsonToBottomLine, 'varnameChanger.jsonToBottomLine'));
	context.subscriptions.push(replaceFactory(jsonToHump, 'varnameChanger.jsonToHump'));
	context.subscriptions.push(replaceFactory(deleteQuote, 'varnameChanger.deleteQuote'));
  context.subscriptions.push(replaceFactory(GenPrettierSelector, 'jsonToType.toSelector'));
  context.subscriptions.push(replaceFactory(toInterface, 'jsonToType.toType'));
}

// this method is called when your extension is deactivated
export function deactivate() {}
