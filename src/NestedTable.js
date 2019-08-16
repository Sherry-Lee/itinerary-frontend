
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button} from 'antd';

class NestedTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.columns1 = [
        { title: 'Confidence', dataIndex: 'confidence', key: 'confidence' },
        { title: 'Departure Time', dataIndex: 'transportationToArrivalTime', key: 'transportationToArrivalTime' },
        { title: 'Return Time', dataIndex: 'transportationToDepartureTime', key: 'transportationToDepartureTime' },
        // { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Action', key: 'operation', render: () => <Button onClick={this.bookEvent}>Book</Button> }
        ];
    }

    bookEvent = () => {
        alert('Book Successfully!');
    }

    expandedRowRender(record,i){
    let columns = [
        { title: 'Departure Flight', dataIndex:'transportationTo', key: 'transportationTo'},
        { title: 'Departure Airport', dataIndex:'transportationToDepartureAirport', key: 'transportationToDepartureAirport'},
        { title: 'Return Flight', dataIndex: 'transportationBack', key: 'transportationBack'},
        { title: 'Return Departure Airport', dataIndex: 'transportationBackDepartureAirport', key: 'transportationBackDepartureAirport' },
        { title: 'Start Time', dataIndex: 'transportationToArrivalTime', key: 'transportationToArrivalTime' },
        { title: 'End Time', dataIndex: 'transportationBackArrivalTime', key: 'transportationBackArrivalTime' },
        { title: 'Hotel', dataIndex: 'hotel', key: 'hotel' },
        { title: 'Phone Number', dataIndex: 'phone', key: 'phone'},
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Price(per night/per flight)', dataIndex: 'price', key: 'price' },
        { title: 'Rating', dataIndex: 'rating', key: 'rating' }
    ];

    return <Table columns={columns} dataSource={[this.props.childData[i]]} pagination={false} />;
  };

  render(){
      return(
        <Table
        className="components-table-demo-nested"
        columns={this.columns1}
        expandedRowRender={this.expandedRowRender.bind(this)}
        dataSource={this.props.mainData}
        />
      );
    }
}



export default NestedTable;
          