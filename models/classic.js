import { HTTP } from '../utils/http.js'

/*
* extends  就是让 ClassicModel 类 去继承 HTTP 类
*/
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: '/classic/latest',
            success: (res) => {
              sCallback(res)
            }
        })
    }

    getPrevious(index, sCallback) {
        this.request({
          url:'/classic/' + index + '/previous',
          success: (res) => {
            sCallback(res);
          }
        })
    }
    
    getNext(index, sCallback){
      this.request({
        url: '/classic/' + index + '/index',
        success: (res) => {
          sCallback(res);
        }
      })
    }
    
}

export { ClassicModel }