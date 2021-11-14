const app = getApp()

Page({
  data:{
    index:0
  },
  onLoad(){
    this.setData({name:app.name})
    if(this.data.name){
      app.db.collection('tiezi').where({
        _openid:app.id
      }).get().then(res=>{
        this.setData({list:res.data})
      })
    }
  },
  onShow(){
    if(this.data.name)
    switch (this.data.index) {
      case '0': 
        app.db.collection('tiezi').where({
          _openid:app.id
        }).get().then(res=>{
          this.setData({list:res.data})
        })
        break
      case '1':
        app.db.collection('favorite').where({
          _openid:app.id
        }).get().then(res=>{
          if(!res.data.length){
            this.setData({list:''})
            return
          }  
          const collect=[]
          for(let i=0;i<res.data.length;i++)
          app.db.collection('tiezi').where({
            _id:res.data[i].tiezi_id
          }).get().then(r=>{
            collect.push(r.data[0])
            if(collect.length==res.data.length) this.setData({list:collect})
          })
        })
        break;
      case '2':
        this.setData({list:app.history})
        break;
    }
  },
  getUserInfo(){
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别', 
      success: (res) => {
        app.db.collection('user').add({
          data: {
            avatar:res.userInfo.avatarUrl,
            name:res.userInfo.nickName
          }
        })
        this.setData({name:res.userInfo.nickName}) 
        app.avatar=res.userInfo.avatarUrl
        app.name=res.userInfo.nickName
      }
    })
  },  
  toggle(e){
    this.setData({
      index:e.target.dataset.index
    })
    if(this.data.name)
      switch (e.target.dataset.index) {
        case '0': 
          app.db.collection('tiezi').where({
            _openid:app.id
          }).get().then(res=>{
            this.setData({list:res.data})
          })
          break
        case '1':
          app.db.collection('favorite').where({
            _openid:app.id
          }).get().then(res=>{
            if(!res.data.length){
              this.setData({list:''})
              return
            }  
            const collect=[]
            for(let i=0;i<res.data.length;i++)
            app.db.collection('tiezi').where({
              _id:res.data[i].tiezi_id
            }).get().then(r=>{
              collect.push(r.data[0])
              if(collect.length==res.data.length) this.setData({list:collect})
            })
          })
          break;
        case '2':
          this.setData({list:app.history})
          break;
      }
  },
  to_user_or_tiezi(e){
    if(e.target.dataset.id){
      app.history.unshift(this.data.list[e.target.dataset.index])
      wx.navigateTo({
        url: '../tiezi/tiezi?id='+e.target.dataset.id
      })
    }
    wx.navigateTo({
      url: '../user/user?id='+e.target.dataset.openid
    }) 
  }
})