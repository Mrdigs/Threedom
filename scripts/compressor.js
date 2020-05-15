const fs = require('fs'), compress = true;

let replacements = {}, prefix = '', count = 96;
let css = fs.readFileSync('build/threedom.css', {encoding:'utf-8'});
let css1 = css.replace(/--[\w-]+/g, function(match) {
  let replacement;
  if (match.startsWith('---')) {
    replacement = match.substring(1);
  } else {
    replacement = match;
  }
  return replacement;
});
let css2 = css.replace(/--[\w-]+/g, function(match) {
  let replacement;
  if (match.startsWith('---')) {
    replacement = match.substring(1);
  } else if (!compress) {
    replacement = match;
  } else if (replacements[match]) {
    replacement = replacements[match];
  } else {
    if (count < 120) { count++ } else {
      prefix += String.fromCharCode(97 + prefix.length);
      count = 97;
    }
    replacement = '--' + prefix + String.fromCharCode(count);
    replacements[match] = replacement;
  }
  return replacement;
});
fs.writeFileSync('build/threedom.css', css1);
fs.writeFileSync('build/threedom.min.css', css2);
