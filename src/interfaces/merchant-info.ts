
export class MerchantInfo {
    public merchant_id: string;
    public merchant_email: string;
    public encrypted_password: string;
    public email_otp: string;
    public email_verified: string;
    public login_status: string;
    public phone_number_otp: string;
    public last_login_time: string;
    public business_name: string;
    public phone_number: string;
    public address1: string;
    public address2: string;
    public state: string;
    public country: string;
    public postal_code: string;
    public image_dir: string;
    public website: string;
    public facebook: string;
    public youtube: string;
    public instagram: string;
    public operating_time: string;
    public description: string;
    public map_position: string;
}

export class MerchantInfoCache {
    public merchants : Array < MerchantInfo >;
    public isAvailable: boolean = false;
}