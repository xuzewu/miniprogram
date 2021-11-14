const app = getApp()
let id
Page({
  onLoad: function (options) {
    id=options.id
    app.db.collection('answer').where({
      _id:id
    })
    .get().then(res=>{   
      app.db.collection('question').where({
        _id:res.data[0].question_id
      })
      .get().then(res=>{   
        this.setData({question:res.data[0]})
      })
      this.setData({answer:res.data[0]})
    })
  },
  question(){
    wx.navigateTo({
      url: '../question/question?id='+id
    })
  }
})