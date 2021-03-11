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
import stress from "./data/stress.csv";
import kTable from "./data/kTable.csv";
import Card from "@material-ui/core/Card";

const districts = {
    "ABILENE": ["BORDEN", "CALLAHAN", "FISHER", "HASKELL", "HOWARD", "JONES", "KENT", "MITCHELL", "NOLAN", "SCURRY", "SHACKELFORD", "STONEWALL", "TAYLOR"],
    "AMARILLO": ["ARMSTRONG", "CARSON", "DALLAM", "DEAF SMITH", "GRAY", "HANSFORD", "HARTLEY", "HEMPHILL", "HUTCHINSON", "LIPSCOMB", "MOORE", "OCHILTREE", "OLDHAM", "POTTER", "RANDALL", "ROBERTS", "SHERMAN"],
    "ATLANTA": ["BOWIE", "CAMP", "CASS", "HARRISON", "MARION", "MORRIS", "PANOLA", "TITUS", "UPSHUR"],
    "AUSTIN": ["BASTROP", "BLANCO", "BURNET", "CALDWELL", "GILLESPIE", "HAYS", "LEE", "LLANO", "MASON", "TRAVIS", "WILLIAMSON"],
    "BEAUMONT": ["CHAMBERS", "HARDIN", "JASPER", "JEFFERSON", "LIBERTY", "NEWTON", "ORANGE", "TYLER"],
    "BRYAN": ["BRAZOS", "BURLESON", "FREESTONE", "GRIMES", "LEON", "MADISON", "MILAM", "ROBERTSON", "WALKER", "WASHINGTON"],
    "BROWNWOOD": ["BROWN", "COLEMAN", "COMANCHE", "EASTLAND", "LAMPASAS", "MCCULLOCH", "MILLS", "SAN SABA", "STEPHENS", "BRISCOE", "CHILDRESS", "COLLINGSWORTH", "COTTLE", "DICKENS", "DONLEY", "FOARD", "HALL", "HARDEMAN", "KING", "KNOX", "MOTLEY", "WHEELER"],
    "CORPUS CHRISTI": ["ARANSAS", "BEE", "GOLIAD", "JIM WELLS", "KARNES", "KLEBERG", "LIVE OAK", "NUECES", "REFUGIO", "SAN PATRICIO"],
    "DALLAS": ["COLLIN", "DALLAS", "DENTON", "ELLIS", "KAUFMAN", "NAVARRO", "ROCKWALL"],
    "EL PASO": ["BREWSTER", "CULBERSON", "EL PASO", "HUDSPETH", "JEFF DAVIS", "PRESIDIO"],
    "FORT WORTH": ["ERATH", "HOOD", "JACK", "JOHNSON", "PALO PINTO", "PARKER", "SOMERVELL", "TARRANT", "WISE"],
    "HOUSTON": ["BRAZORIA", "FORT BEND", "GALVESTON", "HARRIS", "MONTGOMERY", "WALLER"],
    "LUBBOCK": ["BAILEY", "CASTRO", "COCHRAN", "CROSBY", "DAWSON", "FLOYD", "GAINES", "GARZA", "HALE", "HOCKLEY", "LAMB", "LUBBOCK", "LYNN", "PARMER", "SWISHER", "TERRY", "YOAKUM"],
    "LUFKIN": ["ANGELINA", "HOUSTON", "NACOGDOCHES", "POLK", "SABINE", "SAN AUGUSTINE", "SAN JACINTO", "SHELBY", "TRINITY"],
    "LAREDO": ["DIMMITT", "DUVAL", "KINNEY", "LA SALLE", "MAVERICK", "VAL VERDE", "WEBB", "ZAVALA"],
    "ODESA": ["ANDREWS", "CRANE", "ECTOR", "LOVING", "MARTIN", "MIDLAND", "PECOS", "REEVES", "TERRELL", "UPTON", "WARD", "WINKLER"],
    "PARIS": ["DELTA", "FANNIN", "FRANKLIN", "GRAYSON", "HOPKINS", "HUNT", "LAMAR", "RAINS", "RED RIVER"],
    "PHARR": ["BROOKS", "CAMERON", "HIDALGO", "JIM HOGG", "KENEDY", "STARR", "WILLACY", "ZAPATA"],
    "SAN ANTONIO": ["ATASCOSA", "BANDERA", "BEXAR", "COMAL", "FRIO", "GUADALUPE", "KENDALL", "KERR", "MCMULLEN", "MEDINA", "UVALDE", "WILSON"],
    "SAN ANGELO": ["COKE", "CONCHO", "CROCKETT", "EDWARDS", "GLASSCOCK", "IRION", "KIMBLE", "MENARD", "REAGAN", "REAL", "RUNNELS", "SCHLEICHER", "STERLING", "SUTTON", "TOM GREEN"],
    "TYLER": ["ANDERSON", "CHEROKEE", "GREGG", "HENDERSON", "RUSK", "SMITH", "VAN ZANDT", "WOOD"],
    "WACO": ["BELL", "BOSQUE", "CORYELL", "FALLS", "HAMILTON", "HILL", "LIMESTONE", "MCLENNAN"],
    "WICHITA FALLS": ["ARCHER", "BAYLOR", "CLAY", "COOKE", "MONTAGUE", "THROCKMORTON", "WICHITA", "WILBARGER", "YOUNG"],
    "YOKUM": ["AUSTIN", "CALHOUN", "COLORADO", "DEWITT", "FAYETTE", "GONZALES", "JACKSON", "LAVACA", "MATAGORDA", "VICTORIA", "WHARTON"]
};
const counties = {};
Object.keys(districts).forEach(key => {
    districts[key].forEach(c => counties[c] ? counties[c].push(key) : counties[c] = [key])
});
const highway = ["IH 45", "US 290", "IH 30", "US 59", "IH 35W", "IH 820", "IH 10", "IH 40", "IH 35", "US 287", "US 81", "IH 27", "SL 289", "SH 226", "SH 36", "US 83B", "VA", "FM 3129", "IH 20", "US 71", "US 79", "US 47", "US 67", "BU90-Y", "CS", "FM 1960", "FM 364", "FM 365", "SH 347", "SH 105", "SH 12", "SH 124", "SH 146", "SH 326", "SH 61", "SH 73", "SH 87", "SS 380", "US 90", "US 69", "US 96", "BS6-R", "SH 21", "BW 8", "US 83", "BS 121H", "FM 1171", "FM 1382", "FM 2499", "FM 709", "FM 740", "IH 35E", "IH4 5", "IH 635", "LP 12", "LP 354", "MH", "SH 289", "SH 31", "SH 66", "SH 78", "SH 114", "SH 121", "SH 161", "SH 180", "SH 183", "SH 310", "SH 34", "SH 342", "SH 356", "SL 12", "SL 288", "SP 244", "SP 348", "SP 366", "SPUR 354", "US 175", "US 380", "US 75", "US 77", "US 377", "US 80", "US 54", "BU 287P", "FM 157", "IH 820 ", "SH 199", "SH 26", "SH 360", "FM 1764", "FM 523", "FM 1092", "FM 1488", "FM 518", "IH 610", "SH 288", "SH 332", "SH 225", "SH 242", "SH 249", "SH 35", "US 90A", "IH27", "SH 7", "FM 1472", "LP 20", "ODA 181-1", "ODA 181-2", "ODA 250-1", "ODA 250-2", "US 82", "SH 6", "FM 85", "LP 281", "LP 323", "SH 19", "SH 198", "SH 334", "US 259", "US 281", "FM 1695", "FM 3476", "FM 933", "IH 36", "LP 363", "SH 195", "US 84", "BU 287J", "IH 44", "SH 240", "SP 1027 ", "US 287 ", "US 55", "US 70", "SH 71"];
// const baseType = ["CTB", "HMA Base"];
const soilClassSub = ["GW","GP","GM","GC","SW","SP","SM","SC","ML","CL","OL","MH","CH","OH","Pt"];

const styles = theme => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& input': {
            width: '100%',
        },
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
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" size="small" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class CRCP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            stepsLength: 3,
            finished: false,
            DesignLife: 30,
            PunchoutsPerMile: 10,
            LanesOneDirection: 2,
            TrafficOneDirection: 100,
            ModulusOfRupture: 570,
            ElasticModulue: 5,
            SoilClassificationSystem:'USCS',
            SoilSub:"CH",
            PlasticityIndex:8,
            SubbaseType:"LTS",
            SubbaseThickness:12,
            BaseType:'',
            BaseThickness: 6,
            BaseThicknessMin: 6,
            ModulusBase : 400,
            CompositeK: 539,
            District: null,
            County: null,
            Highway: null,
            ProjectScope: null,
            StationBegin: null,
            StationEnd: null,
            currentDistricts: Object.keys(districts),
            currentCounties: Object.keys(counties),
            SubbaseThicknessThreshHold:-1,
            SubbaseTypeOpt:['Cement treated subgrade',
                'Lime treated subgrade',
                'Lime-cement treated subgrade',
                'Lime-fly ash treated subgrade',
                'Fly ash treated subgrade',
                'N/A'
            ],
            baseTypeOpt:["CTB", "HMA Base"],
            ksTable:new Map()
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.ModulusBase!==this.state.ModulusBase)||(prevState.SoilSub!==this.state.SoilSub)||(prevState.BaseThickness!==this.state.BaseThickness)){
            this.calculateCompositeK();
        }
    }

    componentDidMount() {
        d3.tsv(stress).then(data_=> {
            this.setState({data: data_});
        });
        d3.csv(kTable).then(_data=>{
            let ksTable = new Map();
            _data.forEach(r=>{
                ksTable.set(''+r['Subgrade K-Value (psi/in.)']+' '+r['Base Thickness (in.)']+' '+r['Modulus of Base Layer (ksi)'],+r['Composite K (psi/in.)']);
            })
            this.setState({ksTable})
        })
        this.handlePlasticityIndex(this.state.PlasticityIndex);
    }

    recompute = ()=>{
        const data = this.state.data;
        let rowIndexStress = 9;
        let row1 = [];
        const rows = [];
        row1.push( 1 );
        row1.push( row1[0]/ 12 );
        row1.push( this.state.ModulusOfRupture);
        row1.push( 57000 / 7.5 * row1[2] / 1000 );
        row1.push( +data[rowIndexStress-2]["STR (T)"] );
        row1.push( data[rowIndexStress-2]["STR (E)"] * row1[3] / 5000 )
        row1.push( row1[4] + row1[5] )
        row1.push( row1[6] / row1[2] )
        row1.push( 11800 * Math.pow(row1[7],fatigue(this.state.CompositeK) ))
        row1.push( lane(this.state.LanesOneDirection)
            * this.state.TrafficOneDirection * 1000000 / 12 / this.state.DesignLife )
        row1.push( row1[9] / row1[8] )
        row1.push( row1[10] )
        row1.push( 18.985 / (1 + 5 * Math.pow(row1[11],-1.1)) )
        rows.push(row1);    // Add to the array

        //console.log(+document.getElementById("DesignLife").value);
        for (var i=0; i<this.state.DesignLife;i++){
            //debugger;
            if (i!=0)
                rowIndexStress = 8;
            for (var j=0;j<12; j++){
                if (i==0 && j==0)
                    ;
                    //If counterYear = 1 And counterMonth = 1 Then
                //      'If First Year than Omit Calculation of First Month, Already Done
                else {
                    rowIndexStress = rowIndexStress + 1
                    let row2 = [];
                    row2.push( row1[0] + 1 )
                    row2.push( row2[0]/ 12 );
                    // Cells(rowIndex, 2) = Cells(rowIndex, 1).Value / 12
                    row2.push( this.state.ModulusOfRupture
                        * Math.pow((30 * row2[0] / (4 + 0.85 * 30 * row2[0])), 0.5) );
                    // Cells(rowIndex, 3) = Sheets("Input").Range("F8").Value * ((30 * Cells(rowIndex, 1).Value / (4 + 0.85 * 30 * Cells(rowIndex, 1).Value))) ^ 0.5
                    row2.push( 57000 / 7.5 * row2[2] / 1000 );
                    // Cells(rowIndex, 4) = 57000 / 7.5 * Cells(rowIndex, 3) / 1000
                    row2.push( +data[rowIndexStress-2]["STR (T)"] );
                    // Cells(rowIndex, 5) = Sheets("Stress").Cells(rowIndexStress, 38).Value
                    row2.push( data[rowIndexStress-2]["STR (E)"] * row2[3] / 5000 );
                    // Cells(rowIndex, 6) = Sheets("Stress").Cells(rowIndexStress, 39).Value * Cells(rowIndex, 4) / 5000
                    row2.push( row2[4] + row2[5] );
                    // Cells(rowIndex, 7) = Cells(rowIndex, 5).Value + Cells(rowIndex, 6).Value
                    row2.push( row2[6] / row2[2] );
                    // Cells(rowIndex, 8) = Cells(rowIndex, 7).Value / Cells(rowIndex, 3).Value
                    row2.push( 11800 * Math.pow(row2[7],fatigue(this.state.CompositeK)) );
                    // Cells(rowIndex, 9) = 11800 * Cells(rowIndex, 8).Value ^ fatigue(Sheets("Input").Range("CompositeK").Value)
                    row2.push( row1[9] );
                    // Cells(rowIndex, 10) = Cells(rowIndex - 1, 10).Value
                    row2.push( row2[9] / row2[8] );
                    // Cells(rowIndex, 11) = Cells(rowIndex, 10).Value / Cells(rowIndex, 9).Value
                    row2.push( row1[11] + row2[10] )
                    // Cells(rowIndex, 12) = Cells(rowIndex - 1, 12).Value + Cells(rowIndex, 11).Value
                    row2.push( 18.985 / (1 + 5 * Math.pow(row2[11],-1.1)) )
                    // Cells(rowIndex, 13) = 18.985 / (1 + 5 * Cells(rowIndex, 12).Value ^ -1.1)
                    if (rowIndexStress == 13)
                        rowIndexStress = 1
                    rows.push(row2);
                    row1=row2;
                }
            }
        }
        var r = 12 * this.state.DesignLife - 1;
        this.props.AnalysisPunchouts(rows[r][12]);
        this.setState({row1,rows,rowIndexStress})
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
    };
    errorFunc={
        Step3:{
            'SubbaseThickness': ()=>this.state.SubbaseThickness<this.state.SubbaseThicknessThreshHold?`Must greater than ${this.state.SubbaseThicknessThreshHold}`:(this.state.SubbaseThickness===''?'Required':null),
            'BaseThickness': ()=>(this.state.BaseThickness<this.state.BaseThicknessMin)?`≥ ${this.state.BaseThicknessMin}`:(this.state.BaseThickness===''?'Required':null)
        }
    };

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1});
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1});
    };

    handleReset = () => {
        this.setState({activeStep: 0, finished:false});
    };

    handleOpenHelper = (content) => (event) => {
        this.setState({helperEl: {el: event.currentTarget, content}})
    };

    handleCloseHelper = () => {
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
    handleSoilSub = (value)=>{
        let baseTypeOpt = ["CTB", "HMA Base"];
        let BaseType = this.state.BaseType;
        if (this.state.PlasticityIndex>=15){
            if (["ML", "CL", "OL", "MH", "CH", "OH"].indexOf(value)!==-1)
             {   baseTypeOpt = ["CTB"];
                 BaseType = "CTB";
             }
        }
        this.setState({SoilSub:value,baseTypeOpt,BaseType});
    };
    handleBaseType = (value) => {
        let BaseThicknessMin = 4;
        let BaseThickness = this.state.BaseThickness;
        let ModulusBase = 400;
        if (value==='CTB'){
            BaseThicknessMin = 6;
            ModulusBase = 500;
        }
        if (BaseThickness<BaseThicknessMin)
            BaseThickness = BaseThicknessMin;
        this.setState({BaseType:value,BaseThicknessMin,BaseThickness,ModulusBase});
    }
    handlePlasticityIndex = (value)=>{
        let SubbaseTypeOpt = [];
        let SubbaseThicknessThreshHold = -1;
        if (value<15){
            SubbaseTypeOpt = ['Cement treated subgrade','Lime-fly ash treated subgrade','N/A'];
        }else if (value<35){
            SubbaseTypeOpt = ['Cement treated subgrade',
                'Lime treated subgrade',
                'Lime-cement treated subgrade',
                'Lime-fly ash treated subgrade',
                'Fly ash treated subgrade','N/A'];
        }else{
            SubbaseTypeOpt = ['Lime treated subgrade',
                'Lime-cement treated subgrade',
                'Lime-fly ash treated subgrade','N/A'];
            SubbaseThicknessThreshHold = 8;
        }
        this.setState({PlasticityIndex:value,SubbaseTypeOpt,SubbaseThicknessThreshHold});
        this.handleBaseType(this.state.BaseType);
    };
    calculateCompositeK = ()=>{
        const {ModulusBase,SoilSub,BaseThickness,ksTable} = this.state;
        debugger
        this.setState({CompositeK: ksTable.get(''+getSubgradeValue(SoilSub)+' '+Math.round(BaseThickness)+' '+getModulusBase(ModulusBase))});

        function getSubgradeValue(SoilSub){
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
        function getModulusBase(ModulusBase){
            if (ModulusBase<=100)
                return Math.round(ModulusBase/10)*10;
            else if((ModulusBase>100)&&(ModulusBase<1000)&&((ModulusBase%50) <25))
                return ModulusBase-(ModulusBase%50)
            else if((ModulusBase>100)&&(ModulusBase<1000)&&((ModulusBase%50)>=25))
                return ModulusBase+50-(ModulusBase%50)
            else if(ModulusBase>=1000)
                return Math.round(ModulusBase/100)*100;
            return 0;
        }
    }

    render() {
        const {classes} = this.props;
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
        if ((this.state.activeStep === this.state.stepsLength) && !this.state.finished){
            this.setState({finished: true});
            this.recompute();
        }
        return (<Container maxWidth="lg"> <Paper elevation={3}>
            <Grid container>
            <Grid item xs={this.state.finished?2:12}>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Step 1</StepLabel>
                    <StepContent displayPrint="block">
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={12} spacing={1} justify="center">
                                    <Grid item xs={12} sm={6} md={3}>
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
                                            renderInput={(params) => <TextField dense {...params} variant="filled"
                                                                                className={classes.inputWithHelper}
                                                                                label={<>DISTRICT<IconButton
                                                                                    aria-label="info"
                                                                                    className={classes.margin}
                                                                                    size="small">
                                                                                    <InfoIcon fontSize="small"
                                                                                              onMouseEnter={this.handleOpenHelper({src: DistrictPic})}
                                                                                              onMouseLeave={this.handleCloseHelper}
                                                                                    /></IconButton></>}
                                            />}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
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
                                                                                              onMouseEnter={this.handleOpenHelper({src: CountyPic})}
                                                                                              onMouseLeave={this.handleCloseHelper}
                                                                                    /></IconButton></>}
                                                                                variant="filled"/>}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Autocomplete
                                            margin="dense"
                                            id="highway"
                                            options={highway}
                                            value={this.state.Highway}
                                            onChange={(event, value) => this.handleChange('Highway', value)}
                                            size="small"
                                            freeSolo
                                            style={{marginTop: 8, marginBottom: 4}}
                                            renderInput={(params) => <TextField dense {...params} label="HIGHWAY"
                                                                                variant="filled"/>}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            margin="dense"
                                            id="DirectionOfConstruction"
                                            label="DIRECTION OF CONSTRUCTION"
                                            value={this.state.DirectionOfConstruction}
                                            onChange={(event) => this.handleChange('DirectionOfConstruction', event.target.value)}
                                            variant="filled"/>
                                    </Grid>
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
                                                                               className={classes.margin} size="small">
                                                <InfoIcon fontSize="small"
                                                          onMouseEnter={this.handleOpenHelper({text: "Will be provided later."})}
                                                          onMouseLeave={this.handleCloseHelper}
                                                />
                                            </IconButton></>}
                                            select
                                            value={this.state.ProjectScope}
                                            onChange={(event) => this.handleChange('ProjectScope', event.target.value)}
                                            variant="filled">
                                            <MenuItem value="WIDENING">WIDENING</MenuItem>
                                            <MenuItem value="REHABILITATION">REHABILITATION</MenuItem>
                                            <MenuItem value="NEW CONSTRUCTION">NEW CONSTRUCTION</MenuItem>
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
                                        defaultValue=""
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
                                        <Typography variant={'h6'}>Basic design information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Design life (years)</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} sm={4} md={3}>
                                            <Slider
                                                value={this.state.DesignLife}
                                                onChange={(event, newValue) => this.setState({DesignLife: newValue})}
                                                defaultValue={30}
                                                min={1} max={100}
                                                id="DesignLife"
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.DesignLife}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'DesignLife')}
                                                    onBlur={() => this.handleBlurSliderInput('DesignLife', 1, 100)}
                                                    id="DesignLife"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 1,
                                                        max: 100,
                                                        type: 'number',
                                                    }}
                                                />
                                            </Grid>
                                        </Hidden>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total number of lanes in one direction</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} xm={4} md={3}>
                                            <Slider
                                                value={this.state.LanesOneDirection}
                                                onChange={(event, newValue) => this.setState({LanesOneDirection: newValue})}
                                                defaultValue={2}
                                                min={1} max={10}
                                                id="LanesOneDirection"
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
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
                                        </Hidden>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total design traffic in one direction (million ESAL)</span>
                                                <IconButton aria-label="info" className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({src: TrafficOneDirectionPic})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} xm={4} md={3}>
                                            <Slider
                                                value={this.state.TrafficOneDirection}
                                                onChange={(event, newValue) => this.setState({TrafficOneDirection: newValue})}
                                                defaultValue={100}
                                                min={10} max={1000}
                                                id="TrafficOneDirection"
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.TrafficOneDirection}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'TrafficOneDirection')}
                                                    onBlur={() => this.handleBlurSliderInput('TrafficOneDirection', 10, 1000)}
                                                    id="TrafficOneDirection"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 10,
                                                        max: 1000,
                                                        type: 'number',
                                                    }}
                                                />
                                            </Grid>
                                        </Hidden>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} container justify="flex-start">
                                        <Typography variant={'h6'}>Structural design criteria</Typography>
                                        <IconButton aria-label="info" className={classes.margin} size="small">
                                            <InfoIcon fontSize="small"
                                                      onMouseEnter={this.handleOpenHelper({src: StructureDesignCriteriaPic})}
                                                      onMouseLeave={this.handleCloseHelper}
                                            />
                                        </IconButton>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Acceptable number of punchouts per mile</span>
                                                <IconButton aria-label="info" className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({src: AcceptableNumberofPunchoutPic})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} xm={4} md={3}>
                                            <Slider
                                                value={this.state.PunchoutsPerMile}
                                                onChange={(event, newValue) => this.setState({PunchoutsPerMile: newValue})}
                                                defaultValue={10}
                                                min={1} max={100}
                                                id="PunchoutsPerMile"
                                                disabled
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.PunchoutsPerMile}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'PunchoutsPerMile')}
                                                    onBlur={() => this.handleBlurSliderInput('PunchoutsPerMile', 1, 100)}
                                                    id="PunchoutsPerMile"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 1,
                                                        max: 100,
                                                        type: 'number',
                                                    }}
                                                    disabled
                                                />
                                            </Grid>
                                        </Hidden>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} container justify="flex-start">
                                        <Typography variant={'h6'}>Concrete Layer/Material information</Typography>
                                        <IconButton aria-label="info" className={classes.margin} size="small">
                                            <InfoIcon fontSize="small"
                                                      onMouseEnter={this.handleOpenHelper({src: ConcreteLayerPic})}
                                                      onMouseLeave={this.handleCloseHelper}
                                            />
                                        </IconButton>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>28-Day Modulus of Rupture (psi)</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={3} sm={4} md={3}>
                                                <Slider
                                                    value={this.state.ModulusOfRupture}
                                                    onChange={(event, newValue) => this.setState({ModulusOfRupture: newValue})}
                                                    id="ModulusOfRupture"
                                                    defaultValue={570}
                                                    min={1} max={1000}
                                                    disabled
                                                />
                                            </Grid>
                                        </Hidden>
                                        <Grid item xs={1}>
                                            <Input
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
                                                <span>Concrete Elasticity of Modulus (million psi)</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={3} sm={4} md={3}>
                                                <Slider
                                                    value={this.state.ElasticModulue}
                                                    onChange={(event, newValue) => this.setState({ElasticModulue: newValue})}
                                                    id="ElasticModulue"
                                                    defaultValue={570}
                                                    min={1} max={1000}
                                                    disabled
                                                />
                                            </Grid>
                                        </Hidden>
                                        <Grid item xs={1}>
                                            <Input
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
                                        <Typography variant={'h6'}>Subgrade and Subbase Information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Soil classification system</span>
                                                <IconButton aria-label="info" className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({src: soilSystermPic})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
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
                                                renderInput={(params) => <TextField dense {...params} label=""/>}/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Plasticity Index (PI)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField type="number" id="PlasticityIndex" value={this.state.PlasticityIndex} onChange={(event)=>this.handlePlasticityIndex(event.target.value)}/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span> Subbase Type</span>
                                                <IconButton aria-label="info" className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({src: subbasePic})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                margin="dense"
                                                id="SubbaseType"
                                                select
                                                value={this.state.SubbaseType}
                                                size="small"
                                                onChange={(event)=>this.handleChange('SubbaseType',event.target.value)}
                                                >
                                                {this.state.SubbaseTypeOpt.map(d=><MenuItem value={d} key={d}>{d}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Subbase Layer Thickness (in.)</span>
                                                <IconButton aria-label="info" className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({src: subbasePic})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                error={this.errorFunc.Step3.SubbaseThickness()}
                                                helperText={this.errorFunc.Step3.SubbaseThickness()}
                                                type="number" id="SubbaseThickness" value={this.state.SubbaseThickness}
                                                onChange={(event) => ((event.target.value>0)||(event.target.value===''))?this.handleChange("SubbaseThickness",event.target.value):''}
                                                inputProps={{min:0}}
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
                                        <Typography variant={'h6'}>Base layer information</Typography>
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
                                                onChange={(event)=>{this.handleBaseType(event.target.value)}}
                                            >
                                                {this.state.baseTypeOpt.map(d=><MenuItem value={d} key={d}>{d}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Base layer thickness (inches)</span>
                                                <IconButton aria-label="info"
                                                            className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({text: <><div>Minimum Cap.</div><div>CTB ≥ 6.0 in.</div><div>HMA ≥ 4.0 in</div></>})}
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
                                                    onChange={(event) => this.handleChange('BaseThickness',event.target.value)}
                                                    id="BaseThickness"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: this.state.BaseThicknessMin,
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
                                                              onMouseEnter={this.handleOpenHelper({text: <><div>CTB = 500 ksi</div><div>HMA base = 400 ksi</div></>})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField type="number" id="ModulusBase " value={this.state.ModulusBase }
                                                       disabled
                                                   onChange={(event) => this.setState({ModulusBase : event.target.value})}/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Composite k-Value</span>
                                                <IconButton aria-label="info"
                                                            className={classes.margin} size="small">
                                                    <InfoIcon fontSize="small"
                                                              onMouseEnter={this.handleOpenHelper({text: 'Composite k table'})}
                                                              onMouseLeave={this.handleCloseHelper}
                                                    />
                                                </IconButton>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField type="number" id="CompositeK " value={this.state.CompositeK }
                                                       disabled/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                        {getGroupControl()}
                    </StepContent>
                </Step>
            </Stepper>
            {this.state.activeStep === this.state.stepsLength && (
                <>
                    <Paper square elevation={0} className={classes.resetContainer}>
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
                            onClick={()=>window.print()}
                        >
                            Print
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            // startIcon={<PrintIcon/>}
                            // onClick={()=>this.props.print(this.state)}
                            onClick={()=>this.setState({openAnalytics:true})}
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
                {this.state.finished ?<Grid xs={10} item>
                    <Report
                        data={this.state}
                        AnalysisPunchouts={this.props.AnalysisPunchouts()}
                    />
                </Grid>:''}
            </Grid>
        </Paper>
            {this.state.helperEl ?
                <Popper
                    placement="right"
                    disablePortal={false}
                    open={true} anchorEl={this.state.helperEl.el}
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
                        {this.state.helperEl.content.src ?
                            <img
                                src={this.state.helperEl.content.src}
                                style={{maxWidth: 600, height: 'auto'}}
                            /> :
                            this.state.helperEl.content.text
                        }
                    </Card>
                </Popper> : ''
            }
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={this.state.openAnalytics}
                onClose={()=>this.setState({openAnalytics:false})}>
                <DialogTitle id="responsive-dialog-title" onClose={()=>this.setState({openAnalytics:false})}>Analysis</DialogTitle>
                <DialogContent>
                {this.state.finished ? <Graph
                    AnalysisPunchouts={this.props.AnalysisPunchouts}
                    init={this.state.activeStep === this.state.stepsLength}
                    parameter={{...this.state}}/> : ''}
                </DialogContent>
            </Dialog>
        </Container>);
    }
}

export default withStyles(styles)(CRCP);
