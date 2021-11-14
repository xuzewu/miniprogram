App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.db = wx.cloud.database()
    this.history=[]
    this.l=console.log
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        this.id=res.result.openid
        this.db.collection('user').where({
          _openid:this.id
        }).get().then(res => {
          if(res.data.length) {
            this.avatar=res.data[0].avatar
            this.name=res.data[0].name
          }  
        })
      }
    }) 
  }
})

