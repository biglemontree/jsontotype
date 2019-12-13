
import { quicktype, InputData, TypeScriptTargetLanguage } from 'quicktype-core';



export function Convert (data:string) {
  const inputData = new InputData();
  const source = { name: "Player", schema: data };
    console.log(source);
  return 'test'
}