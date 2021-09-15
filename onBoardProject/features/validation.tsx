export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function validatePassword(password: string) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,50}$/;
  return re.test(password);
}

export function validatePhoneNumber(phone:string){
return phone.length<17 && phone.length>7
}
export function validateDate(date: string){
  const re=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
  if(re.test(date)){
    const year =parseInt(date.split('-')[0])
    const thisYear = new Date().getFullYear()
    return year>1900 && year<thisYear
  }
}

export function validateRole(role:string){
 return role=='admin' || role=='user'
}
