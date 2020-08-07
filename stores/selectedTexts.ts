import { combine, createApi } from 'effector'
import { $selected } from './selected'
import { $texts } from './texts'
import cutup from '../lib/cutup'

export const $selectedTexts = combine($selected, $texts, (selected, texts) =>
  texts
    .filter(({ id }) => selected.contains(id))
    .map(({ text }) => text)
    .join(' ')
)

export const { cutupSelected } = createApi($selectedTexts, {
  cutupSelected: selectedTexts => cutup(selectedTexts)
})
