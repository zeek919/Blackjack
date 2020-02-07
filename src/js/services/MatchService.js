import { buttonLocker } from '../helpers';
import { playButtons } from '../constants/playButtons';
import { rateButtons } from '../constants/rateButtons';
import { currentMoney } from '../constants/matchInfo';
import { BLACK_VALUE } from '../constants/importantNumbers';

class MatchService {
    constructor() {
        this.playerCardValue = null;
        this.botCardValue = null;
        this.cashAmount = null;
        this.wholeCash = 5000;

        currentMoney.textContent = this.wholeCash;
    }

    setPlayerCardValue(value) {
        this.playerCardValue = value;
    }

    setBotCardValue(value) {
        this.botCardValue = value;
    }

    cashButtonUsage() {
        if (this.cashAmount === null) {
            buttonLocker(true, playButtons);
        }

        rateButtons.forEach(item => {
            item.addEventListener('click', () => {
                this.cashAmount = item.textContent;
                buttonLocker(false, playButtons);
            });
        });
    }

    cashCalculator(flag) {
        if (!flag) {
            this.wholeCash -= this.cashAmount;
            currentMoney.textContent = this.wholeCash;
        } else {
            this.wholeCash += this.cashAmount;
            currentMoney.textContent = this.wholeCash;
        }
    }

    finalResult() {
        if (this.playerCardValue > BLACK_VALUE) {
            this.cashCalculator(false);
        }
        if (this.playerCardValue < this.botCardValue && this.botCardValue <= BLACK_VALUE) {
            this.cashCalculator(false);
        }
        if (this.playerCardValue > this.botCardValue && this.playerCardValue <= BLACK_VALUE) {
            this.cashCalculator(false);
        }
        if (this.botCardValue > BLACK_VALUE) {
            this.cashCalculator(true);
        }
    }
}

export default MatchService;
