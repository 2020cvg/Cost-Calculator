import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmployee, deleteEmployee } from '../../actions/employee';
import UpdateEmployee from './UpdateEmployee';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setAlert } from '../../actions/alert';
import { useDispatch } from "react-redux";
import Alert from '../layout/Alert';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Employee = ({ addEmployee, deleteEmployee, employee: { employees } }) => {
  const [formData, setFormData] = useState({
    id: '',
    emp_first: '',
    emp_last: '',
    dep_first: '',
    dep_last: '',
    dependants: []
  });
  const [cost, setCost] = useState(0);
  const dispatch = useDispatch();
  const { id, emp_first, emp_last, dep_first, dep_last, dependants } = formData;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setFormData({ ...formData, 
      "id": '', 
      "emp_first": '', 
      "emp_last": '', 
      "dep_first": '', 
      "dep_last": '', 
      "dependants": []
    });
    setCost(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addDependant = () => {
    if (dep_first && dep_last) {
      if (dep_first.charAt(0) === 'A' || dep_last.charAt(0) === 'A') {
        var temp = cost + 450;
        setCost(temp);
      } else {
        var temp = cost + 500;
        setCost(temp);
      }
      console.log("cost: ", cost);
      var full_name = dep_first.concat(" ", dep_last);
      dependants.push(full_name);
      setFormData({ ...formData, "dep_first": '', "dep_last": ''});
      dispatch(setAlert('Dependant saved.', 'success'));
    }
  };

  const onDelete = (delete_id) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      deleteEmployee(delete_id);
      dispatch(setAlert('Employee removed.', 'success'));
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    let employee = {};
    if (emp_first.charAt(0) === 'A' || emp_last.charAt(0) === 'A') {
      const new_id = uuidv4();
      employee = {
        "id": new_id,
        "emp_first": emp_first,
        "emp_last": emp_last,
        "dependants": dependants,
        "cost": (cost + 900)
      }
    } else {
      const new_id = uuidv4();
      employee = {
        "id": new_id,
        "emp_first": emp_first,
        "emp_last": emp_last,
        "dependants": dependants,
        "cost": (cost + 1000)
      }
    }
    addEmployee(employee);
    handleClose();
    dispatch(setAlert('Employee saved.', 'success'));
  };


  return (
    <div >
      <div style={{padding: "100px"}}>
        <div>
          <Button sx={{mb: "20px", mt: "40px"}} variant="contained" onClick={handleClickOpen}>Add Employee</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="dialog-top"><h3>Add Employee</h3></DialogTitle>
            <DialogContent sx={{height: 600, width: 500}}>
              <div className="layout">
                <TextField 
                  id="outlined-basic" 
                  label="Employee First Name" 
                  variant="outlined" 
                  name="emp_first"
                  value={emp_first}
                  onChange={onChange}
                />
              </div>
              <div className="layout">
                <TextField 
                  id="outlined-basic" 
                  label="Employee Last Name" 
                  variant="outlined" 
                  name="emp_last"
                  value={emp_last}
                  onChange={onChange}
                />
              </div>
              <DialogTitle>Add Dependant(s)</DialogTitle>
              <div className="layout">
                <TextField 
                  id="outlined-basic" 
                  label="Dependant First Name" 
                  variant="outlined" 
                  name="dep_first"
                  value={dep_first}
                  onChange={onChange}
                />
              </div>
              <div className="layout">
                <TextField 
                  id="outlined-basic" 
                  label="Dependant Last Name" 
                  variant="outlined" 
                  name="dep_last"
                  value={dep_last}
                  onChange={onChange}
                />
              </div>
              <Button sx={{mt: "20px"}} variant="contained" color="error" onClick={addDependant}>Add Dependant</Button>
              <Alert />
            </DialogContent>
            <DialogActions>
              <Button variant="text" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" className="submit" onClick={onSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Cost</StyledTableCell>
                <StyledTableCell>Dependant(s)</StyledTableCell>
                <StyledTableCell>Update</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <StyledTableRow key={employee.id}>
                  <StyledTableCell component="th" scope="row">
                    {employee.emp_first}<span>&nbsp;</span>{employee.emp_last}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    ${employee.cost}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {employee.dependants.length}
                  </StyledTableCell>
                  <StyledTableCell>
                      <UpdateEmployee {...employee} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <DeleteIcon className="info" onClick={() => onDelete(employee.id)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Employee.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  employee: state.employee
});

export default connect(mapStateToProps, { addEmployee, deleteEmployee })(Employee);
