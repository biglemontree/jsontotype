import * as vscode from 'vscode';
import { toHump } from './utils';
var extra_interface = '';

export function GenSelector (data:string) {
  try {
    const obj = JSON.parse(data);
    var result = generateSelector(obj);
    return (result + '\n/* 自动生成的 Selector Function */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
  }
}
function yourSelector(params:type) {
  
}
const template = ``
function generateSelector(obj:Object) {
  let funString = `\nfunction yourSelector (obj:Object):Object {\n`
  funString += Object.keys(obj).map(function(key){
    return formatKey(k) + ':' + getVariableType(variable[k], k);
  }).join(';\n') + ';\n';
  const end = `};`;
  let tpl = {};
  obj.keys.map(key => {
    tpl[toHump(key)] = obj[key];
  })
}