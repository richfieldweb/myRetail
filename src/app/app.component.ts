import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemDataService } from './item-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ItemDataService]
})
export class AppComponent {

  itemDataServiceSub: any;

  title: string;
  carouselImages: string[];
  formattedPriceValue: string;
  showAddToCart: boolean;
  showStorePickUp: boolean;
  features: string[];

  constructor(private itemDataService: ItemDataService) {}

  ngOnInit() {
    this.itemDataServiceSub = this.itemDataService.getItemData().subscribe(this.processItemData.bind(this));
  }

  ngOnDestroy() {
    if (this.itemDataServiceSub) {
      this.itemDataServiceSub.unsubscribe();
    }
  }

  processItemData(itemData) {
    let item = itemData.CatalogEntryView[0],
        primaryImage = item.Images[0].PrimaryImage[0].image,
        pcCode = parseInt(item.purchasingChannelCode);

    this.title = item.title;
    this.carouselImages = item.Images[0].AlternateImages.map(item => item.image);
    this.carouselImages.unshift(primaryImage); // add the primary image as the first element in the carousel
    this.formattedPriceValue = item.Offers[0].OfferPrice[0].formattedPriceValue;
    this.showAddToCart = pcCode === 0 || pcCode === 1;
    this.showStorePickUp = pcCode === 0 || pcCode === 2;
    this.features = item.ItemDescription[0].features;
  }

}
