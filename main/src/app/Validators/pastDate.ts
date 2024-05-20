import { AbstractControl } from "@angular/forms";

export function pastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = control.value;
    const currentDate = new Date();
  
    if (selectedDate > currentDate) {
      return { 'futureDate': true };
    }
    return null;
  }