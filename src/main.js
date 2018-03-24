import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import '../.env';

import { DoctorPicker } from './doctorpicker.js';

const displayData = response => {
  for (let i = 0; i < response.data.length; i++) {
    let docName = response.data[i].profile.first_name + ' ' +  response.data[i].profile.last_name;
    let docPhone = response.data[i].practices[0].phones[0].number;
    let docWebsite = response.data[i].practices[0].website;
    let acceptNew = response.data[i].practices[0].accepts_new_patients;
    let address = response.data[i].practices[0].visit_address.street;
    let accept = "Currently accepting new patients."
    let city = response.data[i].practices[0].visit_address.city;
    let state = response.data[i].practices[0].visit_address.state;
    let docPic = response.data[i].profile.image_url;
    if (docWebsite === undefined) {
      docWebsite = "No website available."
    } else if (docWebsite === response.data[i].practices[0].website ){
      docWebsite = response.data[i].practices[0].website;
    } else if (acceptNew === true) {
      return accept;
    } else if (acceptNew === false) {
      let accept = "Not currently accepting new patients."
    }
    $('.showList').append(`<li>` + `<img src ="` + docPic + `">` + `<br>`  + 'Name: ' + docName + `<br>` + ' Phone: '+ docPhone + `<br>` + `Website: ` + docWebsite + `<br>` + 'Address: ' + address + ', ' + city + ', ' + state + `<br>` + accept + `</li>` + `<br>`)
  }
};

$(document).ready(() => {
  let doctorPicker = new DoctorPicker();

  $('#docSearch').click(e => {
    e.preventDefault();
    $('.showList').empty()
    let userInput = $('#docName').val()
    $('#showInfo').text(`<h1>Here are some doctors for you based on your search of</h1> ` + userInput + ` .`)
    DoctorPicker.prototype.getDoctorsByName(userInput, displayData);
  });

  $('#docSearch').click(e => {
    e.preventDefault();
    $('.showList').empty();
    let userInput = $('#docName').val();
    $('#showInfo').text("Here are some doctors for you based on your search of " + userInput + ` .`);
    DoctorPicker.prototype.getSpecialty(userInput, displayData);
  });
});
