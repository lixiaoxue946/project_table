// pm
import React, {useState ,useEffect} from 'react';
import { Table, Button, Input, Form, Select } from 'antd';
import PageTag from './pm.css'
import service from '@commonModules/service'
import dev from "@scripts/apis";
const { globalService } = service;
const { Option } = Select;


const Pm = props => {

    const queryList = async (lot,pro,step) => {
        const role = {
            lotList:lot||[],
            productList: pro ||[],
            stepCounts:step||[]
        }
        const res = await globalService.queryList(role)
        if (res?.code === '200') {
            res?.result.forEach((item, index) => item.id = index + '');
            setDataSource(res?.result)
        }
    }

    //lot下拉列表
    const queryLot = async () => { 
        const res = await globalService.queryLot()
        console.log(res, 'res');
        if (res?.code === '200') {
            
            res?.result.forEach(item => {
                item.value=item.lotNo
                item.label=item.lotNo
            })
            setOptionsLot(res?.result)
        }
    }

    //  product下拉列表
    const queryProduce = async (product:String) => {
        const role = {
            // product:'DGKZ-US00100EN00'
            product:product||''
        }
        const res = await globalService.queryProduce(role)
        // console.log(res, 'res');
        if (res?.code === '200') {
            const arr = []
            res?.result.forEach(item => {
                let obj = {}
                obj['label'] = item
                obj['value'] = item
                arr.push(obj)
            })
            setOptionsList(arr)
        }
        
    }

    const pmExportExcel = async () => {// 下载
            const params = {
                url:`${dev}/pm/query/exportExcel`
            }
    
            let str = '';
            Object.entries(params.data || []).map((item, index) => {
                str += `${index === 0 ? '?' : '&'}${item[0]}=${item[1]}`
            })
            params.url += str;
            fetch(params.url, { //downloadFiles 接口请求地址
                method: 'get',
                credentials: 'include',
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'X-Auth-Token': sessionStorage.getItem('token'),//设置header 获取token
                })
            }).then((response) => {
                const eleLink = document.createElement('a');
                eleLink.style.display = 'none';
                eleLink.href = response.url;
                document.body.appendChild(eleLink);
                eleLink.click();
                document.body.removeChild(eleLink);
    
              }).catch((error) => {
                console.log('文件下载失败', error);
              });
    
    
    }


    const getUrlParams = () => {
        let href = window.location.href
        if (href.includes('=')) {
            return href.split('=')[1]
        } else {
            return ''
        }

    }
    useEffect(() => {
        queryProduce('')
        queryLot()
        let urlParams = getUrlParams()
        if (urlParams) {
            queryList('',[urlParams],'') 
        } else {
            queryList('','','')
        }
        
        
    }, []);

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: '工程',
            dataIndex: 'stepCode',
            key: 'stepCode',
        },
        {
            title: '大工程名',
            dataIndex: 'majorStepName',
            key: 'majorStepName',
        },
        {
            title: '小工程名',
            dataIndex: 'miniStepName',
            key: 'miniStepName',
        },
        
        {
            title: '条件KEY',
            dataIndex: 'codeKey',
            key: 'codeKey',
        },
       
        {
            title: 'Hold time(day)',
            dataIndex: 'holdTime',
            key: 'holdTime',
        },
        {
            title: 'Lot',
            dataIndex: 'lotNo',
            key: 'lotNo',
            render: (text, record) => {
                return <span style={{color:record.isDye&&'red'}}>{text}</span>
            }
        },
    ];
    
    const [dataSource, setDataSource] = useState([])

    const [optionsList, setOptionsList] = useState([])
    const [optionsLot, setOptionsLot] = useState([])

    const [optionsStep] = useState([
        {
            value: 5,
            label: 5,
        },
        {
            value: 10,
            label: 10,
        },
        {
            value: 15,
            label: 15,
        },
        {
            value: 20,
            label: 20,
        },
        {
            value: 25,
            label: 25,
        },
        {
            value: 30,
            label: 30,
        },
    ])
    
    
    const [proValue,setProValue]=useState([])
    const [lotValue,setLotValue]=useState([])
    const [stepValue,setStepValue]=useState([])


    const changeProduct = (value) => {
        setProValue(value)
    }
    const changeLot = (value) => {
        setLotValue(value)
    }
    const changeStepCount = (value) => {
        setStepValue(value)
    }

    return <PageTag>
        
        <Form layout="inline" onFinish={values => { 
            queryList(values.lot,values.product,values.stepCount)
        }} initialValues={{product:getUrlParams()}}>
            {/* 可以单个搜索，也可以批量搜索。也可以模糊匹配 */}
            <Form.Item name="product" label="PRODUCT" rules={[{required:true,message:'请选择product'}]}>
                <Select
                    mode="multiple"
                    style={{ width: '200px' }}
                    placeholder="请选择product"
                    onChange={changeProduct}
                    optionLabelProp="label"
                >
                    {
                        optionsList.map(item => <Option key={item.value} value={item.value} label={item.label}>{item.label }</Option>)
                    }
                </Select>
            </Form.Item>
            {/* 可以单个搜索，也可以批量搜索 */}
            <Form.Item name="lot" label="Lot">
                <Select
                    mode="multiple"
                    style={{ width: '200px' }}
                    placeholder="请选择lot"
                    onChange={changeLot}
                    optionLabelProp="label"
                >
                    {
                        optionsLot.map(item => <Option key={item.value} value={item.value} label={item.label}>{item.label }</Option>)
                    }
                </Select>
            </Form.Item>
             {/* 可以下拉选择，也可以手动输入 */}
            <Form.Item name="stepCount" label="Step Count">
                <Select
                    mode="multiple"
                    style={{ width: '200px' }}
                    placeholder="请选择stepCount"
                    onChange={changeStepCount}
                    optionLabelProp="label"
                >
                    {
                        optionsStep.map(item => <Option key={item.value} value={item.value} label={item.label}>{item.label }</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">QUERY</Button>
            </Form.Item>
            <Form.Item>
                {/* 导出，导出该页所有内容 */}
                <div className="pm_export"><Button onClick={()=>pmExportExcel()}>Export</Button></div>
            </Form.Item>
        </Form>
        
        {/* 选择按钮，点击之后可以进行查询 */}
        
        <Table columns={columns} dataSource={dataSource} pagination={false} rowKey={record => record.id}/>
    </PageTag> 
}
export default Pm