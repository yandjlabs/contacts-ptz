// load all current contacts on app open
const contactsList = document.querySelector('.contacts')
function displayContacts() {
    const timeFormat = 'en-US' // later, get from user settings data but default to en-US
    const time = new Date()
    const currentTime = time.toLocaleString(timeFormat, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    Object.entries(localStorage).forEach(([contactId, contactData]) => {
        const data = JSON.parse(contactData)
        const detailsList = data.details.map(detail => `
            <li class="contact-details-list-item">${detail}</li>
        `).join('')
        contactsList.innerHTML += `
            <div class="contact">
                <h3 class="contact-name">${data.name}</h3>
                <span class="contact-timezone">${currentTime} (${data.timezone} hrs)</span>
                <span class="contact-location">${data.location}</span>
                <p class="contact-details-label">Details</p>
                <ul class="contact-details-list">
                    ${detailsList}
                </ul>
            </div>
        `
    })
}
window.onload = displayContacts

const newContactForm = document.querySelector('form')
newContactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const contactName = document.querySelector('.newcontact-name')
    const contactTimezone = document.querySelector('.newcontact-timezone')
    const contactLocation = document.querySelector('.newcontact-location')
    const contactDetails = document.querySelector('.newcontact-details')
    const contactDetailsArray = contactDetails.value.split(/\n- |- /)
    contactDetailsArray.shift() // remove first element which is just ""

    const contactData = {
        name: contactName.value,
        timezone: contactTimezone.value,
        location: contactLocation.value,
        details: contactDetailsArray
    }

    window.api.addContact(contactData)
    displayContacts()

    contactName.value = ''
    contactTimezone.value = ''
    contactLocation.value = ''
    contactDetails.value = ''
})