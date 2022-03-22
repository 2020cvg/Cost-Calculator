import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdateIcon from '@material-ui/icons/Update';
import { addEmployee, deleteEmployee } from '../../actions/employee';
import { setAlert } from '../../actions/alert';
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import Alert from '../layout/Alert';

const UpdateEmployee = ({
  id,
  emp_first,
  emp_last,
  dependants,
  cost,
  addEmployee, 
  deleteEmployee
}) => {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    dep_first: '', 
    dep_last: '',
    temp_first: emp_first,
    temp_last: emp_last,
    show: [],
    indexes: [],
    temp_cost: cost
  });
  const { 
    dep_first, 
    dep_last, 
    show, 
    temp_first, 
    temp_last,
    temp_cost,
    indexes 
  } = formData;
  const [arr, setTheArray] = useState([]);
  const [tempCost, setPrice] = useState(0);
  const [show_val, setShow] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [check, setCheck] = useState();
  const handleClose = () => {
    setOpen(false);
    setFormData({ ...formData, 
      "first": '', 
      "last": '',
      "dep_first": '', 
      "dep_last": '',
      "temp_first": emp_first,
      "temp_last": emp_last,
      "show": [],
      "indexes": [],
      "temp_cost": cost
    });
    setTheArray(prevArray => []);
    setPrice(0);
    setShow(true);
  };
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  const onDelete = (index) => {
    if (window.confirm('Are you sure you want to remove this dependant?')) {
      show.push(index);
      indexes.push(index);
      setShow(false);
      setCheck(index); // important for delete
      dispatch(setAlert('Dependant removed.', 'success'));
    }
  };

  const addDependant = () => {
    for (let i = 0; i < dependants.length; i++) {
      arr.push(dependants[i]);
    }
    console.log("start: ", arr);
    if (dep_first && dep_last) {
      if (dep_first.charAt(0) === 'A' || dep_last.charAt(0) === 'A') {
        let price = tempCost + 450;
        setPrice(price);
        setFormData({ ...formData, "temp_cost": cost});
      } else {
        let price = tempCost + 500;
        setPrice(price);
        setFormData({ ...formData, "temp_cost": cost});
      }
      console.log("tempCost: ", tempCost);
      console.log("temp_cost: ", temp_cost);
      var full_name = dep_first.concat(" ", dep_last);
      // arr.push(full_name);
      setTheArray(prevArray => [...prevArray, full_name]);
      console.log("add arr: ", arr);
      setFormData({ ...formData, "dep_first": '', "dep_last": ''});
      dispatch(setAlert('Dependant saved.', 'success'));
    }
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    // if employee name is changed show the change in the cost
    cost = cost + tempCost;
    if (temp_first !== emp_first || temp_last !== emp_last) {
      if (emp_first.charAt(0) === 'A' || emp_last.charAt(0) === 'A') {
        cost = (cost - 900);
      } else {
        cost = (cost - 1000);
      }
      if (temp_first.charAt(0) === 'A' || temp_last.charAt(0) === 'A') {
        cost = (cost + 900);
      } else {
        cost = (cost + 1000);
      }
    } 

    let employee = {};
    
    if (indexes.length) {
      let result = [];
      for (let i = 0; i < dependants.length; i++) {
          if (indexes.includes(i) !== true) {
            result.push(dependants[i]);
          } else {
            const myArray = dependants[i].split(" ");
            console.log("myArray[0]: ", myArray[0]);
            if (myArray[0].charAt(0) === 'A' || myArray[1].charAt(1) === 'A'){
              cost = (cost - 450);
            } else {
              cost = (cost - 500);
            }
          }
      }

      employee = {
        "id": id,
        "emp_first": temp_first,
        "emp_last": temp_last,
        "dependants": result,
        "cost": cost
      }
    } else {
      employee = {
        "id": id,
        "emp_first": temp_first,
        "emp_last": temp_last,
        "dependants": arr,
        "cost": cost
      }
    }
    handleClose();
    deleteEmployee(id);
    addEmployee(employee);
    dispatch(setAlert('Employee updated.', 'success'));
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="dialog-top"><h3>Update Employee</h3></DialogTitle>
            <DialogContent sx={{height: 600, width: 500}}>
              <div className="layout">
                <TextField 
                  id="outlined-basic" 
                  label="Employee First Name" 
                  variant="outlined" 
                  name="temp_first"
                  value={temp_first}
                  onChange={onChange}
                />
              </div>
              <div className="layout">
                <TextField 
                  id="outlined-basic" 
                  label="Employee Last Name" 
                  variant="outlined" 
                  name="temp_last"
                  value={temp_last}
                  onChange={onChange}
                />
              </div>
              {dependants[0] && 
                dependants.map((dependant, index) => (
                  (indexes.includes(index) !== true || show_val === true) && 
                    <div id="first" className="layout">
                      <TextField 
                        id="outlined-basic" 
                        label="Dependant Name" 
                        variant="outlined" 
                        inputProps={
                          { readOnly: true, }
                        }
                        value={dependant}
                        onChange={onChange}
                      />
                      <DeleteIcon onClick={() => onDelete(index)} align="right"/>
                    </div>
                ))
              }
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
              <Button variant="contained" className="submit" onClick={onSubmit}>Update</Button>
            </DialogActions>
          </Dialog>
      <div>
        <UpdateIcon className="info" onClick={handleClickOpen}/>
      </div>
    </div>
  );
};


UpdateEmployee.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  employee: state.employee
});

export default connect(mapStateToProps, { addEmployee, deleteEmployee })(UpdateEmployee);
