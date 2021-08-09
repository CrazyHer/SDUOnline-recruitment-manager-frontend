/* eslint-disable react-hooks/exhaustive-deps */
import { Button, message, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import XLSX from 'xlsx';
import State from '../../mobxStore/state';
import User from '../../mobxStore/user';
import { fetch } from '../../rapper';
import Style from './Index.module.css';

const Index = (props: any) => {
  const user = props.user as User;
  const history = useHistory();
  const state = props.state as State;
  // 表格列名定义
  const columns: ColumnsType<{}> = [
    { title: '序号', dataIndex: 'id', key: 'id', align: 'center' },
    { title: '姓名', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '学院', dataIndex: 'college', key: 'college', align: 'center' },
    { title: '电话号', dataIndex: 'phone', key: 'phone', align: 'center' },
    { title: 'QQ号', dataIndex: 'qq', key: 'qq', align: 'center' },
    {
      title: '面试成绩',
      dataIndex: 'score',
      key: 'score',
      align: 'center',
      sorter: (a: any, b: any) => Number(a.score) - Number(b.score),
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      //面试状态，1 (未面试，初始值，即报名完成后就是1)>2(已面试，即打完分后变成2)>3或4(3为不通过，4为通过
      render: (value, record, index) => (
        <>
          {value === '2'
            ? '已面试'
            : value === 3
            ? '不通过'
            : value === '4'
            ? '通过'
            : '未面试'}
        </>
      ),
      // 筛选面试状态
      filters: [
        { text: '未面试', value: '1' },
        { text: '已面试', value: '2' },
        { text: '不通过', value: '3' },
        { text: '通过', value: '4' },
      ],
      onFilter: (value, record: any) => value === record.status,
      filterMultiple: true,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (e: typeof state.candidateList[0]) => (
        <Button
          type='link'
          onClick={() => {
            history.push(`/score?id=${e.id}`);
          }}>
          详细信息
        </Button>
      ),
    },
  ];

  const [listLoading, setListLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user.token) {
      setListLoading(true);
      fetch['POST/manager/interview/list']({ depart: state.depart })
        .then((res) => {
          if (res.success) {
            state.setCandidateList(res.data.list);
          } else {
            message.error(`拉取名单失败，${res.errorMsg}`);
          }
          return;
        })
        .catch((err) => {
          console.error(err);
          message.error('拉取名单失败，请求异常');
        })
        .finally(() => setListLoading(false));
    }
  }, [state.depart]);

  // 表格分页设置
  const paginationConfig: TablePaginationConfig = {
    hideOnSinglePage: true,
    pageSize: 10,
  };

  // 导出全部人员名单
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const handleExport = async () => {
    setExportLoading(true);
    try {
      // 导出表格异步操作
      await new Promise<void>((resolve, reject) => {
        let wsData = [];
        wsData.push([
          '序号',
          '姓名',
          '学院',
          '电话号',
          'QQ号',
          '面试成绩',
          '当前状态',
        ]);
        for (let i = 0; i < state.candidateList.length; i++) {
          let row = state.candidateList[i];
          wsData.push([
            row.id,
            row.name,
            row.college,
            row.phone,
            row.qq,
            row.score,
            row.status === '2'
              ? '已面试'
              : row.status === '3'
              ? '不通过'
              : row.status === '4'
              ? '通过'
              : '未面试',
          ]);
        }
        const wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws);
        XLSX.writeFile(wb, `${user.group}${state.depart}面试名单.xlsx`);
        resolve();
      });
    } catch (error) {
      console.error(error);
      message.error('导出失败，或许浏览器不支持，使用Chrome浏览器试试？');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className={Style.content}>
      <div className={Style.btn}>
        <Button
          loading={listLoading || exportLoading}
          type='link'
          onClick={handleExport}>
          导出全部人员信息
        </Button>
      </div>
      <Table
        bordered
        loading={listLoading}
        columns={columns}
        dataSource={state.candidateList}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default inject('user', 'state')(observer(Index));
