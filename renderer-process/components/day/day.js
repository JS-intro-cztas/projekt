export class Day extends HTMLElement {
    constructor(date) {
        super();
        this.innerHTML = `
        <div id="day-number"></div>
        `;
        this.date = date;
        this.number = date.getDate();
        this.querySelector('#day-number').innerText = this.number;
        this.addEventListener('click', this.handleClickEvent);
    }

    getDayName() {
        switch(this.date.getDay()) {
            case 0:
                return 'Nedele';
            case 1:
                return 'Pondeli';
            case 2:
                return 'Uteri';
            case 3:
                return 'Streda';
            case 4:
                return 'Stvrtek';
            case 5:
                return 'Patek';
            case 6:
                return 'Sobota';
        }
    }

    handleClickEvent() {
        window.showModal(this.date);
    }
}

customElements.define('app-day', Day);