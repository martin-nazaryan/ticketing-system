import React, {useEffect} from "react";
import {Button, Col, Layout, Popconfirm, Row, Typography} from "antd";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import cookies from "js-cookie";
import {useHistory} from 'react-router-dom';

import OpenedTickets from "../../OpenedTickets";
import MyTickets from "../../MyTickets";
import TicketSvc from "../../../services/TicketSvc";
import {setMyTickets, setOpenedTickets} from "../../../store/actions/tickets/actions";
import {ACCESS_TOKEN} from "../../../constants";

import './styles.scss';
import io from "socket.io-client";

const Tickets = ({setOpenedTickets, setMyTickets}) => {
  const history = useHistory();

  useEffect(() => {
    try {
      TicketSvc.getTickets();

      const socket = io(process.env.REACT_APP_API_URL, {
        query: {
          token: cookies.get(ACCESS_TOKEN)
        }
      });

      socket.on('connect', () => {
        console.log('connect');
      });

      socket.on('openedTickets', (data) => {
        const tickets = data.map(ticket => ({...ticket, key: ticket._id}));
        setOpenedTickets(tickets);
      });

      socket.on('myTickets', (data) => {
        const tickets = data.map(ticket => ({...ticket, key: ticket._id}));
        setMyTickets(tickets);
      });

      return () => {
        socket.disconnect();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const logout = () => {
    cookies.remove(ACCESS_TOKEN);
    history.push('/login');
  }

  return (
    <Layout>
      <Layout.Header>
        <Typography.Title level={4} type="warning" className="logo">Ticketing System</Typography.Title>
        <Popconfirm title="Sure to logout?" onConfirm={logout}>
          <Button type="primary" className="logout-button">Logout</Button>
        </Popconfirm>
      </Layout.Header>
      <Layout.Content>
        <Row>
          <Col span={12} className="content">
            <OpenedTickets/>
          </Col>
          <Col span={12} className="content">
            <MyTickets/>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    setOpenedTickets,
    setMyTickets
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(Tickets);
