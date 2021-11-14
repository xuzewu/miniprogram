

const app = getApp()

Page({
  onLoad:function(param){
    app.db.collection('user').where({
      _openid:param.id
    }).get().then(res=>{
      this.setData({user:res.data[0]})
    })
    app.db.collection('tiezi').where({
      _openid:param.id
    }).get().then(res=>{
      this.setData({list:res.data})
    })
  },
 
  to_tiezi(e){
    wx.navigateTo({
      url: '../tiezi/tiezi?id='+e.target.dataset.id
    })
  }
})