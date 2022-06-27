import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CountriesComponent } from './home/countries/countries.component';
import { MapsComponent } from './home/maps/maps.component';
import { KpiCardsComponent } from './home/kpi-cards/kpi-cards.component';
import { HistoricalDataComponent } from './home/historical-data/historical-data.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkerService } from './core/services/marker.service';
import { PopUpService } from './core/services/popup.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CountriesComponent,
    MapsComponent,
    KpiCardsComponent,
    HistoricalDataComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    LeafletModule
  ],
  providers: [
    MarkerService,
    PopUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
