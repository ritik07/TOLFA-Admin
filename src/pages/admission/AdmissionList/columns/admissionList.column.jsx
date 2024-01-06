import { Button, Image, QRCode } from "antd";
import { BASE_URL_ASSET } from "../../../../constants/server";
import { CloudDownloadOutlined } from '@ant-design/icons'
import defaultImage from '../../../../static/images/dummy/image_1698585850921.jpeg'

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const admissionColumn = (handleViewDetail) => [

  {
    title: "Rescue No.",
    dataIndex: "rescue_no",
    key: "rescue_no",
    // render: (data, items) => {
    //   return <div>
    //     {items.rescue_type_name === "small" ? <div>{"S" + data}</div> : <div>{"L" + data}</div>}
    //   </div>
    // }
  },
  {
    title: "Rescue Type",
    dataIndex: "rescue_no",
    key: "rescue_no",
    render: (data, items) => {
      return <div>
        {items.rescue_type_name === "small" ? <div>{"S" + data}</div> : <div>{"L" + data}</div>}
      </div>
    }
  },
  {
    title: "Image",
    dataIndex: "animal_image",
    key: "animal_image",
    render: (data) => (
      <div>
        <Image src={BASE_URL_ASSET + data}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          className="admission-table-profile-image" />
      </div>
    ),
  },
  {
    title: "Species",
    dataIndex: "species_name",
    key: "species_name",
  },
  {
    title: "Type of rescue",
    dataIndex: "rescue_type_name",
    key: "rescue_type_name",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
    render: (data) => {
      return <div>
        {data ? "Male" : "Female"}
      </div>
    }
  },
  {
    title: "Status",
    dataIndex: "animal_status_name",
    key: "animal_status_name",
  },
  {
    title: "Condition",
    dataIndex: "condition_value",
    key: "condition_value",
  },
  {
    title: "Breed",
    dataIndex: "breed_name",
    key: "breed_name",
  },
  {
    title: "ABC status",
    dataIndex: "abc_status",
    key: "breed",
  },
  {
    width: "160px",
    title: "QR Code",
    dataIndex: "action",
    key: "action",
    render: (data, rowdata) => {
      // Assuming there is a server endpoint "/getQRCodeData" that takes an ID parameter
      const qrCodeDataUrl = JSON.stringify({
        "Rescue NO": rowdata.rescue_no,
        name: rowdata.animal_name,
        sex: rowdata.sex ? "Male" : "Female",
        breed: rowdata.breed_name,
        condition: rowdata.condition_value,
        status: rowdata.animal_status_name
      });

      return (
        <>
          <div id="myqrcode" className="cs-dis-flex">
            <div className="cs-vt-center cs-dis-flex">
              <QRCode
                size={80}
                value={qrCodeDataUrl}
                bgColor="#fff"
                style={{
                  marginBottom: 16,
                }}
              />
            </div>

            <div className="cs-vt-center cs-dis-flex cs-lm-10">
              <Button style={{ borderRadius: "50%" }} icon={<CloudDownloadOutlined />} type="primary" onClick={downloadQRCode}>
              </Button>
            </div>
          </div>
        </>
      );
    },
  },
  {
    width: "160px",
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: (data, rowdata) => {
      return (
        <div>
          <Button onClick={() => handleViewDetail(rowdata)} className="cs-theme-button-invert">
            View Details
          </Button>
        </div>
      )
    }
  },
];
