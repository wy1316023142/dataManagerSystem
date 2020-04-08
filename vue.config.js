module.exports = {
    chainWebpack: config => {
    config.module
        .rule('swf')
        .test(/\.swf$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit: 10000
        })
    },
    // devServer: {
    //     proxy: {
    //         '/': {
    //             target: 'http://25.30.13.176:51515/',
    //             // target: 'http://25.30.14.75:51515/',
    //             // target: 'http://25.30.14.155:51515/',
    //             changeOrigin: true,
    //             ws:true,
    //             pathRewrite: {
    //                 "^/api": ''
    //             }
    //         }
    //     },
    // },
}

