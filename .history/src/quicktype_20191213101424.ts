
import { quicktype, InputData, JSONSchemaInput, TypeScriptTargetLanguage } from 'quicktype-core';
import * as quicktype_core_1 from 'quicktype-core';
const quicktype_typescript_input_1 = require("quicktype-typescript-input");
import * as fs from "fs";

export async function Convert (data:string) {
  const inputData = new InputData();
  const source = { name: "Player", schema: fs.r(data) };
//   await inputData.addSource("schema",  quicktype_typescript_input_1.schemaForTypeScriptSources({
//     [`test.ts`]: data
// }), () => new quicktype_core_1.JSONSchemaInput(undefined));
  await inputData.addSource("schema", source, () => new JSONSchemaInput(undefined));
  const lang = new TypeScriptTargetLanguage();
  const options = {
      lang: lang,
      inputData,
      leadingComments: ['by tangtang'],
      rendererOptions: {
        'just-types':"true"
      },
      inferMaps: true,
      inferEnums: true,
      inferDateTimes: true,
      inferIntegerStrings: true,
  };
  const { lines } = await quicktype({ lang, inputData });
  console.log(lines);
  
  return lines;
  // quicktype(options);
}