/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Descriptions, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import State from '../../mobxStore/state';
import User from '../../mobxStore/user';
import { fetch, Models } from '../../rapper';
import Style from './Score.module.css';
const Score = (props: any) => {
  const id = Number(new URLSearchParams(useLocation().search).get('id'));
  const user = props.user as User;
  const { depart } = props.state as State;
  const [data, setData] = useState<
    Models['POST/manager/interview/jump']['Res']['data']
  >();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user.token && id && depart) {
      setLoading(true);
      fetch['POST/manager/interview/jump']({ id, depart })
        .then((res) => {
          if (res.success) {
            if (res.data) {
              setData(res.data);
            } else {
              history.replace(`/score?id=${id + 1}`);
            }
          } else {
            message.error(`获取面试者信息失败，${res.errorMsg}`);
          }
        })
        .catch((err) => {
          console.error(err);
          message.error('获取面试者信息失败，请求异常');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, depart]);

  const [idInput, setIdInput] = useState(id);
  const history = useHistory();
  const [form] = useForm();

  const [scoreLoading, setScoreLoading] = useState(false);

  const handleScore = async (e: { score: string; comment: string }) => {
    setScoreLoading(true);
    try {
      const res = await fetch['POST/manager/interview/score']({
        id,
        depart,
        score: e.score,
        comment: e.comment,
      });
      if (res.success) {
        message.success('打分完成');
        // 打分完成后跳转到下一位面试者
        setIdInput(id + 1);
        history.push(`/score?id=${id + 1}`);
      } else {
        message.error(`打分失败,${res.errorMsg}`);
      }
    } catch (error) {
      console.error(error);
      message.error('打分失败，请求异常');
    } finally {
      setScoreLoading(false);
    }
  };

  const handlePass = async (isPass: boolean) => {
    setScoreLoading(true);
    try {
      const res = await fetch['POST/manager/interview/pass']({
        id,
        depart,
        pass: isPass ? '1' : '0',
      });
      if (res.success) {
        message.success('审核完成');
        // 审核完成后跳转到下一位面试者
        setIdInput(id + 1);
        history.push(`/score?id=${id + 1}`);
      } else {
        message.error(`审核失败,${res.errorMsg}`);
      }
    } catch (error) {
      console.error(error);
      message.error('操作失败，请求异常');
    } finally {
      setScoreLoading(false);
    }
  };

  return (
    <div className={Style.content}>
      <div className={Style.descriptions}>
        <Spin spinning={loading}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label='姓名'>{data?.name}</Descriptions.Item>
            <Descriptions.Item label='学院'>{data?.college}</Descriptions.Item>
            <Descriptions.Item label='电话号'>{data?.phone}</Descriptions.Item>
            <Descriptions.Item label='QQ号'>{data?.qq}</Descriptions.Item>
            <Descriptions.Item label='志向1'>{data?.depart1}</Descriptions.Item>
            <Descriptions.Item label='志向2'>{data?.depart2}</Descriptions.Item>
            <Descriptions.Item label='个人简介' span={2}>
              <div
                dangerouslySetInnerHTML={{ __html: data?.introduce || '' }}
              />
            </Descriptions.Item>
          </Descriptions>
          <div className={Style.survey}>
            <h2>
              <b>问卷作答</b>
            </h2>
            <div>
              {data?.questionnaire.map((value, index) => (
                <div key={index}>
                  <h3>
                    Q{value.question_id}：{value.question_name}
                  </h3>
                  <p>
                    {value.question_type === 'multiple' &&
                      value.question_option.map((v, i) => `${v.option}；`)}
                  </p>
                  <p>
                    A{value.question_id}：{value.question_answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Spin>
      </div>
      <div className={Style.scoreForm}>
        <Form form={form} onFinish={handleScore} labelCol={{ span: 3 }}>
          <Form.Item
            label='面试打分'
            name='score'
            wrapperCol={{ span: 4 }}
            rules={[{ required: true, message: '请输入分数' }]}>
            <Input type='number' />
          </Form.Item>
          <Form.Item label='备注' name='comment' wrapperCol={{ span: 16 }}>
            <Input.TextArea autoSize={{ minRows: 8 }} />
          </Form.Item>

          {data?.score ? (
            <Form.Item wrapperCol={{ offset: 0 }}>
              <div className={Style.btnGroup}>
                <Button onClick={() => history.push('/')}>返回</Button>
                <Button htmlType='submit' type='primary' loading={scoreLoading}>
                  提交
                </Button>
              </div>
            </Form.Item>
          ) : (
            <Form.Item wrapperCol={{ offset: 0 }}>
              <div className={Style.btnGroup}>
                <Button onClick={() => history.push('/')}>返回</Button>
                <Button
                  type='default'
                  loading={scoreLoading}
                  onClick={() => handlePass(false)}>
                  不通过
                </Button>
                <Button
                  type='primary'
                  loading={scoreLoading}
                  onClick={() => handlePass(true)}>
                  通过
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
      </div>
      <div className={Style.indexBar}>
        <p>当前</p>
        <Input
          aria-label='页码'
          type='number'
          value={idInput}
          onChange={(v) => setIdInput(Number(v.target.value))}
        />
        <p>/</p>
        <p>100</p>
        <Button
          type='link'
          onClick={() => {
            // 跳转时，评分和备注表单需要初始化
            form.resetFields();
            history.push(`/score?id=${idInput}`);
          }}
          disabled={idInput === id}>
          转到
        </Button>
      </div>
    </div>
  );
};
export default inject('user', 'state')(observer(Score));
