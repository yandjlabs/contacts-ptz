// load all current contacts on app open
const contactsList = document.querySelector('.contacts')

function displayContacts() {
    const timeFormat = 'en-US' // later, get from user settings data but default to en-US
    const time = new Date()
    const currentTime = time.toLocaleString(timeFormat, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // later, get from user setting data whether 12 or 24 but default to 12
    })

    contactsList.innerHTML = ''; 

    Object.entries(localStorage).forEach(([contactId, contactData]) => {
        const data = JSON.parse(contactData)
        const detailsList = data.details.map(detail => `
            <li class="contact-details-list-item">${detail}</li>
        `).join('')

        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.innerHTML = `
            <h3 class="contact-name">${data.name}</h3>
            <span class="contact-timezone">${currentTime} (${data.timezone} hrs)</span>
            <span class="contact-location text-secondary">${data.location}</span>
            <p class="contact-email">Email: <span class="text-secondary">${data.email || 'N/A'}</span></p>
            <p class="contact-phone">Phone: <span class="text-secondary">${data.phone || 'N/A'}</span></p>
            <button class="contact-details-btn">Details</button>
            <div class="hidden contact-details-expand">
                ${detailsList}
            </div>
        `

        contactsList.appendChild(contactElement);

        const detailsBtn = contactElement.querySelector('.contact-details-btn');
        const detailsDiv = contactElement.querySelector('.contact-details-expand');

        detailsBtn.addEventListener('click', () => {
            detailsDiv.classList.toggle('hidden');
        });
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
    const contactEmail = document.querySelector('.newcontact-email')
    const contactPhone = document.querySelector('.newcontact-phone')

    const contactDetailsArray = contactDetails.value.split(/\n- |- /)
    contactDetailsArray.shift() 

    const contactData = {
        name: contactName.value,
        timezone: contactTimezone.value,
        location: contactLocation.value,
        details: contactDetailsArray,
        email: contactEmail.value,
        phone: contactPhone.value
    }

    const contactId = Date.now().toString()
    localStorage.setItem(contactId, JSON.stringify(contactData))

    displayContacts()

    contactName.value = ''
    contactTimezone.value = ''
    contactLocation.value = ''
    contactDetails.value = ''
    contactEmail.value = ''
    contactPhone.value = ''
})

// FUNCTION THAT LOADS PAGE
function loadingAnimation() {
    const main = document.querySelector('main')
    const loadingIcon = document.querySelector('.loading-icon')

    main.classList.toggle('hidden')
    loadingIcon.classList.toggle('hidden')
}