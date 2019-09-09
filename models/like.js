import { HTTP } from '../utils/http.js'
var app = getApp();
class LikeModel extends HTTP {
  like(behavior, artId, category,sCallback) {
        let url = behavior=='like'?'/like':'/like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artId,
                type: category,
                openId: app.globalData.openId
            },
            success: (res) => {
              sCallback(res)
            }
        })
    }
}

export { LikeModel }