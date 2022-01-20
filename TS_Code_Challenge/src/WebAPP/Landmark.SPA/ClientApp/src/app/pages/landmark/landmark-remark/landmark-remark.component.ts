import { GoogleMapsAPIWrapper } from '@agm/core';
import { Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/account/models/auth.models';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Landmark } from '../Landmark.model';
import { LandmarkService } from '../Landmark.service';

@Component({
  selector: 'app-Landmark-remark',
  templateUrl: './Landmark-remark.component.html',
  styleUrls: ['./Landmark-remark.component.scss']
})

export class LandmarkRemarkComponent implements OnInit {
  user: User;
  userID: number;
  submitted: boolean;

  landmarkers: Landmark [] = [];
  lat = 0;
  lng = 0;

  remarkForm: FormGroup;        // add note form controller
  isAddBtnVisible: boolean;     // control add button display
  errorMessage = '';            // for error messages
  successMessage = '';          // for success messages

  zoom = 14;                    // map zoom level

  currentMarkerExists: boolean;       // check if there is a marker in current location
  fb: any;

  markers: Landmark[];                  // markers input from map component
  searchedMarkers: Landmark[] = [];     // filtered array for marker search
  choseMarker = new EventEmitter<Landmark>();     // event emitter to map component
  searchBox: ElementRef;                          // for direct access to search box value

  constructor(private landmarkService: LandmarkService ,private toastService: ToastService, public modalService: NgbModal, public formBuilder: FormBuilder, private router: Router, private avRoute: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('currentUser')) as User;
    this.userID = this.user.userID;
  }

  ngOnInit(): void {
    this.findUser();
    this.createForms();
    this.getLandMarkers();
  }

  // Creating form 
  createForms() {
    this.remarkForm = new FormGroup({
      note: new FormControl('', Validators.required)
    });
    this.isAddBtnVisible = true;
  }

  // Getting from controls
  get form() {
    return this.remarkForm.controls;
  }

  // filter any current user location marker
  filterMarkers() {
    // find markers in this location for current user
    const idx = this.landmarkers.findIndex(m => m.userName === this.user.displayName && m.latitude === this.lat && m.longitude === this.lng);
    if (idx + 1) {
      // if there is one, save that info
      this.currentMarkerExists = true;
      this.landmarkers[idx]['current'] = true;
    } else {
      this.currentMarkerExists = false;
    }
  }

  // search in markers
  search(term: string): void {
    // if no term, clean search array
    if (!term) {
      this.searchedMarkers = [];
    } else {
      // simple search filter on the markers' properties
      this.searchedMarkers = this.landmarkers.filter(marker => {
        return marker.remark.toLowerCase().includes(term.toLowerCase()) || marker.userName.toLowerCase().includes(term.toLowerCase());
      });
    }
  }

  // tapped marker after search
  chooseMarker(marker: Landmark) {
    this.openSingleMarker(marker);
  }

  // find user position
  findUser() {
    // check for navigator geolocation
    if (navigator.geolocation) {
      // access current location
      navigator.geolocation.getCurrentPosition((position) => {
        // save coordinates
        this.lat = parseFloat(position.coords.latitude.toFixed(4));
        this.lng = parseFloat(position.coords.longitude.toFixed(4));

        // after having location, filter any current user location marker
        this.filterMarkers();
      });
    } else {
      // no geolocation provided
      alert('Geolocation is not supported by this browser.');
    }
  }
  
  // Get all landmark
  getLandMarkers() {
    this.landmarkService.getLandmarkers().subscribe((data) => {
       // populate marker array with data, adding extra initial state 'isOpen'
       let landmarker: Landmark;
       data.forEach(landmarker => {
        landmarker['isOpen'] = false;
        this.landmarkers.push(landmarker);
       });

       // filter any current user location marker
       this.filterMarkers();
    });
  }

  // open a marker (and close others)
  openSingleMarker(landmarker: Landmark) {
    this.landmarkers.forEach(m => m['isOpen'] = false);
    landmarker['isOpen'] = true;
  }

  // Save landmark to DB
  onClickSubmit(remark) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
       return;
    }
  
    let landmark: Landmark = {
      landmarkID: 0,
      userID: this.userID,
      userName: this.user.displayName,
      latitude: this.lat,
      longitude: this.lng,
      remark: remark.note
    };
    
    this.landmarkService.postLandmark(landmark)
    .subscribe((data) => {
          let saved = data;
          this.toastService.show('Remark has been saved successfully', { classname: 'bg-success text-light', header: 'Success', delay: 5000 });
          location.reload();
    },
    error => {
      //
    });
  }
}
