
const app = getApp()
const collect=[]
Page({
  onShow(){
    app.db.collection('tiezi').get().then(res=>{
      this.setData({list:res.data})
      for(let i=0;i<res.data.length;i++)
      app.db.collection('favorite').where({
        tiezi_id:res.data[i]._id
      }).get().then(r=>{
        if(r.data.length) {
          collect[i]=true
        }  
        if(res.data.length-i==1){
          this.setData({collect})
        }  
      })
    })
  },

  search(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  to_user_or_tiezi(e){
    if(e.target.dataset.id){
      app.history.unshift(this.data.list[e.target.dataset.index])
      wx.navigateTo({
        url: '../tiezi/tiezi?id='+e.target.dataset.id
      })
    }
    if(e.target.dataset.openid)
    wx.navigateTo({
      url: '../user/user?id='+e.target.dataset.openid
    }) 
    if(e.target.dataset.tiezi_id){
      collect[e.target.dataset.index]=!collect[e.target.dataset.index]
      this.setData({collect})
      collect[e.target.dataset.index] ?
      app.db.collection('favorite').add({
        data:{
          tiezi_id:e.target.dataset.tiezi_id
        }
      }) :
      app.db.collection('favorite').where({
        tiezi_id:e.target.dataset.tiezi_id
      }).remove({})
    }
  }
})
