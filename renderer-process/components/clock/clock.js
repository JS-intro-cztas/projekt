
export class Clock extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <footer class="footer-clock">
            <div id="clock" class="footer-clock__container hidden">
            </div>
        </footer>
        `;

        this.footer = document.querySelector('footer.footer-clock > div.footer-clock__container');

        this.codeLetterVerificationIdx = 0;
        this.clockCode = "time";

        document.addEventListener('keydown', (event) => {
            // TODO remove redundant code
            // if (event.key == "t" && this.codeLetterVerificationIdx == 1) {
            //     return;
            // }
            if (event.key == this.clockCode[this.codeLetterVerificationIdx]) {
                this.codeLetterVerificationIdx ++;
            } else {
                this.codeLetterVerificationIdx = 0;
            }
            if (this.codeLetterVerificationIdx == this.clockCode.length) {
                this.showClock();
                this.codeLetterVerificationIdx = 0;
            }
        });

    }

    showClock() {
        document.querySelector('#clock').classList.remove('hidden');
        // TODO remove redundant
        // for (var i = 0; i < 6; i++) {
        //     setTimeout(function () {
        //         document.querySelector('#clock').innerText = (new Date()).toLocaleTimeString();
        //     }, i * 1000);            
        // }

        setInterval(
            () => {
                document.querySelector('#clock').innerText = (new Date()).toLocaleTimeString();
            },
            1000,
        );

        setTimeout(
            () => {
                document.querySelector('#clock').classList.add('hidden');
                document.body.removeChild(this.footer);
            },
            5000,
        );
    }
}

customElements.define('app-clock', Clock);