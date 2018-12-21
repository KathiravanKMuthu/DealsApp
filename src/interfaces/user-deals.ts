
export class UserDeals {
    public user_id: string;
    public deal_id: string;
    public qrcode_string: string;
    public is_redeemed: string;
    public is_wished: string;
}

export class UserDealsCache {
    public userDeals : Array < UserDeals >;
    public isAvailable : boolean = false;
}