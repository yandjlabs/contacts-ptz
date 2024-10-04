const newContactForm = document.querySelector('form')

newContactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const contactName = document.querySelector('.newcontact-name').value
    const contactTimezone = document.querySelector('.newcontact-timezone').value
    const contactLocation = document.querySelector('.newcontact-location').value
    const contactDetails = document.querySelector('.newcontact-details').value.split(/\n- |- /)
    contactDetails.shift() // remove first element which is just ""

    const contactData = {
        name: contactName,
        timezone: contactTimezone,
        location: contactLocation,
        details: contactDetails
    }

    window.api.addContact(contactData)
})

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
        console.log(data.details)
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