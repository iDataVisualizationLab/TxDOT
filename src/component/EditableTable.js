import { Component, useLayoutEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Box, Button,
  Grid,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {cloneDeep,isNumber} from "lodash";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

const styles = () => ({
  root: {
    width: "100%"
  }
});

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {tableIndex:0,
    initData:[],
    editedData:[]};
  }

  componentDidMount() {
    this.setState({initData: cloneDeep(this.props.data),editedData: cloneDeep(this.props.data)});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data!== this.props.data){
      this.setState({initData: cloneDeep(this.props.data),editedData: cloneDeep(this.props.data)})
    }
  }

  handleChangeTableIndex (event, newValue) {
    this.setState({ tableIndex: newValue});
  };

  handleSave () {
    this.setState({initData: cloneDeep(this.state.editedData)});
    if (this.props.onSave)
      this.props.onSave(this.state.editedData)
  };

  render() {
    const { classes } = this.props;
    const { tableIndex, editedData } = this.state;
    return <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tableIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
          <TabList style={{width:'100%'}}
            value={tableIndex} onChange={this.handleChangeTableIndex.bind(this)} aria-label="edit table tab">
            {editedData.map((d,i)=><Tab key={i} label={d.title} value={i} />)}
          </TabList>
          <div style={{float:'right'}}>
            <Button variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={this.handleSave.bind(this)}
            >
              Save
            </Button>
          </div>
        </Box>
        {editedData.map(({data,editFields},i)=><TabPanel key={i} value={i}>
          <CustomTable data={data} editFields={editFields} onChange={(newdata)=>this.setState({editedData})}/>
        </TabPanel>)}
      </TabContext>
    </Box>
  }
}

function CustomTable ({data,editFields,onChange}){
  const [collumns,setCollumns] = useState([]);
  useLayoutEffect(()=>{
    if (data[0]){
      const isEdit = {};
      editFields.forEach(k=>isEdit[k]=true);
      setCollumns(Object.keys(data[0]).map(k=>({
        title : k,
        editable: isEdit[k],
        isNumber: isNumber(data[0][k])
      })))
    }
  },[data])
  return <TableContainer>
    <Table stickyHeader aria-label="sticky table" size="small">
      <TableHead>
        <TableRow>
          {collumns.map(c=>
          <TableCell key={c.title} align={'center'}>
            {c.title}
          </TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((r,i)=><TableRow hover key={i}>
          {collumns.map(({title,editable,isNumber})=>
            <TableCell key={title} align={'right'}>
              {editable?<Input value={isNumber?Math.round(r[title]*1000)/1000:r[title]}
                               type={isNumber?'number':'text'}
                               fullWidth={true}
                               inputProps={{ style: { textAlign: isNumber ? "end" : "start" } }}
                               onChange={(event)=>{r[title]=isNumber ?(+event.target.value):event.target.value; onChange(data);}}/>
                :r[title]}
            </TableCell>)}
        </TableRow>)}
      </TableBody>
    </Table>
  </TableContainer>
}

export default withStyles(styles)(EditableTable);
