import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { getBeverageCollection, getBeverageByLocation } from '../actions/beverages';

import Nav from './general/Nav';
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
    minWidth: '30rem',
    padding: 'auto',
    margin: 'auto',
    flex: 1
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
  }
});

class Home extends Component {
  state = {
    lat: '',
    lng: '',
    today: '',
    product_id: '',
    daysOfTheWeek: [
      'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
    ]
  };

  showPosition = async position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const date =  new Date();
    const today = date.getDay();
    this.setState({lat, lng, today: this.state.daysOfTheWeek[today]});

    this.props.dispatch(getBeverageCollection());
  };

  componentDidMount() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.showPosition);
    else console.log('Browser does not support geo location');
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

  renderTime = drink => {
    const time = [];
    drink.toString().split('').reverse()
    .forEach((e, i) => { if (i === 2) time.push(`${e}:`); else time.push(e); });
    return time.reverse().join('').replace(',', '');
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
            Select a Drink
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
      {
        !stores || stores.length < 1
        ? <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding='dense' style={{textAlign: 'center'}}><p>No Selection</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.cell} style={{textAlign: 'center'}}>
                {
                  stores && stores.length < 1 && this.state.product_id !== ''
                  ? 'No inventory is available at any stores near you'
                  : 'No selection has been made'
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        : <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding='none' style={{paddingLeft: 10}}>
              <p>Address</p>
            </TableCell>
            <TableCell padding='dense'><p>Hours Open</p></TableCell>
            <TableCell padding='dense'><p>Parking</p></TableCell>
            <TableCell padding='dense'><p>Inventory</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { stores.forEach(e => {
              console.log({ lat: e.latitude, lng: e.longitude })
            })}
          {
            stores.map(drink => {
              return (
                <TableRow key={drink.id} id={drink.id}>
                  <TableCell style={{paddingLeft: 10}}>
                    {drink.address_line_1} {drink.address_line_2}, {drink.city}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    { 
                      this.renderTime(drink[`${today}_open`])
                    } - {
                      this.renderTime(drink[`${today}_close`])
                    }
                  </TableCell>
                  <TableCell className={classes.cell}>{
                    drink.has_parking > 0 ? 'Yes' : 'No'
                  }</TableCell>
                  <TableCell className={classes.cell}>{
                    drink.inventory_count > 0 ? 'In Stock' : 'Out of Stock'
                  }</TableCell>
                </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      }
    </main>
  };
};

const mapStateToProps = state => {
  return {
    beverages: Object.values(state.beverages).map(e => e),
    stores: Object.values(state.stores).map(e => e)
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));
