export const findDaysLeft = (date) => {
  var date1 = new Date(Date.now())
  var date2 = new Date(date)

  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime()

  // To calculate the no. of days between two dates
  var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24))

  if (Difference_In_Days > 0) {
    return Difference_In_Days
  } else {
    return 0
  }
}
