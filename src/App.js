import React from 'react';
import './App.css';
import NestedTable from './NestedTable';
import {FormItem, FormLabel, FormMessage, FormSelect, FormSet } from 'fundamental-react/Forms';
import { Button } from 'fundamental-react/Button';
// import { Table } from 'fundamental-react/Table';
import { Collapse, Card } from 'antd';
import { DatePicker } from 'antd';
import { Table} from 'antd';
import 'antd/dist/antd.css';
const { Panel } = Collapse;
const defineOrg = [{country: 'China', city: ['SHANGHAI','CHENGDU','BEIJING','SHENZHEN']}];
const defineDes = [{country: 'China', city: ['SHANGHAI','CHENGDU','BEIJING','SHENZHEN']}];
// ,{country: 'America', city: ['Palo Alto','San Francisco']},{country: 'German', city: ['Walldorf','München']},{country: 'India', city: ['Bengaluru','New Delhi']}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectCountry: defineOrg[0].country, selectCity: defineOrg[0].city[0],
                  selectCountry1: defineDes[0].country, selectCity1: defineDes[0].city[0],
                 origin: '', destination:'', resultData: [], startValue: null,
                 endValue: null};
  }
  changeCountry(e) {
    this.setState({ selectCountry: e.target.value});
    defineOrg.map((item, index) => {
      if(e.target.value === item.country) {
        this.setState({ selectCity: item.city[0]});
      }
      return true;
    })
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };


  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  changeDepartureDate = value =>{
    this.onChange('startValue', value);
  }


  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  changeReturnDate = value =>{
    this.onChange('endValue', value);
  }


  changeCountry1(e) {
    this.setState({selectCountry1: e.target.value});
    defineDes.map((item, index) => {
      if(e.target.value === item.country) {
        this.setState({ selectCity1: item.city[0]});
      }
      return true;
    })
  }

  changeCity(e) {
    this.setState({ selectCity: e.target.value });
  };

  changeCity1(e) {
    this.setState({ selectCity1: e.target.value });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    let that = this;
    let url = 'https://itinerary-service.cfapps.eu10.hana.ondemand.com/recommend';
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({'origin': this.state.selectCity, 'destination':this.state.selectCity1, 'employee': this.props.location.state.inumber, 'department':  this.props.location.state.depart, 'departureDate': this.state.startValue.format('YYYY-MM-DD'), 'returnDate': this.state.endValue.format('YYYY-MM-DD')}),
    }).then(response => response.json()).then(function(res) {
        if (res.recommend.length > 0){
         let child = [];
         let main = [];
         let arr = res.recommend.map((item, index) => {
          let {confidence,  transportationToDepartureTime, transportationToArrivalTime} = item;
          var mainData = Object.assign({},{key:index,confidence, transportationToDepartureTime, transportationToArrivalTime});
          delete item.confidence;
          delete item.transportationType;
          var childData = {...item,key:index};
          child.push(childData);
          main.push(mainData);
         });
         that.setState({'resultData' : {child,main}});
        }
    });
  }

  render(){
    const Country = defineOrg.map((item, index) => {
      return <option key={index}>{item.country}</option>
    });
    const City = defineOrg.map((item, index) => {
      if(this.state.selectCountry === item.country) {
        return item.city.map((item, index) =>
          <option key={index}>{item}</option>
        )
      }
      return true;
    });

    const Country1 = defineDes.map((item, index) => {
      return <option key={index}>{item.country}</option>
    });
    const City1 = defineDes.map((item, index) => {
      if(this.state.selectCountry1 === item.country) {
        return item.city.map((item, index) =>
          <option key={index}>{item}</option>
        )
      }
      return true;
    });
    const { startValue, endValue, endOpen } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <span>
            Welcome {this.props.location.state.uname} !
          </span>
        </header>
        <div>
            <Collapse>
              <Panel header="Type your query by clicking here" key="1">
                <div className="form-entry">
                <FormSet key='start_date'>
                  <FormItem>
                <FormLabel htmlFor="startDate">
                  Travel Start Date
                </FormLabel>
                <div className="fd-doc__margin--datePicker" key='data_picker'>
                    <DatePicker value={startValue} onChange={this.changeDepartureDate.bind(this)} disabledDate={this.disabledStartDate} onOpenChange={this.handleStartOpenChange}/>
                </div>
                <FormMessage type="help">
                  The date you start to travel
                </FormMessage>
              </FormItem>
                  </FormSet>
                  <FormSet>
              <FormItem>
                <FormLabel htmlFor="endDate">
                  Travel End Date
                </FormLabel>
                <div className="fd-doc__margin--datePicker">
                    <DatePicker value={endValue} open={endOpen} onChange={this.changeReturnDate.bind(this)} disabledDate={this.disabledEndDate}  onOpenChange={this.handleEndOpenChange}/>
                </div>
                <FormMessage type="help">
                  The date you end to travel
                </FormMessage>
              </FormItem>
            </FormSet>
                  <FormSet>
                  <FormItem>
                <FormLabel htmlFor="arrivalDay">
                  Hotel Arrival Day
                </FormLabel>
                <div className="fd-doc__margin--datePicker">
                  <DatePicker
                    key="arrivalDay"
                    disableBeforeDate={new Date("2018-12-23T16:00:00.000Z")}
                    disableWeekends
                    value={startValue}
                  />
                </div>
                <FormMessage type="help">
                  The date you arrive in hotel
                </FormMessage>
              </FormItem>
                  </FormSet>
                  <FormSet>
              <FormItem>
                <FormLabel htmlFor="departDay">
                  Hotel Depart Day
                </FormLabel>
                <div className="fd-doc__margin--datePicker">
                  <DatePicker
                    key="departDay"
                    disableBeforeDate={new Date("2018-12-23T16:00:00.000Z")}
                    disableWeekends
                    value={endValue}
                    disabled
                  />
                </div>
                <FormMessage type="help">
                  The date you depart from hotel
                </FormMessage>
              </FormItem>
            </FormSet>
                  <FormSet>
                  <FormItem>
                      <FormLabel htmlFor="fromCountry">
                        From Country
                      </FormLabel>
                      <FormSelect id="fromCountry" value={this.state.selectCountry} onChange={this.changeCountry.bind(this)}>
                        {Country}
                      </FormSelect>
                      <FormMessage type="help">
                        The country you original start
                      </FormMessage>
                    </FormItem>
                  </FormSet>
                  <FormSet>
              <FormItem>
                <FormLabel htmlFor="fromCity">
                  From City
                </FormLabel>
                <FormSelect id="fromCity" value={this.state.selectCity} onChange={this.changeCity.bind(this)}>
                  {City}
                </FormSelect>
                <FormMessage type="help">
                  The city you original start
                </FormMessage>
              </FormItem>
            </FormSet>
                  <FormSet>
              <FormItem>
                <FormLabel htmlFor="toCountry">
                  To Country
                </FormLabel>
                <FormSelect id="fromCountry" value={this.state.selectCountry1} onChange={this.changeCountry1.bind(this)}>
                  {Country1}
                </FormSelect>
                <FormMessage type="help">
                  The country is your destination
                </FormMessage>
              </FormItem>
            </FormSet>
                  <FormSet>
              <FormItem>
                <FormLabel htmlFor="toCity">
                  To City
                </FormLabel>
                <FormSelect id="fromCity" value={this.state.selectCity1} onChange={this.changeCity1.bind(this)}>
                  {City1}
                </FormSelect>
                <FormMessage type="help">
                  The city is your destination
                </FormMessage>
              </FormItem>
                </FormSet>
                  <div>
                    <Button className="fd-button" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              </Panel>
            </Collapse>
            <Card>
              {/* <Table
                    headers={[
                      'Confidence',
                      'Hotel Name',
                      'Return Flight',
                      'Return Airport',
                      'Return Time',
                      'Arrival Airport',
                      'Arrival Time',
                      'Depature Flight',
                      'Departure Airport',
                      'Departure Time',
                      'Arrival Airport',
                      'Arrival Time',
                      'Transport Type',
                      'Hotel Phone Number',
                      'Hotel Address',
                      'Hotel Price per night (Average)',
                      'Hotel Rating'
                    ]}
                    tableData={this.state.resultData}
                  /> */}
                  <NestedTable childData={this.state.resultData.child}  mainData={this.state.resultData.main}/>
            </Card>
        </div> 
      </div>
    );
  }
  
}

export default App;

