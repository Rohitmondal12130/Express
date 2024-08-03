const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());  // 
app.use(express.urlencoded({ extended: true}));  

mongoose.connect('mongodb://localhost:27017/session')
.then(() => {
    console.log('server started');
}).catch((err) => {
    console.log(err);
});

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    salary:{
        type: Number,
        required: true,
    }
});

const empmodel = mongoose.model("emp",empSchema);

app.get("/", async (req, res) => {
    try{
        const result = await empmodel.find({});
        res.json(result);
    }
    catch(error) {
                console.log(error);    
                }
  });

app.post('/add', async (req, res) => {
    try {
        const data = new empmodel(req.body);
        const result = await data.save();
        res.json(result);
    }
    catch(error) {
                console.log(error);    
                }

});

app.put("/edit/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await empmodel.findByIdAndUpdate(id, req.body);
      if (result) {
        res.json({ message: "data updated successfully..." });
      } else {
        res.json({ message: "record not found.." });
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await empmodel.findByIdAndDelete(id);
      if (result) {
        res.json({ message: "data deleted successfully..." });
      } else {
        res.json({ message: "record not found.." });
      }
    } catch (error) {
      console.log(error);
    }
  });


  app.listen(4000); 