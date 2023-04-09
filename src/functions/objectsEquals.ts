export function areObjectsEqual(obj1: any, obj2: any) {
  // Comparaison des clés
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return true;
  }

  // Comparaison des valeurs
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return true;
    }
  }

  // Les objets sont identiques
  return false;
}
