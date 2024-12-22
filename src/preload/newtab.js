import { resolve } from 'path'

function newTab(filename) {
    window.open(`file://${resolve(__dirname, filename)}`, '_blank')
}

export default newTab