import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';
import { UsernameValidator } from '../../validators/username';
import { EmailValidator } from '../../validators/email';

@IonicPage({
  defaultHistory: ['LoginPage']
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: any;
  loading: any;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private userProvider: UserProvider,
    private dataProvider: DataProvider,
    private loadingCtrl: LoadingController,
    private usernameValidator: UsernameValidator,
    private emailValidator: EmailValidator) {

      this.registerForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z0-9]*'), Validators.required]), usernameValidator.checkUsername.bind(usernameValidator)],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required]), emailValidator.checkEmail.bind(emailValidator)],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
      }, {validator: this.confirmPassword});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAccount(): void {

    if(this.registerForm.valid){
      this.presentLoading();
      this.authProvider.register(this.registerForm.value).subscribe((res) => {
        if(typeof(res.token) != 'undefined'){
          this.dataProvider.initDatabase(res.userDBs.hangz);
          this.userProvider.saveUserData(res);
          this.navCtrl.setRoot('HomePage');
        }
        this.loading.dismiss();
      }, (err) => {
          this.loading.dismiss();
      });
    }

  }

  presentLoading() {

    this.loading = this.loadingCtrl.create({
      content: 'Creating Account...'
    });
    this.loading.present();

  }

  confirmPassword(form) {

    let password = form.get('password');
    let confirmPassword = form.get('confirmPassword');
    let validation = {};
    if((password.touched || confirmPassword.touched) && password.value !== confirmPassword.value) {
      validation = {
        passwordMismatch: true
      };
    }
    return validation;

  }

}
