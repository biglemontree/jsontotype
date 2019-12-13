
import { quicktype, InputData, JSONSchemaInput, TypeScriptTargetLanguage } from 'quicktype-core';
const quicktype_typescript_input_1 = require("quicktype-typescript-input");


export async function Convert (data:string) {
  const inputData = new InputData();
  const source = { name: "Player", schema: data };
    console.log(source);
  await inputData.addSource("schema", source, () => new JSONSchemaInput(undefined));
  return 'test'
}