const express = require('express');
const app = express();
const {v4:uuid} = require('uuid'); // destructuring and renaming
uuid();
const methodoverride = require('method-override'); 
app.use(express.urlencoded({extended:true}));
app.use(methodoverride('_method'));
let Comments = [
    {
        id: uuid(),
        username: 'anushka',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'todd',
        comment: 'okay dude'
    },
    {
        id: uuid(),
        username: 'chris',
        comment: 'hey there'
    }
]
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.send("hi");
})
app.get('/comments',(req,res)=>{
    res.render('comments',{Comments})
})
app.get('/comments/new',(req,res)=>{
    res.render('new');
})
app.post('/comments',(req,res)=>{
    const {username,comment}= req.body;
    Comments.push({username,comment,id:uuid()});
    res.redirect('/comments');
    
})
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const com = Comments.find(c=>c.id === id);
    res.render('show',{com});
})
app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const newcom = req.body.comment;
    const foundcom = Comments.find(c=>c.id === id);
    foundcom.comment = newcom;
    res.redirect('/comments');
    
    
})
app.get('/comments/update/:id',(req,res)=>{
    const {id} = req.params;
    const com = Comments.find(c=>c.id === id);
    res.render('update',{com});
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    Comments = Comments.filter(c=>c.id!==id);
    res.redirect('/comments');
})
app.listen(3000, ()=>{
    console.log("listening on port 3000");
})