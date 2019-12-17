import * as prettier from 'prettier';

/**
 * @description 驼峰转底杠
 * @example variableName => variable_name
*/
export const toBottomLine = (name:string) => {
  if (!name) {
    return '';
  }
  const reg = /([A-Z])/g;
  if (reg.test(name)) {
    return name.replace(reg, '_$1').toLowerCase();
  }
  return name;
};
/**
 * @description 底杠转驼峰
 * @example variable_name => variableName
*/
export const toHump = (name:string) => {
  if (!name) {
    return '';
  }
  const reg = /\_(\w)/g;
  if (reg.test(name)) {
    return name.replace(reg, (all, letter) => {
      return letter.toUpperCase();
    });
  }
  return name;
};
/**
 * @param str 字符串
 * @description 删除所有引号和双引号
 * @example 
 * - "value" => value
 * - 'value' => value
 */
export const deleteQuote = (str:string) => {
  if (!str) {
    return '';
  }
  const reg = /\'|\"/g;
  if (reg.test(str)) {
    return str.replace(reg, '');
  }
  return str;
};

/**
 * 
 * @param value:string 
 * @description 对象转为格式化后的字符串
 */
export function objectToFormatString(value:string) : string {
  const text = prettier.format(value, {
    // parser: "json5",
    bracketSpacing: true,
    trailingComma: "all",
  });
  return text.replace(/\"/g,'');
}

/**
 * 
 * @param value 
 * @description 删除JSON.stringify后的转义字符
 */
export function deleteEscapeSymbol(value:string) {
  return JSON.stringify(value)
    .replace(/\\f|\\n|\\r|\\t|\\v|\\/g, '')
    .replace(/\"{/g, '{')
    .replace(/\}\"/g, '}');
}