import styled from 'styled-components';

const PageTag = styled.div`
    padding:20px;
    .pm_export{
        height: 30px;
        .ant-btn {
            float: right;
        }
    }

    .ant-form {
        margin-bottom:10px;
        
    }

    
    .ant-table-thead > tr > th {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #2D2D2D;
        background:#F3F7FB;
        border-bottom: 10px solid #fff;
    }
    .ant-table-tbody > tr {
        &:first-child > td{
            border-top: 1px solid #F3F3F3;
        }
    }
    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #F3F3F3;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #2D2D2D;
        &:first-child {
            border-left: 1px solid #F3F3F3;
        }
        &:last-child {
            border-right: 1px solid #F3F3F3;
        }
    }
`
export default PageTag