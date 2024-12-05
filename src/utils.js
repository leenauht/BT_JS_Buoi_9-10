export function createId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export const getElmID = (id) => document.getElementById(id);

// export const getValuesElmIDs = (ids) => {
//   const data = {};
//   for (let index = 0; index < ids.length; index++) {
//     const value = getElmID(ids[index]).value;
//     data[ids[index]] = value;
//   }
//   return data;
// };
