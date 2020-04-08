export default [{
    name: 'systemParamSet', // 系统参数设置
    url: '/config/systemParamSet',
    methods: ['post']
  },{
    name: 'getNormal', // 普通查1400 sdk
    url: '/config/get_normal',
    methods: ['get']
  },{
    name: 'saveNormal', // 普通增1400 sdk
    url: '/config/save_normal',
    methods: ['post']
  },{
    name: 'saveExpert', // 专家增1400 sdk
    url: '/config/save_expert',
    methods: ['post']
  },{
    name: 'getExpert', // 专家查1400 sdk
    url: '/config/get_expert_file',
    methods: ['get']
  },{
    name: 'getSystemParam', // 查系统参数
    url: '/config/getSystemParam',
    methods: ['get']
  },
]