const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

let items=[];
let nextId=1;

app.get('/vault', (req,res)=> {
    res.json(items);
});

app.post('/vault', (req,res)=> {
    const item={
        id:nextId++,
        site:req.body.site,
        username:req.body.username,
        password:req.body.password,
    };
    items.push(item);
    res.status(201).json(item);
});

app.put('/vault/:id', (req,res)=> {
    const idx=items.findIndex(i=> i.id===+req.params.id);
    if(idx===-1) return res.status(404).json({error:"Not Found"});
    items[idx]={...items[idx],...req.body};
    res.json(items[idx]);
});

app.delete('/vault/:id', (req,res)=> {
    items=items.filter(i=> i.id!== +req.params.id);
    res.json({message:"Deleted"});
});

app.listen(3000, ()=>console.log('Server on http://localhost:3000'));