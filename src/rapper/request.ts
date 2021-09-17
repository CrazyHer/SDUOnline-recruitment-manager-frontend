/* md5: 5e6ef962ff37efa064bb596a93f93199 */
/* Rap仓库id: 286854 */
/* Rapper版本: 1.2.2 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=286854
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：登录
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018546
   */
  'POST/login': {
    Req: {
      username: string
      password: string
    }
    Res: {
      success: boolean
      data: {
        /**
         * 管理员令牌
         */
        token: string
        /**
         * manager管理员，user普通用户
         */
        role: string
      }
      errorCode: string
      errorMsg: string
    }
  }

  /**
   * 接口名：获取管理员信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2019597
   */
  'POST/manager/info': {
    Req: {}
    Res: {
      errorMsg: string
      errorCode: string
      data: {
        name: string
        area: string
        major: string
        college: string
        group: string
        depart: string[]
      }
      success: boolean
    }
  }

  /**
   * 接口名：拉取本部门报名情况
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018550
   */
  'POST/manager/interview/list': {
    Req: {
      depart: string
    }
    Res: {
      success: boolean
      errorCode: number
      errorMsg: string
      data: {
        list: {
          /**
           * 面试者在本部门的排号
           */
          id: number
          /**
           * 姓名
           */
          name: string
          /**
           * 学号
           */
          username: string
          /**
           * 学院
           */
          college: string
          /**
           * 电话
           */
          phone: string
          /**
           * QQ
           */
          qq: string
          /**
           * 面试得分
           */
          score: string
          /**
           * 面试状态，1 (未面试，初始值，即报名完成后就是1)>2(已面试，即打完分后变成2)>3或4(3为不通过，4为通过，由pass接口触发)
           *
           */
          status: number
          /**
           * 1为第一志愿，2为第二志愿
           */
          first: string
        }[]
      }
    }
  }

  /**
   * 接口名：打分
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018552
   */
  'POST/manager/interview/score': {
    Req: {
      id: number
      depart: string
      score: string
      comment: string
      first: string
      username: string
    }
    Res: {
      success: boolean
      errorCode: number
      errorMsg: string
      data: {}
    }
  }

  /**
   * 接口名：面试者详细信息(可以不做，前端用不到)
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018551
   */
  'POST/manager/interview/interview': {
    Req: {
      username: string
    }
    Res: {
      success: boolean
      errorCode: number
      errorMsg: string
      data: {
        /**
         * 姓名
         */
        name: string
        /**
         * 学院
         */
        college: string
        /**
         * 事业群1
         */
        group1: string
        /**
         * 部门1
         */
        depart1: string
        /**
         * 事业群2
         */
        group2: string
        /**
         * 部门2
         */
        depart2: string
        /**
         * 简介 < =255
         */
        introduce: string
        /**
         * 电话
         */
        phone: string
        /**
         * QQ
         */
        qq: string
        /**
         * 问卷和答案
         */
        questionnaire: {
          /**
           * 问题ID
           */
          question_id: string
          /**
           * 问题名称
           */
          question_name: string
          /**
           * 这个问题的选项（如果这是个选择题遍历数组获取每个选项，而主观题此处为空）
           */
          question_option: {
            option: string
          }[]
          /**
           * 问题种类，multiple为多选，subjective为主观
           */
          question_type: string
          /**
           * 这个问题的答案，多选题为”AB“（以选了A,B俩选项为例），主观题就是个字符串
           */
          question_answer: string
        }[]
      }
    }
  }

  /**
   * 接口名：跳转到某个面试者
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018553
   */
  'POST/manager/interview/jump': {
    Req: {
      id: number
      depart: string
      first: string
      username: string
    }
    Res: {
      success: boolean
      errorCode: number
      errorMsg: string
      data: {
        name: string
        college: string
        introduce: string
        phone: string
        qq: string
        questionnaire: {
          question_id: number
          question_name: string
          question_option: {
            option: string
          }[]
          question_type: string
          question_answer: string
        }[]
        /**
         * 面试者账号
         */
        username: string
        /**
         * 评分，如果未评价则为null
         */
        score: number
        /**
         * 备注，同上
         */
        comment: string
        depart: string
        group: string
      }
    }
  }

  /**
   * 接口名：通过
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2019772
   */
  'POST/manager/interview/pass': {
    Req: {
      id: number
      depart: string
      pass: string
      first: string
      username: string
    }
    Res: {
      success: boolean
      errorCode: number
      errorMsg: string
      data: {}
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'POST/login': ResSelector<IModels['POST/login']['Res']>
  'POST/manager/info': ResSelector<IModels['POST/manager/info']['Res']>
  'POST/manager/interview/list': ResSelector<IModels['POST/manager/interview/list']['Res']>
  'POST/manager/interview/score': ResSelector<IModels['POST/manager/interview/score']['Res']>
  'POST/manager/interview/interview': ResSelector<IModels['POST/manager/interview/interview']['Res']>
  'POST/manager/interview/jump': ResSelector<IModels['POST/manager/interview/jump']['Res']>
  'POST/manager/interview/pass': ResSelector<IModels['POST/manager/interview/pass']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  // if (!extraConfig || !extraConfig.fetchType) {
  //   console.warn('Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch')
  // }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：登录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018546
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/login': (req?: IModels['POST/login']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/login',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/login']>
    },

    /**
     * 接口名：获取管理员信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2019597
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/manager/info': (req?: IModels['POST/manager/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/manager/info',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/manager/info']>
    },

    /**
     * 接口名：拉取本部门报名情况
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018550
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/manager/interview/list': (req?: IModels['POST/manager/interview/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/manager/interview/list',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/manager/interview/list']>
    },

    /**
     * 接口名：打分
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018552
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/manager/interview/score': (
      req?: IModels['POST/manager/interview/score']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/manager/interview/score',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/manager/interview/score']>
    },

    /**
     * 接口名：面试者详细信息(可以不做，前端用不到)
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018551
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/manager/interview/interview': (
      req?: IModels['POST/manager/interview/interview']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/manager/interview/interview',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/manager/interview/interview']>
    },

    /**
     * 接口名：跳转到某个面试者
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2018553
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/manager/interview/jump': (req?: IModels['POST/manager/interview/jump']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/manager/interview/jump',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/manager/interview/jump']>
    },

    /**
     * 接口名：通过
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=286854&mod=466154&itf=2019772
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/manager/interview/pass': (req?: IModels['POST/manager/interview/pass']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/manager/interview/pass',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/manager/interview/pass']>
    },
  }
}
