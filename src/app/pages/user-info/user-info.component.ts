import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/services/userInfo.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userId: number = 0;
  userInfoForm: FormGroup | undefined;
  isUserInfoFormSubmit = false;
  isLoadingBtn: boolean = false;
  userInfo;
  constructor(
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.userId = Number(queryParams['xyz']);
    this.getUserInfo(this.userId);
    this.userInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    })
  }

  get userInfoFormSubmitted() {
    return this.userInfoForm?.controls;
  }

  getUserInfo(userId) {
    this.userInfoService.getUserInfoById(userId)
      .subscribe((res: any) => {
        this.userInfo = res;
        this.userInfoForm?.patchValue({
          name: res?.name,
          phoneNumber: res.phoneNumber
        })
      })
  }

  setUserInfoData() {
    const command = {
      ...this.userInfo,
      name: this.userInfoForm?.value.name,
      phoneNumber: this.userInfoForm?.value.phoneNumber,
    }
    this.userInfoService.setUserInfoData(command)
      .subscribe((res) => {
        localStorage.setItem('userInfo', JSON.stringify(res));
        window.location.replace('/');
        this.toastr.success(`The User Information is Edited Successfully`);
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
