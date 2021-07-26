// 审核清单
import React, { useState,useEffect } from 'react';
import { Table } from 'antd'
import { Link } from 'react-router-dom';
import PageTag from './transferStation.css'
import service from '@commonModules/service'
const { globalService } = service;

const TransferStation = props => {

    const productCheckList = async () => {
        const res = await globalService.productCheckList()
        if (res?.code === '200') {
            res?.result.forEach((item, index) => item.id = index + '')
            setDataSource(res?.result)
        }
    }

    useEffect(() => {
        productCheckList()
    }, []);

    const columns = [
        {
            title: 'PRODUCT',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: '是否提交',
            dataIndex: 'isSubmit',
            key: 'isSubmit',
            render: (text) => {
                return text==='1'?'是':'否'
            }
        },
        {
            title: '是否审核',
            dataIndex: 'isCheck',
            key: 'isCheck',
            render: (text) => {
                return text==='1'?'是':'否'
            }
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'standard',
            dataIndex: 'standard',
            key: 'standard',
            render: (text,record) => {
                return <span
                    style={{
                        color: 'blue',
                        cursor:'pointer'
                    }}
                    onClick={() => {
                    // 跳转到standard页面
                    window.location.hash = `/standard?product=${record.product}`
                }}>{text}</span>
            }
        },
        {
            title: 'FAB PM',
            dataIndex: 'pm',
            key: 'pm',
            render: (text,record) => {
                return <span
                    style={{
                        color: 'blue',
                        cursor:'pointer'
                    }}
                    onClick={() => {
                    // 跳转到pm页面
                    window.location.hash = `/pm?product=${record.product}`
                }}>{text}</span>
            }
        }
    ];
    const [dataSource,setDataSource]=useState([])
    return (<PageTag>
        <Table columns={columns} dataSource={dataSource} pagination={false} rowKey={ record=>record.id}/>
    </PageTag>)
}
export default TransferStation