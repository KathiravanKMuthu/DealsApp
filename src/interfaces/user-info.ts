import { Storage } from "@ionic/storage";

export class UserInfo {
    public user_id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public phone_number: string;
    public email_otp: string;
    public phone_number_otp: string;
    public encrypted_password: string;
    public email_verified: string;
    public phone_number_verified: string;
    public login_status: string;
    public last_login_time: string;
    public is_social_login: string;
    public social_login_partner: string;
    public social_login_id: string;
    public address1: string;
    public address2: string;
    public state: string;
    public country: string;
    public postal_code: string;
    public image: string;
}

export class UserInfoCache {
    public userInfo : UserInfo;
    public isAvailable: boolean = false;
    public authToken: string;
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    public getUserInfoCache() : UserInfo {
        (this.userInfo == null)
        {
            this.storage.get("user_info").then((val) => {
                if(val) {
                    this.userInfo = val;
                    this.isAvailable = true;
                }
            });
        }
        return this.userInfo;
    }
 
    public setUserInfoCache(userInfo: UserInfo) {
        this.userInfo = userInfo;
        this.storage.remove("user_info");
        this.storage.set("user_info", this.userInfo);
        this.isAvailable = true;
    }
}