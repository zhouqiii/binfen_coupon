const webpack = require("webpack")

module.exports = {
    publicPath:"./",
    configureWebpack: {
        plugins:[
           
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                jquery:"jquery",
                $: "jquery",
                "window.jQuery":"jquery"
            })
        ]
    },
    // devServer: {
    //     proxy: {
    //       '/': {
    //         target: 'https://mlife.jf365.boc.cn/AppPrj',
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: {
    //           '^/': '',
    //         },
    //       },
    //     },
    //   },
}