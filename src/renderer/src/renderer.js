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