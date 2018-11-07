import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { getBeverageCollection } from '../actions/beverages';

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
});

class Home extends Component {
  state = {
    lat: '',
    lng: '',
    beverage: ''
  };

  showPosition = async position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.setState({lat, lng}, () => console.log(this.state));

    this.props.dispatch(getBeverageCollection());
  };

  componentDidMount() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.showPosition);
    else console.log('Browser does not support geo location');
  };

  handleChange = name => e => this.setState({ beverage: e.target.value });

  loadBeverages = e => {
    console.log(e.target.value);
    // this.props.dispatch({product: e.target.value});
  };

  render() {
    const { classes, beverages } = this.props;

    return <main>
      <Nav />
      <form noValidate autoComplete="off" className={classes.form}>
        {/* <Button
          onClick={this.loadBeverages}
          variant='raised'
          color='primary'
          className={classes.submit}
        >
          Search
        </Button> */}
        <FormControl variant="outlined" className={classes.select}>
          <InputLabel
            ref={ref => this.InputLabelRef = ref}
            htmlFor="drink-list"
          >
            Drinks
          </InputLabel>
          <Select
            value={this.state.beverage}
            onClose={this.handleChange}
            input={ <Input name='beverages' id='drink-list' /> }
          >
            <MenuItem value=''><em>None</em></MenuItem>
            {
              beverages && beverages.map(e => <MenuItem
                  key={e.id}
                  value={e.name}
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
            <TableCell padding="none" style={{paddingLeft: 10, width: '5rem'}}><p>Name</p></TableCell>
            <TableCell padding="dense"><p>Origin</p></TableCell>
            <TableCell padding="dense"><p>Category</p></TableCell>
            <TableCell padding="dense"><p>Inventory</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            beverages && beverages.map(drink =>
              <TableRow key={drink.id} id={drink.id}>
                <TableCell style={{paddingLeft:10, width:'5rem'}}>{drink.name}</TableCell>
                <TableCell className={classes.cell}>{drink.origin}</TableCell>
                <TableCell className={classes.cell}>{drink.secondary_category}</TableCell>
                <TableCell className={classes.cell}>{drink.inventory_count}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </main>
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    beverages: Object.values(state.beverages).map(e => e)
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));
