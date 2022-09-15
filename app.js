const dob = document.querySelector("#dob")
const checkBtn = document.querySelector("#check-btn")
const msg = document.querySelector("#msg")

function reverseString(str){
    var charList = str.split('');  // {'h','e','l','l','o'}

    var reversedCharList = charList.reverse(); //{ 'o', 'l', 'l', 'e', 'h'}

    var reversedList = reversedCharList.join(''); // {olleh}

    return reversedList;

    // var reversedList = str.split('').reverse().join('');
}

function checkPalindrome(str){
    var reverse = reverseString(str);

    if (str === reverse){
        return true;
    } 
    return false; 

}

// create a simple date object with dummy dates 

var date = {
    day: 31,
    month:12,
    year: 2020,
}

function convertDateToStr(date){

    // create an object with empty string so that we can append it to date object we created above and convert date to string
    var dateStr = {day: '', month: '' , year:''}

    if ( date.day < 10){
        dateStr.day = '0' + date.day;   // so 5 will become 05, adding string to a number makes it a string
    } else {
        dateStr.day = date.day.toString();  // Else inbuilt toString function to covert date.day to string
    } 

    // Applying the same thing to month

    if ( date.month < 10){
        dateStr.month = '0' + date.month;   // so 5 will become 05, adding string to a number makes it a string
    } else {
        dateStr.month = date.month.toString();  // Else inbuilt toString function to covert date.day to string
    }

    dateStr.year = date.year.toString();  // Simply use inbuilt function to convert year to string

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);  // Here we get this format { day:'05', month:"09", year:"2022"}

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;  // all valid date formats
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);  // 2011.slice(-2) => 11 (Inbuilt function)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2)  + dateStr.month + dateStr.day;

    return[ ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalidromeForAllDateFormats(date){
    var listOfPalindrome = getAllDateFormats(date);  // returns array with all date formats

    var isPalindrome = false; // just a flag, it gets updated in case it meets the condition

    for ( let i =0; i < listOfPalindrome.length ; i++){
        if(checkPalindrome(listOfPalindrome[i])){   // running checkPalidrome function on array, it checks all date formats and returns true, if any date is a palindrome
            isPalindrome = true;  
            break;
        }
    }

    return(isPalindrome);
}

function isLeapYear(year){  // 6.2
    if (year % 400 === 0){   // if year divisible by 400 its a leap year
        return true;
    } 
    if (year % 100 === 0){  // if year divisible by 100 its not a leap year
        return false;
    }
    if (year % 4 === 0){   // if year divisible by 4 its a leap year
        return true;
    }
    return false;        // otherwise its not
}

function getNextDate(date){ // 6.1
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth =  [31,28,31,30,31,30,31, 31, 30, 31, 30, 31];  // Array 0 -11

    if ( month == 2){    //check for february
        // check for leap year
        if(isLeapYear(year)){
            if (day > 29) {        // in leap year, feb has 29 days, we alreay added 1 to it, so its 30 
                day = 1;           // update this day to 1
                month++;           // increment month
            }

        } else {
            if ( day > 28 ){   // If its not a leap year, and month is feb, update day to 1 and month to march
                day = 1;
                month ++;
            }

        }

    } else {
        if ( day > daysInMonth[month - 1 ]){ // if we need first month, it will check 0 element of above array
            day  = 1;
            month = month + 1;   // update last day of momth to day 1 of next month
             
        } 

    }

        if (month > 12) {
            month = 1;
            year++;
        }


        return {              
            day: day,
            month: month,
            year: year,
        }



};

function getNextPalindromeDate(date){  // 6
    var ctr = 0;  // simple  counter variable
    var nextDate = getNextDate(date);

    while (1){   // infinite loop until we get a palidrome date
        ctr++;
        var isPalindrome = checkPalidromeForAllDateFormats(nextDate);
        if (isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);  // We are already inside a loop and we update nextDate each time its not a palindrome. the loop breaks when we have a palindrome. It's like updating a variable. getNextDate simply adds one to date. date++ ( but it has some extra conditions as well)

    }

    return[ctr, nextDate]; // array because we return both the variables
}

console.log(getNextPalindromeDate(date)); 























