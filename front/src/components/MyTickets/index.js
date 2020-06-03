import React from "react";
import {Table, Typography} from "antd";
import {connect} from 'react-redux';

import {columns} from "../../constants";

import './styles.scss';

const MyTickets = ({tickets}) => (
  <section>
    <Typography.Title level={4}>Opened Tickets</Typography.Title>
    <Table columns={columns} dataSource={tickets}/>
  </section>
)

const mapStateToProps = ({tickets: {my: tickets}}) => {
  return ({
    tickets
  });
};

export default connect(mapStateToProps, null)(MyTickets);
