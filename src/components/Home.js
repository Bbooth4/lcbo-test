import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { getBeverageCollection, getBeverageByLocation } from '../actions/beverages';

import Nav from './general/Nav';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    height: '100vh'
  },
  form: {
    flexGrow: 1,
    margin: '5rem auto',
    maxWidth: '20%'
  },
  submit: {
    display: 'block',
    width: '100%'
  },
  select: {
    minWidth: '20rem',
    padding: '5rem auto',
    margin: '1rem auto',
  },
  dropzone: {
    cursor: 'pointer',
    display: 'hidden'
  },
  link: {
    cursor: 'pointer'
  },
  cell: {
    whiteSpace: 'nowrap',
    verticalAlign: 'center',
  },
  addressCell: {
    whiteSpace: 'wrap',
    verticalAlign: 'center',
  }
});

class Home extends Component {
  state = {
    lat: '',
    lng: '',
    today: '',
    product_id: '',
    hoursOpen: '',
    hoursClose: '',
    daysOfTheWeek: [
      'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
    ]
  };

  showPosition = async position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const date =  new Date();
    const today = date.getDay();
    this.setState({lat, lng, today: this.state.daysOfTheWeek[today]}, () => console.log(this.state));

    this.props.dispatch(getBeverageCollection());
  };

  componentDidMount() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.showPosition);
    else console.log('Browser does not support geo location');
  };

  renderTodaysHours = drink => {
    const { today } = this.state;
    // Object.entries(drink).forEach(([key, value], i) => {
    //   if (new RegExp(today).test(key)) this.setState({[key]: value});
    // });
  };

  handleChange = e => {
    const { lat, lng } = this.state;
    const value = e.target.value;
    if (value === '') this.props.dispatch({type: 'CLEAR', data: {} });
    else {
      setTimeout(e => this.setState({ product_id: value }), 500);
      this.props.dispatch(getBeverageByLocation({lat, lng, id: e.target.value}));
    };
  };

  render() {
    const { classes, beverages, stores } = this.props;
    const { today } = this.state;

    return <main>
      <Nav />
      <form noValidate autoComplete='off' className={classes.form}>
        <FormControl variant='outlined' className={classes.select}>
          <InputLabel
            ref={ref => this.InputLabelRef = ref}
            htmlFor='drink-list'
          >
            Drinks
          </InputLabel>
          <Select
            value={this.state.product_id}
            onChange={this.handleChange}
            input={ <Input name='beverages' id='drink-list' /> }
          >
            <MenuItem value=''><em>None</em></MenuItem>
            {
              beverages && beverages.map(e =>
                <MenuItem
                  key={e.id}
                  value={e.id}
                >
                  {e.name}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
      </form>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding='none' style={{paddingLeft: 10}}>
              <p>Address</p>
            </TableCell>
            <TableCell padding='dense'><p>Hours Open</p></TableCell>
            <TableCell padding='dense'><p>Parking</p></TableCell>
            <TableCell padding='dense'><p>Inventory</p></TableCell>
            {/* <TableCell padding='dense'><p>Inventory</p></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            !stores || stores.length < 1
            ? <TableRow>
              <TableCell style={{paddingLeft: 10}}></TableCell>
              <TableCell className={classes.cell}></TableCell>
              <TableCell className={classes.cell} style={{textAlign: 'center'}}>
                {
                  stores && stores.length < 1 && this.state.product_id !== ''
                  ? 'No inventory is available at any stores new you'
                  : 'No selection has been made'
                }
              </TableCell>
              <TableCell className={classes.cell}></TableCell>
            </TableRow>
            : stores.map(drink => {
              return (
                <TableRow key={drink.id} id={drink.id}>
                  <TableCell style={{paddingLeft: 10}}>
                    {drink.address_line_1} {drink.address_line_2}, {drink.city}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    { drink[`${today}_open`] } - { drink[`${today}_close`] }
                  </TableCell>
                  <TableCell className={classes.cell}>{
                    drink.has_parking > 0 ? 'Yes' : 'No'
                  }</TableCell>
                  <TableCell className={classes.cell}>{
                    drink.inventory_count > 0 ? 'In Stock' : 'Out of Stock'
                  }</TableCell>
                  {/* <TableCell className={classes.cell}>.</TableCell> */}
                </TableRow>
              )
            }
            )
          }
        </TableBody>
      </Table>
    </main>
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    beverages: Object.values(state.beverages).map(e => e),
    stores: Object.values(state.stores).map(e => e)
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));
