import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

window.showLoader = showLoader;
window.hideLoader = hideLoader;

function showLoader() {
	document.body.appendChild(document.querySelector('#loaderTemplate').content.cloneNode(true));
}

function hideLoader() {
    document.body.removeChild(document.querySelector('.loader'));
}

function showToaster(success, title, message) {
    const toasterTemplate = document.querySelector('#toasterTemplate').content.cloneNode(true);
    const toasterElement = toasterTemplate.querySelector('.toaster');
    toasterElement.addEventListener('click', () => document.body.removeChild(toasterElement));
    toasterElement.classList.add(success ? 'success' : 'error');
    toasterTemplate.querySelector('h1').innerText = title;
    toasterTemplate.querySelector('p').innerText = message;
    document.body.appendChild(toasterTemplate);
    setTimeout(() => {
        try {
            document.body.removeChild(toasterElement);
        } catch(e) {
            console.warn('Toaster already removed');
        }
    }, 3000);
}

const carousel = document.querySelector('app-carousel');

fetch('http://localhost:3000/calendar')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
      const data = JSON.parse(responseText);
    });

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
      const data = JSON.parse(responseText);
      carousel.populateNewsCarousel(data.articles);
    });

const mainContent = document.querySelector('section.main-content');

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

for (let i = 1; i <= maxDate; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    mainContent.appendChild(new Day(dayDate));
}

function showDayModal(dayDate) {
    const template = document.querySelector('#modal-template');
    const modal = template.content.cloneNode(true);

    const closeAction = () => {
        const child = document.querySelector('section.modal-container');
        document.body.removeChild(child);
    };

    modal.querySelector('#close-modal').addEventListener('click', closeAction);

    const cancelButton = modal.querySelector('#cancel-button');
    cancelButton.addEventListener('click', closeAction);

    modal.querySelector('#save-button').addEventListener('click', () => {
        const formRef = document.querySelector('#modal-form');
        const formData = new FormData(formRef);
        const data = formData.entries();

        const object = { 
            date: dayDate
        };

        for (let formValue of data) {
            const key = formValue[0];
            const value = formValue[1];
            object[key] = value;
        }

        showLoader();

        fetch('http://localhost:3000/calendar',
            {
                method: 'POST', // metoda POST sluzi k odosielaniu novych dat pre ulozenie na server
                body: JSON.stringify(object), // obsah
                headers: {
                    'Content-Type': 'application/json', // informacia o formate dat aby server vedel precitat obsah
                },
            }
        ).then(response => {
                hideLoader(); // spracovanie odpovedi zo servru
                // if (response.ok) {
                if (response.status === 200) {
                    showToaster(true, 'Data Ulozeny', 'Vase udalost byla ulozena.');
                    fetch('http://localhost:3000/calendar')
                    .then(serverResponse => serverResponse.text())
                    .then(responseText => {
                        const events = JSON.parse(responseText);
                        const days = document.querySelectorAll('app-day');

                        const eventValues = Object.values(events);

                        eventValues.forEach(event => {
                            for (let day of days) {
                                const eventDate = new Date(event.date);
                                const dayDate = day.date;

                                // eventDate.toDateString()
                                // v pripade ze sa rovna eventDate a dayDate -> nastavit event 
                            }
                        });
                    });
                } else {
                    showToaster(false, 'Chyba Ukladani', 'Server neni dostupny.');
                }
            }
        );

        // GET
        // POST
        // PATCH
        // DELETE
    });

    document.body.appendChild(modal);

    const checkbox = document.querySelector('#limitAttendeesByGender');
    const row = document.querySelector("#genderSelectRow");
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });

    // const days = document.querySelectorAll('app-day');

    // const daysArray = Array.from(days);

    // for (const item of days) {
    //     console.log(item);
    // }


    let contactsArray;

    fetch('http://localhost:3000/contacts')
        .then(serverResponse => serverResponse.text())
        .then(responseText => {
        contactsArray = JSON.parse(responseText);
        createOptions(contactsArray);
    });

    const radioButtons = document.querySelectorAll('#genderSelectRow > input');

    for (let radio of radioButtons) {
        radio.addEventListener('change', () => {
            const formRef = document.querySelector('#modal-form');
            const formData = new FormData(formRef);
            const gender = formData.get('gender');
            const filteredContacts = contactsArray.filter((contact) => {
                return contact.gender === gender;
            });
            createOptions(filteredContacts);
        });
    }
}


function createOptions(contactsArray) {
        const select = document.querySelector('#eventAttendees');

        const helperClass = 'hakunamatata';

        const oldOptions = document.querySelectorAll(`.${helperClass}`);

        oldOptions.forEach(opt => {
            select.removeChild(opt);
            //opt.remove();
        });

        contactsArray.forEach(it => {
            const option = document.createElement('option');
            option.setAttribute('value', it.id);
            option.innerText = `${it.first_name} ${it.last_name}`;
            option.classList.add(helperClass);
            select.appendChild(option);
        });
}

window.showModal = showDayModal;


fetch('http://localhost:3000/contacts')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
      const data = JSON.parse(responseText);
      // id
      // first_name
      // last_name
      // gender

      // ziskat referenci na select s id eventAttendees

      // vytvorit novy element option 
      // <option value="id"></option>
      // option innerText first_name + last_name
      // option.setAttribute('value', ...);
      // option.innerText = firstname + lastnme;


      // vlozit option do selectu
    })

    const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8];

    exampleArray.forEach(it => {
        console.log(it);
    });

    const rlt = exampleArray.map(it => {
        return it + 1;
    });

    console.log(rlt);

    const rlt2 = exampleArray.filter(it => {
        const isEven = it % 2 === 0;
        return isEven;
    });

    console.log(rlt2);