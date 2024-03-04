import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserInfoService {
    constructor(private http: HttpClient) {
    }

    getUserInfoById(userId) {
        return this.http.get(`http://localhost:3000/users/${userId}`);
    }
    setUserInfoData(command) {
        return this.http.patch(`http://localhost:3000/users/${command.id}`, command);

    }

}