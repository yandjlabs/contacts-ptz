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
            <span class="contact-timezone ${data.timezone ? '' : 'pale'}">⏰ ${data.timezone? currentTime + ' (' + data.timezone + ' hrs)' : 'N/A'}</span>
            <span class="contact-location text-secondary ${data.location ? '' : 'pale'}">🗺️ ${data.location || 'N/A'}</span>
            <p class="contact-email ${data.email ? '' : 'pale'}">📬 <span class="text-secondary">${data.email || 'N/A'}</span></p>
            <p class="contact-phone ${data.phone ? '' : 'pale'}">📞 <span class="text-secondary">${data.phone || 'N/A'}</span></p>
            <button class="contact-details-btn" ${data.details.length === 0 ? 'disabled' : ''}>Details</button>
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

// load all current contacts on app open
window.onload = displayContacts

// add contact to database on form submit & clear values
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

    // make this take time so user can tell contact has been added
    loadingAnimation()
    setTimeout(() => {
        const contactId = Date.now().toString()
        localStorage.setItem(contactId, JSON.stringify(contactData))

        displayContacts()
        loadingAnimation()
    }, 500);

    contactName.value = ''
    contactTimezone.value = ''
    contactLocation.value = ''
    contactDetails.value = ''
    contactEmail.value = ''
    contactPhone.value = ''
})

// show loading animation to tell user something's happened
function loadingAnimation() {
    const contactsList = document.querySelector('.contacts')
    const loadingIcon = document.querySelector('.loading-icon')

    contactsList.classList.toggle('hidden')
    loadingIcon.classList.toggle('hidden')
}