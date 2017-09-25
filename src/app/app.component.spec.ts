import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpModule,
        NgbModule.forRoot()
      ]
    }).compileComponents();
  }));

  const itemDataOnlineAndStore = {
    CatalogEntryView: [{
      title: 'Tester',
      Images: [{
        AlternateImages: [{
          image: 'altImage 1'
        },
        {
          image: 'altImage 2'
        }],
        PrimaryImage: [{
          image: 'primaryImage'
        }],
      }],
      purchasingChannelCode: '0',
      ItemDescription: [{
        features: [
          'This is a feature',
          'This is another feature'
        ]
      }],
      Offers: [{
        OfferPrice: [{
          formattedPriceValue: '$1.00'
        }]
      }]
    }]
  };

  const itemDataOnlineOnly = {
    CatalogEntryView: [{
      title: 'Tester',
      Images: [{
        AlternateImages: [{
          image: 'altImage 1'
        },
        {
          image: 'altImage 2'
        }],
        PrimaryImage: [{
          image: 'primaryImage'
        }],
      }],
      purchasingChannelCode: '1',
      ItemDescription: [{
        features: [
          'This is a feature',
          'This is another feature'
        ]
      }],
      Offers: [{
        OfferPrice: [{
          formattedPriceValue: '$1.00'
        }]
      }]
    }]
  };

  const itemDataStoreOnly = {
    CatalogEntryView: [{
      title: 'Tester',
      Images: [{
        AlternateImages: [{
          image: 'altImage 1'
        },
        {
          image: 'altImage 2'
        }],
        PrimaryImage: [{
          image: 'primaryImage'
        }],
      }],
      purchasingChannelCode: '2',
      ItemDescription: [{
        features: [
          'This is a feature',
          'This is another feature'
        ]
      }],
      Offers: [{
        OfferPrice: [{
          formattedPriceValue: '$1.00'
        }]
      }]
    }]
  };

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should extract title, images, price, and features from itemData object', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineAndStore);

    expect(app.title).toEqual('Tester');
    expect(app.carouselImages).toEqual(['primaryImage', 'altImage 1', 'altImage 2']);
    expect(app.formattedPriceValue).toEqual('$1.00');
    expect(app.features).toEqual(['This is a feature', 'This is another feature']);
  });

  it('should show "Add To Cart" button if item is available online', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineAndStore);

    expect(app.showAddToCart).toBe(true);
  });

  it('should NOT show "Add To Cart" button if item is NOT available online', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataStoreOnly);

    expect(app.showAddToCart).toBe(false);
  });

  it('should show "Pick up in Store" button if item is available in store', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineAndStore);

    expect(app.showStorePickUp).toBe(true);
  });

  it('should NOT show "Pick up in Store" button if item is NOT available in store', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineOnly);

    expect(app.showStorePickUp).toBe(false);
  });

});
