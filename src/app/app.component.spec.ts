import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
describe('AppComponent', () => {

  /*** SETUP ***/

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


  /*** MOCK DATA ***/

  // item is available both online and in store
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

  // item is available online only
  let clone1 = JSON.parse(JSON.stringify(itemDataOnlineAndStore));
  clone1.CatalogEntryView[0].purchasingChannelCode = '1';
  const itemDataOnlineOnly  = clone1;

  // item is available in store only
  let clone2 = JSON.parse(JSON.stringify(itemDataOnlineAndStore));
  clone2.CatalogEntryView[0].purchasingChannelCode = '2';
  const itemDataStoreOnly  = clone2;

  // item is available neither online nor in store
  let clone3 = JSON.parse(JSON.stringify(itemDataOnlineAndStore));
  clone3.CatalogEntryView[0].purchasingChannelCode = '-1';
  const itemDataNeither  = clone3;


  /*** TESTS ***/

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

  it('should show "Add To Cart" and "Pick up in Store" buttons if item is available both online and in store', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineAndStore); // purchasingChannelCode = '0'; online and in store

    expect(app.showAddToCart).toBe(true);
    expect(app.showStorePickUp).toBe(true);
  });

  it('should NOT show "Add To Cart" or "Pick up in Store" buttons if item is NOT available online or in store', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataNeither); // purchasingChannelCode = '-1'; neither online nor in store

    expect(app.showAddToCart).toBe(false);
    expect(app.showStorePickUp).toBe(false);
  });

  it('should show "Add To Cart" button if item is available online', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineOnly); // purchasingChannelCode = '1'; online only

    expect(app.showAddToCart).toBe(true);
  });

  it('should NOT show "Add To Cart" button if item is in store only', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataStoreOnly); // purchasingChannelCode = '2'; in store only

    expect(app.showAddToCart).toBe(false);
  });

  it('should show "Pick up in Store" button if item is available in store', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataStoreOnly); // purchasingChannelCode = '2'; in store only

    expect(app.showStorePickUp).toBe(true);
  });

  it('should NOT show "Pick up in Store" button if item is online only', function() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.processItemData(itemDataOnlineOnly); // purchasingChannelCode = '1'; online only

    expect(app.showStorePickUp).toBe(false);
  });

});
