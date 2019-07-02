// 发布后的相对根目录
const ROOT = process.env.NODE_ENV === 'development' ? `/api` : '';
const urls = {};

for (const key in urls) {
    if (Object.prototype.hasOwnProperty.call(urls, key)) {
        let v = urls[key];
        if (v.indexOf('/') > 0) v = `/${v}`;
        urls[key] = `${ROOT}${v}`;
    }
}

export default urls;
