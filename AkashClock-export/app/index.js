import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { display } from "display";
import { today } from "user-activity";
import userActivity from "user-activity";

clock.granularity = "seconds";
const myLabel = document.getElementById("myLabel");
const heartrt = document.getElementById("heartrt");
const dates = document.getElementById("dates");
const stepss = document.getElementById("stepss");
var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";  
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

clock.ontick = (evt) => {
  
  //Clock
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h" && hours>12) {
      hours = hours % 12 || 12;
      let mins = util.zeroPad(today.getMinutes());
      let seconds = util.zeroPad(today.getSeconds());
      myLabel.text = `${hours}:${mins}:${seconds} pm`;
  } 
  else 
  {
    hours = util.zeroPad(hours);
    let mins = util.zeroPad(today.getMinutes());
    let seconds = util.zeroPad(today.getSeconds());
    myLabel.text = `${hours}:${mins}:${seconds}`;
  }
  
  
  //End Of Clock
  
  
  //Start Of Dates
  let days = util.zeroPad(today.getDate());
  let mon = today.getMonth();
  let mons  = month[mon];
  dates.text  = `${days}-${mons}`;
  
  //End of Dates
  //Heart Rate Sensor
  if (HeartRateSensor) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
     heartrt.text = `${hrm.heartRate}HR`;
  });
  display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
} 
//End of HeartRate sensor
  
//Start Of Steps
  
  let stepsValue = (userActivity.today.adjusted["steps"] || 0); 
  let stepsString = stepsValue + ' steps'; 
  stepss.text = stepsString;
  
  
 //End Of Steps

}
