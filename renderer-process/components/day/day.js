export class Day extends HTMLElement {
    constructor(dayNumber) {
        super();
        this.innerText = 'DEN';
        this.number = dayNumber;
        this.addEventListener('click', this.handleClickEvent);
    }

    handleClickEvent() {
        alert('clicked day: ' + this.number); 
    }
}

customElements.define('app-day', Day);