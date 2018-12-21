import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../providers/category-service';
import { Category } from '../../interfaces/category';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categories: Category[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryService) {
      this.getAllCategories();
  }

  getAllCategories() {
      this.categoryService.getAllCategories().then((data) => {
          this.categories = data;
      });
  }

  navDealsListPage() {
    this.navCtrl.pop();
  }

}
