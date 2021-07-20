import React from "react";
import "./state/stores/ProductsStore";
import 'antd/dist/antd.css';
import './index.scss';

import ProductList from "./components/productList";
import {withStore} from "./state/withStore";
import {Form, Input, Button, message, Layout, Breadcrumb} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {ADD_REGISTERED_USER, LOGIN_USER, LOGOUT} from "./state/stores/ProductsStore";

const {Header, Content, Footer} = Layout;

class App extends React.Component {
    formRef = React.createRef();

    render() {
        const {authorizedUser, registeredUsers, dispatch} = this.props

        const login = () => {
            const {username, password} = this.formRef.current.getFieldsValue()
            if (username && password) {
                const findUser = registeredUsers.find(el => el.login === username && el.password === password)
                if (findUser) {
                    dispatch(LOGIN_USER, username)
                } else {
                    message.error('Неверный логин или пароль!')
                }
            }
        }
        const register = () => {
            const {username, password} = this.formRef.current.getFieldsValue()

            if (username.trim() && password.trim()) {
                const findUser = registeredUsers.find(el => el.login === username)
                if (findUser) {
                    message.error('Пользователь с таким логином уже существует!')
                } else {
                    dispatch(ADD_REGISTERED_USER, {user: {login: username, password}})
                    message.success('Пользователь успешно зарегистрирован!')
                    dispatch(LOGIN_USER,username)
                }
            } else {
                message.error('Введите корректные значения!')
            }
        }
        if (!authorizedUser) {
            return <main style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#e2e1e0"
            }}>
                <div className={"card login"}>
                    <h2>Авторизация</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Пожалуйста введите Имя или Логин!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Пожалуйста введите пароль!'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className={'actionLogin'}>
                                <Button type="primary"
                                        htmlType="submit"
                                        onClick={login}
                                        className="login-form-button">
                                    Войти
                                </Button>
                                или
                                <Button type="primary"
                                        htmlType="submit"
                                        onClick={register}
                                        className="login-form-button">
                                    Зарегистрироваться
                                </Button>
                            </div>

                        </Form.Item>
                    </Form>
                </div>

            </main>
        }
        return (
            <Layout className="layout">
                <Header>
                    <h1>Frontend Test Task</h1>
                    <div style={{
                        display:"flex",
                        alignItems:"center"
                    }}>
                        <h2 style={{marginRight:15}}>{authorizedUser}</h2>
                        <Button type="primary" onClick={()=>{dispatch(LOGOUT)}}>
                            Выйти
                        </Button>
                    </div>

                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <ProductList/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2021 Created by Stepanov Dmitry</Footer>
            </Layout>

        )
    }
}

export default withStore("authorization", (data) => data)(App);
