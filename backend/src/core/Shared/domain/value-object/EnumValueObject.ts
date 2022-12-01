export abstract class EnumValueObject<T> {
  readonly value: T;

  constructor(value: T, public readonly validValues: T[]) {
    this.value = value;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  equals(other: EnumValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
