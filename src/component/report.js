import React, {Component} from "react";
import {Button} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PrintIcon from "@material-ui/icons/Print";
import logo from "../image/logo.png";
import footer from "../image/footer.png";

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        color:'#141E36',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    underline: {
        borderBottom: '1px solid black'
    },
    subHeader: {
        paddingTop: theme.spacing(2),
        fontWeight: 'bold'
    },
    header:{
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    layerHolder:{
        display: 'flex',
        position:'relative',
        '& svg':{
          position: 'absolute',
          top:0,
          left:0,
          width:'100%',
          height:'100%'
        },
        '& div, & h5, & h6':{
          zIndex:1
        },
        '& .MuiGrid-item:first-child':{
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
            NaturalSoil: 5,
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
                <Grid container item xs={12} justify={"start"} spacing={1} className={["section-to-print","root-print", classes.root]}>
                    {/*<Grid item xs={12} container>*/}
                    {/*    <Grid item xs={12}><img src={footer} style={{width:'100%',height:15,transform:'scale(-1)'}}/></Grid>*/}
                    {/*    <Grid item><img src={logo} style={{width:60}}/></Grid>*/}
                    {/*    <Grid item xs><h3>TxCRCP-ME Analysis</h3></Grid>*/}
                    {/*    /!*<Grid item xs={12}><img src={footer} style={{width:'100%',height:20}}/></Grid>*!/*/}
                    {/*</Grid>*/}
                    <Grid item xs={6} container justify="flex-start"
                          alignItems="flex-start"
                    >
                        <Grid item xs={12} className={classes.layerHolder}>
                            <Typography variant={'h6'} className={classes.header}>INPUT DATA</Typography>
                            <svg><rect width={'100%'} height={'100%'} fill={'#F2F2F2'}/></svg>
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
                            {[this.props.data.Control??'',this.props.data.Section??'',this.props.data.Job??''].join('-')}
                        </Grid>
                        <Grid item xs={8}>
                            Project Scope
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.ProjectScope}
                        </Grid>
                        <Grid item xs={12}>
                            Project Limits
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11} container>
                                <Grid item xs={8}>
                                    From
                                </Grid>
                                <Grid item xs={4}>
                                    {this.props.data.From}
                                </Grid>
                                <Grid item xs={8}>
                                    To
                                </Grid>
                                <Grid item xs={4}>
                                    {this.props.data.To}
                                </Grid>
                                <Grid item xs={8}>
                                    Sta. (Begin)
                                </Grid>
                                <Grid item xs={4}>
                                    {this.props.data.StationBegin}
                                </Grid>
                                <Grid item xs={8}>
                                    Sta. (End)
                                </Grid>
                                <Grid item xs={4}>
                                    {this.props.data.StationEnd}
                                </Grid>
                                <Grid item xs={8}>
                                    RM. (Begin)
                                </Grid>
                                <Grid item xs={4}>
                                    {this.props.data.RMBegin}
                                </Grid>
                                <Grid item xs={8}>
                                    RM. (End)
                                </Grid>
                                <Grid item xs={4}>
                                    {this.props.data.RMEnd}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            Date
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.Date}
                        </Grid>
                        <Grid item xs={12}>
                            Comments
                        </Grid>
                        <Grid item xs={12} style={{minHeight:30}}>
                            {this.props.data.Comment}
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
                            Total Design Traffic in One Direction <div style={{display:'inline-block'}}>(million ESALs)</div>
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.TrafficOneDirection}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={classes.subHeader}> C. Subgrade and Treatment Information</Typography>
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
                            Subgrade Type
                        </Grid>
                        <Grid item xs={4}>
                            {this.props.data.SubbaseType}
                        </Grid>
                        <Grid item xs={8}>
                            Subgrade Thickness (in.)
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
                        {/*<Grid item xs={8}>*/}
                        {/*    Composite K (psi/in.)*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={4}>*/}
                        {/*    {this.props.data.CompositeK}*/}
                        {/*</Grid>*/}

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
                          style={{position:'relative'}}
                          direction="row"
                          alignContent="flex-start"
                    >
                        <Grid item xs={12} className={classes.layerHolder}>
                            <Typography variant={'h6'} className={classes.header}>ANALYSIS RESULT</Typography>
                            <svg><rect width={'100%'} height={'100%'} fill={'#F2F2F2'}/></svg>
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
                        <Grid item xs={12} className={"layerDetail"} container justify="center" direction="column" style={{minHeight: 400, '-webkitPrintColorAdjust':'exact'}}>
                            <Grid className={classes.layerHolder} container alignContent={"center"}
                                  style={{flexGrow: this.state.CRCP, backgroundColor: '#F2F2F2'}}>
                                <Grid xs item>CRCP</Grid>
                                <Grid xs item>Thickness</Grid>
                                {/*<Grid xs item>{this.state.CRCP}''</Grid>*/}
                                <Grid xs item>{this.props.AnalysisSlabThickness}''</Grid>
                                <svg><rect width={'100%'} height={'100%'} fill={'#F2F2F2'}/></svg>
                            </Grid>
                           {this.props.data.BaseType==='CTB'?<Grid className={classes.layerHolder} container alignContent={"center"}
                                  style={{flexGrow: this.state.BondBreaker, backgroundColor: '#404040', color:'white'}}>
                                <Grid xs item>Bond Breaker</Grid>
                                <Grid xs item>Thickness</Grid>
                                <Grid xs item>≥{this.state.BondBreaker}''</Grid>
                               <svg><rect width={'100%'} height={'100%'} fill={'#404040'}/></svg>
                            </Grid>:''}
                            <Grid container alignContent={"center"} className={classes.layerHolder}
                                  style={{flexGrow: this.props.data.BaseThickness, backgroundColor: this.props.data.BaseType!=='CTB'?'#b5b5b5':'#D9D9D9'}}>
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
                                <svg><rect width={'100%'} height={'100%'} fill={this.props.data.BaseType!=='CTB'?'#b5b5b5':'#D9D9D9'}/></svg>
                            </Grid>
                            <Grid container alignContent={"center"} className={classes.layerHolder}
                                  style={{flexGrow: this.props.data.SubbaseThickness, backgroundColor: '#F2F2F2'}}>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item>Subgrade</Grid>
                                    <Grid xs item>Type</Grid>
                                    <Grid xs item>{this.props.data.SubbaseType}</Grid>
                                </Grid>
                                <Grid className={classes.layerHolder} container>
                                    <Grid xs item></Grid>
                                    <Grid xs item>Thickness</Grid>
                                    <Grid xs item>{this.props.data.SubbaseThickness}''</Grid>
                                </Grid>
                                <svg><rect width={'100%'} height={'100%'} fill={'#F2F2F2'}/></svg>
                            </Grid>
                            <Grid container alignContent={"center"} className={classes.layerHolder}
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
                                <svg><rect width={'100%'} height={'100%'} fill={'#FFC000'}/></svg>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                            <ul>
                                <li>The minimum thickness for CRCP is 7 in., and the maximum thickness is 13 in.</li>
                                <li>When the design slab thickness from this program is greater than 13-in, use 13-in slab. If a thickness greater than 13-in is desired, a request with justifications needs to be submitted to the District Engineer for approval.</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} container style={{bottom:0,position:'absolute'}}>
                            <Grid item xs={12}><img alt={"footer"} src={footer} style={{width:'100%',height:15,transform:'scale(-1)'}}/></Grid>
                            <Grid item><img alt={"logo"} src={logo} style={{width:60}}/></Grid>
                            <Grid item xs><h3>TxCRCP-ME Analysis</h3></Grid>
                            {/*<Grid item xs={12}><img src={footer} style={{width:'100%',height:20}}/></Grid>*/}
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>
    }
}

export default withStyles(styles)(Report)
