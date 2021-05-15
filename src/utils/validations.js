const getSuccessResponse = () => {
  let response = { status: true }
  return response
}

const getFailureResponse = error => {
  let response = { status: false, error: error }
  return response
}

export const validateEmail = (email, optional = false) => {
  let error = email ? 'Invalid email id' : 'Please add an email-id'
  if (email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let test = regex.test(String(email).toLowerCase())
    if (test) {
      return getSuccessResponse()
    } else {
      return getFailureResponse(error)
    }
  } else {
    return optional ? getSuccessResponse() : getFailureResponse(error)
  }
}

export const validateName = (name, optional = false) => {
  let error = name ? 'Invalid name' : 'Please add name'
  if (name) {
    const regex = /^[a-zA-Z ]{3,50}$/
    let test = regex.test(String(name))
    if (test) {
      return getSuccessResponse()
    } else {
      return getFailureResponse(error)
    }
  } else {
    return optional ? getSuccessResponse() : getFailureResponse(error)
  }
}

export const validateUPI = (upi, optional = false) => {
  let error = upi ? 'Invalid UPI id' : 'Please add upi-id'
  if (upi) {
    const regex = /^\w{3,}@\w{3,}$/
    let test = regex.test(String(upi))
    if (test) {
      return getSuccessResponse()
    } else {
      return getFailureResponse(error)
    }
  } else {
    return optional ? getSuccessResponse() : getFailureResponse(error)
  }
}

export const validateIFSC = (ifsc, optional = false) => {
  let error = ifsc ? 'Invalid IFSC code' : 'Please add ifsc code'
  if (ifsc) {
    const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    let test = regex.test(String(ifsc))
    if (test) {
      return getSuccessResponse()
    } else {
      return getFailureResponse(error)
    }
  } else {
    return optional ? getSuccessResponse() : getFailureResponse(error)
  }
}

export const validatePhoneNumber = (phone_number, optional = false) => {
  let error = phone_number
    ? 'Invalid phone number'
    : 'Please add a phone number'
  if (phone_number) {
    const regex = /^[1-9]\d{9}$/
    let test = regex.test(String(phone_number))
    if (test) {
      return getSuccessResponse()
    } else {
      return getFailureResponse(error)
    }
  } else {
    return optional ? getSuccessResponse() : getFailureResponse(error)
  }
}

export const validatePositiveNumber = (number, optional = false) => {
  let error = 'Please enter a valid number'
  if (number) {
    const regex = /^\d+$/
    let test = regex.test(String(number))
    if (test) {
      return getSuccessResponse()
    } else {
      return getFailureResponse(error)
    }
  } else {
    return optional ? getSuccessResponse() : getFailureResponse(error)
  }
}
