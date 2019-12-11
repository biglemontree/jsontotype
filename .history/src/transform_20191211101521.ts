export function transform(data) {
  
}

function toInterface (variable) {
  var interfaceNames = ['IUnknown'];
  var extra_interface = '';

  
 
  var interface = generateInterface('IUnknown', variable, '');
  return (interface + '\n/* 自动生成的 Interface */\n' + extra_interface).trim();
};

function formatKey (key) {
  if (!/^[a-z][a-z\d]*$/i.test(key))
    return JSON.stringify(key);

  return key;
}


function generateInterface (pref_name, variable, indent) {
  console.log(pref_name, variable, indent)
  var r = '\n' + indent + 'interface ' + pref_name + ' {\n';
  var sub_indent = '\t' + indent;

  r += Object.keys(variable).map(function(k){
    return sub_indent + formatKey(k) + ': ' + getVariableType(variable[k], k);
  }).join(';\n') + ';\n';

  r += indent + '}\n\n';

  return r;
}


function procClick () {
  try {
    var data = JSON.parse($src.value);
    $out.value = toInterface(data);
  } catch (err) {
    $out.value = err;
  }
}