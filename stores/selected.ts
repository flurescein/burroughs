import { createStore, createApi } from 'effector'
import { Set } from 'immutable'

export const $selected = createStore<Set<number>>(Set())

export const { select, deselect, deselectAll, setSelected } = createApi(
  $selected,
  {
    select: (store, id: number) => store.add(id),
    deselect: (store, id: number) => store.delete(id),
    deselectAll: store => store.clear(),
    setSelected: (_, ids: number[]) => Set(ids)
  }
)
