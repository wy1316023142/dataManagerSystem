export default [{
    name: 'deviceUpdate', //  修改设备信息
    url: '/device/insertOrUpdate',
    methods: ['post']
  },{
    name: 'uploadDeviceIfo', //  获取默认实时查看
    url: '/device/uploadDeviceIfo',
    methods: ['post']
  },{
    name: 'getDeviceListOne', // 查询
    url: '/device/getDeviceList',
    methods: ['post']
  },{
    name: 'getDeviceCategoryList', // 获取设备类别数据
    url: '/device/getDeviceCategoryList',
    methods: ['get']
  },
  {
    name: 'getFactoryList', // 获取设备厂家数据
    url: '/device/getFactoryList',
    methods: ['get']
  },
]
 