// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { toInterface } from './transform';
import { Convert } from './quicktype';
im
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension jsontotype is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
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
        const welcome = Convert.toWelcome(text);
				edit.replace(location, welcome);
				// edit.replace(location, toInterface(text));
			} else {
				vscode.window.showErrorMessage('未选择内容');
			}
		});
  }));
}

// this method is called when your extension is deactivated
export function deactivate() {}
