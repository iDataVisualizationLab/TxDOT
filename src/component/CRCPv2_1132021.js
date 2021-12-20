import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Slider,
    Typography,
    Button,
    Paper,
    Grid,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    TextField,
    Container,
    Input,
    Hidden
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Graph from './Graph'
import HomeIcon from '@material-ui/icons/Home';
import PrintIcon from '@material-ui/icons/Print';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Image from 'material-ui-image';
import DistrictPic from '../././image/District.png';
import CountyPic from '../././image/County.png';
import TrafficOneDirectionPic from '../././image/TotalDesign Traffic.png';
import StructureDesignCriteriaPic from '../././image/StructureDesignCriteria.png';
import AcceptableNumberofPunchoutPic from '../././image/AcceptableNumberofPunchout.png';
import ConcreteLayerPic from '../././image/ConcreteLayer.png';
import soilSystermPic from '../././image/soilSystermPic.png';
import subbasePic from '../././image/subbase.png';
import BasetypePic from '../././image/BasetypePic.png';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import Report from "./report";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import * as d3 from "d3";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import sTable from "./data/sTable.csv";
// import stress from "./data/stress.csv";
import kTable from "./data/kTable.csv";
import temperature from "./data/temperature.csv";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider/Divider";
import County from "./County";
import Backdrop from "@material-ui/core/Backdrop";

// const districts = {
//     "ABILENE": ["BORDEN", "CALLAHAN", "FISHER", "HASKELL", "HOWARD", "JONES", "KENT", "MITCHELL", "NOLAN", "SCURRY", "SHACKELFORD", "STONEWALL", "TAYLOR"],
//     "AMARILLO": ["ARMSTRONG", "CARSON", "DALLAM", "DEAF SMITH", "GRAY", "HANSFORD", "HARTLEY", "HEMPHILL", "HUTCHINSON", "LIPSCOMB", "MOORE", "OCHILTREE", "OLDHAM", "POTTER", "RANDALL", "ROBERTS", "SHERMAN"],
//     "ATLANTA": ["BOWIE", "CAMP", "CASS", "HARRISON", "MARION", "MORRIS", "PANOLA", "TITUS", "UPSHUR"],
//     "AUSTIN": ["BASTROP", "BLANCO", "BURNET", "CALDWELL", "GILLESPIE", "HAYS", "LEE", "LLANO", "MASON", "TRAVIS", "WILLIAMSON"],
//     "BEAUMONT": ["CHAMBERS", "HARDIN", "JASPER", "JEFFERSON", "LIBERTY", "NEWTON", "ORANGE", "TYLER"],
//     "BROWNWOOD": ["BROWN", "COLEMAN", "COMANCHE", "EASTLAND", "LAMPASAS", "MCCULLOCH", "MILLS", "SAN SABA", "STEPHENS", "BRISCOE", "CHILDRESS", "COLLINGSWORTH", "COTTLE", "DICKENS", "DONLEY", "FOARD", "HALL", "HARDEMAN", "KING", "KNOX", "MOTLEY", "WHEELER"],
//     "BRYAN": ["BRAZOS", "BURLESON", "FREESTONE", "GRIMES", "LEON", "MADISON", "MILAM", "ROBERTSON", "WALKER", "WASHINGTON"],
//     "CORPUS CHRISTI": ["ARANSAS", "BEE", "GOLIAD", "JIM WELLS", "KARNES", "KLEBERG", "LIVE OAK", "NUECES", "REFUGIO", "SAN PATRICIO"],
//     "DALLAS": ["COLLIN", "DALLAS", "DENTON", "ELLIS", "KAUFMAN", "NAVARRO", "ROCKWALL"],
//     "EL PASO": ["BREWSTER", "CULBERSON", "EL PASO", "HUDSPETH", "JEFF DAVIS", "PRESIDIO"],
//     "FORT WORTH": ["ERATH", "HOOD", "JACK", "JOHNSON", "PALO PINTO", "PARKER", "SOMERVELL", "TARRANT", "WISE"],
//     "HOUSTON": ["BRAZORIA", "FORT BEND", "GALVESTON", "HARRIS", "MONTGOMERY", "WALLER"],
//     "LAREDO": ["DIMMITT", "DUVAL", "KINNEY", "LA SALLE", "MAVERICK", "VAL VERDE", "WEBB", "ZAVALA"],
//     "LUBBOCK": ["BAILEY", "CASTRO", "COCHRAN", "CROSBY", "DAWSON", "FLOYD", "GAINES", "GARZA", "HALE", "HOCKLEY", "LAMB", "LUBBOCK", "LYNN", "PARMER", "SWISHER", "TERRY", "YOAKUM"],
//     "LUFKIN": ["ANGELINA", "HOUSTON", "NACOGDOCHES", "POLK", "SABINE", "SAN AUGUSTINE", "SAN JACINTO", "SHELBY", "TRINITY"],
//     "ODESA": ["ANDREWS", "CRANE", "ECTOR", "LOVING", "MARTIN", "MIDLAND", "PECOS", "REEVES", "TERRELL", "UPTON", "WARD", "WINKLER"],
//     "PARIS": ["DELTA", "FANNIN", "FRANKLIN", "GRAYSON", "HOPKINS", "HUNT", "LAMAR", "RAINS", "RED RIVER"],
//     "PHARR": ["BROOKS", "CAMERON", "HIDALGO", "JIM HOGG", "KENEDY", "STARR", "WILLACY", "ZAPATA"],
//     "SAN ANGELO": ["COKE", "CONCHO", "CROCKETT", "EDWARDS", "GLASSCOCK", "IRION", "KIMBLE", "MENARD", "REAGAN", "REAL", "RUNNELS", "SCHLEICHER", "STERLING", "SUTTON", "TOM GREEN"],
//     "SAN ANTONIO": ["ATASCOSA", "BANDERA", "BEXAR", "COMAL", "FRIO", "GUADALUPE", "KENDALL", "KERR", "MCMULLEN", "MEDINA", "UVALDE", "WILSON"],
//     "TYLER": ["ANDERSON", "CHEROKEE", "GREGG", "HENDERSON", "RUSK", "SMITH", "VAN ZANDT", "WOOD"],
//     "WACO": ["BELL", "BOSQUE", "CORYELL", "FALLS", "HAMILTON", "HILL", "LIMESTONE", "MCLENNAN"],
//     "WICHITA FALLS": ["ARCHER", "BAYLOR", "CLAY", "COOKE", "MONTAGUE", "THROCKMORTON", "WICHITA", "WILBARGER", "YOUNG"],
//     "YOKUM": ["AUSTIN", "CALHOUN", "COLORADO", "DEWITT", "FAYETTE", "GONZALES", "JACKSON", "LAVACA", "MATAGORDA", "VICTORIA", "WHARTON"]
// };
const districts = {
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
const districtCode = {
    "Abilene": "ABL",
    "Amarillo": "AMA",
    "Atlanta": "ATL",
    "Austin": "AUS",
    "Beaumont": "BMT",
    "Bryan": "BRY",
    "Brownwood": "BWD",
    "Corpus christi": "CRP",
    "Childress": "CHS",
    "Dallas": "DAL",
    "El paso": "ELP",
    "Fort worth": "FTW",
    "Houston": "HOU",
    "Lubbock": "LBB",
    "Lufkin": "LFK",
    "Laredo": "LRD",
    "Odesa": "ODA",
    "Paris": "PAR",
    "Pharr": "PHR",
    "San antonio": "SAT",
    "San angelo": "SJT",
    "Tyler": "TYL",
    "Waco": "WAC",
    "Wichita falls": "WFS",
    "Yokum": "YKM"
};
const counties = {};
Object.keys(districts).forEach(key => {
    districts[key].forEach(c => counties[c] ? counties[c].push(key) : counties[c] = [key])
});
const highway = ["IH 45", "US 290", "IH 30", "US 59", "IH 35W", "IH 820", "IH 10", "IH 40", "IH 35", "US 287", "US 81", "IH 27", "SL 289", "SH 226", "SH 36", "US 83B", "VA", "FM 3129", "IH 20", "US 71", "US 79", "US 47", "US 67", "BU90-Y", "CS", "FM 1960", "FM 364", "FM 365", "SH 347", "SH 105", "SH 12", "SH 124", "SH 146", "SH 326", "SH 61", "SH 73", "SH 87", "SS 380", "US 90", "US 69", "US 96", "BS6-R", "SH 21", "BW 8", "US 83", "BS 121H", "FM 1171", "FM 1382", "FM 2499", "FM 709", "FM 740", "IH 35E", "IH4 5", "IH 635", "LP 12", "LP 354", "MH", "SH 289", "SH 31", "SH 66", "SH 78", "SH 114", "SH 121", "SH 161", "SH 180", "SH 183", "SH 310", "SH 34", "SH 342", "SH 356", "SL 12", "SL 288", "SP 244", "SP 348", "SP 366", "SPUR 354", "US 175", "US 380", "US 75", "US 77", "US 377", "US 80", "US 54", "BU 287P", "FM 157", "IH 820 ", "SH 199", "SH 26", "SH 360", "FM 1764", "FM 523", "FM 1092", "FM 1488", "FM 518", "IH 610", "SH 288", "SH 332", "SH 225", "SH 242", "SH 249", "SH 35", "US 90A", "IH27", "SH 7", "FM 1472", "LP 20", "ODA 181-1", "ODA 181-2", "ODA 250-1", "ODA 250-2", "US 82", "SH 6", "FM 85", "LP 281", "LP 323", "SH 19", "SH 198", "SH 334", "US 259", "US 281", "FM 1695", "FM 3476", "FM 933", "IH 36", "LP 363", "SH 195", "US 84", "BU 287J", "IH 44", "SH 240", "SP 1027 ", "US 287 ", "US 55", "US 70", "SH 71"];
// const baseType = ["CTB", "HMA Base"];
const soilClassSub = ["GW", "GP", "GM", "GC", "SW", "SP", "SM", "SC", "ML", "CL", "OL", "MH", "CH", "OH", "Pt"];

const styles = theme => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& input': {
            width: '100%',
        },
        '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
            opacity: 1
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(8)
    },
    dot: {
        borderBottom: '2px dotted',
        marginBottom: '4px'
    },
    helpHolder: {
        padding: theme.spacing(1),
    },
    inputWithHelper: {
        '& label': {
            pointerEvents: 'all'
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 2
    },
    capitalize: {
        textTransform: 'capitalize'
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" size="small" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const init = {
    activeStep: 0,
    stepsLength: 3,
    finished: false,
    DesignLife: 30,
    PunchoutsPerMile: 10,
    LanesOneDirection: 2,
    TrafficOneDirection: 100,
    ModulusOfRupture: 570,
    ElasticModulue: 5,
    SoilClassificationSystem: 'USCS',
    SoilSub: "CH",
    PlasticityIndex: 8,
    SubbaseType: "LTS",
    SubbaseThickness: 12,
    BaseType: '',
    BaseThickness: 6,
    BaseThicknessMin: 2,
    BaseThicknessMax: 6,
    ModulusBase: 400,
    CompositeK: 539,
    District: null,
    County: null,
    Highway: null,
    ProjectScope: null,
    StationBegin: null,
    StationEnd: null,
    currentDistricts: Object.keys(districts),
    currentCounties: Object.keys(counties),
    SubbaseThicknessThreshHold: -1,
    SubbaseTypeOpt: ['Lime treated subgrade',
        'Cement treated subgrade',
        'Select fill',
        'No treatment'
    ],
    baseTypeOpt: ["CTB", "HMA"],
    ksTable: new Map(),
    ssTable: [],
    temperature: [],
}

class CRCP extends Component {
    constructor(props) {
        super(props);
        this.state = {...init};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.ModulusBase !== this.state.ModulusBase) || (prevState.SoilSub !== this.state.SoilSub) || (prevState.BaseThickness !== this.state.BaseThickness)) {
            this.calculateCompositeK();
        }
        if(this.state.printRequest&& this.state.isBackdropOpen){
            window.print();
        }
    }

    componentDidMount() {
        this.initFunc();
    }

    initFunc() {
        d3.csv(kTable).then(_data => {
            let ksTable = new Map();
            _data.forEach(r => {
                ksTable.set('' + r['Subgrade K-Value (psi/in.)'] + ' ' + r['Base Thickness (in.)'] + ' ' + r['Modulus of Base Layer (ksi)'], +r['Composite K (psi/in.)']);
            });
            this.setState({ksTable})
        })
        d3.csv(sTable).then(_data => {
            this.setState({ssTable: _data})
        })
        d3.csv(temperature).then(_data => {
            this.setState({temperature: _data})
        })
        this.handlePlasticityIndex(this.state.PlasticityIndex);
    }

    computeStress = (SlabThickness) => { // F7
        let input = {
            H: {Input: SlabThickness, "L Bound": 0, "U Bound": 0},
            K: {Input: this.state.CompositeK, "L Bound": 0, "U Bound": 0}
        }
        input.H["L Bound"] = (input.H.Input >= 15.5) ? 15.5 : ((input.H.Input < 6.5) ? 6 : Math.floor(input.H.Input * 2) / 2);
        input.H["U Bound"] = (input.H.Input >= 15.5) ? 16 : ((input.H.Input < 6.5) ? 6.5 : Math.ceil(input.H.Input * 2 + 1) / 2);
        const B3 = input.K.Input;
        input.K["L Bound"] = (B3 < 100 ? 50 : (B3 < 300 ? 100 : (B3 < 500 ? 300 : (B3 < 700 ? 500 : (B3 < 1000 ? 700 : (B3 < 1300 ? 1000 : (B3 >= 1300 ? 1300 : 0)))))));
        input.K["U Bound"] = (B3 < 100 ? 100 : (B3 < 300 ? 300 : (B3 < 500 ? 500 : (B3 < 700 ? 700 : (B3 < 1000 ? 1000 : (B3 < 1300 ? 1300 : (B3 >= 1300 ? 1600 : 0)))))));
        const mapd2 = {};
        let lastd2 = {index: 1, DT: 0, H: 0, K: 0, STR_T: 0, STR_E: 0};
        this.state.ssTable.forEach(s => {
            const B2 = +s["Thickness of Concrete Layer (in.)"];
            const A2 = +s["Temperature Change (F)"];
            const C2 = +s["Composite K (psi/in.)"];
            const D2 = +s["Concrete Stress (T) (psi)"];
            const E2 = +s["Concrete Stress (E) (psi)"];

            const DT = ((B2 - input.H["L Bound"]) * (B2 - input.H["U Bound"])) === 0 ? ((C2 - input.K["L Bound"]) * (C2 - input.K["U Bound"]) === 0 ? A2 : 0) : 0;
            const H = ((B2 - input.H["L Bound"]) * (B2 - input.H["U Bound"])) === 0 ? ((C2 - input.K["L Bound"]) * (C2 - input.K["U Bound"]) === 0 ? B2 : 0) : 0;
            const K = ((B2 - input.H["L Bound"]) * (B2 - input.H["U Bound"])) === 0 ? ((C2 - input.K["L Bound"]) * (C2 - input.K["U Bound"]) === 0 ? C2 : 0) : 0;
            const STR_T = ((B2 - input.H["L Bound"]) * (B2 - input.H["U Bound"])) === 0 ? ((C2 - input.K["L Bound"]) * (C2 - input.K["U Bound"]) === 0 ? D2 : 0) : 0;
            const STR_E = ((B2 - input.H["L Bound"]) * (B2 - input.H["U Bound"])) === 0 ? ((C2 - input.K["L Bound"]) * (C2 - input.K["U Bound"]) === 0 ? E2 : 0) : 0;
            const index = DT === 0 ? (lastd2.DT === 0 ? lastd2.index : lastd2.index + 1) : (lastd2.DT === 0 ? lastd2.index : lastd2.index + 1);
            mapd2[index] = {index, DT, H, K, STR_T, STR_E};
            lastd2 = {index, DT, H, K, STR_T, STR_E};
        });
        debugger
        const data3 = [];
        for (let i = 1; i < 25; i++) {
            const index = Math.floor((i - 1) / 4) * 4 + 1;
            const DT = mapd2[index].DT;
            const H = mapd2[Math.floor((i - 1) / 2) * 2 + 1].H;
            if (!mapd2[i])
                debugger
            const {K, STR_T, STR_E} = mapd2[i];
            data3.push({DT, H, K, STR_T, STR_E})
        }
        const data4 = [];
        for (let i = 0; i < 12; i++) {
            const Q2 = data3[i * 2].STR_T;
            const Q3 = data3[i * 2 + 1].STR_T;
            const R2 = data3[i * 2].STR_E;
            const R3 = data3[i * 2 + 1].STR_E;
            const STR_T = ((Q3 - Q2) * input.K.Input + (Q2 * input.K['U Bound'] - Q3 * input.K['L Bound'])) / (input.K['U Bound'] - input.K['L Bound']);
            const STR_E = ((R3 - R2) * input.K.Input + (R2 * input.K['U Bound'] - R3 * input.K['L Bound'])) / (input.K['U Bound'] - input.K['L Bound']);
            data4.push({STR_T, STR_E})
        }
        const data5 = [];
        for (let i = 0; i < 6; i++) {
            const W2 = data4[i * 2].STR_T;
            const W4 = data4[i * 2 + 1].STR_T;
            const X2 = data4[i * 2].STR_E;
            const X4 = data4[i * 2 + 1].STR_E;
            const STR_T = ((W4 - W2) * input.H.Input + (W2 * input.H['U Bound'] - W4 * input.H['L Bound'])) / (input.H['U Bound'] - input.H['L Bound']);
            const STR_E = ((X4 - X2) * input.H.Input + (X2 * input.H['U Bound'] - X4 * input.H['L Bound'])) / (input.H['U Bound'] - input.H['L Bound']);
            data5.push({STR_T, STR_E})
        }
        const districtemp = this.state.temperature.filter(d => d.District === districtCode[this.state.District]);
        const stress = districtemp.map((t, ti) => {
            const AveragetTemperature = +t['Average Temperature (F)'];
            const DT = 120 - AveragetTemperature;
            const H = input.H.Input;
            const K = input.K.Input;
            const STR_T = getSTR_T(DT);
            const STR_E = getSTR_E(DT);
            if (ti === 3)
                debugger
            return {
                'District': this.state.District, 'Month': ti + 1, 'Average Temperature': AveragetTemperature,
                DT, H, K, 'STR (T)': STR_T, 'STR (E)': STR_E
            }
        });

        function getSTR_T(DT) {
            if (DT >= 95)
                return (data5[5].STR_T - data5[4].STR_T) / (data3[20].DT - data3[16].DT) * (DT - data3[20].DT) + data5[5].STR_T;
            if ((DT >= 65) && (DT < 95))
                return (data5[5].STR_T - data5[4].STR_T) / (data3[20].DT - data3[16].DT) * (DT - data3[16].DT) + data5[4].STR_T;
            if ((DT >= 35) && (DT < 65))
                return (data5[4].STR_T - data5[3].STR_T) / (data3[16].DT - data3[12].DT) * (DT - data3[12].DT) + data5[3].STR_T;
            if ((DT >= 5) && (DT < 35))
                return (data5[3].STR_T - data5[2].STR_T) / (data3[12].DT - data3[8].DT) * (DT - data3[8].DT) + data5[2].STR_T;
            if ((DT >= -25) && (DT < 5))
                return (data5[2].STR_T - data5[1].STR_T) / (data3[8].DT - data3[4].DT) * (DT - data3[4].DT) + data5[1].STR_T;
            if ((DT >= -55) && (DT < -25))
                return (data5[1].STR_T - data5[0].STR_T) / (data3[4].DT - data3[0].DT) * (DT - data3[0].DT) + data5[0].STR_T;
            return (data5[1].STR_T - data5[0].STR_T) / (data3[4].DT - data3[0].DT) * (DT - data3[0].DT) + data5[0].STR_T;
        }

        function getSTR_E(DT) {
            if (DT >= 95)
                return (data5[5].STR_E - data5[4].STR_E) / (data3[20].DT - data3[16].DT) * (DT - data3[20].DT) + data5[5].STR_E;
            if ((DT >= 65) && (DT < 95))
                return (data5[5].STR_E - data5[4].STR_E) / (data3[20].DT - data3[16].DT) * (DT - data3[16].DT) + data5[4].STR_E;
            if ((DT >= 35) && (DT < 65))
                return (data5[4].STR_E - data5[3].STR_E) / (data3[16].DT - data3[12].DT) * (DT - data3[12].DT) + data5[3].STR_E;
            if ((DT >= 5) && (DT < 35))
                return (data5[3].STR_E - data5[2].STR_E) / (data3[12].DT - data3[8].DT) * (DT - data3[8].DT) + data5[2].STR_E;
            if ((DT >= -25) && (DT < 5))
                return (data5[2].STR_E - data5[1].STR_E) / (data3[8].DT - data3[4].DT) * (DT - data3[4].DT) + data5[1].STR_E;
            if ((DT >= -55) && (DT < -25))
                return (data5[1].STR_E - data5[0].STR_E) / (data3[4].DT - data3[0].DT) * (DT - data3[0].DT) + data5[0].STR_E;
            return (data5[1].STR_E - data5[0].STR_E) / (data3[4].DT - data3[0].DT) * (DT - data3[0].DT) + data5[0].STR_E;
        }

        // for (let i = 0;i<12;i++) {
        //     const item = {'District'	'Month'	'Average' 'Temperature'	DT	H	K	STR (T)	STR (E)}
        // }
        // this.setState({data: stress});
        return stress;
    }
    recompute = () => {
        let __ret = {};
        let i = 7;
        for (i = 7; i < 16; i++) {
            __ret = this.analysis(i);
            if (__ret.rows[__ret.r][12] <= this.state.PunchoutsPerMile)
                break;
        }
        let rowIndexStress = __ret.rowIndexStress;
        let row1 = __ret.row1;
        const rows = __ret.rows;
        var r = __ret.r;
        this.props.AnalysisPunchouts(rows[r][12]);
        // this.props.AnalysisSlabThickness(Math.min(13,i));
        this.props.AnalysisSlabThickness(Math.min(i, 15));
        this.setState({row1, rows, rowIndexStress})
    };

    analysis(slabthickness) {
        const data = this.computeStress(slabthickness);
        let rowIndexStress = 8;
        let row1 = [];
        const rows = [];
        row1.push(1);
        row1.push(row1[0] / 12);
        row1.push(this.state.ModulusOfRupture);
        row1.push(57000 / 7.5 * row1[2] / 1000);
        row1.push(+data[rowIndexStress - 2]["STR (T)"]);
        row1.push(data[rowIndexStress - 2]["STR (E)"] * row1[3] / 5000)
        row1.push(row1[4] + row1[5])
        row1.push(row1[6] / row1[2])
        row1.push(11800 * Math.pow(row1[7], fatigue(this.state.CompositeK)))
        row1.push(lane(this.state.LanesOneDirection)
            * this.state.TrafficOneDirection * 1000000 / 12 / this.state.DesignLife)
        row1.push(row1[9] / row1[8])
        row1.push(row1[10])
        row1.push(18.985 / (1 + 5 * Math.pow(row1[11], -1.1)))
        rows.push(row1);    // Add to the array

        //console.log(+document.getElementById("DesignLife").value);
        for (var i = 1; i <= this.state.DesignLife; i++) {
            //debugger;
            if (i !== 1)
                rowIndexStress = 7;
            for (var j = 0; j < 12; j++) {
                if (i == 1 && j == 0)
                    ;
                    //If counterYear = 1 And counterMonth = 1 Then
                //      'If First Year than Omit Calculation of First Month, Already Done
                else {
                    rowIndexStress = rowIndexStress + 1
                    let row2 = [];
                    row2.push(row1[0] + 1)
                    row2.push(row2[0] / 12);
                    // Cells(rowIndex, 2) = Cells(rowIndex, 1).Value / 12
                    row2.push(this.state.ModulusOfRupture
                        * Math.pow((30 * row2[0] / (4 + 0.85 * 30 * row2[0])), 0.5));
                    // Cells(rowIndex, 3) = Sheets("Input").Range("F8").Value * ((30 * Cells(rowIndex, 1).Value / (4 + 0.85 * 30 * Cells(rowIndex, 1).Value))) ^ 0.5
                    row2.push(57000 / 7.5 * row2[2] / 1000);
                    // Cells(rowIndex, 4) = 57000 / 7.5 * Cells(rowIndex, 3) / 1000
                    row2.push(+data[rowIndexStress - 2]["STR (T)"]);
                    // Cells(rowIndex, 5) = Sheets("Stress").Cells(rowIndexStress, 38).Value
                    row2.push(data[rowIndexStress - 2]["STR (E)"] * row2[3] / 5000);
                    // Cells(rowIndex, 6) = Sheets("Stress").Cells(rowIndexStress, 39).Value * Cells(rowIndex, 4) / 5000
                    row2.push(row2[4] + row2[5]);
                    // Cells(rowIndex, 7) = Cells(rowIndex, 5).Value + Cells(rowIndex, 6).Value
                    row2.push(row2[6] / row2[2]);
                    // Cells(rowIndex, 8) = Cells(rowIndex, 7).Value / Cells(rowIndex, 3).Value
                    row2.push(11800 * Math.pow(row2[7], fatigue(this.state.CompositeK)));
                    // Cells(rowIndex, 9) = 11800 * Cells(rowIndex, 8).Value ^ fatigue(Sheets("Input").Range("CompositeK").Value)
                    row2.push(row1[9]);
                    // Cells(rowIndex, 10) = Cells(rowIndex - 1, 10).Value
                    row2.push(row2[9] / row2[8]);
                    // Cells(rowIndex, 11) = Cells(rowIndex, 10).Value / Cells(rowIndex, 9).Value
                    row2.push(row1[11] + row2[10])
                    // Cells(rowIndex, 12) = Cells(rowIndex - 1, 12).Value + Cells(rowIndex, 11).Value
                    row2.push(18.985 / (1 + 5 * Math.pow(row2[11], -1.1)))
                    // Cells(rowIndex, 13) = 18.985 / (1 + 5 * Cells(rowIndex, 12).Value ^ -1.1)
                    if (rowIndexStress == 13)
                        rowIndexStress = 1
                    rows.push(row2);
                    row1 = row2;
                }
            }
        }
        var r = 12 * this.state.DesignLife - 1;
        return {rowIndexStress, row1, rows, r};

        function lane(n) {
            if (n <= 2)
                return 1;
            else if (n >= 4)
                return 0.6;
            else
                return 0.7;
        }

        function fatigue(k) {
            if (k < 200)
                return k * 0.0221 - 15.97;
            else if (k < 300)
                return k * 0.0164 - 14.83;
            else if (k < 500)
                return k * 0.0038 - 11.05;
            else if (k < 1000)
                return k * 0.00033 - 9.31;
            else
                return k * 0.00071 - 9.69;
        }
    }

    warningFunc = {
        Step3: {
            'SubbaseThickness': () => this.state.SubbaseThickness < this.state.SubbaseThicknessThreshHold ? `Should greater than ${this.state.SubbaseThicknessThreshHold}` : null,
        }
    };

    errorFunc = {
        Step3: {
            // 'SubbaseThickness': () => this.state.SubbaseThickness < this.state.SubbaseThicknessThreshHold ? `Must greater than ${this.state.SubbaseThicknessThreshHold}` : (this.state.SubbaseThickness === '' ? 'Required' : null),
            'SubbaseThickness': () => (this.state.SubbaseThickness === '' ? 'Required' : null),
            'BaseThickness': () => (this.state.BaseThickness < this.state.BaseThicknessMin) ? `≥ ${this.state.BaseThicknessMin}` : (this.state.BaseThickness === '' ? 'Required' : null)
        }
    };

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1});
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1});
    };

    handleModify = () => {
        this.setState({activeStep: 0, finished: false});
    };

    handleReset = () => {
        this.setState({...init});
        this.initFunc();
    };
    onLoadInput = (event) => {
        const self = this;
        var reader = new FileReader();
        reader.addEventListener("load", parseFile, false);
        if (event.target.files[0]) {
            debugger
            reader.readAsText(event.target.files[0]);
        }

        function parseFile() {
            let loaded = false;
            var data = JSON.parse(reader.result);
            loaded = true;
            const currentState = JSON.stringify(self.state);
            try {
                self.setState(data);
                event.target.value = ''
            } catch (e) {
                window.alert("Can't read file. Please check format!")
                if (loaded)
                    self.setState(JSON.parse(currentState))
                event.target.value = ''
            }
        }
    }
    onSaveInput = () => {
        let filename = `txDoT_${this.state.District}_${new Date().toISOString().replace('.', '|')}`;
        let saveDataKey = ['DesignLife', 'PunchoutsPerMile', 'LanesOneDirection', 'TrafficOneDirection', 'ModulusOfRupture',
            'ElasticModulue', 'SoilClassificationSystem', 'SoilSub', 'PlasticityIndex', 'SubbaseType',
            'SubbaseThickness', 'BaseType', 'BaseThickness', 'BaseThicknessMin', 'ModulusBase',
            'CompositeK', 'District', 'County', 'Highway', 'ProjectScope', 'StationBegin', 'StationEnd',
            'currentDistricts', 'currentCounties', 'SubbaseThicknessThreshHold', 'SubbaseTypeOpt', 'baseTypeOpt'];
        const saveData = {};
        saveDataKey.forEach(k => saveData[k] = this.state[k]);
        const jsonse = JSON.stringify(saveData);
        let blob = new Blob([jsonse], {type: "application/json"});

        // Specify link url
        let url = URL.createObjectURL(blob);
        // Specify file name
        filename = filename ? filename + '.json' : 'txDot.json';

        // Create download link element
        let downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = url;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }

    handleOpenHelper = (content, freeze) => (event) => {
        if (this.state.helperEl) {
            if (this.state.helperEl.el === event.currentTarget && freeze && this.state.helperEl.freeze) // same target
                this.handleCloseHelper(event);
            else {
                if (freeze || this.state.helperEl.el !== event.currentTarget && freeze)
                    this.setState({helperEl: {el: event.currentTarget, content, freeze}})
            }
        } else {
            this.setState({helperEl: {el: event.currentTarget, content, freeze}})
        }
    };

    handleCloseHelper = (source) => {
        if (source.type !== 'mouseleave' || source.type === 'mouseleave' && this.state.helperEl && (!this.state.helperEl.freeze))
            this.setState({helperEl: undefined})
    };

    handleBlurSliderInput = (key, min, max) => {
        const value = this.state[key];
        const obj = {};
        if (value < min) {
            obj[key] = min;
            this.setState(obj);
        } else if (value > max) {
            obj[key] = max;
            this.setState(obj);
        }
    }
    handleChangeSliderInput = (event, key) => {
        const obj = {};
        obj[key] = event.target.value === '' ? '' : Number(event.target.value);
        this.setState(obj);
    }
    handleChange = (key, value) => {
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    };
    handleSoilSub = (value) => {
        let baseTypeOpt = ["CTB", "HMA"];
        let BaseType = this.state.BaseType;
        if (this.state.PlasticityIndex >= 15) {
            if (["ML", "CL", "OL", "MH", "CH", "OH"].indexOf(value) !== -1) {
                baseTypeOpt = ["CTB"];
                BaseType = "CTB";
            }
        }
        this.setState({SoilSub: value, baseTypeOpt, BaseType});
    };
    handleBaseType = (value) => {
        let BaseThicknessMin = 4;
        let BaseThicknessMax = 6;
        let BaseThickness = this.state.BaseThickness;
        let ModulusBase = 400;
        if (value === 'CTB') {
            BaseThicknessMin = 6;
            ModulusBase = 500;
        }
        if(value === 'HMA'){
            BaseThicknessMax = 4;
        }
        if (BaseThickness < BaseThicknessMin)
            BaseThickness = BaseThicknessMin;
        if (BaseThickness > BaseThicknessMax)
            BaseThickness = BaseThicknessMax;
        this.setState({BaseType: value, BaseThicknessMin, BaseThickness, ModulusBase});
    }
    handlePlasticityIndex = (value) => {
        let SubbaseTypeOpt = [];
        let SubbaseThicknessThreshHold = -1;
        if (value < 15) {
            SubbaseTypeOpt = ['Cement treated subgrade', 'Select fill', 'No treatment'];
        } else if (value < 35) {
            SubbaseTypeOpt = ['Lime treated subgrade','Cement treated subgrade',
                'Select fill', 'No treatment'];
        } else {
            SubbaseTypeOpt = ['Lime treated subgrade',
                'Select fill', 'No treatment'];
            SubbaseThicknessThreshHold = 8;
        }
        this.setState({PlasticityIndex: value, SubbaseTypeOpt, SubbaseThicknessThreshHold});
        this.handleBaseType(this.state.BaseType);
    };
    calculateCompositeK = () => {
        const {ModulusBase, SoilSub, BaseThickness, ksTable} = this.state;
        debugger
        this.setState({CompositeK: ksTable.get('' + getSubgradeValue(SoilSub) + ' ' + Math.round(BaseThickness) + ' ' + getModulusBase(ModulusBase))});

        function getSubgradeValue(SoilSub) {
            switch (SoilSub) {
                case "A-1-a":
                case "A-2-4":
                case "A-2-5":
                case "GW":
                case "GP":
                case "GM":
                case "SM":
                    return 300;
                case "A-1-b":
                case "SW":
                    return 200;
                case "A-3":
                case "A-2-6":
                case "A-2-7":
                case "SP":
                case "GC":
                case "SC":
                    return 150;
                case "A-7-6":
                case "CH":
                case "OH":
                    return 50;
                case "A-4":
                case "A-5":
                case "A-7-5":
                case "ML":
                case "OL":
                case "MH":
                case "CL":
                    return 25;
            }
        }

        function getModulusBase(ModulusBase) {
            if (ModulusBase <= 100)
                return Math.round(ModulusBase / 10) * 10;
            else if ((ModulusBase > 100) && (ModulusBase < 1000) && ((ModulusBase % 50) < 25))
                return ModulusBase - (ModulusBase % 50)
            else if ((ModulusBase > 100) && (ModulusBase < 1000) && ((ModulusBase % 50) >= 25))
                return ModulusBase + 50 - (ModulusBase % 50)
            else if (ModulusBase >= 1000)
                return Math.round(ModulusBase / 100) * 100;
            return 0;
        }
    }

    render() {
        const {classes} = this.props;
        const {isBackdropOpen} = this.state;
        const getGroupControl = () => {
            return <div className={classes.actionsContainer}>
                <div>
                    <Button
                        variant="contained"
                        onClick={this.props.toMenu}
                        className={classes.button}
                        startIcon={<HomeIcon/>}
                    >
                        To Main Menu
                    </Button>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    <Button
                        disabled={!this.state.District || this.errorFunc.Step3.BaseThickness() || this.errorFunc.Step3.SubbaseThickness()}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                    >
                        {this.state.activeStep === this.state.stepsLength - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        }
        if ((this.state.activeStep === this.state.stepsLength) && !this.state.finished) {
            this.setState({finished: true});
            this.recompute();
        }
        return (<Container maxWidth="lg"> <Paper elevation={3}>
            <Grid container>
                <Grid item style={{maxWidth: this.state.finished ? '220px' : '100%'}}>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>Step 1</StepLabel>
                            <StepContent displayPrint="block">
                                <Grid container spacing={4} justify="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.button}
                                            startIcon={<PublishIcon/>}
                                            component="label"
                                        >
                                            Load data input
                                            <input
                                                accept="application/JSON"
                                                type="file"
                                                hidden
                                                onChange={this.onLoadInput}
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} container>
                                        <Grid item style={{flexGrow: 1}}><Divider variant="middle"/></Grid>
                                        <Grid item style={{transform: 'translateY(-50%)'}}>Or</Grid>
                                        <Grid item style={{flexGrow: 1}}><Divider variant="middle"/></Grid>
                                    </Grid>
                                </Grid>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <Grid container spacing={4}>
                                        <Grid container item xs={12} spacing={1} justify="center">
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Autocomplete
                                                    margin="dense"
                                                    id="district"
                                                    value={this.state.District}
                                                    options={this.state.currentDistricts}
                                                    size="small"
                                                    style={{marginTop: 8, marginBottom: 4}}
                                                    onChange={(event, value, reason) => {
                                                        if (value == null)
                                                            this.setState({
                                                                District: value,
                                                                County: null,
                                                                currentCounties: Object.keys(counties)
                                                            });
                                                        else
                                                            this.setState({
                                                                District: value,
                                                                County: null,
                                                                currentCounties: districts[value]
                                                            });
                                                    }}
                                                    renderInput={(params) => <TextField dense {...params}
                                                                                        variant="filled"
                                                                                        className={classes.inputWithHelper}
                                                                                        required
                                                                                        error={!this.state.District}
                                                                                        label={<>DISTRICT<IconButton
                                                                                            aria-label="info"
                                                                                            className={classes.margin}
                                                                                            size="small">
                                                                                            <InfoIcon fontSize="small"
                                                                                                      onClick={this.handleOpenHelper({src: DistrictPic}, true)}
                                                                                                      onMouseEnter={this.handleOpenHelper({src: DistrictPic})}
                                                                                                      onMouseLeave={this.handleCloseHelper}
                                                                                            /></IconButton></>}
                                                    />}/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Autocomplete
                                                    margin="dense"
                                                    id="county"
                                                    value={this.state.County}
                                                    options={this.state.currentCounties}
                                                    onChange={(event, value) => {
                                                        if (value)
                                                            this.setState({
                                                                County: value,
                                                                District: counties[value].length === 1 ? counties[value][0] : null
                                                            });
                                                        else
                                                            this.setState({County: value})
                                                    }}
                                                    size="small"
                                                    style={{marginTop: 8, marginBottom: 4}}
                                                    renderInput={(params) => <TextField dense {...params}
                                                                                        className={classes.inputWithHelper}
                                                                                        label={<>COUNTY<IconButton
                                                                                            aria-label="info"
                                                                                            className={classes.margin}
                                                                                            size="small">
                                                                                            <InfoIcon fontSize="small"
                                                                                                      onClick={this.handleOpenHelper({map: 'county'}, true)}
                                                                                                      onMouseEnter={this.handleOpenHelper({map: 'county'})}
                                                                                                      onMouseLeave={this.handleCloseHelper}
                                                                                            /></IconButton></>}
                                                                                        variant="filled"/>}/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField
                                                    margin="dense"
                                                    id="highway"
                                                    label="HIGHWAY"
                                                    value={this.state.Highway}
                                                    onChange={(event) => this.handleChange('Highway', event.target.value)}
                                                    variant="filled"/>
                                                {/*<Autocomplete*/}
                                                {/*    margin="dense"*/}
                                                {/*    id="highway"*/}
                                                {/*    options={highway}*/}
                                                {/*    value={this.state.Highway}*/}
                                                {/*    onChange={(event, value) => this.handleChange('Highway', value)}*/}
                                                {/*    size="small"*/}
                                                {/*    freeSolo*/}
                                                {/*    autoSelect={true}*/}
                                                {/*    style={{marginTop: 8, marginBottom: 4}}*/}
                                                {/*    renderInput={(params) => <TextField dense {...params}*/}
                                                {/*                                        label="HIGHWAY"*/}
                                                {/*                                        variant="filled"/>}/>*/}
                                            </Grid>
                                            {/*<Grid item xs={12} sm={6} md={3}>*/}
                                            {/*    <TextField*/}
                                            {/*        margin="dense"*/}
                                            {/*        id="DirectionOfConstruction"*/}
                                            {/*        label="DIRECTION OF CONSTRUCTION"*/}
                                            {/*        value={this.state.DirectionOfConstruction}*/}
                                            {/*        onChange={(event) => this.handleChange('DirectionOfConstruction', event.target.value)}*/}
                                            {/*        variant="filled"/>*/}
                                            {/*</Grid>*/}
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="control"
                                                    label="CONTROL"
                                                    value={this.state.Control}
                                                    onChange={(event) => this.handleChange('Control', event.target.value)}
                                                    variant="filled"/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="section"
                                                    label="SECTION"
                                                    value={this.state.Section}
                                                    onChange={(event) => this.handleChange('Section', event.target.value)}
                                                    variant="filled"/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="job"
                                                    label="JOB"
                                                    value={this.state.Job}
                                                    onChange={(event) => this.handleChange('Job', event.target.value)}
                                                    variant="filled"/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="ProjectScope"
                                                    className={classes.inputWithHelper}
                                                    label={<>Project Scope <IconButton aria-label="info"
                                                                                       className={classes.margin}
                                                                                       size="small">
                                                        <InfoIcon fontSize="small"
                                                                  onClick={this.handleOpenHelper({text: "Will be provided later."}, true)}
                                                                  onMouseEnter={this.handleOpenHelper({text: "Will be provided later."})}
                                                                  onMouseLeave={this.handleCloseHelper}
                                                        />
                                                    </IconButton></>}
                                                    select
                                                    value={this.state.ProjectScope}
                                                    onChange={(event) => this.handleChange('ProjectScope', event.target.value)}
                                                    variant="filled">
                                                    <MenuItem value="NEW CONSTRUCTION">New Construction</MenuItem>
                                                    <MenuItem value="REHABILITATION">Rehabilitation</MenuItem>
                                                    <MenuItem value="WIDENING">Widening</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="StationBegin"
                                                    label="STATION (BEGIN)"
                                                    value={this.state.StationBegin}
                                                    onChange={(event) => this.handleChange('StationBegin', event.target.value)}
                                                    variant="filled"/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="StationEnd"
                                                    label="STATION (END)"
                                                    value={this.state.StationEnd}
                                                    onChange={(event) => this.handleChange('StationEnd', event.target.value)}
                                                    variant="filled"/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField
                                                    margin="dense"
                                                    id="date"
                                                    type="date"
                                                    label="DATE"
                                                    value={this.state.Date}
                                                    onChange={(event) => this.handleChange('Date', event.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="filled"/>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} spacing={1}>
                                            <TextField
                                                id="comment"
                                                label="COMMENTS"
                                                multiline
                                                onChange={(event) => this.handleChange('Comment', event.target.value)}
                                                rows={4}
                                                value={this.state.Comment}
                                                variant="filled"
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                                {getGroupControl()}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Step 2</StepLabel>
                            <StepContent displayPrint="block">
                                <form className={classes.root} noValidate autoComplete="off">
                                    <Grid container spacing={4}>
                                        <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                            <Grid item xs={12} justify="flex-start">
                                                <Typography variant={'h6'}>Basic Design Information</Typography>
                                            </Grid>
                                            <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                                  alignItems="flex-end">
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Design life (years)</span>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        type={'number'}
                                                        value={this.state.DesignLife}
                                                        onChange={(event) => this.handleChangeSliderInput(event, 'DesignLife')}
                                                        onBlur={() => this.handleBlurSliderInput('DesignLife', 1, 50)}
                                                        id="DesignLife"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: 1,
                                                            max: 50,
                                                            type: 'number',
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Total number of lanes in one direction</span>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        type={'number'}
                                                        value={this.state.LanesOneDirection}
                                                        onChange={(event) => this.handleChangeSliderInput(event, 'LanesOneDirection')}
                                                        onBlur={() => this.handleBlurSliderInput('LanesOneDirection', 1, 10)}
                                                        id="LanesOneDirection"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: 1,
                                                            max: 10,
                                                            type: 'number',
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Total design traffic in one direction (million ESAL)</span>
                                                        <IconButton aria-label="info" className={classes.margin}
                                                                    size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onClick={this.handleOpenHelper({src: TrafficOneDirectionPic}, true)}
                                                                      onMouseEnter={this.handleOpenHelper({src: TrafficOneDirectionPic})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        type={"number"}
                                                        value={this.state.TrafficOneDirection}
                                                        onChange={(event) => this.handleChangeSliderInput(event, 'TrafficOneDirection')}
                                                        onBlur={() => this.handleBlurSliderInput('TrafficOneDirection', 10, 500)}
                                                        id="TrafficOneDirection"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: 1,
                                                            max: 500,
                                                            type: 'number',
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                            <Grid item xs={12} container justify="flex-start">
                                                <Typography variant={'h6'}>Structural Design Criteria</Typography>
                                                <IconButton aria-label="info" className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onClick={this.handleOpenHelper({src: StructureDesignCriteriaPic}, true)}
                                                              onMouseEnter={this.handleOpenHelper({src: StructureDesignCriteriaPic})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                            </Grid>
                                            <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                                  alignItems="flex-end">
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Acceptable punchout per mile</span>
                                                        <IconButton aria-label="info" className={classes.margin}
                                                                    size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onClick={this.handleOpenHelper({src: AcceptableNumberofPunchoutPic}, true)}
                                                                      onMouseEnter={this.handleOpenHelper({src: AcceptableNumberofPunchoutPic})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        type={"number"}
                                                        value={this.state.PunchoutsPerMile}
                                                        onChange={(event) => this.handleChangeSliderInput(event, 'PunchoutsPerMile')}
                                                        onBlur={() => this.handleBlurSliderInput('PunchoutsPerMile', 5, 20)}
                                                        id="PunchoutsPerMile"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: 5,
                                                            max: 20,
                                                            type: 'number',
                                                        }}
                                                        disabled
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                            <Grid item xs={12} container justify="flex-start">
                                                <Typography variant={'h6'}>Concrete Layer/Material
                                                    Information</Typography>
                                                {/*<IconButton aria-label="info" className={classes.margin} size="small">*/}
                                                {/*    <InfoIcon fontSize="small"*/}
                                                {/*              onClick={this.handleOpenHelper({src: ConcreteLayerPic}, true)}*/}
                                                {/*              onMouseEnter={this.handleOpenHelper({src: ConcreteLayerPic})}*/}
                                                {/*              onMouseLeave={this.handleCloseHelper}*/}
                                                {/*    />*/}
                                                {/*</IconButton>*/}
                                            </Grid>
                                            <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                                  alignItems="flex-end">
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>28-day modulus of rupture (psi)</span>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        value={this.state.ModulusOfRupture}
                                                        onChange={(event) => this.handleChangeSliderInput(event, 'ModulusOfRupture')}
                                                        onBlur={() => this.handleBlurSliderInput('ModulusOfRupture', 1, 1000)}
                                                        id="ModulusOfRupture"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: 1,
                                                            max: 1000,
                                                            type: 'number',
                                                        }}
                                                        disabled
                                                    />
                                                </Grid>


                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Concrete elastic modulus (million psi)</span>
                                                        <IconButton aria-label="info"
                                                                    className={classes.margin} size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onClick={this.handleOpenHelper({text: "Will be provided later."}, true)}
                                                                      onMouseEnter={this.handleOpenHelper({text: "Will be provided later."})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        value={this.state.ElasticModulue}
                                                        onChange={(event) => this.handleChangeSliderInput(event, 'ElasticModulue')}
                                                        onBlur={() => this.handleBlurSliderInput('ElasticModulue', 1, 1000)}
                                                        id="ModulusOfRupture"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: 1,
                                                            max: 1000,
                                                            type: 'number',
                                                        }}
                                                        disabled
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                                {getGroupControl()}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Step 3</StepLabel>
                            <StepContent displayPrint="block">
                                <form className={classes.root} noValidate autoComplete="off">
                                    <Grid container spacing={4}>
                                        <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                            <Grid item xs={12} justify="flex-start">
                                                <Typography variant={'h6'}>Subgrade and Treatment
                                                    Information</Typography>
                                            </Grid>
                                            <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                                  alignItems="flex-end">
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Soil classification system</span>
                                                        <IconButton aria-label="info" className={classes.margin}
                                                                    size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onClick={this.handleOpenHelper({src: soilSystermPic}, true)}
                                                                      onMouseEnter={this.handleOpenHelper({src: soilSystermPic})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input
                                                        value={this.state.SoilClassificationSystem}
                                                        onChange={(event, newValue) => this.setState({SoilClassificationSystem: newValue})}
                                                        id="SoilClassificationSystem"
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Soil classification of subgrade</span>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Autocomplete
                                                        margin="dense"
                                                        id="SoilSub"
                                                        options={soilClassSub}
                                                        size="small"
                                                        onChange={(event, value) => this.handleSoilSub(value)}
                                                        renderInput={(params) => <TextField dense {...params}
                                                                                            label=""/>}/>
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Plasticity Index (PI)</span>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField type="number" id="PlasticityIndex"
                                                               value={this.state.PlasticityIndex}
                                                               onChange={(event) => this.handlePlasticityIndex(event.target.value)}/>
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Subgrade treatment</span>
                                                        <IconButton aria-label="info" className={classes.margin}
                                                                    size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onClick={this.handleOpenHelper({src: subbasePic,href:'https://ftp.dot.state.tx.us/pub/txdot/mtd/treatment-guidelines.pdf'}, true)}
                                                                      onMouseEnter={this.handleOpenHelper({src: subbasePic})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        margin="dense"
                                                        id="SubbaseType"
                                                        select
                                                        value={this.state.SubbaseType}
                                                        size="small"
                                                        onChange={(event) => {
                                                            this.handleChange('SubbaseType', event.target.value);
                                                            if(event.target.value==="No treatment")
                                                                this.setState({SubbaseThickness:0})
                                                        }}
                                                    >
                                                        {this.state.SubbaseTypeOpt.map(d => <MenuItem value={d}
                                                                                                      key={d}>{d}</MenuItem>)}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Subgrade treatment thickness (in.)</span>
                                                        <IconButton aria-label="info" className={classes.margin}
                                                                    size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onClick={this.handleOpenHelper({src: subbasePic}, true)}
                                                                      onMouseEnter={this.handleOpenHelper({src: subbasePic})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        error={this.errorFunc.Step3.SubbaseThickness()||this.warningFunc.Step3.SubbaseThickness()}
                                                        helperText={this.errorFunc.Step3.SubbaseThickness()||this.warningFunc.Step3.SubbaseThickness()}
                                                        disabled={(this.state.SubbaseThickness===0)&&(this.state.SubbaseType==='No treatment')}
                                                        type="number" id="SubbaseThickness"
                                                        value={this.state.SubbaseThickness}
                                                        onChange={(event) => ((event.target.value > 0) || (event.target.value === '')) ? this.handleChange("SubbaseThickness", event.target.value) : ''}
                                                        inputProps={{min: 0}}
                                                    />
                                                </Grid>
                                                {/*<Grid item xs={8} justify="flex-start">*/}
                                                {/*    <Grid container xs={12} justify="flex-start">*/}
                                                {/*        <span>Composite K (psi/in.)</span>*/}
                                                {/*        <span className={classes.dot} style={{flexGrow:1}}/>*/}
                                                {/*    </Grid>*/}
                                                {/*</Grid>*/}
                                                {/*<Grid item xs={4}>*/}
                                                {/*    <input type="number" id="19" value={this.state.CompositeK} onChange={(event, newValue) => this.setState({CompositeK:newValue})}/>*/}
                                                {/*</Grid>*/}
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                            <Grid item xs={12} justify="flex-start">
                                                <Typography variant={'h6'}>Base Layer Information</Typography>
                                            </Grid>
                                            <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                                  alignItems="flex-end">
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Base type</span>
                                                        <IconButton
                                                            aria-label="info"
                                                            className={classes.margin}
                                                            size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onMouseEnter={this.handleOpenHelper({src: BasetypePic})}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            /></IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        select
                                                        margin="dense"
                                                        id="BaseType"
                                                        size="small"
                                                        value={this.state.BaseType}
                                                        onChange={(event) => {
                                                            this.handleBaseType(event.target.value)
                                                        }}
                                                    >
                                                        {this.state.baseTypeOpt.map(d => <MenuItem value={d}
                                                                                                   key={d}>{d}</MenuItem>)}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Base layer thickness (inches)</span>
                                                        <IconButton aria-label="info"
                                                                    className={classes.margin} size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onMouseEnter={this.handleOpenHelper({
                                                                          text: <>
                                                                              <div>Minimum Cap.</div>
                                                                              <div>CTB ≥ 6.0 in.</div>
                                                                              <div>HMA ≥ 4.0 in</div>
                                                                          </>
                                                                      })}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        error={this.errorFunc.Step3.BaseThickness()}
                                                        helperText={this.errorFunc.Step3.BaseThickness()}
                                                        value={this.state.BaseThickness}
                                                        onChange={(event) => this.handleChange('BaseThickness', event.target.value)}
                                                        id="BaseThickness"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            min: this.state.BaseThicknessMin,
                                                            max: this.state.BaseThicknessMax,
                                                            type: 'number',
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={8} justify="flex-start">
                                                    <Grid container xs={12} justify="flex-start">
                                                        <span>Modulus of base layer (ksi)</span>
                                                        <IconButton aria-label="info"
                                                                    className={classes.margin} size="small">
                                                            <InfoIcon fontSize="small"
                                                                      onMouseEnter={this.handleOpenHelper({
                                                                          text: <>
                                                                              <div>CTB = 500 ksi</div>
                                                                              <div>HMA = 400 ksi</div>
                                                                          </>
                                                                      })}
                                                                      onMouseLeave={this.handleCloseHelper}
                                                            />
                                                        </IconButton>
                                                        <span className={classes.dot} style={{flexGrow: 1}}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField type="number" id="ModulusBase "
                                                               value={this.state.ModulusBase}
                                                               disabled
                                                               onChange={(event) => this.setState({ModulusBase: event.target.value})}/>
                                                </Grid>
                                                {/*<Grid item xs={8} justify="flex-start">*/}
                                                {/*    <Grid container xs={12} justify="flex-start">*/}
                                                {/*        <span>Composite k-Value</span>*/}
                                                {/*        <IconButton aria-label="info"*/}
                                                {/*                    className={classes.margin} size="small">*/}
                                                {/*            <InfoIcon fontSize="small"*/}
                                                {/*                      onMouseEnter={this.handleOpenHelper({text: 'Composite k table'})}*/}
                                                {/*                      onMouseLeave={this.handleCloseHelper}*/}
                                                {/*            />*/}
                                                {/*        </IconButton>*/}
                                                {/*        <span className={classes.dot} style={{flexGrow: 1}}/>*/}
                                                {/*    </Grid>*/}
                                                {/*</Grid>*/}
                                                {/*<Grid item xs={4}>*/}
                                                {/*    <TextField type="number" id="CompositeK "*/}
                                                {/*               value={this.state.CompositeK}*/}
                                                {/*               disabled/>*/}
                                                {/*</Grid>*/}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                                {getGroupControl()}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Result</StepLabel>
                            <StepContent displayPrint="block">
                            </StepContent>
                        </Step>
                    </Stepper>
                    {this.state.activeStep === this.state.stepsLength && (
                        <>
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Button onClick={this.handleModify} className={classes.button}
                                        size="small"
                                        startIcon={<EditIcon/>}
                                >
                                    Modify
                                </Button>
                                <Button onClick={this.handleReset} className={classes.button}
                                        size="small"
                                        startIcon={<RefreshIcon/>}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<PrintIcon/>}
                                    // onClick={()=>this.props.print(this.state)}
                                    onClick={() => {
                                        if (window.matchMedia) {
                                            var mediaQueryList = window.matchMedia('print');
                                            mediaQueryList.addListener((mql) =>{
                                                if (!mql.matches) {
                                                    this.setState({isBackdropOpen: false});
                                                }
                                            });
                                        }
                                        window.onafterprint =  ()=> {
                                            this.setState({isBackdropOpen: false});
                                        }
                                        this.setState({isBackdropOpen: true, printRequest: true});
                                        // window.print();

                                    }}
                                >
                                    Print
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon/>}
                                    // onClick={()=>this.props.print(this.state)}
                                    onClick={this.onSaveInput}
                                >
                                    Save input
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<ShowChartIcon/>}
                                    // onClick={()=>this.props.print(this.state)}
                                    onClick={() => this.setState({openAnalytics: true})}
                                >
                                    ANALYSIS RESULT
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={this.props.toMenu}
                                    className={classes.button}
                                    startIcon={<HomeIcon/>}
                                >
                                    To Main Menu
                                </Button>
                            </Paper>
                        </>
                    )}
                </Grid>
                {this.state.finished ? <Grid item style={{width: 'calc(100% - 220px)'}}>
                    <Report
                        data={this.state}
                        AnalysisPunchouts={this.props.AnalysisPunchouts()}
                        AnalysisSlabThickness={this.props.AnalysisSlabThickness()}
                    />
                </Grid> : ''}
            </Grid>
        </Paper>
            {(this.state.helperEl && this.state.helperEl.content && !this.state.helperEl.content.map) ?
                <Popper
                    placement="right"
                    disablePortal={false}
                    open={true}
                    anchorEl={this.state.helperEl.el}
                    modifiers={{
                        flip: {
                            enabled: true,
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'window',
                        },
                        arrow: {
                            enabled: true,
                        },
                    }}
                    style={{zIndex: 4}}
                >
                    <Card className={classes.helpHolder}>
                        {this.state.helperEl.freeze ? <IconButton aria-label="close" className={classes.closeButton}
                                                                  onClick={this.handleCloseHelper}>
                            <CloseIcon/>
                        </IconButton> : ''}
                        {this.state.helperEl.content.src ?
                            <a href={this.state.helperEl.content.href} target={"_blank"}>
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={1}
                                defaultPositionY={1}
                            >
                                <TransformComponent>
                                    <img
                                        src={this.state.helperEl.content.src}
                                        style={{maxWidth: 600, height: 'auto'}}
                                    /></TransformComponent></TransformWrapper> </a>:
                            this.state.helperEl.content.text
                        }
                    </Card>
                </Popper> : ''
            }
            <Backdrop
                sx={{ color: '#fff'}}
                style={{zIndex: 10}}
                open={isBackdropOpen}
            >
            </Backdrop>
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={!!this.state.openAnalytics}
                onClose={() => this.setState({openAnalytics: false})}>
                <DialogTitle id="responsive-dialog-title"
                             onClose={() => this.setState({openAnalytics: false})}>Analysis</DialogTitle>
                <DialogContent>
                    {this.state.finished ? <Graph
                        rows={this.state.rows}
                        AnalysisPunchouts={this.props.AnalysisPunchouts}
                        init={this.state.activeStep === this.state.stepsLength}
                        parameter={{...this.state}}/> : ''}
                </DialogContent>
            </Dialog>
            <Popper
                placement="right"
                disablePortal={false}
                open={!!(this.state.helperEl && this.state.helperEl.content && this.state.helperEl.content.map)}
                anchorEl={this.state.helperEl && this.state.helperEl.el}
                modifiers={{
                    flip: {
                        enabled: true,
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'window',
                    },
                    arrow: {
                        enabled: true,
                    },
                }}
                style={{zIndex: 4}}
            >
                <Card style={{width: 600}}>
                    {this.state.helperEl && this.state.helperEl.freeze ?
                        <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleCloseHelper}>
                            <CloseIcon/>
                        </IconButton> : ''}

                    <County highlight={this.state.currentCounties}
                            target={this.state.County}
                            selected={(value) => {
                                if (value)
                                    this.setState({
                                        County: value,
                                        District: counties[value].length === 1 ? counties[value][0] : null
                                    });
                                else
                                    this.setState({County: value})
                            }}/>
                </Card>
            </Popper>
        </Container>);
    }
}

export default withStyles(styles)(CRCP);