import * as prettier from 'prettier';
import * as _ from 'lodash';
import * as vscode from 'vscode';
import { toHump, objectToFormatString } from './utils';
var extra_interface = '';

export function GenPrettierSelector (data:string) {
  try {
    const obj = JSON.parse(data);

    var result = generateSelector(obj);
    return (result + '\n/* 自动生成的 Selector Function */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
  }
}

const template = `
export function yourSelector(data:Object):Object {

  return {
    name: data.name,
    nRate: data.n_rate,
    deep_obj: {
      a: data.deep_obj.a,
    }
  };
};
`;
function generateSelector(obj:Object):string {
  const tpl:any = generateRecursiveSelector(obj);
  let funString = `\nexport function yourSelector (data:Object):Object {\n\treturn `;
  if (_.isArray(obj)) {
    
  }
  funString += JSON.stringify(tpl);
  funString += `\t};`;
  return objectToFormatString(funString);
}

function genObj(obj:Object) {
  const tpl:any = {};
  Object.keys(obj).map(function(key){
    if (_.isObject(obj[key])) {
      tpl[toHump(key)] = generateRecursiveSelector(obj[key]);
    } else {
      tpl[toHump(key)] = 'data.' + key;
    }
  })
  return tpl;
}
function generateRecursiveSelector(data:(any[] | {[key:string]:any})):string {
  if (_.isArray(data)) {
    return data.map(function(item){
      if(_.isObject) {
        return generateRecursiveSelector(item);
      }
      return item;
    })
  }
  
  return genObj(data);
}

const arrTemplate = `
export function yourSelector(arr:Array):Array {
  return arr.map((item) => ({
    name: obj.name,
    nRate: obj.n_rate,
    deep_obj: {
      a: obj.deep_obj.a,
    }
  }));
};
`;