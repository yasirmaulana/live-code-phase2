module.exports = function (errors) {
  if (typeof errors === 'string') {
    return {
      errorMessage: errors
    }
  }
  
  let errorMessages = {}
  for (let error in errors) {
    errorMessages[error] = errors[error].message
  }

  return errorMessages
}