// backend/index.js
const express=require('express');
const app=express();
const cors=require('cors');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
const MONGODB_URI = 'mongodb+srv://sameergoelme:GcGtvLAVHzltugHG@cluster0.1nqx3ud.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI);
const tinymceDataSchema=mongoose.Schema({
  data:String
})
const RightCardSchemaPopular=mongoose.Schema({
  title: String,
  content: String,
  img:String
});
const RightCardSchemaRecents=mongoose.Schema({
  title: String,
  content: String,
  img:String
});
const bottomCardSchema=mongoose.Schema({
  Heading: String,
  img:String,
  date:String,
  content: String,
  color:String
});
const ContactSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  details: String,
});
const blogSchema = new mongoose.Schema({
  name: String, 
  content: String,
  image: String,})

const RightCardModelPopular=mongoose.model('RightCardPopular',RightCardSchemaPopular);
const RightCardModelRecents=mongoose.model('RightCardRecents',RightCardSchemaRecents);
const BottomCardModel=mongoose.model('BottomCard',bottomCardSchema);
const BlogModel = mongoose.model('Blog', blogSchema);
const ContactModel=mongoose.model('Contact',ContactSchema);
const tinyMceModelPopular=mongoose.model('tinymcepop',tinymceDataSchema);
const tinyMceModelRecent=mongoose.model('tinymcerec',tinymceDataSchema);
const tinyMceModelMinimalism=mongoose.model('tinymcemin',tinymceDataSchema);
BlogModel.createCollection();

app.post('/data', async(req, res) => {
  const {Password,name,content,image}=req.body;
  console.log(Password)
  console.log(req.body)
  if(Password=="2e12e12r23"){
  const newBlog = new BlogModel({
      name,
      content,
      image,
    });
    await newBlog.save();
    return res.json({ message: 'Blog post added successfully' });}
    return res.json({message:'Wrong password'});
})

app.get('/allContents',async(req,res)=>{
  const data=await BlogModel.find({})
  console.log(data);
  return res.json({data});
})
app.post('/userDetails',async(req,res)=>{
const { name, email, phone, details } = req.body;
  const newContact = new ContactModel({
    name,
    email,
    phone,
    details,
  });
  console.log(phone);
  newContact.save()
    .then(() => {
      res.status(200).json({ message: 'Form submitted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
})
app.post('/Popular',async(req,res)=>{
  const data=req.body.text;
  const richData=new tinyMceModelPopular({"data":data});
  console.log(data);
  await richData.save();
  return res.json({});
})
app.get('/Popular',async(req,res)=>{
  const data=await tinyMceModelPopular.find({});
  console.log(data);
  return res.json({data});
})
app.post('/Minimalism',async(req,res)=>{
  const data=req.body.text;
  const richData=new tinyMceModelMinimalism({"data":data});
  console.log(data);
  await richData.save();
  return res.json({});
})
app.get('/Minimalism',async(req,res)=>{
  const data=await tinyMceModelMinimalism.find({});
  console.log(data);
  return res.json({data});
})
app.post('/Recent',async(req,res)=>{
  const data=req.body.text;
  const richData=new tinyMceModelRecent({"data":data});
  console.log(data);
  await richData.save();
  return res.json({});
})
app.get('/Recent',async(req,res)=>{
  const data=await tinyMceModelRecent.find({});
  console.log(data);
  return res.json({data});
})
app.post('/popularContent',async(req,res)=>{
const {title,content,img}=req.body;
const newRightCardModel=new RightCardModelPopular({
  title,
  content,
  img
})
await newRightCardModel.save();
return res.json({message:"content added successfully"})
})
app.post('/minimalContent',async(req,res)=>{
const {date,content,img,Heading,color}=req.body;
const newBottomCardModel=new BottomCardModel({
  date,
  content,
  img,
  Heading,
  color
})
await newBottomCardModel.save();
return res.json({message:"content added successfully"})
})
app.post('/recentContent',async(req,res)=>{
const {title,content,img}=req.body;
const newRightCardModel=new RightCardModelRecents({
  title,
  content,
  img
})
console.log(title);
await newRightCardModel.save();
return res.json({message:"content added successfully"})
})

app.get('/popularContent',async(req,res)=>{
const data=await RightCardModelPopular.find({})
console.log(data);
return res.json({data});
})
app.get('/recentContent',async(req,res)=>{
const data=await RightCardModelRecents.find({})
console.log(data);
return res.json({data});
})
app.get('/minimalContent',async(req,res)=>{
  const data=await BottomCardModel.find({})
  console.log(data);
  return res.json({data});
})
app.listen(3001,()=>{
    console.log("listening on port 3001")
})

module.exports={ BlogModel}
