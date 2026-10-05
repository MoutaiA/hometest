// Wish to move to a dedicated class, but not sure about the requirements, then it's still there
export class Drug {
    constructor(name, expiresIn, benefit) {
        this.name = name;
        this.expiresIn = expiresIn;
        this.benefit = benefit;
        this.decrementBenefitNumber = 1;
    }

    decrementValues() {
        validate();
        decrementExpiresIn();
        decrementBenefit();
    }

    validate() {
        if (this.name === "Magic Pill") return;
    }

    decrementExpiresIn() {
        if (this.expiresIn <= 0) return;
        this.expiresIn--;
        if (this.expiresIn <= 0) this.decrementBenefitNumber = 2;
    }

    decrementBenefit() {
        if (this.benefit == 0) return;
        this.benefit -= this.decrementBenefitNumber;
    }

    increaseBenefit() {
        if (this.benefit == 50) return;
        this.benefit += this.incrementBenefitNumber;
    }
}

// Same, I would like to rename the class Pharmacy.js and make the class export default, but not sure about the requirements
export class Pharmacy {
    constructor(drugs = []) {
        this.drugs = drugs;
    }
    updateBenefitValue() {
        for (var i = 0; i < this.drugs.length; i++) {
            if (
                this.drugs[i].name != "Herbal Tea" &&
                this.drugs[i].name != "Fervex"
            ) {
                if (this.drugs[i].benefit > 0) {
                    if (this.drugs[i].name != "Magic Pill") {
                        this.drugs[i].benefit = this.drugs[i].benefit - 1;
                    }
                }
            } else {
                if (this.drugs[i].benefit < 50) {
                    this.drugs[i].benefit = this.drugs[i].benefit + 1;
                    if (this.drugs[i].name == "Fervex") {
                        if (this.drugs[i].expiresIn < 11) {
                            if (this.drugs[i].benefit < 50) {
                                this.drugs[i].benefit = this.drugs[i].benefit + 1;
                            }
                        }
                        if (this.drugs[i].expiresIn < 6) {
                            if (this.drugs[i].benefit < 50) {
                                this.drugs[i].benefit = this.drugs[i].benefit + 1;
                            }
                        }
                    }
                }
            }
            if (this.drugs[i].name != "Magic Pill") {
                this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
            }
            if (this.drugs[i].expiresIn < 0) {
                if (this.drugs[i].name != "Herbal Tea") {
                    if (this.drugs[i].name != "Fervex") {
                        if (this.drugs[i].benefit > 0) {
                            if (this.drugs[i].name != "Magic Pill") {
                                this.drugs[i].benefit = this.drugs[i].benefit - 1;
                            }
                        }
                    } else {
                        this.drugs[i].benefit =
                            this.drugs[i].benefit - this.drugs[i].benefit;
                    }
                } else {
                    if (this.drugs[i].benefit < 50) {
                        this.drugs[i].benefit = this.drugs[i].benefit + 1;
                    }
                }
            }
        }

        return this.drugs;
    }
}
