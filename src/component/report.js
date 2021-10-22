import React, {Component} from "react";
import {Button} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PrintIcon from "@material-ui/icons/Print";

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    underline: {
        borderBottom: '1px solid black'
    },
    subHeader: {
        paddingTop: theme.spacing(2)
    },
    header:{
        backgroundColor: theme.palette.secondary.light
    },
    layerHolder:{
        '& div:first-child':{
            paddingLeft: 10
        }
    }
});

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CRCP: 13,
            BondBreaker: 1,
            Base: 6,
            Subbase: 12,
            NaturalSoil: 6,
        }
    }

    render() {
        const {classes} = this.props;
        return <Paper>
            <Grid container alignItems={"start"} justify={"center"}>
                {this.props.toMenu ? <Grid item xs={12}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={this.props.toMenu}
                        className={classes.button}
                        startIcon={<HomeIcon/>}
                    >
                        To Main Menu
                    </Button>
                    <Button
                        onClick={this.props.toCRCP}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<PrintIcon/>}
                        onClick={() => window.print()}
                    >
                        Print
                    </Button>
                </Grid> : ''}
                <Grid container item xs={11} justify={"start"} spacing={1} className={["section-to-print", classes.root]}>

                    <Grid item xs={6} container justify="flex-start"
                          alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <Typography variant={'h5'} className={classes.header}>INPUT DATA</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}>A. Project
                                Identification</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            District
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.District}
                        </Grid>
                        <Grid item xs={8}>
                            County
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.County}
                        </Grid>
                        <Grid item xs={8}>
                            Highway
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.Highway}
                        </Grid>
                        <Grid item xs={8}>
                            CSJ
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.CSJ}
                        </Grid>
                        <Grid item xs={8}>
                            Project Scope
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.ProjectScope}
                        </Grid>
                        <Grid item xs={8}>
                            Station (Begin)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.StationBegin}
                        </Grid>
                        <Grid item xs={8}>
                            Station (End)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.StationEnd}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}> B. Design Parameters &
                                Traffic</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            Design Life (year)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.DesignLife}
                        </Grid>
                        <Grid item xs={8}>
                            Number of Punchouts per Mile
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.PunchoutsPerMile}
                        </Grid>
                        <Grid item xs={8}>
                            Total Number of Lanes in One Direction
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.LanesOneDirection}
                        </Grid>
                        <Grid item xs={8}>
                            Total Design Traffic in One Direction (million ESALs)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.TrafficOneDirection}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}> C. Subgrade and Treatment Information & subtitles</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            Soil Classification System
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.SoilClassificationSystem}
                        </Grid>
                        <Grid item xs={8}>
                            Soil Classification of Subgrade
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.SoilSub}
                        </Grid>
                        <Grid item xs={8}>
                            Plasticity Index (PI)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.PlasticityIndex}
                        </Grid>
                        <Grid item xs={8}>
                            Subbase Type
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.SubbaseType}
                        </Grid>
                        <Grid item xs={8}>
                            Subbase Thickness (in.)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.SubbaseThickness}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}>D. Base Layer
                                Information</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            Base Type
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.BaseType}
                        </Grid>
                        <Grid item xs={8}>
                            Base Thickness (in.)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.BaseThickness}
                        </Grid>
                        <Grid item xs={8}>
                            Modulus of Base Layer (ksi)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.ModulusBase}
                        </Grid>
                        <Grid item xs={8}>
                            Composite K (psi/in.)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.CompositeK}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}> E. Concrete Material
                                Properties</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            28-Day Modulus of Rupture (psi)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.ModulusOfRupture}
                        </Grid>
                        <Grid item xs={8}>
                            Elastic Modulus (million psi)
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.ElasticModulue}
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container justify="flex-start"
                          direction="row"
                          alignContent="flex-start"
                    >
                        <Grid item xs={12}>
                            <Typography variant={'h5'} className={classes.header}>ANALYSIS RESULT</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}> F. Design Slab Thickness & Performance</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.underline}>
                            Design Slab Thickness
                        </Grid>
                        <Grid item xs={4} className={classes.underline} style={{color:(this.props.AnalysisSlabThickness>13)?'red':null}}>
                            {this.props.AnalysisSlabThickness}
                        </Grid>
                        <Grid item xs={8} className={classes.underline}>
                            Number of Punchouts per Mile
                        </Grid>
                        <Grid item xs={4} className={classes.underline} style={{color:(this.props.AnalysisPunchouts>this.props.data.PunchoutsPerMile)?'red':null}}>
                            {this.props.AnalysisPunchouts ? this.props.AnalysisPunchouts.toFixed(2) : ''}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}> G. Layer Information</Typography>
                        </Grid>
                        <Grid item xs={12} container justify="center" direction="column" style={{minHeight: 500}}>
                            <Grid className={classes.layerHolder} container alignContent={"center"}
                                  style={{flexGrow: this.state.CRCP, backgroundColor: '#F2F2F2'}}>
                                <Grid xs item>CRCP</Grid>
                                <Grid xs item>Thickness</Grid>
                                {/*<Grid xs item>{this.state.CRCP}''</Grid>*/}
                                <Grid xs item>{this.props.AnalysisSlabThickness}''</Grid>
                            </Grid>
                           {this.props.data.BaseType==='CTB'?<Grid className={classes.layerHolder} container alignContent={"center"}
                                  style={{flexGrow: this.state.BondBreaker, backgroundColor: '#404040', color:'white'}}>
                                <Grid xs item>Bond Breaker</Grid>
                                <Grid xs item>Thickness</Grid>
                                <Grid xs item>≥{this.state.BondBreaker}''</Grid>
                            </Grid>:''}
                            <Grid container alignContent={"center"}
                                  style={{flexGrow: this.props.data.BaseThickness, backgroundColor: '#D9D9D9'}}>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item>Base</Grid>
                                    <Grid xs item>Type</Grid>
                                    <Grid xs item>{this.props.data.BaseType}</Grid>
                                </Grid>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item></Grid>
                                    <Grid xs item>Thickness</Grid>
                                    <Grid xs item>{this.props.data.BaseThickness}''</Grid>
                                </Grid>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item></Grid>
                                    <Grid xs item>Item 276</Grid>
                                    <Grid xs item>Class L</Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignContent={"center"}
                                  style={{flexGrow: this.props.data.SubbaseThickness, backgroundColor: '#F2F2F2'}}>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item>Subbase</Grid>
                                    <Grid xs item>Type</Grid>
                                    <Grid xs item>{this.props.data.SubbaseType}</Grid>
                                </Grid>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item></Grid>
                                    <Grid xs item>Thickness</Grid>
                                    <Grid xs item>{this.props.data.SubbaseThickness}''</Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignContent={"center"}
                                  style={{flexGrow: this.state.NaturalSoil, backgroundColor: '#FFC000'}}>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item>Natural Soil</Grid>
                                    <Grid xs item>Type</Grid>
                                    <Grid xs item>{this.props.data.SoilSub}</Grid>
                                </Grid>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item></Grid>
                                    <Grid xs item>PI</Grid>
                                    <Grid xs item>{this.props.data.PlasticityIndex}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                            <ul>
                                <li>"The minimum thickness for CRCP is 7 in., and the maximum thickness is 13 in.</li>
                                <li>Use 13 in. for slab thicknesses greater than 13 in.</li>
                                 <li>Districts should use 13-in. slab as a design slab thickness. Districts wanting to use thicker pavements should submit design greater than 13-in. to the district engineer for approval along with their justification for doing so.</li>
                            </ul>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>
    }
}

export default withStyles(styles)(Report)
