export const getTimeSinceCreation = (timestamp) => {
    const currentTime = new Date();
   /*  console.log("currentTime: " + currentTime); */

    let diffInMilliSeconds = Math.abs(currentTime - Date.parse(timestamp)) / 1000;
    //const differenceInTime = currentTime - Date.parse(timestamp)
    //console.log(diffInMilliSeconds) 

    const days = Math.floor(diffInMilliSeconds / 86400);
    //console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    //console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    //console.log('minutes', minutes); 

    if (days >= 1) {
        return `${days} days ago`
    } else if (hours >= 1){
        return `${hours} h ago`
    } else {
        return `${minutes} m ago`
    }
}