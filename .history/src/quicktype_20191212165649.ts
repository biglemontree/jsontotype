
import { quicktype, InputData, TypeScriptTargetLanguage } from 'quicktype-core';



export function Convert (data:st) {
  const inputData = new InputData();
  const source = { name: "Player", schema: data };
    console.log(source);

}