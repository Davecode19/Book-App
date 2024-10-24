import http from 'http'
const server = ((req,res) => {
    res.statuscode = 200;
    res.header = ('content-type' , 'text/plain');
    res.end("Welcome to my e-library application");
})

server.listen(5000,'127.0.0.1',() => {
    console.log(`server is listening at http://127.0.0.1:5000`); 
}); 