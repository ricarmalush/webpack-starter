const HtmlWebpack    = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin     = require("copy-webpack-plugin");

//Esto va aser nuestro punto de entrada aqui vamos a empezar a nuestras configuraciones como nosotros queremos que funcione webpack
module.exports = {
    
    mode: "development",

    //Lo que hace clean: true, es cambia los nombres por defecto los archivos index y main en el caso de que alguien le haya cambiado de nombre a estos archivos.
    output: { 
        clean: true
    },
    
    module: {
        //Reglas de configuración:

        //Cuando hago el build tengo que apuntar a todos los archivos HTML y trasladarlos a dist.
        rules: [
            {
                //Una expresión regular nos sirve para que nosotros podamos buscar si un string o parte de un string hace match con la expresión regular
                test: /\.html$/, //=> Esto lo que va a ser es que cada vez que ejecutemos el build barra cada uno de los archivos del proyecto, si lo encuentra, llama al loader.
                loader: 'html-loader',
                options: {
                    sources: false //En el caso de que se mueva un archivo por ejemplo de HTML que tuviera algún atributo que cargue alguna imagen u otra cosa entonces tambien lo mueve y crea un hash 
                }
            },
                //Esta nueva regla una vez instalado los pquetes style y css nos ayudará a cargar los estilos. Y los transforma en formato js que entenderá el navegador
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader'] //Estos son los dos paquetes que hemos instalado.
            },
            {
                test: /styles.css$/, //
                use: [ MiniCssExtract.loader, 'css-loader' ] //Plugin para tener el archivo css de manera global.
            },
            {
                test: /\.(png|jpe?g|gif)$/, //Expresión regular para cargar cualquier imagen con estas extensiones
                loader: 'file-loader' //Plugin instalado.
            }
        ]
    },

    optimization: {},

    plugins: [
        //Este plugin lo que hace es crear en la carpeta dist el archivo html con todos sus cambios que hallamos hecho en desarrollo
        //una vez que generemos el comando npm run build. Tambíen se puede manipular etiquetas en mi html como por ejemplo el titulo.
        new HtmlWebpack({
            title: 'Mi Webpack App',
            // filename: 'index.html', //Esto es para cambiarle el nombre al archivo de salida en la carpeta dist.
            template: './src/index.html' //Es el archivo el cual ustedes quieren que se base esto 
        }),
        
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }//Desde que origen al destino
            ]
        })
    ]
}


//=> Lo que hace es cargar el html
//npm install --save-dev html-loader 

// => Nos va ayudar con la inyección nuestro archivo de JS dentro de nuestro index html y también nos da otros tipos de controles.
//npm install --save-dev html-webpack-plugin

//Para instalar una versión que no sea la latest
//npm install --save-dev html-webpack-plugin@5.3.1

//Para instalar un servidor y que puedan correr mis aplicaciones en http o https. En el package.json se tiene que ver el archivo instalado
//Y se tiene que poner en scripts la configuración. "start": "webpack serve --config webpack.config.js --open --port=8080"
//Cualquier cambio que se haga en el html se ve reflejado casi instantaneo en el navegador.
//npm i -D webpack-dev-server

//Estas dependencias nos ayudará a que trabajemos con los estilos cuadno los importemos en los sitios donde lo necesitemos.
//npm install --save-dev style-loader
//npm install --save-dev css-loader

//Nos ayudará a tener archivos de manera global por diferentes razones.
//npm install --save-dev mini-css-extract-plugin

//ESte paquete nos permite cargar imagenes 
//npm install file-loader --save-dev

//Copia archivos individuales o directorios completos, que ya existen, en el directorio de compilación (dist)
//npm install copy-webpack-plugin --save-dev

//EStos paquetes solo estan en modo de producción y no en desarrollo
//npm i D css-minimizer-webpack-plugin terser-webpack-plugin 

//Configuración de Babel: Para que nos ayude a la transformación de nuestro código de un estándar bastante alto de ESMAScript a un estándar 
//que nosotros queramos o en este caso ESMAScript 5 que es universalmente aceptado. Ya que en nuestro código abra funciones de flecha, 
//const, $ { variable } => concatenaciones y no es soportado en navegadores antiguos como internet explorer.
//npm install --save-dev babel-loader @babel/core

//Instalamos este paquete: Nos va ayudar a hacer las configuraciones por si acaso ustedes quieren que babel trabaje de una manera especifico
//Ademas debemos crear un archivo json => babel.config.json { "presets": ["@babel/preset-env"] } Esto se hace solamente en el archivo de producción.
//npm install @babel/preset-env --save-dev
