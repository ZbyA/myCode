import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import ShopType from "../../config/shopType";
import Events from "../../event/busEvent";
import UpdataPic from "../updata/updata";
import config from "../../config/config";
const { shopType, picType } = ShopType;
const { ServerApi, StorageName, FilePath } = config;
const { Option } = Select;
export default class userForm extends React.Component {
  formRef = React.createRef();
  state = {};
  componentDidMount() {
    this.props.onFormRef(this);
    Events.on("addShop", this.addShop);
    Events.on("updataShop", this.updataShop);
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue(this.state.record);
  }
  updataShop = (e) => {
    this.setState(
      {
        formType: "updata",
        record: e,
      },
      () => {
        this.updateChild.updatePic(FilePath + this.state.record.headPic);
      }
    );
  };
  addShop = (e) => {
    this.setState({
      formType: "add",
      record: e,
    });
  };
  getPic = (data) => {
    this.formRef.current.setFieldsValue({
      shopPic: data.headPath,
    });
  };
  delPic = () => {
    this.formRef.current.setFieldsValue({
      shopPic: null,
    });
  };
  createSel(data) {
    return (
      <Select style={{ width: 150 }}>
        {data.map((item) => {
          return (
            <Option key={item.name} value={item.val}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    );
  }
  sendData(val) {
    // if (this.state.record._id) {
    //   val._id = this.state.record._id;
    // }
    val.token = this.$utils.getStorage(StorageName.token);
    console.log(val);
    // let data = this.$crypto.setCrypto(val);
    // let _url =
    //   this.state.formType == "add"
    //     ? ServerApi.user.addUser
    //     : ServerApi.user.updateUser;
    // this.$axios
    //   .post(_url, { crypto: data })
    //   .then((res) => {
    //     switch (res.result) {
    //       case 1:
    //         message.success(res.msg);
    //         this.props.onClose();
    //         this.props.getList();
    //         break;
    //       case 0:
    //         message.warning(res.msg);
    //         break;
    //       default:
    //         // message.warning(res.msg);
    //         break;
    //     }
    //   })
    //   .catch((err) => {
    //     message.error("操作失败");
    //   });
  }
  render() {
    return (
      <Form
        layout="vertical"
        hideRequiredMark
        ref={this.formRef}
        onFinish={this.sendData.bind(this)}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="shopPic"
              rules={[{ required: true, message: "请上传商品图片" }]}
              label="商品图片"
            >
              <UpdataPic
                onUpdateRef={(child) => {
                  this.updateChild = child;
                }}
                picTarget={this.getPic}
                picDelete={this.delPic}
              ></UpdataPic>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="shopType"
              label="商品类型"
              rules={[{ required: true, message: "请选择商品类型" }]}
            >
              {this.createSel(shopType)}
            </Form.Item>
            <Form.Item
              name="picType"
              label="图片类型"
              rules={[{ required: true, message: "请选择图片类型" }]}
            >
              {this.createSel(picType)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="shopName"
              label="商品名称"
              rules={[{ required: true, message: "请输入商品名称" }]}
            >
              <Input placeholder="请输入商品名称" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="shopNum"
              label="库存"
              rules={[{ required: true, message: "请输入库存" }]}
            >
              <InputNumber min={1} max={999} allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="shopPrice"
              label="单价"
              rules={[{ required: true, message: "请输入单价" }]}
            >
              <InputNumber min={0.1} max={100} step={0.1} allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Input.Group compact>
            <Form.Item name="taste" label="口味">
              <Input placeholder="请输入口味" allowClear />
            </Form.Item>
            <Form.Item name="address" label="产地">
              <Input placeholder="请输入产地" allowClear />
            </Form.Item>
            <Form.Item name="expiryDate" label="保质期">
              <Input placeholder="请输入保质期" allowClear />
            </Form.Item>
          </Input.Group>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
