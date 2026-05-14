import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { email, form, FormField, required, validate } from '@angular/forms/signals';

interface RegistrationModel {
  accountType: 'personal' | 'business';
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-signal-forms-demo',
  imports: [FormField],
  templateUrl: './signal-forms-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsDemoComponent {
  readonly initialModel: RegistrationModel = {
    accountType: 'personal',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  };

  readonly model = signal<RegistrationModel>({ ...this.initialModel });

  readonly registrationForm = form(this.model, (schema) => {
    email(
      schema.email,
      { message: 'Necesitás un email válido.' }
    );
    required(schema.email, { message: 'El email es obligatorio.' });
    required(schema.password, { message: 'La contraseña es obligatoria.' });
    required(schema.confirmPassword, { message: 'Confirmá la contraseña.' });
    required(schema.companyName, {
      when: ({ valueOf }) => valueOf(schema.accountType) === 'business',
      message: 'Para cuentas business, companyName es obligatorio.',
    });
    validate(schema.confirmPassword, ({ value, valueOf }) => {
      return value() && value() !== valueOf(schema.password)
        ? { kind: 'passwordMismatch', message: 'Las contraseñas no coinciden.' }
        : null;
    });
  });

  readonly isBusiness = computed(() => this.registrationForm.accountType().value() === 'business');
  readonly canSubmit = computed(() => {
    return (
      this.registrationForm.email().valid() &&
      this.registrationForm.password().valid() &&
      this.registrationForm.confirmPassword().valid() &&
      (!this.isBusiness() || this.registrationForm.companyName().valid())
    );
  });

  reset(): void {
    this.model.set({ ...this.initialModel });
  }
}
