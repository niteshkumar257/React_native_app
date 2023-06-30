export const GW_URL = 'https://api.gaanvwala.com/api';

export const ToStringDateFormatter=(dateStr)=>
{
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString("en-US", options);
      
      const day = date.getDate();
      const daySuffix = getDaySuffix(day);
      
      const formattedDateWithSuffix = formattedDate.replace(/\b(\d{1,2})\b/g, `$1${daySuffix}`);
      
      console.log(formattedDateWithSuffix); // Output: "24th June 2023"
      
      // Function to get the day suffix (st, nd, rd, th)
      function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return "th";
        }
      
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }
      return formattedDateWithSuffix;
}

export const  capitalizeFirstLetter=(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  export const  getStatusStyle=(styles,status_name) =>{
    let statusStyle = {};
  
    switch (status_name) {
      case 'Pending at admin':
        statusStyle = styles.pending;
        break;
      case 'Resolved':
        statusStyle = styles.resolved;
        break;
      // Add more cases for other status names and their corresponding styles
  
      default:
        // Default style if no matching status name
        statusStyle = styles.default;
        break;
    }
  
    return statusStyle;
  }
  


