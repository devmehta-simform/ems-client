import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Country, State, City, type ICountry, type IState, type ICity } from 'country-state-city';
import { EventService } from '../../../services/event.service';
import { LoaderService } from '../../../services/loader.service';

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
  coverImageUrl: string | null = null;
  albumUrl: string[] = [];
  form = new FormGroup(
    {
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true, validators: Validators.required }),
      ticketPrice: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      numberOfTickets: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      dateOfEvent: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      startTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      endTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      state: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      zipcode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      coverImage: new FormControl<File | null>(null, { nonNullable: true, validators: [Validators.required] }),
      images: new FormArray<FormControl<File>>([]),
    },
    { validators: this.endTimeValidator() }
  );

  constructor(
    private eventService: EventService,
    private loaderService: LoaderService
  ) {
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
              this.getCoverImageUrl();
            }
          }
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
        this.getCoverImageUrl();
      } else {
        // this.form.controls.coverImage.setValue(null);
      }
    }
  }

  handleAlbumInput(event: Event) {
    const ele = event.target;
    if (ele instanceof HTMLInputElement) {
      if (ele.files && ele.files.length) {
        // this.form.controls.album.setControl(0, new FormControl(ele.files[0]));
        this.form.controls.images.push(new FormControl(ele.files[0], { nonNullable: true }));
        this.getAlbumImageUrl(this.form.controls.images.length - 1);
      } else {
        // this.form.controls.coverImage.setValue(null);
      }
    }
  }

  getCoverImageUrl() {
    const coverImage = this.form.controls.coverImage.value;
    this.coverImageUrl = coverImage ? URL.createObjectURL(coverImage) : null;
  }

  getAlbumImageUrl(i: number) {
    const img = this.form.controls.images.value.at(i);
    if (img) this.albumUrl[i] = URL.createObjectURL(img);
  }

  removeImageFromAlbum(i: number) {
    this.form.controls.images.removeAt(i);
    this.albumUrl.splice(i, 1);
  }

  handleSubmit() {
    const coverImage = this.form.controls.coverImage;
    const images = this.form.controls.images;
    const formValue = this.form.getRawValue();
    if (this.form.valid && coverImage.valid && coverImage.value !== null && images.valid && images.value) {
      this.loaderService.show();
      const startTime = `${formValue.dateOfEvent}T${formValue.startTime}:00`;
      const endTime = `${formValue.dateOfEvent}T${formValue.endTime}:00`;
      const newFormValue = {
        ...formValue,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        dateOfEvent: new Date(formValue.dateOfEvent).toISOString(),
        coverImage: undefined,
        album: undefined,
      };
      this.eventService.create(newFormValue, coverImage.value, images.value);
      // this.form.reset();
      this.loaderService.hide();
    } else this.form.markAllAsTouched();
    return;
  }
}
