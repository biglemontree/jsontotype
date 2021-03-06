import * as _ from 'lodash';
import * as prettier from 'prettier';
import { toHump, logError, message, toBottomLine, fieldReplacer, deleteEscapeSymbol, isJson, logInfo } from './common';
import { CommonObject } from './type';
/**
 * 
 * @param text 
 * @description 底杠转驼峰并prettier格式化
 */
export function jsonToHump(text:string) {
  try {
    if (!text) {
      return '';
    }
    if (!isJson(text)) {
      message.warn('选择的文本非正确的JSON！');
      return text;
    }
    const obj = fieldReplacer(JSON.parse(text), toHump);
    return objectToFormatString(obj);
  } catch (error) {
    logError(error);
    message.error(error);
    return text;
  }
}
/**
 * 
 * @param text 
 * @description 驼峰转底杠并prettier格式化
 */
export function jsonToBottomLine(text:string) {
  try {
    if (!text) {
      return '';
    }
    if (!isJson(text)) {
      message.warn('选择的文本非正确的JSON！');
      return text;
    }
    const obj = fieldReplacer(JSON.parse(text), toBottomLine);
    return obj;
    // return objectToFormatString(obj);
  } catch (error) {
    logError(error);
    message.error(error);
    return text;
  }
}
/**
 * 
 * @param obj 
 * @description 对象转为格式化后的字符串
 */
function objectToFormatString(obj:CommonObject) : string {
  const text = prettier.format(deleteEscapeSymbol(obj), {
    parser: "json5",
    bracketSpacing: true,
    trailingComma: "all",
  });
  return text;
}
