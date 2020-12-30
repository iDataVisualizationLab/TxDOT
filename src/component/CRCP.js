import React,{ Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Slider,Typography,Button,Paper,Grid,Stepper,Step,StepLabel,StepContent,TextField,Container,Input} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Graph from './Graph'
import HomeIcon from '@material-ui/icons/Home';


const counties = ["montgomery", "waller", "dallas", "bowie", "cass", "tarrant", "orange", "el paso", "hudspeth", "wheeler", "cooke", "wichita", "montague", "oldham", "hopkins", "gonzales", "hale", "lubbock", "hill", "mclennan", "gray-carson", "randall", "harrison", "panola", "travis", "chambers", "jefferson", "liberty", "hardin", "newton", "hardin,jefferson", "brazos", "freestone", "walker", "denton", "ellis", "navarro", "rockwall", "kaufman", "collin", "dallas,navarro", "dallas,tarrant", "dallas,rockwall", "collin,grayson", "erath", "tarrant,johnson", "harris", "galveston", "brazoria", "fort bend", "shelby", "houston", "angelina", "webb", "grayson", "lamar", "bexar", "bandera", "tom green", "edwards", "henderson", "gregg", "smith", "van zandt", "rusk", "bell", "wilbarger", "clay", "fayette"];
const districts= ["Houston", "Dallas", "Atlanta", "Ft Worth", "Beaumont", "El Paso", "Childress", "Wichita Falls", "Amarillo", "Paris", "Yoakum", "Lubbock", "Waco", "Abilene", "Austin", "Bryan", "Ft. Worth", "Laredo", "Lufkin", "Odessa", "San Antonio", "San Angelo", "Tayler", "Tyler", "Waco "];
const highway = ["IH 45","US 290","IH 30","US 59","IH 35W","IH 820","IH 10","IH 40","IH 35","US 287","US 81","IH 27","SL 289","SH 226","SH 36","US 83B","VA","FM 3129","IH 20","US 71","US 79","US 47","US 67","BU90-Y","CS","FM 1960","FM 364","FM 365","SH 347","SH 105","SH 12","SH 124","SH 146","SH 326","SH 61","SH 73","SH 87","SS 380","US 90","US 69","US 96","BS6-R","SH 21","BW 8","US 83","BS 121H","FM 1171","FM 1382","FM 2499","FM 709","FM 740","IH 35E","IH4 5","IH 635","LP 12","LP 354","MH","SH 289","SH 31","SH 66","SH 78","SH 114","SH 121","SH 161","SH 180","SH 183","SH 310","SH 34","SH 342","SH 356","SL 12","SL 288","SP 244","SP 348","SP 366","SPUR 354","US 175","US 380","US 75","US 77","US 377","US 80","US 54","BU 287P","FM 157","IH 820 ","SH 199","SH 26","SH 360","FM 1764","FM 523","FM 1092","FM 1488","FM 518","IH 610","SH 288","SH 332","SH 225","SH 242","SH 249","SH 35","US 90A","IH27","SH 7","FM 1472","LP 20","ODA 181-1","ODA 181-2","ODA 250-1","ODA 250-2","US 82","SH 6","FM 85","LP 281","LP 323","SH 19","SH 198","SH 334","US 259","US 281","FM 1695","FM 3476","FM 933","IH 36","LP 363","SH 195","US 84","BU 287J","IH 44","SH 240","SP 1027 ","US 287 ","US 55","US 70","SH 71"];
const baseType = ["ATB","CTB","HMA"];
const soilClassSub = ["GW or GP","SW","SP","GM","SM","GC","SC","ML or OL","MH","CL","CL or OL","CH or OH"];

const styles = theme=> ({
    root: {
        width:'100%',
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
    dot:{
        borderBottom:'3px dotted',
        marginBottom:'4px'
    }
});
class CRCP extends Component{
    constructor(props) {
        super(props);
        this.state={
            activeStep:0,
            stepsLength:3,
            finished: false,
            C18:30,
            C19:10,
            C24:2,
            C25:100,
            F7:14,
            F8:570,
            F16:6,
            F17:400,
            F19:539
        }
    }
    handleNext = () => {
        this.setState({activeStep:this.state.activeStep+1});
    };

    handleBack = () => {
        this.setState({activeStep:this.state.activeStep-1});
    };

    handleReset = () => {
        this.setState({activeStep:0});
    };

    handleBlurSliderInput = (key,min,max)=>{
        const value = this.state[key];
        const obj={};
        if (value < min) {
            obj[key]=min;
            this.setState(obj);
        } else if (value > max) {
            obj[key]=max;
            this.setState(obj);
        }
    }
    handleChangeSliderInput = (event,key)=>{
        const obj={};
        obj[key]=event.target.value === '' ? '' : Number(event.target.value);
        this.setState(obj);
    }
    render() {
        const { classes } = this.props;
        const getGroupControl=()=>{
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
        if ((this.state.activeStep === this.state.stepsLength)&& !this.state.finished)
            this.setState({finished:true})
        return (   <Container maxWidth="lg"> <Paper elevation={3}>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Step 1</StepLabel>
                    <StepContent>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={6} spacing={1} justify="center">
                                    <Grid item xs={6} justify="flex-start">
                                        <TextField
                                            margin="dense"
                                            id="deisgnNo"
                                            label="Design No"
                                            defaultValue=""
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            margin="dense"
                                            id="district"
                                            options={districts}
                                            size="small"
                                            style={{marginTop:8,marginBottom:4}}
                                            renderInput={(params) => <TextField dense {...params} label="DISTRICT" variant="filled" />}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            margin="dense"
                                            id="highway"
                                            options={highway}
                                            size="small"
                                            freeSolo
                                            style={{marginTop:8,marginBottom:4}}
                                            renderInput={(params) => <TextField dense {...params} label="HIGHWAY" variant="filled" />}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            margin="dense"
                                            id="county"
                                            options={counties}
                                            size="small"
                                            style={{marginTop:8,marginBottom:4}}
                                            renderInput={(params) => <TextField dense {...params} label="COUNTY" variant="filled" />}/>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField
                                            margin="dense"
                                            id="date"
                                            type="date"
                                            label="DATE"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            margin="dense"
                                            id="control"
                                            label="CONTROL"
                                            defaultValue=""
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
    margin="dense"
    id="section"
                                            label="SECTION"
                                            defaultValue=""
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
    margin="dense"
    id="job"
                                            label="JOB"
                                            defaultValue=""
                                            variant="filled"/>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1}>
                                <TextField
                                    id="comment"
                                    label="COMMENTS"
                                    multiline
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
                    <StepContent>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Basic design information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Design life (years)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                value={this.state.C18}
                                                onChange={(event, newValue) => this.setState({C18:newValue})}
                                                defaultValue={30}
                                                min={1} max={100}
                                                id="C18"
                                                valueLabelDisplay="off"
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Input
                                                value={this.state.C18}
                                                onChange={(event) => this.handleChangeSliderInput(event,'C18')}
                                                onBlur={()=>this.handleBlurSliderInput('C18',1,100)}
                                                id="C18"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min:1,
                                                    max:100,
                                                    type: 'number',
                                                }}
                                            />
                                        </Grid>
                                        {/*<Grid item xs={8} justify="flex-start">*/}
                                        {/*    <Grid container xs={12} justify="flex-start">*/}
                                        {/*        <span>Number of punchouts per Mile</span>*/}
                                        {/*        <span className={classes.dot} style={{flexGrow:1}}/>*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                        {/*<Grid item xs={4}>*/}
                                        {/*    <Slider*/}
                                        {/*        value={this.state.C19}*/}
                                        {/*        onChange={(event, newValue) => this.setState({C19:newValue})}*/}
                                        {/*        id="C19"*/}
                                        {/*        defaultValue={10}*/}
                                        {/*        min={1} max={100}*/}
                                        {/*        valueLabelDisplay="off"*/}
                                        {/*    />*/}
                                        {/*</Grid>*/}
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total number of lanes in one direction</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                value={this.state.C24}
                                                onChange={(event, newValue) => this.setState({C24:newValue})}
                                                defaultValue={2}
                                                min={1} max={10}
                                                id="C24"
                                                valueLabelDisplay="off"
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Input
                                                value={this.state.C24}
                                                onChange={(event) => this.handleChangeSliderInput(event,'C24')}
                                                onBlur={()=>this.handleBlurSliderInput('C24',1,10)}
                                                id="C24"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min:1,
                                                    max:10,
                                                    type: 'number',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total design traffic in one direction (million ESAL)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                value={this.state.C25}
                                                onChange={(event, newValue) => this.setState({C25:newValue})}
                                                defaultValue={100}
                                                min={10} max={1000}
                                                id="C25"
                                                valueLabelDisplay="off"
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Input
                                                value={this.state.C25}
                                                onChange={(event) => this.handleChangeSliderInput(event,'C25')}
                                                onBlur={()=>this.handleBlurSliderInput('C25',10,1000)}
                                                id="C25"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min:10,
                                                    max:1000,
                                                    type: 'number',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Structural design criteria</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Acceptable number of punchouts per mile</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Concrete Layer/Material information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Thickness of Concrete Layer (in.)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                value={this.state.F7}
                                                onChange={(event, newValue) => this.setState({F7:newValue})}
                                                defaultValue={14}
                                                min={2} max={16}
                                                id="F7"
                                                valueLabelDisplay="off"
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Input
                                                value={this.state.F7}
                                                onChange={(event) => this.handleChangeSliderInput(event,'F7')}
                                                onBlur={()=>this.handleBlurSliderInput('F7',2,16)}
                                                id="F7"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min:2,
                                                    max:16,
                                                    type: 'number',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>28-Day Modulus of Rupture (psi)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                value={this.state.F8}
                                                onChange={(event, newValue) => this.setState({F8:newValue})}
                                                id="F8"
                                                defaultValue={570}
                                                min={1} max={1000}
                                                valueLabelDisplay="off"
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Input
                                                value={this.state.F8}
                                                onChange={(event) => this.handleChangeSliderInput(event,'F8')}
                                                onBlur={()=>this.handleBlurSliderInput('F8',1,1000)}
                                                id="F8"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min:1,
                                                    max:1000,
                                                    type: 'number',
                                                }}
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
                    <StepContent>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Base layer information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Base type</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Autocomplete
                                                margin="dense"
                                                id="baseType"
                                                options={baseType}
                                                size="small"
                                                renderInput={(params) => <TextField dense {...params} label="" />}/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Base layer thickness (inches)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                value={this.state.F16}
                                                onChange={(event, newValue) => this.setState({F16:newValue})}
                                                defaultValue={6}
                                                min={1} max={12}
                                                valueLabelDisplay="off"
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Input
                                                value={this.state.F16}
                                                onChange={(event) => this.handleChangeSliderInput(event,'F16')}
                                                onBlur={()=>this.handleBlurSliderInput('F16',1,12)}
                                                id="F16"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min:1,
                                                    max:12,
                                                    type: 'number',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Modulus of base layer (ksi)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input type="number" id="17" value={this.state.F17} onChange={(event, newValue) => this.setState({F17:newValue})}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Subgrade layer information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        {/*<Grid item xs={8} justify="flex-start">*/}
                                        {/*    <Grid container xs={12} justify="flex-start">*/}
                                        {/*        <span>Soil classification system</span>*/}
                                        {/*        <span className={classes.dot} style={{flexGrow:1}}/>*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                        {/*<Grid item xs={4}>*/}
                                        {/*    <input/>*/}
                                        {/*</Grid>*/}
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Soil classification of subgrade</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Autocomplete
                                                margin="dense"
                                                id="soilSub"
                                                options={soilClassSub}
                                                size="small"
                                                renderInput={(params) => <TextField dense {...params} label="" />}/>
                                        </Grid>
                                        {/*<Grid item xs={8} justify="flex-start">*/}
                                        {/*    <Grid container xs={12} justify="flex-start">*/}
                                        {/*        <span>Composite K (psi/in.)</span>*/}
                                        {/*        <span className={classes.dot} style={{flexGrow:1}}/>*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                        {/*<Grid item xs={4}>*/}
                                        {/*    <input type="number" id="19" value={this.state.F19} onChange={(event, newValue) => this.setState({F19:newValue})}/>*/}
                                        {/*</Grid>*/}
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
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                </>
            )}
            {this.state.finished ?  <Graph
                init = {this.state.activeStep === this.state.stepsLength}
                parameter={{C18:this.state.C18, C19:this.state.C19, C24:this.state.C24,
                C25:this.state.C25, F7:this.state.F7,F8:this.state.F8,F16:this.state.F16,F17:this.state.F17,F19:this.state.F19}}/>:''}
        </Paper></Container>);
    }
}
export default withStyles(styles) (CRCP);
