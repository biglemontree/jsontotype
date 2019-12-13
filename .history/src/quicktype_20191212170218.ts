
import { quicktype, InputData, addSourceTypeScriptTargetLanguage } from 'quicktype-core';



export async function Convert (data:string) {
  const inputData = new InputData();
  const source = { name: "Player", schema: data };
    console.log(source);
  await inputData.addSource("schema", source, () => new JSONSchemaInput(undefined));
  return 'test'
}