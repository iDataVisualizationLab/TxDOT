import React, { Component } from "react";
import { withStyles, darken } from "@material-ui/core/styles";
import {
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
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Tooltip
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Graph from "./Graph";
import HomeIcon from "@material-ui/icons/Home";
import PrintIcon from "@material-ui/icons/Print";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SaveIcon from "@material-ui/icons/Save";
import PublishIcon from "@material-ui/icons/Publish";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import TrafficOneDirectionPic from "../././image/TotalDesign Traffic_pic.png";
import subbasePic from "../././image/subbase.svg";
import BasetypePic from "../././image/BasetypePic.svg";
import footerPic from "../././image/Footer_EXBD_prnt.png";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import Report from "./report";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { utils as XLSXutils, read as XLSXread } from "xlsx";
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import excelFile from "./data/txcrcp-me-v07b.xlsm";
// import excelOutputFile from "./data/01062021 TxCRCP-ME Analysis Result Sheet.xlsx"
import excelOutputFile from "./data/01062021_TxCRCP-ME_Analysis_Result.js";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider/Divider";
import County from "./County";
import District from "./District";
import Backdrop from "@material-ui/core/Backdrop";
import { districts, districtCode, counties } from "./ulti";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditableTable from "./EditableTable";

const highway = ["IH 45", "US 290", "IH 30", "US 59", "IH 35W", "IH 820", "IH 10", "IH 40", "IH 35", "US 287", "US 81", "IH 27", "SL 289", "SH 226", "SH 36", "US 83B", "VA", "FM 3129", "IH 20", "US 71", "US 79", "US 47", "US 67", "BU90-Y", "CS", "FM 1960", "FM 364", "FM 365", "SH 347", "SH 105", "SH 12", "SH 124", "SH 146", "SH 326", "SH 61", "SH 73", "SH 87", "SS 380", "US 90", "US 69", "US 96", "BS6-R", "SH 21", "BW 8", "US 83", "BS 121H", "FM 1171", "FM 1382", "FM 2499", "FM 709", "FM 740", "IH 35E", "IH4 5", "IH 635", "LP 12", "LP 354", "MH", "SH 289", "SH 31", "SH 66", "SH 78", "SH 114", "SH 121", "SH 161", "SH 180", "SH 183", "SH 310", "SH 34", "SH 342", "SH 356", "SL 12", "SL 288", "SP 244", "SP 348", "SP 366", "SPUR 354", "US 175", "US 380", "US 75", "US 77", "US 377", "US 80", "US 54", "BU 287P", "FM 157", "IH 820 ", "SH 199", "SH 26", "SH 360", "FM 1764", "FM 523", "FM 1092", "FM 1488", "FM 518", "IH 610", "SH 288", "SH 332", "SH 225", "SH 242", "SH 249", "SH 35", "US 90A", "IH27", "SH 7", "FM 1472", "LP 20", "ODA 181-1", "ODA 181-2", "ODA 250-1", "ODA 250-2", "US 82", "SH 6", "FM 85", "LP 281", "LP 323", "SH 19", "SH 198", "SH 334", "US 259", "US 281", "FM 1695", "FM 3476", "FM 933", "IH 36", "LP 363", "SH 195", "US 84", "BU 287J", "IH 44", "SH 240", "SP 1027 ", "US 287 ", "US 55", "US 70", "SH 71"];
// const baseType = ["CTB", "HMA Base"];
const soilClassSub = ["GW", "GP", "GM", "GC", "SW", "SP", "SM", "SC", "ML", "CL", "OL", "MH", "CH", "OH", "Pt"];

const styles = theme => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      width: "100%"
    },
    "& input": {
      width: "100%"
    },
    "& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button": {
      opacity: 1
    }
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(8)
  },
  dot: {
    borderBottom: "2px dotted",
    marginBottom: "4px"
  },
  helpHolder: {
    padding: theme.spacing(1)
  },
  inputWithHelper: {
    "& label": {
      pointerEvents: "all"
    }
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 2
  },
  capitalize: {
    textTransform: "capitalize"
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {children}
        {onClose ? (
            <IconButton aria-label="close" size="small" className={classes.closeButton} onClick={onClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
        ) : null}
      </MuiDialogTitle>
  );
});
const init = {
  activeStep: 0,
  stepsLength: 3,
  finished: false,
  DesignLife: null,//30,
  PunchoutsPerMile: 10,
  LanesOneDirection: null,//2,
  TrafficOneDirection: null,//100,
  ModulusOfRupture: 570,
  ElasticModulue: 5,
  SoilClassificationSystem: "USCS",
  SoilSub: null,//"CH",
  PlasticityIndex: null,//8,
  SubbaseType: null,//"LTS",
  SubbaseThickness: null,//12,
  BaseType: null,
  BaseThickness: null,//6,
  BaseThicknessMin: 2,
  BaseThicknessMax: 6,
  ModulusBase: null,//400,
  CompositeK: null,//539,
  District: null,
  County: null,
  Highway: "",
  ProjectScope: "",
  Control: "",
  Section: "",
  Job: "",
  Date: null,
  Comment: "",
  From: "",
  To: "",
  StationBegin: "",
  StationEnd: "",
  RMBegin: "",
  RMEnd: "",
  currentDistricts: Object.keys(districts),
  currentCounties: Object.keys(counties),
  SubbaseThicknessThreshHold: -1,
  SubbaseTypeOpt: ["Cement treated subgrade", "Lime treated subgrade", "Lime-cement treated subgrade", "Lime-fly ash treated subgrade", "Fly ash treated subgrade", "Select Fill", "No treatment"],
  baseTypeOpt: ["CTB", "HMA", "ASB"],
  ksTableMap: new Map(),
  ksTable: [],
  ssTable: [],
  temperature: []
};

const Total_design_trafic = <>
  <h5>* Contact TPP Division for traffic data request</h5>
  <p style={{ maxWidth: 500, fontSize: "0.8rem" }}>: Transportation Planning and Programming Division
    Traffic Analysis for Highway Design</p>

  <h5>Design Traffic</h5>

  <p style={{ maxWidth: 500, fontSize: "0.8rem" }}>The traffic projections for a highway project (in terms of ADT and
    one-way total 18-kip ESALs) are obtained from the traffic analysis report provided by the Transportation Planning
    and Programming Division (TPP). This report is requested during the design phase of a project and, upon receipt,
    should be evaluated for reasonableness.
    Local conditions may cause the directional distribution of heavy vehicles to be unequal. An example is a location
    near a major quarry adjacent to a highway with otherwise modest levels of truck traffic. If the designer is aware of
    local conditions that may result in unequal distributions of heavy trucks, TPP should be informed of this condition
    when requesting traffic projections, and the reported 18-kip ESALS for pavement design should be adjusted.</p>
  <TransformWrapper
      defaultPositionX={1}
      defaultPositionY={1}
  >
    <TransformComponent>
      <img
          src={TrafficOneDirectionPic}
          style={{ maxWidth: 500, height: "auto" }}
      /></TransformComponent></TransformWrapper>
</>;
const Acceptable_punchout_Popup = <>
  <h5>Number of Punchouts per Mile</h5>
  <p style={{ maxWidth: 500 }}>Provide a number of punchouts per mile that is considered the terminal condition of CRCP
    you are designing. Traditionally, 10 per mile has been the number used for CRCP design. For a higher class of
    highway where the number of punchouts may be minimized, contact MNT – Pavement Analysis & Design Branch.</p>
</>;

const _28_Day_Modulus_of_Rupture = <>
  <h5>28-Day Modulus of Rupture</h5>
  <p style={{ maxWidth: 500 }}>The Modulus of Rupture (Mr) of concrete is a measure of the flexural strength of the
    concrete as determined by breaking concrete beam test specimens. Use a 28-day Mr of 570 psi. If the engineer selects
    an alternate value for Mr, it must be documented with an explanation. Also, if a higher Mr is used, it should be
    required in the plan to use a higher concrete strength than what is required in Item 360.</p>
</>;

const Concrete_elastic_modulus = <>
  <h5>Concrete elastic modulus</h5>
  <p style={{ maxWidth: 500 }}>Elastic modulus of concrete is an indication of concrete stiffness. It varies depending
    on the coarse aggregate type used in the concrete. Although the value selected for pavement design could be
    different from the actual values, the elastic modulus does not have a significant effect on the computed slab
    thickness. A modulus of 5,000,000 psi should be used for pavement design. The use of a different value must be
    documented with an explanation.</p>
</>;
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const Soil_classification_system = <>
  <h5>Subgrade layer information</h5>
  <p style={{ maxWidth: 500 }}>Provide the soil classfication per AASHTO or Unified Classification System as
    follows.</p>
  <h5 style={{ textAlign: "center" }}>Classification of soil</h5>
  <Table size="small">
    <TableHead><TableRow><StyledTableCell>Description</StyledTableCell><StyledTableCell>AASHTO</StyledTableCell><StyledTableCell>Unified</StyledTableCell></TableRow></TableHead>
    <TableBody>
      <StyledTableRow><StyledTableCell>Gravel</StyledTableCell><StyledTableCell>A-1-a</StyledTableCell><StyledTableCell>GW
        or GP</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Coarse
        Sand</StyledTableCell><StyledTableCell>A-1-b</StyledTableCell><StyledTableCell>SW</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Fine
        Sand</StyledTableCell><StyledTableCell>A-3</StyledTableCell><StyledTableCell>SP</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Silty Gravel or Sand</StyledTableCell><StyledTableCell>A-2-4 or
        A-2-5</StyledTableCell><StyledTableCell>GM or SM</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Clayey Gravel or Clayey
        Sandy</StyledTableCell><StyledTableCell>A-2-6</StyledTableCell><StyledTableCell>GC or
        SC</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Silt or Silt/sand/gravel
        mixture</StyledTableCell><StyledTableCell>A-4</StyledTableCell><StyledTableCell>ML or
        OL</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Poorly Graded
        Silt</StyledTableCell><StyledTableCell>A-5</StyledTableCell><StyledTableCell>MH</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Plastic
        Clay</StyledTableCell><StyledTableCell>A-6</StyledTableCell><StyledTableCell>CL</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Moderately Plastic Elastic
        Clay</StyledTableCell><StyledTableCell>A-7-5</StyledTableCell><StyledTableCell>CL or
        OL</StyledTableCell></StyledTableRow>
      <StyledTableRow><StyledTableCell>Highly Plastic Elastic
        Clay</StyledTableCell><StyledTableCell>A-7-6</StyledTableCell><StyledTableCell>CH or
        OH</StyledTableCell></StyledTableRow>
    </TableBody>
  </Table>
</>;

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    maxWidth: 170,
    fontSize: theme.typography.pxToRem(16)
  }
}))(Tooltip);

const ColorButton = withStyles((theme) => ({
  root: {
    color: props => theme.palette.getContrastText(props.color),
    backgroundColor: props => props.color,
    border: "1px solid white",
    fontWeight: "bold",
    paddingTop: 2,
    paddingBottom: 2,
    lineHeight: 1.5,
    fontSize: "1rem",
    borderRadius: 0,
    textTransform: "unset",
    "&:hover": {
      backgroundColor: props => darken(props.color, 0.2)
    }
  }
}))(Button);

class CRCP extends Component {
  constructor(props) {
    super(props);
    this.state = { ...init };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevState.ModulusBase !== this.state.ModulusBase) || (prevState.SoilSub !== this.state.SoilSub) || (prevState.BaseThickness !== this.state.BaseThickness) || (prevState.ksTableMap !== this.state.ksTableMap)) {
      this.calculateCompositeK();
    }
    if (this.state.printRequest && this.state.isBackdropOpen) {
      window.print();
    }
  }

  componentDidMount() {
    this.initFunc();
  }

  initFunc() {
    fetch(excelFile).then(res => res.arrayBuffer()).then(ab => {
      const wb = XLSXread(ab, { type: "array" });
      // XLSX.writeFile(wb, 'out.xlsm');
      const temperatureSheet = wb.Sheets["Temperature"];
      init.temperature = XLSXutils.sheet_to_json(temperatureSheet);
      // remove unknown rows
      const temperatureField = Object.keys(init.temperature[0]);
      init.temperature = init.temperature.filter(d=>d[temperatureField[0]]&&d[temperatureField[1]]&&d[temperatureField[2]]);

      const sTableSheet = wb.Sheets["S-Table"];
      init.ssTable = XLSXutils.sheet_to_json(sTableSheet);

      const ksTableSheet = wb.Sheets["K-Table"];
      init.ksTable = XLSXutils.sheet_to_json(ksTableSheet);
      // remove unknown rows
      const ksField = Object.keys(init.ksTable[0]);
      init.ksTable = init.ksTable.filter(d=>d[ksField[0]]&&d[ksField[1]]&&d[ksField[2]]);

      init.ksTableMap = new Map();
      init.ksTable.forEach(r => {
        init.ksTableMap.set("" + r["Subgrade K-Value (psi/in.)"] + " " + r["Base Thickness (in.)"] + " " + r["Modulus of Base Layer (ksi)"], +r["Composite K (psi/in.)"]);
      });

      this.setState({ temperature: init.temperature, ssTable: init.ssTable, ksTable: init.ksTable, ksTableMap: init.ksTableMap });
    });
    // this.handlePlasticityIndex(this.state.PlasticityIndex);
    // this.calculateCompositeK();
  }

  onEditTable = ([ntemp,nk,ns]) => {
    init.temperature = ntemp.data;
    init.ssTable = ns.data;
    init.ksTable = nk.data;
    init.ksTableMap = new Map();
    init.ksTable.forEach(r => {
      init.ksTableMap.set("" + r["Subgrade K-Value (psi/in.)"] + " " + r["Base Thickness (in.)"] + " " + r["Modulus of Base Layer (ksi)"], +r["Composite K (psi/in.)"]);
    });
    this.setState({ temperature: init.temperature, ssTable: init.ssTable, ksTable: init.ksTable, ksTableMap: init.ksTableMap });
  }

  computeStress = (SlabThickness) => { // F7
    let input = {
      H: { Input: SlabThickness, "L Bound": 0, "U Bound": 0 },
      K: { Input: this.state.CompositeK, "L Bound": 0, "U Bound": 0 }
    };
    input.H["L Bound"] = (input.H.Input >= 15.5) ? 15.5 : ((input.H.Input < 6.5) ? 6 : Math.floor(input.H.Input * 2) / 2);
    input.H["U Bound"] = (input.H.Input >= 15.5) ? 16 : ((input.H.Input < 6.5) ? 6.5 : Math.ceil(input.H.Input * 2 + 1) / 2);
    const B3 = input.K.Input;
    input.K["L Bound"] = (B3 < 100 ? 50 : (B3 < 300 ? 100 : (B3 < 500 ? 300 : (B3 < 700 ? 500 : (B3 < 1000 ? 700 : (B3 < 1300 ? 1000 : (B3 >= 1300 ? 1300 : 0)))))));
    input.K["U Bound"] = (B3 < 100 ? 100 : (B3 < 300 ? 300 : (B3 < 500 ? 500 : (B3 < 700 ? 700 : (B3 < 1000 ? 1000 : (B3 < 1300 ? 1300 : (B3 >= 1300 ? 1600 : 0)))))));
    const mapd2 = {};
    let lastd2 = { index: 1, DT: 0, H: 0, K: 0, STR_T: 0, STR_E: 0 };
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
      mapd2[index] = { index, DT, H, K, STR_T, STR_E };
      lastd2 = { index, DT, H, K, STR_T, STR_E };
    });

    const data3 = [];
    for (let i = 1; i < 25; i++) {
      const index = Math.floor((i - 1) / 4) * 4 + 1;
      const DT = mapd2[index].DT;
      const H = mapd2[Math.floor((i - 1) / 2) * 2 + 1].H;
      // if (!mapd2[i])
      //   debugger
      const { K, STR_T, STR_E } = mapd2[i];
      data3.push({ DT, H, K, STR_T, STR_E });
    }
    const data4 = [];
    for (let i = 0; i < 12; i++) {
      const Q2 = data3[i * 2].STR_T;
      const Q3 = data3[i * 2 + 1].STR_T;
      const R2 = data3[i * 2].STR_E;
      const R3 = data3[i * 2 + 1].STR_E;
      const STR_T = ((Q3 - Q2) * input.K.Input + (Q2 * input.K["U Bound"] - Q3 * input.K["L Bound"])) / (input.K["U Bound"] - input.K["L Bound"]);
      const STR_E = ((R3 - R2) * input.K.Input + (R2 * input.K["U Bound"] - R3 * input.K["L Bound"])) / (input.K["U Bound"] - input.K["L Bound"]);
      data4.push({ STR_T, STR_E });
    }
    const data5 = [];
    for (let i = 0; i < 6; i++) {
      const W2 = data4[i * 2].STR_T;
      const W4 = data4[i * 2 + 1].STR_T;
      const X2 = data4[i * 2].STR_E;
      const X4 = data4[i * 2 + 1].STR_E;
      const STR_T = ((W4 - W2) * input.H.Input + (W2 * input.H["U Bound"] - W4 * input.H["L Bound"])) / (input.H["U Bound"] - input.H["L Bound"]);
      const STR_E = ((X4 - X2) * input.H.Input + (X2 * input.H["U Bound"] - X4 * input.H["L Bound"])) / (input.H["U Bound"] - input.H["L Bound"]);
      data5.push({ STR_T, STR_E });
    }
    const districtemp = this.state.temperature.filter(d => d.District === districtCode[this.state.District]);
    const stress = districtemp.map((t, ti) => {
      const AveragetTemperature = +t["Average Temperature (F)"];
      const DT = 120 - AveragetTemperature;
      const H = input.H.Input;
      const K = input.K.Input;
      const STR_T = getSTR_T(DT);
      const STR_E = getSTR_E(DT);
      return {
        "District": this.state.District, "Month": ti + 1, "Average Temperature": AveragetTemperature,
        DT, H, K, "STR (T)": STR_T, "STR (E)": STR_E
      };
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
  };
  recompute = () => {
    let __ret = {};
    let i = 7;
    const maxLimit = 15;
    for (i = 7; i <= maxLimit; i += 0.5) {
      __ret = this.analysis(i);
      if (__ret.rows[__ret.r][12] <= this.state.PunchoutsPerMile)
        break;
    }
    this.props.AnalysisSlabThickness(Math.min(i, maxLimit));

    let rowIndexStress = __ret.rowIndexStress;
    let row1 = __ret.row1;
    const rows = __ret.rows;
    var r = __ret.r;
    this.props.AnalysisPunchouts(rows[r][12]);
    // this.props.AnalysisSlabThickness(Math.min(13,i));
    // this.props.AnalysisSlabThickness(i);
    this.setState({ row1, rows, rowIndexStress });
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
    row1.push(data[rowIndexStress - 2]["STR (E)"] * row1[3] / 5000);
    row1.push(row1[4] + row1[5]);
    row1.push(row1[6] / row1[2]);
    row1.push(11800 * Math.pow(row1[7], fatigue(this.state.CompositeK)));
    row1.push(lane(this.state.LanesOneDirection)
        * this.state.TrafficOneDirection * 1000000 / 12 / this.state.DesignLife);
    row1.push(row1[9] / row1[8]);
    row1.push(row1[10]);
    row1.push(18.985 / (1 + 5 * Math.pow(row1[11], -1.1)));
    rows.push(row1);    // Add to the array

    //console.log(+document.getElementById("DesignLife").value);
    for (var i = 1; i <= this.state.DesignLife; i++) {
      if (i !== 1)
        rowIndexStress = 7;
      for (var j = 0; j < 12; j++) {
        if (i == 1 && j == 0)
          ;
            //If counterYear = 1 And counterMonth = 1 Then
        //      'If First Year than Omit Calculation of First Month, Already Done
        else {
          rowIndexStress = rowIndexStress + 1;
          let row2 = [];
          row2.push(row1[0] + 1);
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
          row2.push(row1[11] + row2[10]);
          // Cells(rowIndex, 12) = Cells(rowIndex - 1, 12).Value + Cells(rowIndex, 11).Value
          row2.push(18.985 / (1 + 5 * Math.pow(row2[11], -1.1)));
          // Cells(rowIndex, 13) = 18.985 / (1 + 5 * Cells(rowIndex, 12).Value ^ -1.1)
          if (rowIndexStress == 13)
            rowIndexStress = 1;
          rows.push(row2);
          row1 = row2;
        }
      }
    }
    var r = 12 * this.state.DesignLife - 1;
    return { rowIndexStress, row1, rows, r };

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
      "SubbaseThickness": () => this.state.SubbaseThickness < this.state.SubbaseThicknessThreshHold ? `Recommended subgrade treatment ≥ ${this.state.SubbaseThicknessThreshHold}` : null
    }
  };

  errorFunc = {
    general: k => (this.state[k] === undefined || this.state[k] === null || this.state[k] === "") ? "Required" : null,
    Step3: {
      // 'SubbaseThickness': () => this.state.SubbaseThickness < this.state.SubbaseThicknessThreshHold ? `Must greater than ${this.state.SubbaseThicknessThreshHold}` : (this.state.SubbaseThickness === '' ? 'Required' : null),
      "SubbaseThickness": () => (this.state.SubbaseThickness === "" ? "Required" : null),
      "BaseThickness": () => (this.state.BaseThickness < this.state.BaseThicknessMin) ? `≥ ${this.state.BaseThicknessMin}` : (this.state.BaseThickness === "" ? "Required" : null)
    }
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1, helperEl: undefined });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1, finished: false, helperEl: undefined });
  };

  handleModify = () => {
    this.setState({ activeStep: 0, finished: false, helperEl: undefined });
  };

  handleReset = () => {
    this.setState({ ...init, helperEl: undefined });
    this.initFunc();
  };

  onLoadInput = (event) => {
    const self = this;
    if (event.target.files[0]) {
      XlsxPopulate.fromDataAsync(event.target.files[0]).then(function(workbook) {
        const fn = workbook.sheet("Result");
        const _District = fn.cell("C7").value();
        const indexDis = Object.values(districtCode).indexOf(_District);
        const CSJ = fn.cell("C10").value();
        const state = {
          District: indexDis === -1 ? null : Object.keys(districtCode)[indexDis] ?? "",
          County: fn.cell("C8").value() ?? "",
          Highway: fn.cell("C9").value() ?? "",
          Control: CSJ ? CSJ.split("-")[0] : null,
          Section: CSJ ? CSJ.split("-")[1] : null,
          Job: CSJ ? CSJ.split("-")[2] : null,
          ProjectScope: fn.cell("C11").value() ?? "",
          From: fn.cell("C13").value() ?? "",
          To: fn.cell("C14").value() ?? "",
          StationBegin: fn.cell("C15").value() ?? "",
          StationEnd: fn.cell("C16").value() ?? "",
          RMBegin: fn.cell("C17").value() ?? "",
          RMEnd: fn.cell("C18").value() ?? "",
          Date: fn.cell("C19").value() ?? "",
          Comment: fn.cell("B21").value() ?? "",
          DesignLife: fn.cell("C27").value() ?? "",
          PunchoutsPerMile: fn.cell("C28").value() ?? "",
          LanesOneDirection: fn.cell("C29").value() ?? "",
          TrafficOneDirection: fn.cell("C30").value() ?? "",
          SoilClassificationSystem: fn.cell("C34").value() ?? "",
          SoilSub: fn.cell("C35").value() ?? "",
          PlasticityIndex: fn.cell("C36").value() ?? "",
          SubbaseType: fn.cell("C37").value() ?? "",
          SubbaseThickness: fn.cell("C38").value() ?? "",
          BaseType: fn.cell("C42").value() ?? "",
          BaseThickness: fn.cell("C43").value() ?? "",
          ModulusBase: fn.cell("C44").value() ?? "",
          ModulusOfRupture: fn.cell("C48").value() ?? "",
          ElasticModulue: fn.cell("C49").value() ?? ""
        };
        state.currentCounties = districts[state.District];
        // adjust limit when read file
        self.handleBaseTypeGuide(state);
        self.handleBaseType.bind(self)(state.BaseType, state);

        self.setState(state);
      }).catch(() => {
        window.alert("Can't read file. Please check format!");
      });
    }
  };
  onSaveInput = () => {
    let filename = `TxDOT_${this.state.District}_${new Date().toISOString().replace(".", "|")}`;
    const AnalysisSlabThickness = this.props.AnalysisSlabThickness();
    const AnalysisPunchouts = this.props.AnalysisPunchouts();
    const data = this.state;
    fetch(excelOutputFile).then(res => res.arrayBuffer()).then(file => {
      XlsxPopulate.fromDataAsync(file).then(function(workbook) {
        console.log(data.rows);
        generateBlob();

        function generate(type) {
          const fn = workbook.sheet(0);
          fn.cell("C7").value(districtCode[data.District]);
          fn.cell("C8").value(data.County);
          fn.cell("C9").value(data.Highway);
          fn.cell("C10").value([data.Control ?? "", data.Section ?? "", data.Job ?? ""].join("-"));
          fn.cell("C11").value(data.ProjectScope);
          fn.cell("C13").value(data.To);
          fn.cell("C14").value(data.From);
          fn.cell("C15").value(data.StationBegin);
          fn.cell("C16").value(data.StationEnd);
          fn.cell("C17").value(data.RMBegin);
          fn.cell("C18").value(data.RMEnd);
          fn.cell("C19").value(data.Date);
          fn.cell("B21").value(data.Comment);
          //B
          fn.cell("C27").value(data.DesignLife);
          fn.cell("C28").value(data.PunchoutsPerMile);
          fn.cell("C29").value(data.LanesOneDirection);
          fn.cell("C30").value(data.TrafficOneDirection);
          //C
          fn.cell("C34").value(data.SoilClassificationSystem);
          fn.cell("C35").value(data.SoilSub);
          fn.cell("C36").value(data.PlasticityIndex);
          fn.cell("C37").value(data.SubbaseType);
          fn.cell("C38").value(data.SubbaseThickness);
          //D
          fn.cell("C42").value(data.BaseType);
          fn.cell("C43").value(data.BaseThickness);
          fn.cell("C44").value(data.ModulusBase);
          //E
          fn.cell("C48").value(data.ModulusOfRupture);
          fn.cell("C49").value(data.ElasticModulue);
          //F
          fn.cell("S7").value(AnalysisSlabThickness);
          fn.cell("S8").value(AnalysisPunchouts);
          //G
          fn.cell("O13").value("" + AnalysisSlabThickness + "\"");
          if (data.BaseType === "CTB") {
            fn.cell("O20").value("≥1");
          } else {
            fn.cell("O20").value(undefined);
            fn.cell("L20").value(undefined);
            fn.cell("I20").value(undefined);
            const upColor = fn.cell("O19").style("fill");
            fn.cell("H20").style("fill", upColor);
            fn.cell("I20").style("fill", upColor);
            fn.cell("J20").style("fill", upColor);
            fn.cell("K20").style("fill", upColor);
            fn.cell("L20").style("fill", upColor);
            fn.cell("M20").style("fill", upColor);
            fn.cell("N20").style("fill", upColor);
            fn.cell("O20").style("fill", upColor);
            fn.cell("P20").style("fill", upColor);
            fn.cell("Q20").style("fill", upColor);
            fn.cell("R20").style("fill", upColor);
          }
          fn.cell("O22").value(data.BaseType);
          fn.cell("O23").value("" + data.BaseThickness + "\"");
          fn.cell("O26").value(data.SubbaseType);
          fn.cell("O27").value("" + data.SubbaseThickness + "\"");
          fn.cell("O31").value(data.SoilSub);
          fn.cell("O32").value(data.PlasticityIndex);

          const an = workbook.sheet(1);
          const borderstyle = an.cell("A1").style("border");
          an.cell("A2").value(data.rows);
          an.column("A").style("border", borderstyle);
          an.column("C").style("border", borderstyle);
          an.column("D").style("border", borderstyle);
          an.column("I").style("border", borderstyle);
          an.column("J").style("border", borderstyle);
          an.column("K").style("border", borderstyle);
          an.column("B").style({ "border": borderstyle, "numberFormat": "0.00" });
          an.column("E").style({ "border": borderstyle, "numberFormat": "0.0" });
          an.column("F").style({ "border": borderstyle, "numberFormat": "0.0" });
          an.column("G").style({ "border": borderstyle, "numberFormat": "0.0" });
          an.column("H").style({ "border": borderstyle, "numberFormat": "0.000" });
          an.column("L").style({ "border": borderstyle, "numberFormat": "0.0000" });
          an.column("M").style({ "border": borderstyle, "numberFormat": "0.00" });
          return workbook.outputAsync({ type: type });
        }

        function generateBlob() {
          return generate()
              .then(function(blob) {
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveOrOpenBlob(blob, filename + ".xlsx");
                } else {
                  var url = window.URL.createObjectURL(blob);
                  var a = document.createElement("a");
                  document.body.appendChild(a);
                  a.href = url;
                  a.download = filename + ".xlsx";
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                }
              })
              .catch(function(err) {
                alert(err.message || err);
                throw err;
              });
        }

      });
    });
  };

  handleOpenHelper = (content, freeze) => (event) => {
    if (this.state.helperEl) {
      if (this.state.helperEl.el === event.currentTarget && freeze && this.state.helperEl.freeze) // same target
        this.handleCloseHelper(event);
      else {
        if (freeze || this.state.helperEl.el !== event.currentTarget && freeze)
          this.setState({ helperEl: { el: event.currentTarget, content, freeze } });
      }
    } else {
      this.setState({ helperEl: { el: event.currentTarget, content, freeze } });
    }
  };

  handleCloseHelper = (source) => {
    if (source.type !== "mouseleave" || source.type === "mouseleave" && this.state.helperEl && (!this.state.helperEl.freeze))
      this.setState({ helperEl: undefined });
  };

  handleBlurSliderInput = (key, min, max) => {
    let value = (+this.state[key]);
    if ((this.state[key] !== null) && (this.state[key] !== undefined) && (this.state[key] !== "") && !isNaN(value)) {
      const obj = {};
      if (value < min) {
        obj[key] = min;
        this.setState(obj);
      } else if ((max !== undefined) && value > max) {
        obj[key] = max;
        this.setState(obj);
      }
    }
  };
  handleChangeSliderInput = (event, key) => {
    const obj = {};
    obj[key] = event.target.value === "" ? "" : Number(event.target.value);
    this.setState(obj);
  };
  handleChange = (key, value) => {
    const obj = {};
    obj[key] = value;
    this.setState(obj);
  };
  handleBaseTypeGuide = (opt) => {
    // let baseTypeOpt = ["CTB", "HMA","ASB"];
    // let BaseType = opt.BaseType;
    // if (opt.PlasticityIndex >= 15) {
    //     if (["ML", "CL", "OL", "MH", "CH", "OH"].indexOf(opt.SoilSub) !== -1) {
    //         baseTypeOpt = ["CTB"];
    //         BaseType = "CTB";
    //     }
    // }
    // opt.baseTypeOpt = baseTypeOpt;
    // opt.BaseType = BaseType;
    return opt;
  };
  handleSoilSub = (value) => {
    const newState = this.handleBaseTypeGuide({
      SoilSub: value,
      BaseType: this.state.BaseType,
      PlasticityIndex: this.state.PlasticityIndex
    });
    this.setState(newState);
    this.handleBaseType(newState.BaseType);
  };
  handleBaseType = (value, opt) => {
    if (value && value !== "") {
      let BaseThicknessMin = 4;
      let BaseThicknessMax = 6;
      let BaseThickness = (opt ?? this.state).BaseThickness;
      let ModulusBase = 400;
      if (value === "CTB") {
        BaseThicknessMin = 6;
        ModulusBase = 500;
      } else {
        BaseThicknessMax = 4;
      }
      if (BaseThickness < BaseThicknessMin)
        BaseThickness = BaseThicknessMin;
      if (BaseThickness > BaseThicknessMax)
        BaseThickness = BaseThicknessMax;
      this.setState({ BaseType: value, BaseThicknessMin, BaseThicknessMax, BaseThickness, ModulusBase });
    } else {
      this.setState({
        BaseType: value,
        BaseThicknessMin: 2,
        BaseThicknessMax: 6,
        BaseThickness: null,
        ModulusBase: null
      });
    }
  };
  handlePlasticityIndex = (value) => {
    const newState = this.handleBaseTypeGuide({
      SoilSub: this.state.SoilSub,
      BaseType: this.state.BaseType,
      PlasticityIndex: value
    });

    let SubbaseThicknessThreshHold = -1;
    if (value >= 35) {
      SubbaseThicknessThreshHold = 8;
    }
    this.setState({ ...newState, SubbaseThicknessThreshHold });
    this.handleBaseType(newState.BaseType);
  };
  getPossibleMove = (step) => {
    switch (step) {
      case 0:
        return this.state.District;
      case 1:
        return (!["DesignLife", "LanesOneDirection", "TrafficOneDirection"].find(k => this.errorFunc.general(k)));
      case 2:
        return !this.errorFunc.Step3.BaseThickness() && (!this.errorFunc.Step3.SubbaseThickness()) && (!["SoilSub", "PlasticityIndex", "SubbaseType", "SubbaseThickness", "BaseType", "BaseThickness"].find(k => this.errorFunc.general(k)));
      default:
        return true;
    }
  };

  calculateCompositeK = () => {
    const { ModulusBase, SoilSub, BaseThickness, ksTableMap } = this.state;
    this.setState({ CompositeK: ksTableMap.get("" + getSubgradeValue(SoilSub) + " " + Math.round(BaseThickness) + " " + getModulusBase(ModulusBase)) });

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
        return ModulusBase - (ModulusBase % 50);
      else if ((ModulusBase > 100) && (ModulusBase < 1000) && ((ModulusBase % 50) >= 25))
        return ModulusBase + 50 - (ModulusBase % 50);
      else if (ModulusBase >= 1000)
        return Math.round(ModulusBase / 100) * 100;
      return 0;
    }
  };

  render() {
    const { classes } = this.props;
    const { isBackdropOpen, isEditLookupTable } = this.state;
    const getGroupControl = () => {
      return <div className={classes.actionsContainer}>
        <div>
          <Button
              color="secondary"
              variant="contained"
              onClick={this.props.toMenu}
              className={classes.button}
              startIcon={<HomeIcon />}
          >
            To Main Menu
          </Button>
          <Button
              variant="contained"
              disabled={this.state.activeStep === 0}
              onClick={this.handleBack}
              className={classes.button}
          >
            Back
          </Button>
          <Button
              disabled={!this.getPossibleMove(this.state.activeStep)}
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={classes.button}
          >
            {this.state.activeStep === this.state.stepsLength - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>;
    };
    if ((this.state.activeStep === this.state.stepsLength) && !this.state.finished) {
      this.setState({ finished: true });
      this.recompute();
    }
    return (<Container maxWidth="lg"> <Paper elevation={3}>
      <CssBaseline />
      <Grid container>
        <Grid item style={{ maxWidth: this.state.finished ? "250px" : "100%" }}>
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
                        startIcon={<EditIcon />}
                        component="label"
                        style={{ textTransform: "none" }}
                        onClick={()=>{this.setState({isEditLookupTable:true})}}
                    >
                      Edit Lookup Tables
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<PublishIcon />}
                        component="label"
                        style={{ textTransform: "none" }}
                    >
                      Load Input File
                      <input
                          accept="application/vnd.sealed.xls"
                          type="file"
                          hidden
                          onChange={this.onLoadInput}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item style={{ flexGrow: 1 }}><Divider variant="middle" /></Grid>
                    <Grid item style={{ transform: "translateY(-50%)" }}>Or</Grid>
                    <Grid item style={{ flexGrow: 1 }}><Divider variant="middle" /></Grid>
                  </Grid>
                </Grid>
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
                            renderInput={(params) => <TextField size="small" margin="dense" {...params}
                                                                variant="filled"
                                                                className={classes.inputWithHelper}
                                                                required
                                                                error={!this.state.District}
                                                                label={<>District<IconButton
                                                                    aria-label="info"
                                                                    className={classes.margin}
                                                                    size="small">
                                                                  <InfoIcon fontSize="small"
                                                                            onClick={this.handleOpenHelper({ map: "district" }, true)}
                                                                            onMouseEnter={this.handleOpenHelper({ map: "district" })}
                                                                            onMouseLeave={this.handleCloseHelper}
                                                                  /></IconButton>
                                                                  {/*<InfoIcon fontSize="small"*/}
                                                                  {/*          onClick={this.handleOpenHelper({src: DistrictPic}, true)}*/}
                                                                  {/*          onMouseEnter={this.handleOpenHelper({src: DistrictPic})}*/}
                                                                  {/*          onMouseLeave={this.handleCloseHelper}*/}
                                                                  {/*/></IconButton>*/}
                                                                </>}
                            />} />
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
                                this.setState({ County: value });
                            }}
                            // style={{marginTop: 8, marginBottom: 4}}
                            renderInput={(params) => <TextField size="small" margin="dense" {...params}
                                                                className={classes.inputWithHelper}
                                                                label={<>County<IconButton
                                                                    aria-label="info"
                                                                    className={classes.margin}
                                                                    size="small">
                                                                  <InfoIcon fontSize="small"
                                                                            onClick={this.handleOpenHelper({ map: "county" }, true)}
                                                                            onMouseEnter={this.handleOpenHelper({ map: "county" })}
                                                                            onMouseLeave={this.handleCloseHelper}
                                                                  /></IconButton></>}
                                                                variant="filled" />} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            margin="dense" size="small"
                            id="highway"
                            label="Highway"
                            value={this.state.Highway}
                            defaultValue={this.state.Highway}
                            onChange={(event) => this.handleChange("Highway", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            margin="dense" size="small"
                            id="ProjectScope"
                            className={classes.inputWithHelper}
                            label={<>Project Scope <IconButton aria-label="info"
                                                               className={classes.margin}
                                                               size="small">
                              <InfoIcon fontSize="small"
                                        onClick={this.handleOpenHelper({ text: "Will be provided later." }, true)}
                                        onMouseEnter={this.handleOpenHelper({ text: "Will be provided later." })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton></>}
                            select
                            value={this.state.ProjectScope}
                            onChange={(event) => this.handleChange("ProjectScope", event.target.value)}
                            variant="filled">
                          <MenuItem value="NEW CONSTRUCTION">New Construction</MenuItem>
                          <MenuItem value="REHABILITATION">Rehabilitation</MenuItem>
                          <MenuItem value="WIDENING">Widening</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            margin="dense" size="small"
                            id="control"
                            label="Control"
                            value={this.state.Control}
                            onChange={(event) => this.handleChange("Control", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            margin="dense" size="small"
                            id="section"
                            label="Section"
                            value={this.state.Section}
                            onChange={(event) => this.handleChange("Section", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            margin="dense" size="small"
                            id="job"
                            label="Job"
                            value={this.state.Job}
                            onChange={(event) => this.handleChange("Job", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            margin="dense" size="small"
                            id="date"
                            type="date"
                            label="Date"
                            value={this.state.Date}
                            onChange={(event) => this.handleChange("Date", event.target.value)}
                            InputLabelProps={{
                              shrink: true
                            }}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} justify="flex-start">
                        <Typography variant={"h6"}>Project Limits</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            margin="dense" size="small"
                            id="From"
                            label="From"
                            value={this.state.From}
                            onChange={(event) => this.handleChange("From", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            margin="dense" size="small"
                            id="To"
                            label="To"
                            value={this.state.To}
                            onChange={(event) => this.handleChange("To", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            margin="dense" size="small"
                            id="StationBegin"
                            label="Station (Begin)"
                            value={this.state.StationBegin}
                            onChange={(event) => this.handleChange("StationBegin", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            margin="dense" size="small"
                            id="StationEnd"
                            label="Station (End)"
                            value={this.state.StationEnd}
                            onChange={(event) => this.handleChange("StationEnd", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            margin="dense" size="small"
                            id="RMBegin"
                            label="RM. (Begin)"
                            value={this.state.RMBegin}
                            onChange={(event) => this.handleChange("RMBegin", event.target.value)}
                            variant="filled" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            margin="dense" size="small"
                            id="RMEnd"
                            label="RM. (End)"
                            value={this.state.RMEnd}
                            onChange={(event) => this.handleChange("RMEnd", event.target.value)}
                            variant="filled" />
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <TextField
                          id="comment"
                          label="Comments"
                          margin="dense" size="small"
                          multiline
                          onChange={(event) => this.handleChange("Comment", event.target.value)}
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
                        <Typography variant={"h6"}>Basic Design Information</Typography>
                      </Grid>
                      <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                            alignItems="flex-end">
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Design life (years)</span>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              error={this.errorFunc.general("DesignLife")}
                              helperText={this.errorFunc.general("DesignLife")}
                              type={"number"}
                              value={this.state.DesignLife}
                              onChange={(event) => this.handleChangeSliderInput(event, "DesignLife")}
                              onBlur={() => this.handleBlurSliderInput("DesignLife", 1, 50)}
                              id="DesignLife"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 1,
                                max: 50,
                                type: "number"
                              }}
                          />
                        </Grid>
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Total number of lanes in one direction</span>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              type={"number"}
                              value={this.state.LanesOneDirection}
                              error={this.errorFunc.general("LanesOneDirection")}
                              helperText={this.errorFunc.general("LanesOneDirection")}
                              onChange={(event) => this.handleChangeSliderInput(event, "LanesOneDirection")}
                              onBlur={() => this.handleBlurSliderInput("LanesOneDirection", 1, 10)}
                              id="LanesOneDirection"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 1,
                                max: 10,
                                type: "number"
                              }}
                          />
                        </Grid>
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Total design traffic in one direction (million ESAL)</span>
                            <IconButton aria-label="info" className={classes.margin}
                                        size="small">
                              <InfoIcon fontSize="small"
                                        onClick={this.handleOpenHelper({ text: Total_design_trafic }, true)}
                                        onMouseEnter={this.handleOpenHelper({ text: Total_design_trafic })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              type={"number"}
                              value={this.state.TrafficOneDirection}
                              error={this.errorFunc.general("TrafficOneDirection")}
                              helperText={this.errorFunc.general("TrafficOneDirection")}
                              onChange={(event) => this.handleChangeSliderInput(event, "TrafficOneDirection")}
                              onBlur={() => this.handleBlurSliderInput("TrafficOneDirection", 1, 500)}
                              id="TrafficOneDirection"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 1,
                                max: 500,
                                type: "number"
                              }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                      <Grid item xs={12} container justify="flex-start">
                        <Typography variant={"h6"}>Structural Design Criteria</Typography>
                        {/*<IconButton aria-label="info" className={classes.margin} size="small">*/}
                        {/*    <InfoIcon fontSize="small"*/}
                        {/*              onClick={this.handleOpenHelper({src: StructureDesignCriteriaPic}, true)}*/}
                        {/*              onMouseEnter={this.handleOpenHelper({src: StructureDesignCriteriaPic})}*/}
                        {/*              onMouseLeave={this.handleCloseHelper}*/}
                        {/*    />*/}
                        {/*</IconButton>*/}
                      </Grid>
                      <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                            alignItems="flex-end">
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Acceptable punchout per mile</span>
                            <IconButton aria-label="info" className={classes.margin}
                                        size="small">
                              <InfoIcon fontSize="small"
                                        onClick={this.handleOpenHelper({ text: Acceptable_punchout_Popup }, true)}
                                        onMouseEnter={this.handleOpenHelper({ text: Acceptable_punchout_Popup })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              type={"number"}
                              value={this.state.PunchoutsPerMile}
                              onChange={(event) => this.handleChangeSliderInput(event, "PunchoutsPerMile")}
                              onBlur={() => this.handleBlurSliderInput("PunchoutsPerMile", 5, 20)}
                              id="PunchoutsPerMile"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 5,
                                max: 20,
                                type: "number"
                              }}
                              disabled
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                      <Grid item xs={12} container justify="flex-start">
                        <Typography variant={"h6"}>Concrete Layer/Material
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
                            <IconButton aria-label="info"
                                        className={classes.margin} size="small">
                              <InfoIcon fontSize="small"
                                        onClick={this.handleOpenHelper({ text: _28_Day_Modulus_of_Rupture }, true)}
                                        onMouseEnter={this.handleOpenHelper({ text: _28_Day_Modulus_of_Rupture })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              value={this.state.ModulusOfRupture}
                              onChange={(event) => this.handleChangeSliderInput(event, "ModulusOfRupture")}
                              onBlur={() => this.handleBlurSliderInput("ModulusOfRupture", 1, 1000)}
                              id="ModulusOfRupture"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 1,
                                max: 1000,
                                type: "number"
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
                                        onClick={this.handleOpenHelper({ text: Concrete_elastic_modulus }, true)}
                                        onMouseEnter={this.handleOpenHelper({ text: Concrete_elastic_modulus })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              value={this.state.ElasticModulue}
                              onChange={(event) => this.handleChangeSliderInput(event, "ElasticModulue")}
                              onBlur={() => this.handleBlurSliderInput("ElasticModulue", 1, 1000)}
                              id="ModulusOfRupture"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 1,
                                max: 1000,
                                type: "number"
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
                        <Typography variant={"h6"}>Subgrade and Treatment
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
                                        onClick={this.handleOpenHelper({ text: Soil_classification_system }, true)}
                                        onMouseEnter={this.handleOpenHelper({ text: Soil_classification_system })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Input
                              value={this.state.SoilClassificationSystem}
                              onChange={(event, newValue) => this.setState({ SoilClassificationSystem: newValue })}
                              id="SoilClassificationSystem"
                              disabled
                          />
                        </Grid>
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Soil classification of subgrade</span>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <HtmlTooltip title="Cement Treated Base is highly recommended" arrow placement={"right"}
                                       open={["ML", "CL", "OL", "MH", "CH", "OH"].indexOf(this.state.SoilSub) !== -1}>
                            <Autocomplete
                                margin="dense"
                                id="SoilSub"
                                options={soilClassSub}
                                size="small"
                                value={this.state.SoilSub}
                                onChange={(event, value) => this.handleSoilSub(value)}
                                renderInput={(params) => <TextField size="small" margin="dense" {...params}
                                                                    required
                                                                    error={this.errorFunc.general("SoilSub")}
                                                                    helperText={this.errorFunc.general("SoilSub")}
                                                                    label="" />} />
                          </HtmlTooltip>
                        </Grid>
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Plasticity Index (PI)</span>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField size="small" margin="dense" type="number" id="PlasticityIndex"
                                     value={this.state.PlasticityIndex}
                                     error={this.errorFunc.general("PlasticityIndex")}
                                     helperText={this.errorFunc.general("PlasticityIndex")}
                                     onBlur={() => this.handleBlurSliderInput("PlasticityIndex", 0)}
                                     inputProps={{
                                       min: 0,
                                       type: "number"
                                     }}
                                     onChange={(event) => this.handlePlasticityIndex(event.target.value)} />
                        </Grid>
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Subgrade treatment</span>
                            <IconButton aria-label="info" className={classes.margin}
                                        size="small">
                              <InfoIcon fontSize="small"
                                        onClick={this.handleOpenHelper({
                                          src: subbasePic,
                                          href: "https://ftp.dot.state.tx.us/pub/txdot/mtd/treatment-guidelines.pdf"
                                        }, true)}
                                        onMouseEnter={this.handleOpenHelper({ src: subbasePic })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Autocomplete
                              margin="dense"
                              id="SubbaseType"
                              options={this.state.SubbaseTypeOpt}
                              value={this.state.SubbaseType}
                              onChange={(event, value) => {
                                this.handleChange("SubbaseType", value);
                                if (value === "No treatment")
                                  this.setState({ SubbaseThickness: 0 });
                              }}
                              size="small"
                              freeSolo
                              autoSelect={true}
                              style={{ marginTop: 8, marginBottom: 4 }}
                              renderInput={(params) => <TextField margin="dense" size="small" {...params}
                                                                  required
                                                                  error={this.errorFunc.general("SubbaseType")}
                                                                  helperText={this.errorFunc.general("SubbaseType")}
                              />} />
                        </Grid>
                        <Grid item xs={8} justify="flex-start">
                          <Grid container xs={12} justify="flex-start">
                            <span>Subgrade treatment thickness (in.)</span>
                            <IconButton aria-label="info" className={classes.margin}
                                        size="small">
                              <InfoIcon fontSize="small"
                                        onClick={this.handleOpenHelper({
                                          src: subbasePic,
                                          href: "https://ftp.dot.state.tx.us/pub/txdot/mtd/treatment-guidelines.pdf"
                                        }, true)}
                                        onMouseEnter={this.handleOpenHelper({ src: subbasePic })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              error={this.errorFunc.general("SubbaseThickness") || this.errorFunc.Step3.SubbaseThickness() || this.warningFunc.Step3.SubbaseThickness()}
                              helperText={this.errorFunc.general("SubbaseThickness") || this.errorFunc.Step3.SubbaseThickness() || this.warningFunc.Step3.SubbaseThickness()}
                              disabled={(this.state.SubbaseThickness === 0) && (this.state.SubbaseType === "No treatment")}
                              type="number" id="SubbaseThickness"
                              value={this.state.SubbaseThickness}
                              onChange={(event) => ((event.target.value > 0) || (event.target.value === "")) ? this.handleChange("SubbaseThickness", event.target.value) : ""}
                              inputProps={{ min: 0 }}
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
                        <Typography variant={"h6"}>Base Layer Information</Typography>
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
                                        onClick={this.handleOpenHelper({ src: BasetypePic }, true)}
                                        onMouseEnter={this.handleOpenHelper({ src: BasetypePic })}
                                        onMouseLeave={this.handleCloseHelper}
                              /></IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
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
                                this.handleBaseType(event.target.value);
                              }}
                              error={this.errorFunc.general("BaseType")}
                              helperText={this.errorFunc.general("BaseType")}
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
                                            <div>ASB ≥ 4.0 in</div>
                                          </>
                                        })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                              margin="dense" size="small"
                              error={this.errorFunc.general("BaseThickness") || this.errorFunc.Step3.BaseThickness()}
                              helperText={this.errorFunc.general("BaseThickness") || this.errorFunc.Step3.BaseThickness()}
                              value={this.state.BaseThickness}
                              onChange={(event) => this.handleChange("BaseThickness", event.target.value)}
                              onBlur={() => this.handleBlurSliderInput("BaseThickness", this.state.BaseThicknessMin, this.state.BaseThicknessMax)}
                              id="BaseThickness"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: this.state.BaseThicknessMin,
                                max: this.state.BaseThicknessMax,
                                type: "number"
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
                                            <div>ASB = 400 ksi</div>
                                          </>
                                        })}
                                        onMouseLeave={this.handleCloseHelper}
                              />
                            </IconButton>
                            <span className={classes.dot} style={{ flexGrow: 1 }} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField margin="dense" size="small" type="number" id="ModulusBase "
                                     value={this.state.ModulusBase}
                                     disabled
                                     onChange={(event) => this.setState({ ModulusBase: event.target.value })} />
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
                        {/*    <TextField size="small" type="number" id="CompositeK "*/}
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
                  <Grid container direction="column">
                    <Button
                        onClick={this.handleBack}
                        variant="contained"
                        className={classes.button}
                        startIcon={<ArrowBackIosIcon />}
                    >
                      Back
                    </Button>
                    <Button onClick={this.handleModify} className={classes.button}
                            size="small"
                            variant="contained"
                            startIcon={<EditIcon />}
                    >
                      Modify
                    </Button>
                    <Button onClick={this.handleReset} className={classes.button}
                            size="small"
                            variant="contained"
                            startIcon={<RefreshIcon />}
                    >
                      Reset
                    </Button>
                    {/*<ReactToPdf targetRef={ref} filename="div-blue.pdf">*/}
                    {/*    {({toPdf}) => (*/}
                    {/*        <button onClick={toPdf}>Generate pdf</button>*/}
                    {/*    )}*/}
                    {/*</ReactToPdf>*/}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<PrintIcon />}
                        onClick={() => {
                          if (window.matchMedia) {
                            var mediaQueryList = window.matchMedia("print");
                            mediaQueryList.addListener((mql) => {
                              if (!mql.matches) {
                                this.setState({ isBackdropOpen: false });
                              }
                            });
                          }
                          window.onafterprint = () => {
                            this.setState({ isBackdropOpen: false });
                          };
                          this.setState({ isBackdropOpen: true, printRequest: true });
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
                        startIcon={<SaveIcon />}
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
                        startIcon={<ShowChartIcon />}
                        // onClick={()=>this.props.print(this.state)}
                        onClick={() => this.setState({ openAnalytics: true })}
                    >
                      ANALYSIS RESULT
                    </Button>
                    <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        onClick={this.props.toMenu}
                        className={classes.button}
                        startIcon={<HomeIcon />}
                    >
                      To Main Menu
                    </Button>
                  </Grid>
                </Paper>
              </>
          )}
        </Grid>
        {this.state.finished ? <Grid item style={{ width: "calc(100% - 250px)" }}>
          <Report
              data={this.state}
              AnalysisPunchouts={this.props.AnalysisPunchouts()}
              AnalysisSlabThickness={this.props.AnalysisSlabThickness()}
          />
        </Grid> : ""}
        <Grid item xs={12}>

          <Paper elevation={3} style={{ backgroundImage: `url(${footerPic})`, backgroundSize: "cover" }}>
            <Grid container item xs={12} spacing={3} justifyContent="center" alignItems="center"
                  style={{ justifyContent: "center" }}>
              <Grid item><ColorButton target={"_blank"} variant="contained" color="#D4E1F0"
                                      href="http://onlinemanuals.txdot.gov/txdotmanuals/pdm/pdm.pdf">TxDOT Pavement
                Manual</ColorButton></Grid>
              <Grid item><ColorButton target={"_blank"} variant="contained" color="#4B2D6A"
                                      href="https://www.txdot.gov/inside-txdot/division/construction/txdot-specifications.html">TxDOT
                Specifications</ColorButton></Grid>
              <Grid item><ColorButton target={"_blank"} variant="contained" color="#146E43"
                                      href="https://www.txdot.gov/insdtdot/orgchart/cmd/cserve/standard/rdwylse.htm">TxDOT
                Roadway Standards</ColorButton></Grid>
            </Grid>
          </Paper>
        </Grid>
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
                  enabled: true
                },
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window"
                },
                arrow: {
                  enabled: true
                }
              }}
              style={{ zIndex: 4 }}
          >
            <Card className={classes.helpHolder} raised={true}>
              {this.state.helperEl.freeze ? <IconButton aria-label="close" className={classes.closeButton} size="small"
                                                        onClick={this.handleCloseHelper}>
                <CloseIcon fontSize="small" />
              </IconButton> : ""}
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
                            style={{ maxWidth: 600, height: "auto" }}
                        /></TransformComponent></TransformWrapper> </a> :
                  this.state.helperEl.content.text
              }
            </Card>
          </Popper> : ""
      }
      <Backdrop
          sx={{ color: "#fff" }}
          style={{ zIndex: 10 }}
          open={isBackdropOpen}
      >
      </Backdrop>
      <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={!!this.state.openAnalytics}
          onClose={() => this.setState({ openAnalytics: false })}>
        <DialogTitle id="responsive-dialog-title"
                     onClose={() => this.setState({ openAnalytics: false })}>Analysis</DialogTitle>
        <DialogContent>
          {this.state.finished ? <Graph
              rows={this.state.rows}
              AnalysisPunchouts={this.props.AnalysisPunchouts}
              init={this.state.activeStep === this.state.stepsLength}
              parameter={{ ...this.state }} /> : ""}
        </DialogContent>
      </Dialog>
      <Popper
          placement="right"
          disablePortal={false}
          open={!!(this.state.helperEl && this.state.helperEl.content && this.state.helperEl.content.map)}
          anchorEl={this.state.helperEl && this.state.helperEl.el}
          modifiers={{
            flip: {
              enabled: true
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "window"
            },
            arrow: {
              enabled: true
            }
          }}
          style={{ zIndex: 4 }}
      >
        <Card style={{ width: 600 }} raised={true}>
          {this.state.helperEl && this.state.helperEl.freeze ?
              <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleCloseHelper}
                          size="small">
                <CloseIcon fontSize="small" />
              </IconButton> : ""}

          {this.state.helperEl && this.state.helperEl.content && this.state.helperEl.content.map === "county" ?
              <County highlight={this.state.currentCounties}
                      target={this.state.County}
                      selected={(value) => {
                        if (value)
                          this.setState({
                            County: value,
                            District: counties[value].length === 1 ? counties[value][0] : null
                          });
                        else
                          this.setState({ County: value });
                      }} /> : <div>
                <div style={{ paddingLeft: 10 }}>

                  {/*<h5>A. Project Identification</h5>*/}
                  {/*<span>Provide general information of a project, i.i. district, county, highway, direaction of construction, and stations. The "District" field is require to initiate the prescribed climatic*/}
                  {/*data that will be used for evaluation of stresses due to environmental loading. The input must be per the official abbreviation as show in Table 1.1. All 25 TxDOT districts in the State of Texas*/}
                  {/*are applicable to the district field. The other fields are optional. Once the design is completed, this screen can be printed for record in the project file</span>*/}
                </div>
                <District
                    target={this.state.District}
                    selected={(value) => {
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
                    }} /></div>}
        </Card>
      </Popper>
      <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={!!isEditLookupTable}
          onClose={() => this.setState({ isEditLookupTable: false })}>
        <DialogTitle id="responsive-dialog-title"
                     onClose={() => this.setState({ isEditLookupTable: false })}>Lookup Table</DialogTitle>
        <DialogContent>
          <EditableTable data={[{ title: 'Temperature', data: this.state.temperature, editFields: ['Average Maximum (F)','Average Minimum (F)'], formular:{'Average Temperature (F)':d=>(d['Average Maximum (F)']+d['Average Minimum (F)'])/2} },
            { title: 'K-Table', data: this.state.ksTable, editFields: ['Composite K (psi/in.)'] },
            { title: 'S-Table', data: this.state.ssTable, editFields: ['Concrete Stress (E) (psi)'] }]}
                         onSave={this.onEditTable.bind(this)}
          />
        </DialogContent>
      </Dialog>
    </Container>);
  }
}

export default withStyles(styles)(CRCP);