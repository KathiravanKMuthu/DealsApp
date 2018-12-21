
export class DealInfo {
    public deal_id: string;
    public parent_deal_id: string;
    public merchant_id: string;
    public title: string;
    public description: string;
    public deal_amount: string;
    public currency: string;
    public actual_amount: string;
    public start_date: string;
    public end_date: string;
    public is_active: string;
    public redemption_count: string;
    public percentage: string;
    public image_dir: string;
    public business_name: string;
}

export class DealInfoCache {
    public deals : Array< DealInfo >;
    public isAvailable: boolean = false;

    public expireDeals : Array< DealInfo >;
    public isExpireDealsAvailable : boolean = false;
}
