
module.exports.getSlotsSingle = (StartTime, endTime, slotDuration, minStartTimeDifference)  => {
  if(minStartTimeDifference == undefined)  minStartTimeDifference = slotDuration
    let data = [{"StartTime": StartTime, "endTime" : endTime}]
  let result = []
    const getMinutes = s => s.slice(0, 2) * 60 + +s.slice(-2)
    const getTime = m => new Date(m * 6e4).toJSON().slice(11, 16)

    for(let item of data) {
      let start = getMinutes(item.StartTime), end = getMinutes(item.endTime);
      for (let m = start; m <= end - slotDuration; m += minStartTimeDifference) 
        result.push(getTime(m) + '-' + getTime(m + slotDuration))
    }
    return result
}

module.exports.getSlotsMultiple = (data, slotDuration, minStartTimeDifference)  => {
  if(minStartTimeDifference == undefined)  minStartTimeDifference = slotDuration
  let result = []
    const getMinutes = s => s.slice(0, 2) * 60 + +s.slice(-2)
    const getTime = m => new Date(m * 6e4).toJSON().slice(11, 16)

    for(let item of data) {
      let start = getMinutes(item.StartTime), end = getMinutes(item.endTime);
      for (let m = start; m <= end - slotDuration; m += minStartTimeDifference) 
        result.push(getTime(m) + '-' + getTime(m + slotDuration))
    }
    return result
}

module.exports.indetifyBookedSlotsSingle = (StartTime, endTime, slotDuration, minStartTimeDifference, bookedSlots)  => {
  if(minStartTimeDifference == undefined)  minStartTimeDifference = slotDuration
  let data = [{"StartTime": StartTime, "endTime" : endTime}]
  let result = []
    const getMinutes = s => s.slice(0, 2) * 60 + +s.slice(-2)
    const getTime = m => new Date(m * 6e4).toJSON().slice(11, 16)

    for(let item of data) {
      let start = getMinutes(item.StartTime), end = getMinutes(item.endTime);
      for (let m = start; m <= end - slotDuration; m += minStartTimeDifference) 
        result.push(getTime(m) + '-' + getTime(m + slotDuration))
    }
    remainingSlots = avail(result, bookedSlots)
    return remainingSlots
}

module.exports.indetifyBookedSlotsMultiple = (data, slotDuration, minStartTimeDifference, bookedSlots)  => {
  if(minStartTimeDifference == undefined)  minStartTimeDifference = slotDuration
  let result = []
    const getMinutes = s => s.slice(0, 2) * 60 + +s.slice(-2)
    const getTime = m => new Date(m * 6e4).toJSON().slice(11, 16)

    for(let item of data) {
      let start = getMinutes(item.StartTime), end = getMinutes(item.endTime);
      for (let m = start; m <= end - slotDuration; m += minStartTimeDifference) 
        result.push(getTime(m) + '-' + getTime(m + slotDuration))
    }
    remainingSlots = avail(result, bookedSlots)
    return remainingSlots
}

module.exports.removeBookedSlotsSingle = (StartTime, endTime, slotDuration, minStartTimeDifference, bookedSlots)  => {
  if(minStartTimeDifference == undefined)  minStartTimeDifference = slotDuration
    let data = [{"StartTime": StartTime, "endTime" : endTime}]
  let result = []
    const getMinutes = s => s.slice(0, 2) * 60 + +s.slice(-2)
    const getTime = m => new Date(m * 6e4).toJSON().slice(11, 16)

    for(let item of data) {
      let start = getMinutes(item.StartTime), end = getMinutes(item.endTime);
      for (let m = start; m <= end - slotDuration; m += minStartTimeDifference) 
        result.push(getTime(m) + '-' + getTime(m + slotDuration))
    }
    remainingSlots = remove(result, bookedSlots)
    return remainingSlots
}

module.exports.removeBookedSlotsMultiple = (data, slotDuration, minStartTimeDifference, bookedSlots)  => {
  if(minStartTimeDifference == undefined)  minStartTimeDifference = slotDuration
  let result = []
    const getMinutes = s => s.slice(0, 2) * 60 + +s.slice(-2)
    const getTime = m => new Date(m * 6e4).toJSON().slice(11, 16)

    for(let item of data) {
      let start = getMinutes(item.StartTime), end = getMinutes(item.endTime);
      for (let m = start; m <= end - slotDuration; m += minStartTimeDifference) 
        result.push(getTime(m) + '-' + getTime(m + slotDuration))
    }
    remainingSlots = remove(result, bookedSlots)
    return remainingSlots
}

let avail = (ts, booked) => {
  const bookedArr = booked.map(item => item.split('-'));
  return ts.map(item => {
    const [start,end] = item.split('-');
    const isBooked = bookedArr.some(([bookedStart,bookedEnd]) => 
      (start >= bookedStart && start < bookedEnd) ||
      (end > bookedStart && end <= bookedEnd) ||
      (bookedStart >= start && bookedStart < end));
        return {slot: `${start}-${end}`, isBooked};
    })
}

let remove = (from, slots) => {
    return slots.reduce((r, s) => {
        var [sStart, sEnd] = s.split('-');
        return r.filter(f => {
            var [fStart, fEnd] = f.split('-');
            return (fStart < sStart || fEnd > sEnd) && (fStart > sStart || fEnd <= sStart) && (fStart >= sEnd || fEnd < sEnd);
        });
    }, from);
}