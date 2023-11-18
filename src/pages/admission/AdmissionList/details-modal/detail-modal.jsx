import React, { useState } from 'react';
import { Button, Modal, Tabs, Drawer } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { TABS_ITEM } from './details-modal.constant';
import AnilmalInfo from './tabs/animal-info/anilmalInfo';
import TolfaRescueLocation from './tabs/tolfa-rescue-location/rescue-location';

const DetailModal = ({ setShowModal, rowData }) => {
  console.log("rowData", rowData);

  const onClose = () => {
    setShowModal(false);
  };

  const getTabs = () => {
    const getChildren = (i) => {
      switch (i) {
        case "anilmal-info":
          return <AnilmalInfo rowData={rowData} />

        case "tolfa-rescue-location":
          return <TolfaRescueLocation rowData={rowData} />

        default:
        // code block
      }
    }
    return (
      <Tabs
        defaultActiveKey="2"
        items={TABS_ITEM.map((item, i) => {
          return {
            label: (
              <span>
                {item.name}
              </span>
            ),
            key: item.id,
            children: getChildren(item.id),
          };
        })}
      />

    )
  }

  return (
    <>
      <Drawer width={"86%"} title="Animals Details" placement="right" onClose={onClose} open={true}>
        {getTabs()}
      </Drawer>
    </>
  );
};
export default DetailModal;