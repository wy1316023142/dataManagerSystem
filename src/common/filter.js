import moment from 'moment'

export default {
  install(Vue) {
      //时间
      Vue.filter('timeFormat', (date, format = 'YYYY-MM-DD') => {
        date*=1
        return date ? moment(date).format(format) : '-'
      });
      Vue.filter('daterful',function  (oldval,filerw ) {
        return moment(oldval).format( filerw || 'YYYY-MM-DD  HH:mm:ss' );
    }) 
      //
      Vue.filter('handleHisStatue', (val) => {
          val*=1
          switch (val){
              case 0:
                  return '未处置';
                  break;
              case 1:
                  return '已处置';
                  break;
              case 2:
                  return '已审核';
                  break;
              case 3:
                  return '审核不通过';
                  break;
              default:
                  return '-'
          }
      });
      Vue.filter('dealStatue', (val) => {
          val*=1
          switch (val){
              case 0:
                  return '否';
                  break;
              case 1:
                  return '是';
                  break;
              default:
                  return '-'
          }
      });
      Vue.filter('deviceState', (value) => {
        if(value===1) return '正常'
        if(value===0) return '离线'
      })

  }
}
