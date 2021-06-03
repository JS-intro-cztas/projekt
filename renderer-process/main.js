import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const carousel = document.querySelector('app-carousel');

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

function showDayModal() {
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
        const isHoliday = formData.get('isHolidayControl') === 'on';
    });

    document.body.appendChild(modal);

    fetch('http://localhost:3000/contacts')
        .then(serverResponse => serverResponse.text())
        .then(responseText => {
        const data = JSON.parse(responseText);
        const select = document.querySelector('#eventAttendees');
        data.forEach(it => {
            const option = document.createElement('option');
            option.setAttribute('value', it.id);
            option.innerText = `${it.first_name} ${it.last_name}`;
            select.appendChild(option);
        });
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