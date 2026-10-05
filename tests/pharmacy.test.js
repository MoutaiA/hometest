import { Drug, Pharmacy } from "../pharmacy";

describe("Pharmacy", () => {
  describe("once the expiration date has passed, Benefit degrades twice as fast", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 2)]);
    });

    it("decreases benefit by 1 on the expiration day", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 1, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", 0, 9)]);
    });

    it("decreases benefit by 2 when the drug is expired", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 8)]);
    });

    it("keeps decreasing benefit by 2 after the expiration date", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", -1, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -2, 8)]);
    });
  });

  describe("the Benefit of an item is never negative", () => {
    it("does not decrease benefit below 0", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 5, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", 4, 0)]);
    });

    it("keeps benefit at 0 when already expired", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 0)]);
    });

    it("stops at 0 when the post-expiry decrease would go negative", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 0)]);
    });
  });

  describe("Herbal Tea increases in Benefit the older it gets", () => {
    it("increases benefit by 1 before the expiration date", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 10, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 9, 6)]);
    });

    it("increases benefit by 1 on the expiration day", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 1, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 0, 6)]);
    });

    it("increases benefit by 2 after the expiration date", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 7)]);
    });

    it("keeps increasing benefit by 2 once expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -2, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -3, 7)]);
    });
  });

  describe("the Benefit of an item is never more than 50", () => {
    it("does not increase Herbal Tea above 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 4, 50)]);
    });

    it("stops at 50 when the post-expiry increase would exceed it", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 49)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);
    });

    it("keeps benefit at 50 when Herbal Tea is already expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);
    });
  });

  describe("Magic Pill never expires nor decreases in Benefit", () => {
    it("does not change expiresIn or benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 15, 40)]);
    });

    it("does not change when expiresIn is 0", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 0, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 0, 40)]);
    });

    it("does not change when already expired", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", -1, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", -1, 1)]);
    });
  });
});
