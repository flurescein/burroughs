import { DBSchema, openDB } from 'idb'

import Text from './Text'

interface BurroughsDB extends DBSchema {
  texts: {
    key: number
    value: Text
  }
}

const settings = {
  name: 'burroughs',
  version: 1
}

export const createConnection = async ({ name, version } = settings) =>
  openDB<BurroughsDB>(name, version, {
    upgrade(db) {
      db.createObjectStore('texts', { keyPath: 'id', autoIncrement: true })
    }
  })
