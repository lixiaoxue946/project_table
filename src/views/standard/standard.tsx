// standard
import React,{ useContext, useState, useEffect, useRef } from 'react';
import { Table, Button, Input, Form, Select ,Row,Upload, message} from 'antd';
import PageTag from './standard.css'
import service from '@commonModules/service'
import dev from "@scripts/apis";

const { globalService } = service;
const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        console.log(editing);
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                {
                    required: true,
                    message: `${title} is required.`,
                },
                ]}
            >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                        minHeight:10
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
        );
  }

    return <td {...restProps}>{childNode}</td>;
};

const Standard = props => {
        
    const [dataSource, setDataSource] = useState([])
   
    const [flatForm,setFlatForm]=useState([])
    const [detaiLinfo,setDetaiLinfo]=useState([])


    const [selectFlatForm,setSelectFlatForm]=useState('')
    const [selectDetailInfo,setSelectDetailInfo]=useState('')
    const [selectProduct, setProduct] = useState('')


    // checkStandard 审核
    const checkStandard = async () => {
        let userId = sessionStorage.getItem('userId')
        let arr = []
        dataSource.forEach(item => arr.push(item.flowId))
        const role = {
            flowId: arr,
            userId
        }
        const res = await globalService.checkStandard(role)
        if (res?.code === '200') {
            message.success('提交成功')
            window.location.hash="/transferStation"
        }
    }
    // detailinfo下拉列表
    const detailinfo = async () => {
        const role = {
            detailInfo:''
        }
        const res = await globalService.detailinfo(role)
        if (res?.code === '200') {
            const arr = []
            res?.result.forEach(item => {
                let obj = {}
                obj['label'] = item
                obj['value'] = item
                arr.push(obj)
            })
            setDetaiLinfo(arr)
        }
    }

    //  standardList 下载
    const standardExportExcel = () => {
        const params = {
            data: {
                plateForm: selectFlatForm || flatForm[0].value,
                detailInfo: selectDetailInfo,
                productCode:selectProduct
            },
            url:`${dev}/standard/query/exportExcel`
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

    // standardList 导入
    const standardImportExcel = async (role) => { 
        const res = await globalService.standardImportExcel(role)
        if (res?.code === '200') {
            message.success('导入成功')
        }
    }

    const [firstPlatForm, setFirstPlateForm] = useState('')
    
    let [form] = Form.useForm();
    const handle = async () => {
        const res = await form.validateFields()
    }
    // plateform下拉列表
    const standardPlatForm = async (urlParams) => {
        const role = {
            plateFrom:''
        }
        const res = await globalService.standardPlatForm(role)
        if (res?.code === '200') {
            const arr = []
            res?.result.forEach(item => {
                let obj = {}
                obj['label'] = item
                obj['value'] = item
                arr.push(obj)
            })
            setFirstPlateForm(res?.result[0])
            
            setFlatForm(arr)
            let urlParams = getUrlParams()
            setProduct(urlParams)
            if (arr.length > 0) {
                handle()
                form.setFieldsValue({
                    platform: arr[0].value,
                    product: urlParams
                });
            }
            
            standardList(arr[0].value,urlParams)
            
        }
    }

    // standardList 提交
    const saveStandard = async () => {
        let userId = sessionStorage.getItem('userId')
        const role = {
            saveData: dataSource,
            userId:userId
        }
        const res = await globalService.saveStandard(role)
        if (res?.code === '200') {
            message.success('提交成功')
        }
    }
    const [flowsId,setFlowsId]=useState([])

    const standardList = async (plateForm,productCode) => {
        const role = {
            detailInfo: selectDetailInfo,
            // flowIds: '',
            plateForm: plateForm,
            productCode:''
        }
        productCode ? (role.productCode = productCode) : (role.productCode = selectProduct)
        const res = await globalService.standardList(role)
        if (res?.code === '200') {
            setDataSource(res?.result)
            let arr = []
            res?.result.forEach(item => {
                arr.push(item.flowId)
            })
            sessionStorage['flowsId']=arr.join()
            setFlowsId(arr)
        }
    }


    const standardCopy = async (role:Object) => {
        const res = await globalService.standardCopy(role)
        if (res?.code === '200') {
            message.success('copy 成功')
        }
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
        let urlParams = getUrlParams()
        // setProduct(urlParams)
        detailinfo()
        if (urlParams) {
            standardPlatForm(urlParams)
        } else {
            standardPlatForm('')
        }
        return () => {
            sessionStorage.removeItem('flowsId')
        }
        
    }, []);

    const columns = [
        {
            title: 'PRODUCT',
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
            title: '指示',
            dataIndex: 'directive',
            key: 'directive',
        },
        {
            title: 'Hold time',
            dataIndex: 'holdTime',
            key: 'holdTime',
            editable: true,
        },
        {
            title: '设定者',
            dataIndex: 'updateName',
            key: 'updateName',
        },
    ];

    
    const changeFlatForm=(value)=> {
        setSelectFlatForm(value)
    }

    const changeDetaiLinfo = (value) => {
        setSelectDetailInfo(value||'')
    }
    const productChange = e => {
        setProduct(e.target.value);
    }
    

    const handleSave1 = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.flowId === item.flowId);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData)
    };
    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };
    const columns1 = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
  
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: handleSave1,
          }),
        };
    });
    const uploadProps = {
        name: 'file',
        onChange(info) {
            const fd = new FormData()
            fd.append('file',info.file)

            standardImportExcel({file:info.file})
          if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
              
          }
          if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            //   standardImportExcel(info.file)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        customRequest(options) {
            console.log(options);
        }
    };
    
    
    return <PageTag >
        
        <Form form={form} layout="inline" onFinish={(values) => {
            standardList(selectFlatForm,values.product)
        }} initialValues={{
            platform: '',
            product:''
        }}>
            <Form.Item label="PLATFORM" name="platform" style={{width:300}} rules={[
                { required: true, message: '请选择PLATFORM' }
            ]}>
                <Select onChange={changeFlatForm}>
                    {
                        flatForm.map(item => <Option key={item.value} value={item.value}>{item.value}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item label="DETAILINFO" name="detailInfo" style={{width:300}}>
                <Select onChange={changeDetaiLinfo} allowClear>
                    {
                        detaiLinfo.map(item => <Option key={item.value} value={item.value}>{item.value}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item name="product" label="PRODUCT" style={{width:300}}>
                <Input onChange={ productChange}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">查询</Button>
            </Form.Item>
            <Form.Item>
                <Button  onClick={saveStandard}>提交</Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={() => {
                    checkStandard()
                    
                }}>审核</Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={standardExportExcel}>EXCEL下载</Button>
            </Form.Item>
            <Form.Item>
                <Upload {...uploadProps}>
                    <Button >导入</Button>
                </Upload>
            </Form.Item>
        </Form>

        <Form layout="inline" onFinish={(values) => {
            standardCopy({ product: values.product, standardList:dataSource})
        }}>
            <Form.Item name="product">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">copy from other</Button>
            </Form.Item>
        </Form>

        
        <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns1}
            pagination={false}
            rowKey={record=>record.flowId}
        />
    </PageTag> 
}
export default Standard