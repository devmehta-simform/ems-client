import { Component } from '@angular/core';
import { Country, State, City, type ICountry, type IState, type ICity } from 'country-state-city';

@Component({
  selector: 'app-create-event',
  imports: [],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  countries: ICountry[];
  country!: ICountry;
  states!: IState[];
  cities!: ICity[];
  state!: IState;
  today: string = new Date().toISOString().split('T')[0];
  constructor() {
    this.countries = Country.getAllCountries();
  }

  getStates() {
    return State.getStatesOfCountry(this.country.isoCode);
  }

  getCities() {
    return City.getCitiesOfState(this.country.isoCode, this.state.isoCode);
  }

  changeCountry(event: Event) {
    const ele = event.target;
    if (ele instanceof HTMLSelectElement) {
      // console.log(ele.value);
      const foundCountry = Country.getCountryByCode(ele.value);
      if (foundCountry !== undefined) {
        this.country = foundCountry;
        this.states = this.getStates();
        this.cities = [];
      }
    }
  }

  changeState(event: Event) {
    const ele = event.target;
    if (ele instanceof HTMLSelectElement) {
      const foundState = State.getStateByCodeAndCountry(ele.value, this.country.isoCode);
      if (foundState !== undefined) {
        this.state = foundState;
        this.cities = this.getCities();
      }
    }
  }
}
