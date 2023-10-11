import React, { useState, useEffect } from 'react'
import { Button, Drawer, Row, Col, Typography, Card, Space } from 'antd';
import AddNewAddress from './addNewAddress';
import ConnectOnWhatsApp from '../buttons/connectOnWhatsApp/connectOnWhatsApp';
import { BASE_URL_ASSET } from '../../../../../constant';

const AddressModal = ({ open, setOpen, productData }) => {
  /**
   * @states
   */
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [addressList, setAddressList] = useState(false)
  const [userLocation, setUserLocation] = useState(null);

  /**
   * @useeffect
   */

  useEffect(() => {
    getAddressData()
  }, [])

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ('geolocation' in navigator) {
      // Request the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  /**
   * @Functions
   */

  const sendWA = () => {
    // Define the WhatsApp number and message content
    const phoneNumber = '+918169745550'; // Replace with the actual WhatsApp number
    let message = `Hi, I'm interested in the product: ${productData.name}, Price: ${productData.sell_price}, UID: ${productData.id}`;

    // Include a link to the product image
    message += `\nProduct Image: ${BASE_URL_ASSET + "/" + productData.image}`; // Replace with the actual image URL

    // Include user's location if available
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      message += `\nMy location: https://maps.google.com/?q=${latitude},${longitude}`;
    }

    // Include user's address
    const userAddress = addressList.find((x) => x.active)

    message += `\nAddress: ${userAddress.name}, ${userAddress.flat}, ${userAddress.area}, ${userAddress.landmark}, ${userAddress.city}, ${userAddress.state}, Pincode: ${userAddress.pincode}`;

    // Create the WhatsApp URL with the appropriate parameters
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open the WhatsApp app with the pre-filled message
    window.open(whatsappURL);
  }


  const getAddressData = () => {
    let getAddressList = JSON.parse(localStorage.getItem('addressList'))
    setAddressList(getAddressList)
  }


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOnAddAddress = () => {
    setOpenAddAddress(true)
  }

  const handleItemClick = (index) => {
    const updatedItems = [...addressList];

    // Set the clicked item as active and the rest as inactive
    updatedItems.forEach((item, i) => {
      item.active = i === index;
    });
    setAddressList(updatedItems)
    localStorage.setItem('addressList', JSON.stringify(addressList))
  };

  return (
    <div>
      <Drawer title="Address detail" placement="right" onClose={onClose} open={open}>

        {!addressList ?
          <div className='cs-bm-40'>
            <Typography.Title level={3} >
              No existing address found please add a address to continue
            </Typography.Title>
          </div>
          :
          <div>
            {addressList.map((item, index) => {
              return (
                <Card className={item.active && "cs-active-card"} onClick={() => handleItemClick(index)}>
                  <Row gutter={[20, 20]}>
                    <Col xs={24}>
                      <Typography.Title level={5}>
                        {item.name}
                      </Typography.Title>
                    </Col>

                    <Col xs={24}>
                      <Space direction='vertical'>
                        <Typography.Text>
                          {item.flat}
                        </Typography.Text>

                        <Typography.Text>
                          {item.area}
                        </Typography.Text>

                        <Typography.Text>
                          {item.city}
                        </Typography.Text>

                        <Typography.Text>
                          pincode:  {item.pincode}
                        </Typography.Text>

                        <Typography.Text>
                          phone number:  {item.mobno}
                        </Typography.Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>

              )
            })}
          </div>
        }

        <Row className='cs-tm-40'>
          <Col xs={24}>
            <Button onClick={handleOnAddAddress} type='dashed' style={{ width: "100%", }}>
              Add new address
            </Button>
            {addressList?.length &&
              <Button
                onClick={() => sendWA()}
                style={{ width: "100%", backgroundColor: "#00AC3F", color: "#fff", borderRadius: "8px" }} className='cs-tm-20'>
                Proceed to order
              </Button>
            }
          </Col>
        </Row>
        {openAddAddress &&
          <>
            <AddNewAddress open={openAddAddress} setOpen={setOpenAddAddress} setAddressList={setAddressList} />
          </>
        }

      </Drawer>
    </div>
  )
}

export default AddressModal