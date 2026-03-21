export function packageNameCamelCase({ packageName }) {
  if(!packageName) {
    return "";
  } 
  
  return packageName.split(" ").reduce((a, b, i) => {
    if (i === 0) {
      return a + b.toLowerCase();
    } else {
      return a + b;
    }
  }, "");
}

export function getPackageBaseUrl({ packageName }) {
  const camelCaseName = packageNameCamelCase({ packageName });
  return `/${camelCaseName}`;
}
