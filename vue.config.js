const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                views: path.resolve(__dirname, 'src/views/'),
                store: path.resolve(__dirname, 'src/store/'),
                components: path.resolve(__dirname, 'src/components/'),
                routing: path.resolve(__dirname, 'src/routing/'),
                services: path.resolve(__dirname, 'src/services/'),
                filters: path.resolve(__dirname, 'src/filters/')
            }
        }
    }
}