import styled from 'styled-components';

const PageTag = styled.div`
    display:flex;
    margin:100px auto;
    width:1150px;
    flex-wrap: wrap;
    justify-content: space-around;
    div{
        width: 45%;
        height: 300px;
        background: blue;
        line-height: 300px;
        text-align: center;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        &:last-child{
            margin-top:20px;
        }
    }
    .pmStop_left {
        margin-right:20px;
        background:green;
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