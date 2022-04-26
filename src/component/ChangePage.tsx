import { Table, Row, Col, Divider, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../../assets/css/style.css';
import { useState } from 'react';

const accountColumns = [
  {
    title: 'Stt',
    width: '5%',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    width: '10%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '18%',
  },
  {
    title: 'birthday',
    dataIndex: 'birthday',
    width: '10%',
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    width: '10%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: '7%',
  },
  {
    title: 'friendCount',
    dataIndex: 'friendCount',
    width: '10%',
  },
  {
    title: 'groupCount',
    dataIndex: 'groupCount',
    width: '10%',
  },
  {
    title: 'device',
    dataIndex: 'device',
    width: '10%',
  },
  {
    title: 'completedAt',
    dataIndex: 'completedAt',
    width: '10%',
  },
]

const deviceColumns = [
  {
    title: 'Device',
    dataIndex: 'device',
    width: '10%',
  },
  {
    title: 'Serial',
    dataIndex: 'serial',
    width: '15%',
  },
  {
    title: 'Report',
    dataIndex: 'report',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '30%',
  },
  {
    title: 'Action',
    width: '35%',
  },
];

interface DeviceType {
  key: React.Key;
  device: string;
  serial: string;
  report: string;
  status: string;
}

interface AccountType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  birthday: string;
  category: string;
  status: string;
  friendCount: number;
  groupCount: number;
  device: string;
  completedAt: string;
}

const deviceData: DeviceType[] = [
  {
    key: '1',
    device: 'SGP521',
    serial: '23a178611a027ece',
    report: '0 / 0',
    status: '10:12: Hoàn thành',
  },
  {
    key: '2',
    device: 'SGP522',
    serial: '23a178611a027ecf',
    report: '0 / 0',
    status: '10:13: Hoàn thành',
  },
  {
    key: '3',
    device: 'SGP523',
    serial: '23a178611a027ecg',
    report: '0 / 0',
    status: '10:14: Hoàn thành',
  },
  {
    key: '4',
    device: 'SGP523',
    serial: '23a178611a027ech',
    report: '0 / 0',
    status: '10:15: Hoàn thành',
  },
]

const accountData: AccountType[] = [
  {
    key: '1',
    id: '100045708169083',
    name: 'Lien Phan Kim',
    email: 'kimlien1962@gmail.com',
    birthday: '20/10/1962',
    category: 'Shopping',
    status: 'Live',
    friendCount: 20,
    groupCount: 10,
    device: 'SGP521',
    completedAt: '26-04-2022 14:03',
  }
]

const deviceRowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DeviceType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record: DeviceType) => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // name: record.name,
  }),
};

const accountRowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DeviceType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record: DeviceType) => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // name: record.name,
  }),
};

export const ChangePage = () => {
  const [fileList, setFileList] = useState([])
  const [importing, setImporting] = useState(false)
  const handleImport = () => {
    setImporting(true)
  };
  const props = {
    // @ts-ignore
    onRemove: (file) => {
      // @ts-ignore
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList)
    },
    // @ts-ignore
    beforeUpload: (file) => {
      // @ts-ignore
      setFileList([...fileList, file])
      return false
    },
    fileList,
  };
  // @ts-ignore
  const uploadComponent = <Upload {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
  </Upload>
  return <>
      <div style={{height: "700px", overflow: "auto", backgroundColor: "white"}}>
        <Divider orientation="left" orientationMargin={20}>Thông tin Acccount</Divider>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...{rowSelection: accountRowSelection},
          }}
          columns={accountColumns}
          dataSource={accountData}
          pagination={false}
        />
      </div>
      <div style={{backgroundColor: "white"}}>
        <Row>
          <Col span={12}>
            <Divider orientation="left" orientationMargin={20}>Config Account</Divider>
            <div style={{paddingLeft: "20px"}}>
              {uploadComponent}
              <Button
                type="primary"
                onClick={handleImport}
                disabled={fileList.length === 0}
                loading={importing}
                style={{ marginTop: 16 }}
              >
                {importing ? 'Importing...' : 'Start Import'}
              </Button>
            </div>
          </Col>

          <Col span={12}>
            <Divider orientation="left" orientationMargin={20}>Thông tin Device</Divider>
            <div style={{height: "400px", overflow: "auto", backgroundColor: "white"}}>
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...{rowSelection: deviceRowSelection},
                }}
                columns={deviceColumns}
                dataSource={deviceData}
                pagination={false}
              />
            </div>
            <div style={{marginTop: "10px", marginBottom: "10px", textAlign: "center"}}>
              <Button type="primary">Load device</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
}
