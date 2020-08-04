import { combine } from 'effector'

import { $texts } from './texts'
import { $selected } from './selected'

export const $textsWithSelection = combine(
  $texts,
  $selected,
  (texts, selected) =>
    texts.map(text => ({ ...text, selected: selected.has(text.id) }))
)
