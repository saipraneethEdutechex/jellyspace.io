import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.component.html',
  styleUrls: ['./sign-out-modal.component.scss'],
})
export class SignOutModalComponent {
  isVisible = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  confirmSignOut() {
    this.isVisible = false;
    this.confirm.emit();
  }
}
