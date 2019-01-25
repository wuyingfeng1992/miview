export default function deepClone (obj) {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (error) {
    return obj
  }
}
