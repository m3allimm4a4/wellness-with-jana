import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../components/login/login.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  public openLoginDialog() {
    this.ref = this.dialogService.open(LoginComponent, {
      header: 'Login',
      position: 'top',
      modal: true,
      appendTo: 'body',
    });
  }

  public closeLoginDialog() {
    this.ref?.close();
    this.ref = undefined;
  }

  public login(username: string, password: string) {
    if (username !== 'admin' || password !== 'admin') {
      this.messageService.add({
        key: 'toast',
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid username or password',
      });
      return;
    }
    this.closeLoginDialog();
    this.router.navigate(['/admin']).then();
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Success',
      detail: `Hello ${username} !`,
    });
  }
}
