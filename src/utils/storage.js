export const store = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const load = (key, _default) => {
  const res = localStorage.getItem(key)
  return res ? JSON.parse(res) : _default
}

export const remove = (key) => {
  localStorage.removeItem(key)
}

export const clearAll = () => {
  localStorage.clear()
}

export const sessionStore = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export const sessionLoad = (key, _default) => {
  const res = sessionStorage.getItem(key)
  return res ? JSON.parse(res) : _default
}

export const sessionClearAll = () => {
  sessionStorage.clear()
}