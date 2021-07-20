import React from "react";
import {withStore} from "../../state/withStore";
import {Product} from "../product";
import {Button, Modal, Form, Input} from 'antd';
import "./product-list.scss";
import {ADD_PRODUCT} from "../../state/stores/ProductsStore";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
        }
    }

    formRef = React.createRef();


    onChangeHandler(e) {
        const {value} = e.target;
        const newVal = value.replace(/[^\d]/g, '')
        this.formRef.current.setFieldsValue({
            price: newVal
        });


    }


    render() {
        const {products,dispatch} = this.props;

        const finish = (val) => {
            if (val) {
                dispatch(ADD_PRODUCT, {
                    product: {
                        id: Date.now(),
                        title: val.name,
                        description:val.description,
                        price: Number(val.price),
                    }
                })
                this.setState({visibleModal: false})
            }
        }
        return (
            <>
                <Button type="primary" style={{
                    marginBottom:30
                }} onClick={() => this.setState({visibleModal: true})}>
                    Добавить товар
                </Button>
                {products.length?
                    <div className="product-list">
                        {products.map((product) => (
                            <Product key={product.id} product={product} dispatch={dispatch}/>
                        ))}
                    </div>
                    : <h1>Здесь пока что пусто ...</h1>
                }

                <Modal title="Добавление товара"
                       visible={this.state.visibleModal}
                       footer={false}
                       onCancel={() => this.setState({visibleModal: false})}
                >
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        ref={this.formRef}
                        onFinish={finish}
                    >
                        <Form.Item
                            label="Название товара"
                            name="name"
                            rules={[{required: true, message: 'Пожалуйста введите значеие!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Описание товара"
                            name="description"
                            rules={[{required: true, message: 'Пожалуйста введите значеие!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Цена в рублях"
                            name="price"
                            rules={[{required: true, message: 'Пожалуйста введите значеие!'}]}
                        >
                            <Input
                                onChange={this.onChangeHandler.bind(this)}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Добавить товар
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>

        );
    }
}

export default withStore("products", (data) => data)(ProductList);
