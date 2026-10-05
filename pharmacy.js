export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  decrementValues() {
    if (this.name === "Magic Pill") return this;

    if (this.name === "Herbal Tea") {
      this.increaseBenefit();
    } else if (this.name === "Fervex") {
      if (this.expiresIn <= 0) {
        this.benefit = 0;
      } else {
        this.increaseBenefit();
      }
    } else {
      this.decrementBenefit();
    }

    this.decrementExpiresIn();
    return this;
  }

  decrementExpiresIn() {
    this.expiresIn--;
  }

  decrementBenefit() {
    this.benefit = Math.max(0, this.benefit - this.decreaseBenefitMapping());
  }

  decreaseBenefitMapping() {
    if (this.name === "Dafalgan") {
      return this.expiresIn <= 0 ? 4 : 2;
    }
    return this.expiresIn <= 0 ? 2 : 1;
  }

  increaseBenefit() {
    this.benefit = Math.min(50, this.benefit + this.increaseBenefitMapping());
  }

  increaseBenefitMapping() {
    if (this.name === "Fervex") {
      if (this.expiresIn <= 5) return 3;
      if (this.expiresIn <= 10) return 2;
    }
    if (this.name === "Herbal Tea" && this.expiresIn <= 0) return 2;
    return 1;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => drug.decrementValues());
    return this.drugs;
  }
}
