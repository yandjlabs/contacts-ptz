import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import generateId from './generateId'
import database from './database'

// api to allow frontend to call backend functions (that use nodejs)
const api = {
  generateId: () => {
    return generateId()
  },
  addContact: (contactData) => {
    return database.addContact(contactData)
  },
  getContact: (contactId) => {
    return database.getContact(contactId)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
