const contactData = {
    name: 'Benjamin Blahaj',
    timezone: '+6',
    location: 'Vienna, Austria',
    details: [
        'Had both his front teeth knocked out, those are actually his upper canines',
        'Was held back a grade',
        'Is very into video games'
    ]
}

const contactId = window.api.addContact(contactData)
const retrievedContact = JSON.stringify(window.api.getContact(contactId))

console.log(`ID: ${contactId}\nDATA: ${retrievedContact}`)