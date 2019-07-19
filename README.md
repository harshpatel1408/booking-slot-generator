## Meeting Space Slots Generator

- Generates slots based on Start Time and End Time withing a day
- Remove booked time slots from generated slots.

##Installation

`npm install slot-generator`

## Examples


```javascript
const slot = require('booking-slot-generator')
let startTime = "10:00"
let endTIme = "23:00"
let slotDuration = 60 // in minutes
let minStartTimeDifference = 15 // in minutes
var bookingTimes = [ { StartTime: "10:00", endTime: "14:00" }, 
             		 { StartTime: "16:00", endTime: "18:00" } ]
let booked = ["11:00-13:00", "14:00-15:00"]
// Single start and end time
slot.getSlotsSingle(startTime, endTime , slotDuration , minStartTimeDifference)
 
// Multiple start and end time
slot.getSlotsMultiple(bookingTimes, slotDuration,minStartTimeDifference)

// Identify booked time from single start and end time
slot.indetifyBookedSlotsSingle(startTime, endTime , slotDuration , minStartTimeDifference)

// Identify booked time from Multiple start and end time
slot.indetifyBookedSlotsMultiple(bookingTimes, slotDuration , minStartTimeDifference)

// Remove booked time from single start and end time
slot.removeBookedSlotsSingle(startTime, endTime , slotDuration , minStartTimeDifference)

// Remove booked time from Multiple start and end time
slot.removeBookedSlotsMultiple(bookingTimes, slotDuration , minStartTimeDifference)