// 登录页
import React,{useEffect} from 'react';
import { Form, Input, Button } from 'antd'
import { PageTag } from './login.css';
import service from '@commonModules/service'

const { loginService } = service;


const Login = props => {
    const onFinish = (values) => {
        login({ userId: values.username, password: values.password })// 掉登录接口
    };

    const login = async (role: Object) => {
        const res = await loginService.login(role);
        if (res?.code === '200') {
            sessionStorage['userId']=res?.result?.userId
            window.location.hash = '/pmStop'// 登录成功后跳转到'/src/pmStop'
        }
        
    }
    return <PageTag>
        <h4>欢迎登陆</h4>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input placeholder="请输入用户名" autoComplete="off" />
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password placeholder="请输入密码" autoComplete="off" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit"> 登录</Button>
            </Form.Item>
        </Form>
    </PageTag> 
}
export default Login