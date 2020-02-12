import { buttonLocker } from '../helpers';
import { playButtons, passButton, getCardBtn } from '../constants/playButtons';
import { classToggler } from '../utils';
import { rateButtons } from '../constants/rateButtons';
import { BLACK_VALUE } from '../constants/importantNumbers';
import {
    matchResult,
    currentMoney,
    currentRate,
    playerCardSummary,
    botCardSummary,
} from '../constants/matchInfo';

class MatchService {
    constructor() {
        this.playerCardValue = null;
        this.botCardValue = null;
        this.cashAmount = null;
        this.wholeCash = 5000;
        this.isCardDrawed = false;

        currentMoney.textContent = this.wholeCash;
    }

    setPlayerCardValue(value) {
        this.playerCardValue = value;
    }

    setBotCardValue(value) {
        this.botCardValue = value;
    }

    unlockPassButton() {
        if (this.isCardDrawed) {
            passButton.disabled = false;
        }
    }

    cashButtonUsage() {
        if (this.cashAmount === null) {
            buttonLocker(true, playButtons);
        }

        rateButtons.forEach(item => {
            item.addEventListener('click', () => {
                this.cashAmount = item.textContent;
                getCardBtn.disabled = false;
            });
        });
    }

    cashCalculator(flag) {
        if (!flag) {
            this.wholeCash -= this.cashAmount;
            currentMoney.textContent = this.wholeCash;
        } else {
            const parsedWholeCash = Number.parseInt(this.wholeCash, 10);
            const parsedCashAmount = Number.parseInt(this.cashAmount, 10);
            const sum = parsedWholeCash + parsedCashAmount;
            currentMoney.textContent = sum;
        }
    }

    finalResult() {
        if (this.playerCardValue > BLACK_VALUE) {
            this.cashCalculator(false);
            classToggler('lose', 'win', matchResult);
            matchResult.textContent = 'YOU LOSE';
        } else if (this.playerCardValue < this.botCardValue && this.botCardValue <= BLACK_VALUE) {
            this.cashCalculator(false);
            classToggler('lose', 'win', matchResult);
            matchResult.textContent = 'YOU LOSE';
        } else if (
            this.playerCardValue > this.botCardValue &&
            this.playerCardValue <= BLACK_VALUE
        ) {
            this.cashCalculator(true);
            classToggler('win', 'lose', matchResult);
            matchResult.textContent = 'YOU WIN';
        } else if (this.botCardValue > BLACK_VALUE) {
            this.cashCalculator(true);
            classToggler('win', 'lose', matchResult);
            matchResult.textContent = 'YOU WIN';
        }

        setTimeout(() => {
            this.restartMatch();
            matchResult.textContent = '';
        }, 2000);
    }

    restartMatch() {
        this.setPlayerCardValue(null);
        this.setBotCardValue(null);
        playerCardSummary.textContent = '0';
        botCardSummary.textContent = '0';
        buttonLocker(true, playButtons);
        buttonLocker(false, rateButtons);
        this.correctRateButtonsUnlock();
        this.cashAmount = 0;
        currentRate.textContent = this.cashAmount;
    }

    correctRateButtonsUnlock() {
        rateButtons.forEach(item => {
            if (this.wholeCash - item.textContent < 0) {
                // eslint-disable-next-line no-param-reassign
                item.disabled = true;
            }
        });
    }
}

export default MatchService;
