import React from "react";
import {Button, Popconfirm} from "antd";
import {PushpinOutlined} from "@ant-design/icons";
import TicketSvc from "../../services/TicketSvc";

import './styles.scss';

const PickButton = ({record}) => {
  const pick = async () => {
    await TicketSvc.updateTicket(record._id);
  }

  return (
    <Popconfirm title="Sure to pick?" onConfirm={pick}>
      <Button size="small" icon={<PushpinOutlined/>}>
        Pick
      </Button>
    </Popconfirm>
  );
};

export default PickButton;
