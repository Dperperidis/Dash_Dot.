import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-maps',
  templateUrl: './store-maps.component.html',
  styleUrls: ['./store-maps.component.css']
})
export class StoreMapsComponent implements OnInit {


  constructor() { }
  lat = 38.022689;
  lng = 23.684903;
  // για να πέρνεις values απο arrays
  // getKeys(obj){
  //   return Object.keys(obj)
  // }

  markers: Marker[] = [
    {
      lat: 37.946280,
      lng: 23.713717,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2114029219',
        address: 'Τροίας 4 / Τ.Κ. 171 21',
        img: ''
      }]
    },
    {
      lat: 38.022170,
      lng: 23.801280,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2106852220',
        address: 'Αγίου Γεωργίου 1 / Τ.Κ. 152 34',
        img: ''
      }]
    },
    {
      lat: 38.011696,
      lng: 23.694953,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2111822040',
        address: 'Αιμιλίου Βεάκη 26 / Τ.Κ. 121 34',
        img: ''
      }]
    },
    {
      lat: 38.249005,
      lng: 21.736616,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2610270652',
        address: 'Ρήγα Φεραίου 53Β / Τ.Κ. 262 21',
        img: ''
      }]
    },
    {
      lat: 38.031338,
      lng: 23.694358,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2102610683-2102622042',
        address: 'Ανδρέα Παπανδρέου 266 / Τ.Κ. 131 22',
        img: '../../assets/images/stores-images/Ilion.jpg'
      }]
    },
    {
      lat: 37.966146,
      lng: 23.749824,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2155301669',
        address: 'Χρεμωνίδου 28 / Τ.Κ. 116 33',
        img: ''
      }]
    },
    {
      lat: 37.978529,
      lng: 23.738312,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2155159006',
        address: 'Σόλωνος 22 / Τ.Κ. 106 73',
        img: ''
      }]
    },
    {
      lat: 37.940532,
      lng: 23.648864,
      label: '',
      draggable: false,
      description: [{
        title: 'Dash&dot',
        phone: '2104178012',
        address: 'Σωτήρος Διός 42 / Τ.Κ. 185 35',
        img: ''
      }]
    }
  ];

  ngOnInit() {
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  description: Array<any>;
}




