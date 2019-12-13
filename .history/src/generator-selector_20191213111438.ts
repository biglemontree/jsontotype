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

const template = `
export function yourSelector(obj:Object):Object {
  return {
    name: obj.name,
    nRate: obj.n_rate,
  };
};
`;
function generateSelector(obj:Object):string {
  let funString = `\nexport function yourSelector (obj:Object):Object {
    return {
  `
  funString += Object.keys(obj).map(function(key){
    return formatKey(k) + ':' + getVariableType(variable[k], k);
  }).join(';\n') + ';\n';
  const end = `};`;
  let tpl = {};
  obj.keys.map(key => {
    tpl[toHump(key)] = obj[key];
  })
  return funString;
}