export const keyPressed = (
  keyCode: number,
  callback: (e: KeyboardEvent) => void,
  additionalRule: (e: KeyboardEvent) => boolean = () => true
) => (e: KeyboardEvent) => {
  if (e.keyCode == keyCode && additionalRule(e)) {
    callback(e)
  }
}

export const withAlt = (
  keyCode: number,
  callback: (e: KeyboardEvent) => void
) => keyPressed(keyCode, callback, e => e.altKey)
