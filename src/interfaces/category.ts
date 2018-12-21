export class Category {
    public category_id : string;
    public category_name : string;
    public seq_no : string;
}

export class CategoryCache {
    public categories : Array < Category >;
    public isAvailable : boolean = false;
}

export class DealCategory {
    public deal_id : string;
    public category_id : string;
    public seq_no : string;
}

export class DealCategoryCache {
    public dealCategories : Array < DealCategory >;
    public isAvailable : boolean = false;
}