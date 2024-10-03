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

export default { addContact, getContact }