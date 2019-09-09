// https://github.com/doowb/expand-hash/blob/master/index.js

export default function expand (value: any) {
  if (!isObject(value)) return value
  const res = Array.isArray(value) ? [] : {}
  for (const key of Object.keys(value)) {
    set(res, key, expand(value[key]))
  }
  return res
}

function set (obj: any, prop: any, val: any) {
  const segs = split(prop)
  const last = segs.pop()
  while (segs.length) {
    const key = segs.shift()
    obj = obj[key] || (obj[key] = {})
  }
  obj[last] = val
}

function split (str: any) {
  const segs = str.split('.')
  const keys = []
  for (let i = 0; i < segs.length; i++) {
    let seg = segs[i]
    while (seg.slice(-1) === '\\') {
      seg = seg.slice(0, -1) + '.' + (segs[++i] || '')
    }
    keys.push(seg)
  }
  return keys
}

function isObject (val: any) {
  return val !== null && typeof val === 'object'
}
