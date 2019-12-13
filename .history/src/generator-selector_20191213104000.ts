import * as vscode from 'vscode';

var extra_interface = '';

export function GenSelector (data:string) {
  try {
    const obj = JSON.parse(data);
    var result = generateSelector('YourInterfaceName', data, '');
    return (result + '\n/* 自动生成的 Selector Function */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
  }
}

function generateSelector(params:type) {
  
}