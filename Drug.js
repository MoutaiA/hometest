export default class Drug {
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
