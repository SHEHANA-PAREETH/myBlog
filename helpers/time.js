


function convertISODateToCustomerFormat(isoDate){
    const dateObj=new Date(isoDate)
    const day=String(dateObj.getDate()).padStart(2,'0')
    const month=String(dateObj).slice(4,8)
    const year=dateObj.getFullYear()
    const hours=dateObj.getHours()%12||12
    const minutes=String(dateObj.getMinutes()).padStart(2,'0')
    const amOrPm=dateObj.getHours()>=12?'PM':'AM'
    return `${day}-${month}-${year}-${hours}-${minutes}-${amOrPm}`
}

module.exports=convertISODateToCustomerFormat