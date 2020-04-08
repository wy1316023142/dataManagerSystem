export default [{
    name: 'getTodayCaptureNumber', // 今日抓拍数
    url: '/dashbord/getTodayCaptureNumber',
    methods: ['get']
  },{
    name: 'getServerState', // 服务器状态
    url: '/dashbord/getServerState',
    methods: ['get']
  },{
    name: 'deviceCounte', // 接入设备
    url: '/device/deviceCount',
    methods: ['get']
  },{
    name: 'getGatherCount', // 24小时
    url: '/dashbord/getGatherCount',
    methods: ['get']
  }
]