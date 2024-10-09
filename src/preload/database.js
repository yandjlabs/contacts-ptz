import generateId from "./generateId.js"

function addContact(contactData) {
    const contactId = generateId()
    localStorage.setItem(contactId, JSON.stringify(contactData))
    return contactId
}

function getContact(contactId) {
    const contactData = JSON.parse(localStorage.getItem(contactId))
    return contactData
}

function sortContacts() {
    const contactIds = Object.keys(localStorage)
    const sortedContacts = []

    for (let i = 0; i < contactIds.length; i++) {
        const currentId = contactIds[i]
        const currentData = JSON.parse(localStorage.getItem(currentId))

        const currentContact = { id: currentId, data: {...currentData} }
        sortedContacts.push(currentContact)
    }
    
    // sort contacts alphabetically based on name
    sortedContacts.sort((a, b) => a.data.name.localeCompare(b.data.name))

    localStorage.clear()
    for (const contact of sortedContacts) {
        localStorage.setItem(contact.id, JSON.stringify(contact.data))
    }
}

export default { addContact, getContact, sortContacts }