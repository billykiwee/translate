export function areObjectsEqual(obj1: Object, obj2: Object) {
  const formToString = (json: Object) => {
    return {
      keys: Object.keys(json).sort().toString(),
      values: Object.values(json).sort().toString(),
    };
  };

  const OB1 = formToString(obj1);

  const OB2 = formToString(obj2);

  if (OB1.keys === OB2.keys && OB1.values === OB2.values) {
    return true;
  } else {
    return false;
  }
}
