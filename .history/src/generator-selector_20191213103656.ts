import * as vscode from 'vscode';

export function GenSelector (data:string) {
  try {
    const data = JSON.parse(variable);
    var result = generateInterface('YourInterfaceName', data, '');
    return (result + '\n/* 自动生成的 Interface */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
  }
}