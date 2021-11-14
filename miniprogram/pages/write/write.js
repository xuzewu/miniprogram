const app=getApp()

Page({
  onLoad(){
    if(!app.avatar)
    wx.switchTab({
      url: '../my/my',
    })
  },
  onUnload(){
    if(this.data.input) app.input=this.data.input
  },
  input(e){
    this.setData({input:e.detail.value})
  },
  publish(){
    if(this.data.input)
    app.db.collection('tiezi').add({
      data: {
        avatar:app.avatar,
        name:app.name,
        tiezi:this.data.input
      }
    })
    wx.switchTab({
      url: '../index/index',
    })
  }
})