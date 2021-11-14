const app = getApp()
let id
Page({
  data:{
    bottom:0
  },
  onLoad: function (options) {
    id=options.id
    app.db.collection('reply').where({
      tiezi_id:id
    })
    .get().then(res=>{
      this.setData({list:res.data})
      const comment=[]
      for(let i=0;i<res.data.length;i++){
        app.db.collection('comment').where({
          reply_id:res.data[i]._id
        })
        .get().then(result=>{  
          comment.push(result.data)
          if(comment.length==res.data.length){
            this.setData({comment})
          }  
        })
      } 
    })
  },
  to_user_or_reply(e){
    if(e.target.dataset.openid){
      wx.navigateTo({
        url: '../user/user?id='+e.target.dataset.openid
      })
      return
    }
    this.setData({focus:true,reply_id:e.target.dataset.reply_id})
    if(e.target.dataset.receiver) this.setData({receiver:e.target.dataset.receiver})
  },
  focus(){
    this.setData({bottom:'10px'})
  },
  blur(){
    this.setData({bottom:0})
  },
  input(e){
    this.setData({input:e.detail.value})
  },
  comment(e){
    if(this.data.focus){
      if(this.data.receiver){
        app.db.collection('comment').add( {
          data: {
            reply_id:this.data.reply_id,
            reviewer:app.name,
            receiver:this.data.receiver,
            comment:this.data.input
          } 
        })
      }else{
        app.db.collection('comment').add( {
          data: {
            reply_id:this.data.reply_id,
            reviewer:app.name,
            comment:this.data.input
          } 
        })
      }
    }else{
      app.db.collection('reply').add( {
        data: {
          tiezi_id:id,
          avatar:app.avatar,
          name:app.name,
          reply:this.data.input
        } 
      })
    }
    app.db.collection('reply').where({
      tiezi_id:id
    })
    .get().then(res=>{
      this.setData({list:res.data})
      const comment=[]
      for(let i=0;i<res.data.length;i++){
        app.db.collection('comment').where({
          reply_id:res.data[i]._id
        })
        .get().then(result=>{  
          comment.push(result.data)
          if(comment.length==res.data.length){
            this.setData({comment})
          }  
        })
      } 
    })
    this.setData({value:'',input:'',bottom:0,focus:false})
  }
})