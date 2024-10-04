function generateId() {
    let id
    do {
        const idArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10))
        id = idArray.join('')
    } while (!checkId(id))
    return id
}

function checkId(contactId) {
    const usedIds = Object.keys(localStorage) 
    if (usedIds.includes(contactId)) {
        console.log('ID conflict detected. Generating a new one...')
        return false 
    }
    return true 
}

export default generateId