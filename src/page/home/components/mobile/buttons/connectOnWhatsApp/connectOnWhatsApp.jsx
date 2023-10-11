import React, { useState, useEffect, useRef } from 'react'
import { Col, Row, Typography, } from 'antd'
import './connectOnWhatsApp.css'
import { WhatsAppOutlined } from '@ant-design/icons'
import { BASE_URL_ASSET } from '../../../../../../constant'
import AddressModal from '../../address/addressModal'


const ConnectOnWhatsApp = ({ productData }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [openAddressModal, setOpenAddressModal] = useState(false)
  // const addressRef = useRef(null);

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

    // Create the WhatsApp URL with the appropriate parameters
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open the WhatsApp app with the pre-filled message
    window.open(whatsappURL);
  }


  const handleWA = () => {
    setOpenAddressModal(true)
  }

  return (
    <div>
      <Row>
        <Col xs={24}>
          <div className='cs-connect-on-wa-btn'>
            <Typography.Title level={5} className='cs-center' onClick={handleWA}>
              <div className='cs-dis-flex'>
                <div className='cs-clr-fff'>
                  Contact on
                </div>
                <div className='cs-lm-10 cs-clr-fff'>
                  <WhatsAppOutlined />
                </div>
              </div>
            </Typography.Title>
          </div>
        </Col>
      </Row>
      {openAddressModal &&
        <AddressModal productData={productData} open={openAddressModal} setOpen={setOpenAddressModal} />
      }

    </div>
  )
}

export default ConnectOnWhatsApp