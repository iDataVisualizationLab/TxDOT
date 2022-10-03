import moment from "moment"
export const districts = {
    "Abilene": ["Borden", "Callahan", "Fisher", "Haskell", "Howard", "Jones", "Kent", "Mitchell", "Nolan", "Scurry", "Shackelford", "Stonewall", "Taylor"],
    "Amarillo": ["Armstrong", "Carson", "Dallam", "Deaf Smith", "Gray", "Hansford", "Hartley", "Hemphill", "Hutchinson", "Lipscomb", "Moore", "Ochiltree", "Oldham", "Potter", "Randall", "Roberts", "Sherman"],
    "Atlanta": ["Bowie", "Camp", "Cass", "Harrison", "Marion", "Morris", "Panola", "Titus", "Upshur"],
    "Austin": ["Bastrop", "Blanco", "Burnet", "Caldwell", "Gillespie", "Hays", "Lee", "Llano", "Mason", "Travis", "Williamson"],
    "Beaumont": ["Chambers", "Hardin", "Jasper", "Jefferson", "Liberty", "Newton", "Orange", "Tyler"],
    "Brownwood": ["Brown", "Coleman", "Comanche", "Eastland", "Lampasas", "McCulloch", "Mills", "San Saba", "Stephens"],
    "Bryan": ["Brazos", "Burleson", "Freestone", "Grimes", "Leon", "Madison", "Milam", "Robertson", "Walker", "Washington"],
    "Childress": ["Briscoe", "Childress", "Collingsworth", "Cottle", "Dickens", "Donley", "Foard", "Hardeman", "Hall", "King", "Knox", "Motley", "Wheeler"],
    "Corpus Christi": ["Aransas", "Bee", "Goliad", "Jim Wells", "Karnes", "Kleberg", "Live Oak", "Nueces", "Refugio", "San Patricio"],
    "Dallas": ["Collin", "Dallas", "Denton", "Ellis", "Kaufman", "Navarro", "Rockwall"],
    "El Paso": ["Brewster", "Culberson", "El Paso", "Hudspeth", "Jeff Davis", "Presidio"],
    "Fort Worth": ["Erath", "Hood", "Jack", "Johnson", "Palo Pinto", "Parker", "Somervell", "Tarrant", "Wise"],
    "Houston": ["Brazoria", "Fort Bend", "Galveston", "Harris", "Montgomery", "Waller"],
    "Laredo": ["Dimmitt", "Duval", "Kinney", "La Salle", "Maverick", "Val Verde", "Webb", "Zavala"],
    "Lubbock": ["Bailey", "Castro", "Cochran", "Crosby", "Dawson", "Floyd", "Gaines", "Garza", "Hale", "Hockley", "Lamb", "Lubbock", "Lynn", "Parmer", "Swisher", "Terry", "Yoakum"],
    "Lufkin": ["Angelina", "Houston", "Nacogdoches", "Polk", "Sabine", "San Augustine", "San Jacinto", "Shelby", "Trinity"],
    "Odesa": ["Andrews", "Crane", "Ector", "Loving", "Martin", "Midland", "Pecos", "Reeves", "Terrell", "Upton", "Ward", "Winkler"],
    "Paris": ["Delta", "Fannin", "Franklin", "Grayson", "Hopkins", "Hunt", "Lamar", "Rains", "Red River"],
    "Pharr": ["Brooks", "Cameron", "Hidalgo", "Jim Hogg", "Kenedy", "Starr", "Willacy", "Zapata"],
    "San Angelo": ["Coke", "Concho", "Crockett", "Edwards", "Glasscock", "Irion", "Kimble", "Menard", "Reagan", "Real", "Runnels", "Schleicher", "Sterling", "Sutton", "Tom Green"],
    "San Antonio": ["Atascosa", "Bandera", "Bexar", "Comal", "Frio", "Guadalupe", "Kendall", "Kerr", "McMullen", "Medina", "Uvalde", "Wilson"],
    "Tyler": ["Anderson", "Cherokee", "Gregg", "Henderson", "Rusk", "Smith", "Van Zandt", "Wood"],
    "Waco": ["Bell", "Bosque", "Coryell", "Falls", "Hamilton", "Hill", "Limestone", "McLennan"],
    "Wichita Falls": ["Archer", "Baylor", "Clay", "Cooke", "Montague", "Throckmorton", "Wichita", "Wilbarger", "Young"],
    "Yokum": ["Austin", "Calhoun", "Colorado", "DeWitt", "Fayette", "Gonzales", "Jackson", "Lavaca", "Matagorda", "Victoria", "Wharton"]
};
export const districtCode = {
    "Abilene": "ABL",
    "Amarillo": "AMA",
    "Atlanta": "ATL",
    "Austin": "AUS",
    "Beaumont": "BMT",
    "Bryan": "BRY",
    "Brownwood": "BWD",
    "Corpus Christi": "CRP",
    "Childress": "CHS",
    "Dallas": "DAL",
    "El Paso": "ELP",
    "Fort worth": "FTW",
    "Houston": "HOU",
    "Lubbock": "LBB",
    "Lufkin": "LFK",
    "Laredo": "LRD",
    "Odesa": "ODA",
    "Paris": "PAR",
    "Pharr": "PHR",
    "San Antonio": "SAT",
    "San Angelo": "SJT",
    "Tyler": "TYL",
    "Waco": "WAC",
    "Wichita Falls": "WFS",
    "Yokum": "YKM"
};
export const counties = {};
Object.keys(districts).forEach(key => {
    districts[key].forEach(c => counties[c] ? counties[c].push(key) : counties[c] = [key])
});

export const date2str = (date)=>{
    // date format "YYYY-MM-DD" to "MM-DD-YYYY"
    if (date){
        const mDate = moment(date);
        if (mDate.isValid())
            return mDate.format("MM-DD-YYYY");
    }
    return ""
}

export const str2date = (date)=>{
    // date format "YYYY-MM-DD" to "MM-DD-YYYY"
    if (date){
        const mDate = moment(date,["MM-DD-YYYY","YYYY/MM/DD","YYYY-MM-DD"]);
        if (mDate.isValid())
            return mDate.format("YYYY-MM-DD");
    }
    return "";
}