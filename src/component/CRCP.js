import React,{ Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Slider,Typography,Button,Paper,Grid,Stepper,Step,StepLabel,StepContent,TextField,Container} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Graph from './Graph'
import HomeIcon from '@material-ui/icons/Home';


const districts = ["montgomery", "waller", "dallas", "bowie", "cass", "tarrant", "orange", "el paso", "hudspeth", "wheeler", "cooke", "wichita", "montague", "oldham", "hopkins", "gonzales", "hale", "lubbock", "hill", "mclennan", "gray-carson", "randall", "harrison", "panola", "travis", "chambers", "jefferson", "liberty", "hardin", "newton", "hardin,jefferson", "brazos", "freestone", "walker", "denton", "ellis", "navarro", "rockwall", "kaufman", "collin", "dallas,navarro", "dallas,tarrant", "dallas,rockwall", "collin,grayson", "erath", "tarrant,johnson", "harris", "galveston", "brazoria", "fort bend", "shelby", "houston", "angelina", "webb", "grayson", "lamar", "bexar", "bandera", "tom green", "edwards", "henderson", "gregg", "smith", "van zandt", "rusk", "bell", "wilbarger", "clay", "fayette"];
const counties= ["Houston", "Dallas", "Atlanta", "Ft Worth", "Beaumont", "El Paso", "Childress", "Wichita Falls", "Amarillo", "Paris", "Yoakum", "Lubbock", "Waco", "Abilene", "Austin", "Bryan", "Ft. Worth", "Laredo", "Lufkin", "Odessa", "San Antonio", "San Angelo", "Tayler", "Tyler", "Waco "];


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
                                        <TextField
    margin="dense"
    id="highway"
                                            label="HIGHWAY"
                                            defaultValue=""
                                            variant="filled"/>
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
    id="control"
                                            label="CONTROL"
                                            defaultValue=""
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
    margin="dense"
    id="date"
                                            label="DATE"
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
                                        <Grid item xs={4}>
                                            <Slider
                                                value={this.state.C18}
                                                onChange={(event, newValue) => this.setState({C18:newValue})}
                                                defaultValue={30}
                                                min={1} max={100}
                                                id="C18"
                                                valueLabelDisplay="auto"
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Number of punchouts per Mile</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Slider
                                                value={this.state.C19}
                                                onChange={(event, newValue) => this.setState({C19:newValue})}
                                                id="C19"
                                                defaultValue={10}
                                                min={1} max={100}
                                                valueLabelDisplay="auto"
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total number of lanes in one direction</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Slider
                                                value={this.state.C24}
                                                onChange={(event, newValue) => this.setState({C24:newValue})}
                                                defaultValue={2}
                                                min={1} max={10}
                                                id="C24"
                                                valueLabelDisplay="auto"
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total design traffic in one direction (million ESAL)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Slider
                                                value={this.state.C25}
                                                onChange={(event, newValue) => this.setState({C25:newValue})}
                                                defaultValue={100}
                                                min={10} max={1000}
                                                id="C25"
                                                valueLabelDisplay="auto"
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
                                        <Typography variant={'h6'}>Concrete material information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Thickness of Concrete Layer (in.)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Slider
                                                value={this.state.F7}
                                                onChange={(event, newValue) => this.setState({F7:newValue})}
                                                defaultValue={14}
                                                min={2} max={16}
                                                id="F7"
                                                valueLabelDisplay="auto"
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Number of punchouts per Mile</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Slider
                                                value={this.state.F8}
                                                onChange={(event, newValue) => this.setState({F8:newValue})}
                                                id="F8"
                                                defaultValue={570}
                                                min={1} max={1000}
                                                valueLabelDisplay="auto"
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
                                            <input/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Base layer thickness (inches)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Modulus of base layer (ksi)</span>
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
                                        <Typography variant={'h6'}>Subgrade layer information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} spacing={1} justify="center">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Soil classification system</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Soil classification of subgrade</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input type="number" id="16" value={this.state.F16} onChange={(event, newValue) => this.setState({F16:newValue})}/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Modulus of Base Layer (ksi)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input type="number" id="17" value={this.state.F17} onChange={(event, newValue) => this.setState({F17:newValue})}/>
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Composite K (psi/in.)</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <input type="number" id="19" value={this.state.F19} onChange={(event, newValue) => this.setState({F19:newValue})}/>
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
