
import express, { Request, Response } from 'express';
export const app = express();
const port = process.env.PORT || 3001;

const products = [{id: 1, title:"tomato"},{id: 2, title:"orange"}]
const addresses = [{id: 1, value: "Pskov 12"},{id: 2, value: "Piter 5a"}]

app.get('/products',(req: Request, res: Response) => {
    if(req.query.title){
        let searchString = req.query.title.toString()
        res.send(products.filter(p=>p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})
app.get('/products/:productTitle',(req: Request, res: Response) => {

    let product = products.find(p=>p.title ===  req.params.productTitle);
    if(product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.get('/addresses',(req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id',(req: Request, res: Response) => {
    let address = addresses.find(p=>p.id === +req.params.id);
    if(address) {
        res.send(address)
    } else {
        res.send(404)
    }
})

// Выводим лог как только сервер будет запущен
app.listen(port, () => {
    console.log(`Example at listening on port ${port}`);
})