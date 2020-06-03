import React from "react";
import {Table, Typography} from "antd";
import {connect} from 'react-redux';

import {columns} from "../../constants";
import PickButton from "../PickButton"

import './styles.scss';

const cols = [
  ...columns,
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return <PickButton record={record}/>
    },
  },
];

const OpenedTickets = ({tickets}) => (
  <section>
    <Typography.Title level={4}>Opened Tickets</Typography.Title>
    <Table columns={cols} dataSource={tickets}/>
  </section>
);

const mapStateToProps = ({tickets: {opened: tickets}}) => {
  return ({
    tickets
  });
};

export default connect(mapStateToProps, null)(OpenedTickets);
