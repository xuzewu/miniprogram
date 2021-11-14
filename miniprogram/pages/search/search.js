// pages/search/search.js
const app=getApp()
Page({
  search(e){
    app.db.collection('tiezi').where({
      tiezi:app.db.RegExp({
        regexp:e.detail.value,
        options:'i'
      })
    }).get().then(res=>{
      this.setData({list:res.data})
    })
  },
  to_tiezi(e){
    e.target.dataset.id ?
    wx.navigateTo({
      url: '../tiezi/tiezi?id='+e.target.dataset.id
    }) :
    wx.navigateTo({
      url: '../user/user?id='+e.target.dataset.openid
    }) 
  }
})