import $ from 'jquery';
import dotenv from 'dotenv';
dotenv.load()

export class DoctorPicker {
  getDoctorsByName(userInput, displayData) {
  const apiKey = process.env.exports.apiKey
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${userInput}&location=or-portland&skip=0&user_key=${apiKey}`)
    .then(response => {
      if (response.data.length === 0) {
        $('#showInfo').text('Your search did not return any results.  Please try again.')
      } else {
        displayData(response);
      }
    })
    .fail(() => 'We could not process your request at this time.')
  }

  getSpecialty(userInput, displayData) {
    const apiKey = process.env.exports.apiKey
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${userInput}&skip=0&user_key=${apiKey}&location=or-portland`)
    .then(response => {
      if(response.data.length === 0) {
        $('#showInfo').text('Your search did not return any results.  Please try again.')
      } else {
        displayData(response);
      }
    })
      .fail(() => 'We could not process your request at this time.')
    }
    
}
