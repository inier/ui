import _ from 'lodash-es';
// 基础方法集

/**
 * @description 用于获取url中的指定参数
 * @param {String} val 查询key
 * @returns {*} 对应的value，没有返回null
 */
export function getQueryString(val) {
    const reg = new RegExp(`(^|&)${val}=([^&]*)(&|$)`);
    const r = decodeURIComponent(window.location.search.substr(1)).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}

/**
 * url search字段转换为对象?a=1&b=2  => {a:'1',b:'2'}
 * @param {String} lsearch =location.search
 * @returns {Object} 转换后的对象
 */
export function search2obj(lsearch) {
    const search = (lsearch && lsearch.substr(1)) || '';
    if (!search) {
        return {};
    }
    const paramsList = search.split('&');
    const params = {};
    paramsList.forEach((i) => {
        if (!i) {
            return;
        }

        const p = i.split('=');
        if (p.length === 1) {
            params[p[0]] = '';
        } else {
            params[p[0]] = p[1];
        }
    });

    return params;
}

/**
 * url参数拼接字符串 {a:'1',b:'2'} => ?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 * @returns {string} 拼接后的字符串
 */
export const obj2search = (obj) => {
    const search = Object.keys(obj)
        .map((i) => `${i}=${obj[i]}`)
        .join('&');
    if (!search) {
        return '';
    }
    return `?${search}`;
};

/**
 * url参数拼接完整url {a:'1',b:'2'} => http://xxxxxxx?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 * @returns {string} 完整url
 */
export const getUrlWithSearchObj = (obj) => {
    const params = search2obj(window.location.search);
    Object.assign(params, obj);

    return `${window.location.pathname}${obj2search(params)}`;
};

/**
 * get value of name from cookie
 * @param {String} name cookie name
 * @returns {*} 指定name的cookie
 */
export function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

/**
 * @description 对指定字符串进行base64编码
 * @param {String} val 需要编码的数据
 * @returns {*} 编码后的数据
 */
export function urlEncodeBase64(val) {
    return window.btoa(unescape(encodeURIComponent(val)));
}

/**
 * @description 对指定字符串进行base64解码
 * @param {String} val 需要解码的数据
 * @returns {*} 解码后端数目
 */
export function urlDecodeBase64(val) {
    return decodeURIComponent(escape(window.atob(val)));
}

/**
 * 字母前加前缀
 * @param {string} str 操作数
 * @param {string} [prefix='btn']  前缀，默认为'btn'
 * @returns 操作后值
 */
export function addPrefix(str, prefix = 'btn') {
    const arr = _.upperFirst(str.trim()).split(/\s+/);
    const tResult = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        tResult.push(`${prefix}${arr[i]}`);
    }
    return tResult.join(' ');
}

/**
 * tree组件data组装
 * @param {array} arr 数据源，格式：[{xxx:1,yyy:2,zzz:[{xxx:1,yyy:2,zzz:[{...}]}]}]
 * @param {object} [keysMap={ id: 'key', name: 'label', data: 'children' }] 键值映射表，{原key: 目标key}
 * @param {object} [options={key:"",value:"", props:{}}] 操作项，扩展操作，用于筛选符合条件的子树
 * @returns 组装后的数组，格式:[{}], key由keysMap映射
 */
export function assembleData(
    arr,
    keysMap = { id: 'key', name: 'label', data: 'children' },
    options = { key: '', value: '', props: {}, seed: 'data' }
) {
    const tMapKeys = Object.keys(keysMap);
    const { key: optKey, value: optValue, props, seed } = options;
    // 是否扩展的开关
    let flag = false;
    // 选择对象片段
    let tArr = [];
    return (function tAssembleData(arr) {
        return arr.map((item) => {
            if (optKey && optValue) {
                if (item[optKey] === optValue) {
                    flag = true;
                }
            }

            // 获取满足options中key和value相等的子树
            if (item[optKey] === optValue) {
                (function tMapResult(result) {
                    return result.map((item) => {
                        tArr.push(item[optKey]);
                        const data = item[seed];
                        if (data && data.length) {
                            return tMapResult(data);
                        }
                        return item[optKey];
                    }, []);
                })([item]);
            }

            // 根据keysMap条件组合数据
            const tResult = tMapKeys.reduce((result, key) => {
                const tData = item[key];
                if (
                    key === seed &&
                    tData !== null &&
                    typeof tData === 'object' &&
                    Array.isArray(tData) &&
                    tData.length > 0
                ) {
                    result[keysMap[key]] = tAssembleData(tData);
                } else {
                    result[keysMap[key]] = item[key];
                }

                return result;
            }, {});

            // 对符合条件的树合并options中的props
            flag && tArr.includes(item[optKey]) && Object.assign(tResult, props);

            return tResult;
        });
    })(arr);
}

export function flatDataToArr(data = [], seed = 'data') {
    if (_.isEmpty(data)) {
        return [];
    }
    const result = [];
    (function tFlatData(data) {
        data.forEach((item) => {
            const tArr = item[seed];
            result.push(item);
            if (tArr !== null && !_.isEmpty(tArr)) {
                tFlatData(tArr);
            }
        });
    })(data);
    return result;
}

//无限级分类格式化数据，供筛选逻辑使用, 格式：{根id：[{子id:text}]，父id:[{子id:text}], 叶子id:{叶子id:text}}
export function flatDataToObj(data, key = 'id', seed = 'data') {
    let results = {};
    const mROOT = '0';
    (function tFlatData(data) {
        let r = [];
        data.forEach((item) => {
            r.push(item);
            results[item[key]] = item;
            const tArr = item[seed];
            if (tArr && tArr.length) {
                tFlatData(tArr);
            } else {
                return r;
            }
        });

        if (data[key]) {
            results[data[key]] = r;
        } else {
            results[mROOT] = r;
        }
    })(data);

    return results;
}

// 清空对象的value
export function initObjValue(obj) {
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] && Array.isArray(obj[key].slice())) {
            result[key] = [];
        } else {
            result[key] = '';
        }
        return result;
    }, {});
}

/**
 * 对比扁平数组
 * @param {array} newValue 新值，默认值[]
 * @param {array} oldValue 旧值，默认值[]
 * @returns {object} 返回结果，格式: {adds:[], dels:[]}
 */
export function diffFlatArray(newValue = [], oldValue = []) {
    if (!newValue.length) {
        return {
            adds: [],
            dels: oldValue,
        };
    }
    const tNew = _.difference(newValue, oldValue); // 新增
    return {
        adds: tNew,
        dels: _.difference(oldValue, _.difference(newValue, tNew)), // 删除
    };
}

//根据传入的选中的ID，反查组织数据，返回对应的角色(树形的结构不一样，所以另外处理)
export function getInitRoleArry(idsArry, dataSource) {
    const newArray = [];
    idsArry.forEach((item) => {
        newArray.push(dataSource.find((it) => it.id === item));
    });
    return newArray;
}

/**
 * 重命名扁平对象
 * @param {*} flatObj 操作对象
 * @param {string} [prefix=''] 前缀
 * @param {*} [renameKeys=[]] 要重命名的keys  ['id', 'name', 'code', 'pid']
 * @returns 重命名后的对象
 */
export function renameFlatObject(flatObj, prefix = '', renameKeys = []) {
    if (renameKeys.length === 0) {
        return;
    }
    const tKeys = Object.keys(flatObj);
    return tKeys.map((key) => {
        if (renameKeys.includes(key)) {
            return {
                [`${this.prefix}${_.upperFirst(key)}`]: flatObj[key],
            };
        } else {
            return { [key]: flatObj[key] };
        }
    });
}

/**
 * 扁平对象key映射
 * @param {string} [prefix=''] 前缀
 * @param {*} [mapKeys=[]] 要映射的keys  ['id', 'name', 'code', 'pid']
 * @param {*} flatObj 操作对象
 * @returns 映射对象
 */
export function flatObjectMap(prefix = '', mapKeys = [], flatObj = {}) {
    if (mapKeys.length === 0) {
        return;
    }
    let tKeys = Object.keys(flatObj);
    if (tKeys.length === 0) {
        tKeys = mapKeys;
    }
    return tKeys.map((key) => {
        if (mapKeys.includes(key)) {
            return {
                [key]: `${this.prefix}${_.upperFirst(key)}`,
            };
        } else {
            return { [key]: key };
        }
    });
}
