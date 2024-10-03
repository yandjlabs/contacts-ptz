import generateId from "./generateId.js"

function addContact(contactData) {
    const contactId = generateId()
    localStorage.setItem(contactId, contactData)
    return contactId
}

function getContact(contactId) {
    const contactData = localStorage.getItem(contactId)
    return contactData
}

export default { addContact, getContact }