import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup | undefined;
  isRegisterFormSubmit = false;
  isLoadingBtn: boolean = false;
  addressId;
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.makeRegisterForm();
  }

  makeRegisterForm() {
    this.RegisterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    })
  }
  get registerFormSubmitted() {
    return this.RegisterForm?.controls;
  }



  registerForm() {
    const command = {
      name: this.RegisterForm?.value.name,
      password: this.RegisterForm?.value.password,
      email: this.RegisterForm?.value.email,
      phoneNumber: this.RegisterForm?.value.phoneNumber,
    }
    this.isLoadingBtn = true;
    if (this.RegisterForm?.invalid) {
      this.isRegisterFormSubmit = true;
      this.isLoadingBtn = false;
      return;
    }
    this.registerService.registerUser(command)
      .pipe(finalize(() => this.isLoadingBtn = false))
      .subscribe((res) => {
        if (res) {
          console.log("res : ", res);

          // this.RegisterForm?.reset();
          // this.toastr.success(`The ${command.name} User is Added Successfully`);
        }
      })
  }



  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
