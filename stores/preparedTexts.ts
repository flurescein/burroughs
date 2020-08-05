import { combine } from 'effector'

import { $texts } from './texts'
import { $selected } from './selected'

export const $preparedTexts = combine($texts, $selected, (texts, selected) =>
  texts
    .map(text => ({ ...text, selected: selected.has(text.id) }))
    .sort((a, b) => a.changed.getTime() - b.changed.getTime())
)
