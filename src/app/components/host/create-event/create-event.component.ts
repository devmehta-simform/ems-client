import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Country, State, City, type ICountry, type IState, type ICity } from 'country-state-city';

@Component({
  selector: 'app-create-event',
  imports: [FormsModule, ReactiveFormsModule],
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
  form = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      numberOfTickets: new FormControl('', [Validators.required, Validators.min(1)]),
      dateOfEvent: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      location: new FormGroup({
        address: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
      }),
      coverImage: new FormControl<File | null>(null),
      album: new FormArray<FormControl<File | null>>([]),
    },
    { validators: this.endTimeValidator() }
  );

  constructor() {
    this.countries = Country.getAllCountries();
    this.form.valueChanges.subscribe(data => {
      console.log('something changed', data);
    });
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

  endTimeValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const startTime = control.get('startTime')?.value;
      const endTime = control.get('endTime')?.value;

      if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
        return { endTimeInvalid: 'endTime should be after startTime' };
      }
      return null;
    };
  }

  dropHandler(event: DragEvent) {
    // reference: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    console.log('drop handler');
    event.preventDefault();
    if (event.dataTransfer) {
      if (event.dataTransfer.items) {
        [...event.dataTransfer.items].forEach((item, i) => {
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file) {
              console.log(`file[${i}].name = ${file.name}`, file);
              this.form.controls.coverImage.setValue(file);
            }
          }
        });
      } else {
        [...event.dataTransfer.files].forEach((file, i) => {
          console.log(`file[${i}].name = ${file.name}`);
        });
      }
    }
  }
  dragOverHandler(event: Event) {
    event.preventDefault();
  }

  handleCoverImageInput(event: Event) {
    const ele = event.target;
    if (ele instanceof HTMLInputElement) {
      if (ele.files && ele.files.length) {
        // this.form.controls.album.setControl(0, new FormControl(ele.files[0]));
        this.form.controls.coverImage.setValue(ele.files[0]);
      } else {
        this.form.controls.coverImage.setValue(null);
      }
    }
  }

  handleAlbumInput(event: Event) {
    const ele = event.target;
    if (ele instanceof HTMLInputElement) {
      if (ele.files && ele.files.length) {
        // this.form.controls.album.setControl(0, new FormControl(ele.files[0]));
        this.form.controls.album.push(new FormControl(ele.files[0]));
      } else {
        this.form.controls.coverImage.setValue(null);
      }
    }
  }

  getCoverImageUrl() {
    const coverImage = this.form.controls.coverImage.value;
    return coverImage ? URL.createObjectURL(coverImage) : null;
  }

  getAlbumImageUrl(i: number) {
    const img = this.form.controls.album.value.at(i);
    return img ? URL.createObjectURL(img) : null;
  }

  removeImageFromAlbum(i: number) {
    this.form.controls.album.removeAt(i);
  }
}
