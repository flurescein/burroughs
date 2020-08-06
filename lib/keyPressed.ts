export const keyPressed = (
  keyCode: number,
  callback: (e: KeyboardEvent) => void,
  additionalRule: (e: KeyboardEvent) => boolean = () => true
) => (e: KeyboardEvent) => {
  if (e.keyCode == keyCode && additionalRule(e)) {
    e.preventDefault()
    callback(e)
  }
}

export const withAlt = (
  keyCode: number,
  callback: (e: KeyboardEvent) => void
) => keyPressed(keyCode, callback, e => e.altKey)

export const withCtrl = (
  keyCode: number,
  callback: (e: KeyboardEvent) => void
) => keyPressed(keyCode, callback, e => e.ctrlKey)
