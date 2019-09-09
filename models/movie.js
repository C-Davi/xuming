import { HTTP } from '../utils/http.js'

/*
* extends  就是让 ClassicModel 类 去继承 HTTP 类
*/
class MovieModel extends HTTP {
  getSomeMovies(sCallback) {
    this.request({
      url: '/movie/getSome',
      success: (res) => {
        sCallback(res)
      }
    })
  }

}

export { MovieModel }