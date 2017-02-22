//Check if Object is empty
export default function isEmptyObject(obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
}
