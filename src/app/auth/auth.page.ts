import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  /**
   * Defines if the loading state is true or false
   */
  public isLoading: boolean = false;

  /**
   * Defines if the user is in login or sign up mode
   */
  public isLogin: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  /**
   * Is called when the login form is submitted
   */
  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);

    if (this.isLogin) {
      // Send login to server
    } else {
      // send signup request
    }
  }

  /**
   * Is called when the user clicks the switch method button
   */
  public onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  // Method to log user in
  public onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingController.create({
      keyboardClose: true,
      message: 'Logging in...'
    })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }

}
