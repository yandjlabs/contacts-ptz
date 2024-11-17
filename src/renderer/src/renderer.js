// load all current contacts on app open
window.onload = () => {
    displayContacts()
    setInterval(() => {
        updateTime()
    }, 100)
}

const contactsList = document.querySelector('.contacts')
function displayContacts() {
    // make sure contacts are properly sorted
    window.api.sortContacts()

    const date = new Date()

    contactsList.innerHTML = ''

    Object.entries(localStorage).forEach(([contactId, contactData]) => {
        const data = JSON.parse(contactData)
        const detailsList = data.details.map(detail => `
            <li class="contact-details-list-item">${detail}</li>
        `).join('')

        const time = new Date()
        const offset = parseInt(data.timezone, 10) + (time.getTimezoneOffset() / 60)
        time.setUTCHours(date.getUTCHours() + offset)

        const timeFormat = 'en-US' // later, get from user settings data but default to en-US
        const hour12 = true // later, get from user setting data whether 12 or 24 but default to 12
        const contactTime = time.toLocaleString(timeFormat, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: hour12
        })

        const contactElement = document.createElement('div')
        contactElement.classList.add('contact')
        contactElement.innerHTML = `
            <h3 class="contact-name">${data.name} <button class="contact-delete-btn">🗑️</button></h3>
            <span class="contact-timezone ${data.timezone ? '' : 'pale'}">⏰ ${data.timezone ? contactTime + ' (' + data.timezone + ' hrs)' : 'N/A'}</span>
            <span class="contact-location text-secondary ${data.location ? '' : 'pale'}">🗺️ ${data.location || 'N/A'}</span>
            <p class="contact-email ${data.email ? '' : 'pale'}">📬 <span class="text-secondary">${data.email || 'N/A'}</span></p>
            <p class="contact-phone ${data.phone ? '' : 'pale'}">📞 <span class="text-secondary">${data.phone || 'N/A'}</span></p>
            <button class="contact-details-btn" ${data.details.length === 0 ? 'disabled' : ''}>Details</button>
            <div class="hidden contact-details-expand">
                ${detailsList}
            </div>
        `

        contactsList.appendChild(contactElement)

        const detailsBtn = contactElement.querySelector('.contact-details-btn')
        const detailsDiv = contactElement.querySelector('.contact-details-expand')

        detailsBtn.addEventListener('click', () => {
            detailsDiv.classList.toggle('hidden')
        })

        const deleteBtn = contactElement.querySelector('.contact-delete-btn')

        deleteBtn.addEventListener('click', () => {
            window.api.deleteContact(data.id)
            displayContacts()
        })
    })
}

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

    const contactId = window.api.generateId()
    const contactData = {
        id: contactId,
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
        localStorage.setItem(contactId, JSON.stringify(contactData))

        displayContacts()
        loadingAnimation()
    }, 500)

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

// replace every time display with one a minute later ev. minute
function updateTime() {
    const timeDisplays = document.querySelectorAll('span.contact-timezone')
    const tenthSeconds = Math.floor(new Date().getTime() / 100)

    if ((tenthSeconds % 10) == 0) {
        for (const item of timeDisplays) {
            const currentMinutes = new Date().getMinutes()

            const timeString = item.textContent.slice(2, 11).trim()
            const [time, period] = timeString.split(" ")
            let [hours, minutes] = time.split(":").map(Number)

            if (minutes != currentMinutes && item.textContent.split(" ")[1] != 'N/A') {
                // Convert to 24-hour format for easier manipulation
                if (period === "PM" && hours !== 12) {
                    hours += 12
                } else if (period === "AM" && hours === 12) {
                    hours = 0
                }

                // Create a Date object and set the hours and minutes
                const date = new Date()
                date.setHours(hours, minutes, 0, 0)

                // Add one minute
                date.setMinutes(date.getMinutes() + 1)

                // Convert back to 12-hour format
                let newHours = date.getHours()
                const newMinutes = date.getMinutes()
                const newPeriod = newHours >= 12 ? "PM" : "AM"

                newHours = newHours % 12 || 12 // Convert 0 or 12/24 to 12 in 12-hour format

                // Format the new time string with padding for minutes
                const newTimeString = `⏰ ${newHours}:${newMinutes.toString().padStart(2, '0')} ${newPeriod}`
                item.textContent = newTimeString
            }
        }
    }
}