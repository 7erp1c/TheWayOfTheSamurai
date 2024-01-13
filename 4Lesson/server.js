const  http = require('http')//объект подключи готовый пакет 'http';

let requestsCount =0;//объявим счетчик
const server = http.createServer( (request,response) => {//в переменной server, создадим сервак http.createServer,
                                                               //который слушает 'http' протокол;
    requestsCount++ //увеличим счетчик на +1

    switch (request.url){//
            case '/students':
                response.write('Students ')
            break;
        case '/':
        case '/courses':
            response.write('FRONT + BACK ')
            break;
        default:
            response.write('404 not found ')
    }

    response.write('IT_KAMASUTRA: ' + requestsCount)//перед завершением запишем данные;
    response.end()//завершим;
    console.log(request.url);
})

server.listen(3003)//сервер слушай конкретный порт; (сморим в браузере localhost:3003);


